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
import { OrbitControls, useGLTF } from "@react-three/drei";
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

  const { wrapper, ok } = useMemo(() => {
    try {
      const box = new THREE.Box3().setFromObject(scene);
      if (box.isEmpty()) return { wrapper: null, ok: false };

      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (!Number.isFinite(maxDim) || maxDim <= 0) return { wrapper: null, ok: false };

      const s = TARGET_SIZE / maxDim;

      // Tone down CAD-export material quirks: mirror-metal surfaces go black
      // under plain lights, pure-black albedo stays invisible.
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) {
          const std = m as THREE.MeshStandardMaterial;
          if (std && std.isMeshStandardMaterial) {
            std.metalness = Math.min(std.metalness ?? 0, 0.3);
            if (std.roughness < 0.25) std.roughness = 0.45;
            std.envMapIntensity = 0.35;
            if (std.color && std.color.getHexString() === "000000") {
              std.color.set("#8a929c");
            }
          }
        }
      });

      return {
        wrapper: (
          <group scale={s} position={[-center.x * s, -center.y * s, -center.z * s]}>
            <primitive object={scene} />
          </group>
        ),
        ok: true,
      };
    } catch {
      return { wrapper: null, ok: false };
    }
  }, [scene]);

  if (!ok || !wrapper) throw new Error("model could not be normalized");

  // Signal readiness once the normalized wrapper has actually mounted.
  useEffect(() => {
    onReady();
  }, [onReady]);

  return wrapper;
}

/* ------------------------------ camera fitting ----------------------------- */

function FitCamera({ rootRef }: { rootRef: RefObject<THREE.Group | null> }) {
  const camera = useThree((s) => s.camera);
  const fitted = useRef(false);

  // Retries every frame until the normalized model is actually in the graph,
  // then frames it once. Cheap: Box3 only computes while unfitted.
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
  handleReady.current = onReady;

  return (
    <GLTFBoundary onError={onError}>
      <Canvas
        camera={{ fov: 40, near: 0.05, far: 400, position: [4, 2.6, 5] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 7, 4]} intensity={1.3} />
        <directionalLight position={[-6, 3, -4]} intensity={0.5} color="#a8ccff" />
        <directionalLight position={[0, -4, 3]} intensity={0.32} />

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
        <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} />
      </Canvas>
    </GLTFBoundary>
  );
}
