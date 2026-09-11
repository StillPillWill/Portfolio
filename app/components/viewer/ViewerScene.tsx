"use client";

/**
 * Client-only R3F scene. Loaded via dynamic import() from ModelViewer so
 * three.js never enters the server bundle or the non-viewer routes.
 *
 * Models are CAD exports and may be authored in millimetres; PreparedModel
 * normalizes them to a ~3-unit footprint so camera, lights, and orbit
 * controls behave identically regardless of source scale.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import * as THREE from "three";

export type SpinRef = RefObject<{ active: boolean }>;

/* ---------------- error boundary: GLB failure -> fallback UI --------------- */

class GLTFBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* --------------------------------- model ---------------------------------- */

const TARGET_SIZE = 3;

function NormalizedModel({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url);

  // useMemo computes plain transform data only (no JSX): material cleanup and
  // normalization math stay pure so a corrupt GLB surfaces as { ok: false }
  // instead of throwing inside JSX construction.
  const normalized = useMemo(() => {
    try {
      const box = new THREE.Box3().setFromObject(scene);
      if (box.isEmpty()) return { ok: false as const };

      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (!Number.isFinite(maxDim) || maxDim <= 0) return { ok: false as const };

      const s = TARGET_SIZE / maxDim;

      // Tone down CAD-export material quirks: mirror-metal surfaces go black
      // under plain lights, pure-black albedo stays invisible, and near-white
      // matte albedo (#ccc) saturates to featureless white under real light.
      // Clamp both ends of the albedo range; let the env map add only a
      // whisper of sheen (RoomEnvironment irradiance flattens diffuse CAD).
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.castShadow = true;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) {
          const std = m as THREE.MeshStandardMaterial;
          if (std && std.isMeshStandardMaterial) {
            std.metalness = Math.min(std.metalness ?? 0, 0.3);
            if (std.roughness >= 0.95) std.roughness = 0.6;
            std.envMapIntensity = 0.05;
            if (std.color) {
              // color is LINEAR (GLTFLoader decoded sRGB->linear); #cccccc
              // arrives as 0.604, so the clamp threshold must be linear too.
              const lum = 0.2126 * std.color.r + 0.7152 * std.color.g + 0.0722 * std.color.b;
              if (lum > 0.5) std.color.multiplyScalar(0.5 / lum);
              else if (std.color.getHexString() === "000000") std.color.set("#8a929c");
            }
          }
        }
      });

      return {
        ok: true as const,
        scale: s,
        position: [-center.x * s, -center.y * s, -center.z * s] as const,
      };
    } catch {
      return { ok: false as const };
    }
  }, [scene]);

  if (!normalized.ok) throw new Error("model could not be normalized");

  // Signal readiness once the normalized wrapper has actually mounted.
  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <group scale={normalized.scale} position={[normalized.position[0], normalized.position[1], normalized.position[2]]}>
      <primitive object={scene} />
    </group>
  );
}

/* ------------------------------ camera fitting ----------------------------- */

function FitCamera({ rootRef }: { rootRef: RefObject<THREE.Group | null> }) {
  const camera = useThree((s) => s.camera);
  const fitted = useRef(false);

  // Retries every frame until the normalized model is actually in the graph,
  // then frames it once. Cheap: Box3 only computes while unfitted.
  // Mutating the R3F camera inside useFrame is the documented pattern;
  // the immutability rule targets React state, not the three.js scene graph.
  /* eslint-disable react-hooks/immutability */
  useFrame(() => {
    if (fitted.current) return;
    const root = rootRef.current;
    if (!root || root.children.length === 0) return;

    const box = new THREE.Box3().setFromObject(root);
    if (box.isEmpty()) return;

    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const fovRad = (((camera as THREE.PerspectiveCamera).fov ?? 40) * Math.PI) / 180;
    const dist = (sphere.radius / Math.sin(fovRad / 2)) * 1.12;

    camera.position.set(dist * 0.62, dist * 0.42, dist * 0.92);
    camera.near = Math.max(0.01, dist / 100);
    camera.far = dist * 12;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    fitted.current = true;
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}

/* ------------------------------- idle rotation ----------------------------- */

function IdleSpin({ spinRef, children }: { spinRef: SpinRef; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current && spinRef.current?.active) {
      ref.current.rotation.y += delta * 0.24;
    }
  });

  return <group ref={ref}>{children}</group>;
}

/* ---------------------------------- scene ---------------------------------- */

export type ViewerSceneProps = {
  url: string;
  spinRef: SpinRef;
  onReady: () => void;
  onError: () => void;
};

export default function ViewerScene({ url, spinRef, onReady, onError }: ViewerSceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const handleReady = useRef(onReady);

  // Keep the latest onReady without writing the ref during render.
  useEffect(() => {
    handleReady.current = onReady;
  }, [onReady]);

  return (
    <GLTFBoundary onError={onError}>
      <Canvas
        camera={{ fov: 40, near: 0.05, far: 400, position: [4, 2.6, 5] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ background: "transparent" }}
      >
        {/* Studio rig (tuned via offscreen fork tests): near-zero omni fill so
            key/rim model the form; key swung off the camera axis so visible
            faces straddle lit/shadow; env whisper for brushed-metal sheen. */}
        <ambientLight intensity={0.05} />
        <directionalLight
          position={[-4, 6, 3]}
          intensity={2.0}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
          shadow-bias={-0.0004}
          shadow-normalBias={0.02}
        />
        <directionalLight position={[5, 3, -4]} intensity={0.7} color="#a8ccff" />
        <directionalLight position={[2, -3, 4]} intensity={0.15} />

        <IdleSpin spinRef={spinRef}>
          <group ref={rootRef}>
            <GLTFBoundary onError={onError}>
              <Suspense fallback={null}>
                <NormalizedModel url={url} onReady={() => handleReady.current()} />
              </Suspense>
            </GLTFBoundary>
          </group>
        </IdleSpin>

        <FitCamera rootRef={rootRef} />
        <ContactShadows position={[0, -1.7, 0]} opacity={0.45} scale={10} blur={2.4} far={4} color="#000000" />
        <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} />
      </Canvas>
    </GLTFBoundary>
  );
}
