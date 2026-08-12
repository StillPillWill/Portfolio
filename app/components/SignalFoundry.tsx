"use client";

/* eslint-disable react/no-unknown-property, react-hooks/immutability, @next/next/no-img-element */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as ThreeImage, Line, useGLTF } from "@react-three/drei";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { chapters, contact } from "../data/portfolio";
import { useKineticJourney } from "../lib/useKineticJourney";

const cameraHolds = [
  new THREE.Vector3(0, 1.8, 7.8),
  new THREE.Vector3(-23, 2.5, -13),
  new THREE.Vector3(-5.5, 5.2, -47),
  new THREE.Vector3(18, 1.1, -62),
  new THREE.Vector3(56, 3.2, -32),
  new THREE.Vector3(72, 6.8, 2),
  new THREE.Vector3(49, 11.5, 41),
  new THREE.Vector3(0, 5.2, 55),
];

const cameraTargets = [
  new THREE.Vector3(1.8, 0.2, 0),
  new THREE.Vector3(-30, 0.4, -24),
  new THREE.Vector3(-14, 1.5, -58),
  new THREE.Vector3(18, 0.2, -72),
  new THREE.Vector3(48, 0.8, -46),
  new THREE.Vector3(62, -1, -10),
  new THREE.Vector3(36, 8.4, 28),
  new THREE.Vector3(0.4, 1.35, 42),
];

const cameraControls: Array<[THREE.Vector3, THREE.Vector3]> = [
  [new THREE.Vector3(-1, 3.6, 4), new THREE.Vector3(-26, 4, 3)],
  [new THREE.Vector3(-31, 4, -28), new THREE.Vector3(-30, 8, -45)],
  [new THREE.Vector3(-1, 4.8, -62), new THREE.Vector3(18, 1, -68)],
  [new THREE.Vector3(18, 0.4, -71.5), new THREE.Vector3(43, 7, -70)],
  [new THREE.Vector3(64, 5, -34), new THREE.Vector3(77, 9, -16)],
  [new THREE.Vector3(72, 10, 17), new THREE.Vector3(60, 16, 34)],
  [new THREE.Vector3(36, 14, 50), new THREE.Vector3(12, 8, 60)],
];

const targetControls: Array<[THREE.Vector3, THREE.Vector3]> = [
  [new THREE.Vector3(-2, 0, -6), new THREE.Vector3(-28, 0, -16)],
  [new THREE.Vector3(-31, 1, -30), new THREE.Vector3(-21, 3, -53)],
  [new THREE.Vector3(-6, 2, -64), new THREE.Vector3(14, 0, -72)],
  [new THREE.Vector3(18, 0, -76), new THREE.Vector3(42, 1, -57)],
  [new THREE.Vector3(55, 1, -40), new THREE.Vector3(66, 2, -20)],
  [new THREE.Vector3(59, 4, 1), new THREE.Vector3(46, 8, 24)],
  [new THREE.Vector3(29, 7, 35), new THREE.Vector3(8, 4, 44)],
];

const smoother = (value: number) => value * value * value * (value * (value * 6 - 15) + 10);

function locateSegment(progress: number) {
  for (let index = 0; index < chapters.length - 1; index += 1) {
    const start = chapters[index].anchor;
    const end = chapters[index + 1].anchor;
    if (progress <= end || index === chapters.length - 2) {
      return { index, local: smoother(THREE.MathUtils.clamp((progress - start) / (end - start), 0, 1)) };
    }
  }
  return { index: chapters.length - 2, local: 1 };
}

function CameraRig({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera, size } = useThree();
  const position = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const curve = useMemo(() => new THREE.CubicBezierCurve3(), []);
  const targetCurve = useMemo(() => new THREE.CubicBezierCurve3(), []);

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = size.width < 700 ? 52 : 42;
      camera.near = 0.08;
      camera.far = 160;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width]);

  useFrame(() => {
    const { index, local } = locateSegment(progress.current);
    curve.v0.copy(cameraHolds[index]);
    curve.v1.copy(cameraControls[index][0]);
    curve.v2.copy(cameraControls[index][1]);
    curve.v3.copy(cameraHolds[index + 1]);
    curve.getPoint(local, position);

    targetCurve.v0.copy(cameraTargets[index]);
    targetCurve.v1.copy(targetControls[index][0]);
    targetCurve.v2.copy(targetControls[index][1]);
    targetCurve.v3.copy(cameraTargets[index + 1]);
    targetCurve.getPoint(local, target);

    camera.position.copy(position);
    camera.up.set(0, 1, 0);
    camera.lookAt(target);
  });

  return null;
}

function BoxBeam({
  position,
  scale,
  color = "#171a1f",
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color?: string;
}) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry />
      <meshStandardMaterial color={color} metalness={0.72} roughness={0.34} />
    </mesh>
  );
}

function CalibrationChamber() {
  const baffles = useMemo(() => Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * Math.PI * 2;
    return {
      position: [Math.cos(angle) * 10, 0.2, Math.sin(angle) * 10] as [number, number, number],
      rotation: [0, -angle, 0] as [number, number, number],
    };
  }), []);
  const trace = useMemo(() => Array.from({ length: 72 }, (_, index) => {
    const x = -1.6 + (index / 71) * 3.2;
    const envelope = Math.sin((index / 71) * Math.PI);
    const y = Math.sin(index * 0.56) * 0.35 * envelope;
    return new THREE.Vector3(x, y + 0.45, 0);
  }), []);

  return (
    <group>
      <mesh position={[0, -3.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[10.2, 96]} />
        <meshStandardMaterial color="#07090e" roughness={0.62} metalness={0.34} />
      </mesh>
      {baffles.map((baffle, index) => (
        <mesh key={index} position={baffle.position} rotation={baffle.rotation} scale={[0.45, 5.8, 2.2]}>
          <boxGeometry />
          <meshStandardMaterial color="#0d1016" metalness={0.64} roughness={0.52} />
        </mesh>
      ))}
      <group position={[3.4, 0, 0]}>
        <Line points={trace} color="#e5b86b" lineWidth={1.65} transparent opacity={0.95} />
        <mesh position={[1.65, 0.45, 0]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshBasicMaterial color="#f2cf8d" />
        </mesh>
      </group>
      <mesh position={[0, -3.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.6, 3.64, 96]} />
        <meshBasicMaterial color="#e5b86b" transparent opacity={0.35} />
      </mesh>
      <pointLight position={[0, 3, 5]} color="#f0ede6" intensity={18} distance={23} />
      <pointLight position={[0, 0, -2]} color="#e5b86b" intensity={9} distance={14} />
    </group>
  );
}

function SignalVault() {
  return (
    <group position={[-30, 0, -24]}>
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[11, 24]} />
        <meshStandardMaterial color="#080a10" roughness={0.74} />
      </mesh>
      {[-3.6, 0, 3.6].map((x) => <BoxBeam key={x} position={[x, 4.8, 0]} scale={[0.18, 0.18, 20]} color="#20232b" />)}
      {Array.from({ length: 11 }, (_, index) => -10 + index * 2).map((z, index) => (
        <group key={z} position={[0, 0, z]}>
          <mesh position={[-4.9, 0.7, 0]} rotation={[0, index % 2 ? 0.12 : -0.12, 0]} scale={[0.7, 6.8, 0.24]}>
            <boxGeometry />
            <meshStandardMaterial color="#12141b" roughness={0.88} />
          </mesh>
          <mesh position={[4.9, 0.7, 0]} rotation={[0, index % 2 ? -0.12 : 0.12, 0]} scale={[0.7, 6.8, 0.24]}>
            <boxGeometry />
            <meshStandardMaterial color="#12141b" roughness={0.88} />
          </mesh>
        </group>
      ))}
      <Line points={[[-4, 0.1, 8], [-2, 0.5, 4], [1, -0.1, 0], [3, 0.7, -4], [0, 0.2, -9]]} color="#8176e9" lineWidth={1.4} />
      <pointLight position={[0, 5, 0]} color="#8176e9" intensity={30} distance={20} />
    </group>
  );
}

function CaptureField() {
  const curves = useMemo(() => Array.from({ length: 38 }, (_, row) => {
    const points: THREE.Vector3[] = [];
    for (let column = 0; column < 52; column += 1) {
      const angle = -1.1 + (column / 51) * 2.2;
      const radius = 6.3 + row * 0.045;
      const signal = Math.sin(column * 0.42 + row * 0.83) * 0.18 + Math.sin(column * 0.11) * 0.12;
      points.push(new THREE.Vector3(Math.sin(angle) * radius, -1.5 + row * 0.09 + signal, Math.cos(angle) * radius));
    }
    return points;
  }), []);

  return (
    <group position={[-14, 1.2, -58]} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, -4.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[8.5, 96, 0, Math.PI]} />
        <meshStandardMaterial color="#090a10" metalness={0.38} roughness={0.68} />
      </mesh>
      {curves.map((points, index) => (
        <Line key={index} points={points} color={index % 6 === 0 ? "#e5b86b" : "#8176e9"} lineWidth={index % 6 === 0 ? 1.2 : 0.52} transparent opacity={index % 6 === 0 ? 0.85 : 0.28} />
      ))}
      <mesh position={[0, -3.98, 1.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 1.38, 64]} />
        <meshBasicMaterial color="#8176e9" transparent opacity={0.42} />
      </mesh>
      <Line points={[[-3.4, -3.96, 1.1], [3.4, -3.96, 1.1]]} color="#8176e9" lineWidth={0.7} transparent opacity={0.32} />
      <Line points={[[0, -3.96, -2.3], [0, -3.96, 4.5]]} color="#8176e9" lineWidth={0.7} transparent opacity={0.32} />
      <pointLight position={[0, 2, 2]} color="#8176e9" intensity={24} distance={18} />
      <pointLight position={[-5, 1, 4]} color="#f0ede6" intensity={10} distance={16} />
    </group>
  );
}

function BearingIris() {
  return (
    <group position={[18, 0.2, -72]}>
      <mesh position={[0, 0, -0.55]}>
        <torusGeometry args={[3.4, 0.55, 24, 96]} />
        <meshStandardMaterial color="#3a3e44" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh>
        <torusGeometry args={[2.55, 0.18, 18, 96]} />
        <meshStandardMaterial color="#c8774d" emissive="#5c2112" emissiveIntensity={0.32} metalness={0.82} roughness={0.24} />
      </mesh>
      {Array.from({ length: 18 }, (_, index) => {
        const angle = (index / 18) * Math.PI * 2;
        return (
          <mesh key={index} position={[Math.cos(angle) * 3.4, Math.sin(angle) * 3.4, 0.18]} rotation={[0, 0, angle]} scale={[0.13, 0.45, 0.22]}>
            <boxGeometry />
            <meshStandardMaterial color="#8b7868" metalness={0.76} roughness={0.31} />
          </mesh>
        );
      })}
      <pointLight position={[0, 0, 3]} color="#c8774d" intensity={32} distance={14} />
    </group>
  );
}

function PreparedModel({
  url,
  position,
  rotation,
  scale,
  material,
}: {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  material: { color: string; metalness: number; roughness: number; emissive?: string; emissiveIntensity?: number };
}) {
  const gltf = useGLTF(url);
  const clone = useMemo(() => {
    const next = gltf.scene.clone(true);
    next.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      object.material = new THREE.MeshStandardMaterial({
        color: material.color,
        metalness: material.metalness,
        roughness: material.roughness,
        emissive: material.emissive ?? "#000000",
        emissiveIntensity: material.emissiveIntensity ?? 0,
      });
    });
    return next;
  }, [gltf.scene, material.color, material.emissive, material.emissiveIntensity, material.metalness, material.roughness]);

  return <primitive object={clone} position={position} rotation={rotation} scale={scale} />;
}

function SectioningHall({ showModel }: { showModel: boolean }) {
  return (
    <group>
      <mesh position={[48, -3.15, -46]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 18]} />
        <meshStandardMaterial color="#090a0c" metalness={0.34} roughness={0.62} />
      </mesh>
      <BoxBeam position={[37, 2, -52]} scale={[0.35, 10, 0.35]} />
      <BoxBeam position={[59, 2, -52]} scale={[0.35, 10, 0.35]} />
      <BoxBeam position={[48, 7, -52]} scale={[22, 0.35, 0.35]} />
      <mesh position={[48, -2.55, -46]} scale={[7.4, 0.62, 7.4]} receiveShadow>
        <cylinderGeometry args={[1, 1.04, 1, 64]} />
        <meshStandardMaterial color="#17191d" metalness={0.78} roughness={0.28} />
      </mesh>
      <mesh position={[48, -1.9, -46]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.46, 96]} />
        <meshBasicMaterial color="#c8774d" transparent opacity={0.72} />
      </mesh>
      {showModel && (
        <Suspense fallback={null}>
          <PreparedModel
            url="/portfolio/models/vulcan/vulcan-showcase.glb"
            position={[47.2, -1.85, -46]}
            rotation={[Math.PI / 2, 0.68, 0]}
            scale={0.0057}
            material={{ color: "#d7dee8", metalness: 0.56, roughness: 0.34, emissive: "#5a2413", emissiveIntensity: 0.16 }}
          />
        </Suspense>
      )}
      <spotLight position={[51, 11, -36]} target-position={[48, 0, -46]} color="#f0e8dd" intensity={520} angle={0.52} penumbra={0.78} distance={36} />
      <pointLight position={[42, 3, -51]} color="#c8774d" intensity={86} distance={22} />
    </group>
  );
}

function FabricationBay({ showModel }: { showModel: boolean }) {
  return (
    <group>
      <mesh position={[62, -3.05, -10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 20]} />
        <meshStandardMaterial color="#11100e" roughness={0.68} metalness={0.18} />
      </mesh>
      <mesh position={[62, -2.97, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#8e775b" roughness={0.82} metalness={0.05} />
      </mesh>
      {[[-7, -7], [7, -7], [-7, 7], [7, 7]].map(([x, z], index) => (
        <BoxBeam key={index} position={[62 + x, 1, -10 + z]} scale={[0.35, 8, 0.35]} color="#15171a" />
      ))}
      {showModel && (
        <Suspense fallback={null}>
          <PreparedModel
            url="/portfolio/models/ender3-2/ender-showcase.glb"
            position={[62, -2.95, -10]}
            rotation={[Math.PI / 2, -0.55, 0]}
            scale={0.73}
            material={{ color: "#4a5058", metalness: 0.56, roughness: 0.42, emissive: "#2a180b", emissiveIntensity: 0.08 }}
          />
        </Suspense>
      )}
      <mesh position={[62, -1.65, -10]}>
        <boxGeometry args={[6.6, 2.6, 8.8]} />
        <meshBasicMaterial color="#e5b86b" wireframe transparent opacity={0.045} />
      </mesh>
      <pointLight position={[56, 8, -2]} color="#f2eee7" intensity={120} distance={28} />
      <pointLight position={[68, 5, -16]} color="#c8774d" intensity={72} distance={22} />
    </group>
  );
}

function CompetitionGantry({ showMedia }: { showMedia: boolean }) {
  return (
    <group>
      <mesh position={[36, 3, 27.7]} scale={[15, 10, 0.45]}>
        <boxGeometry />
        <meshStandardMaterial color="#0a0b10" metalness={0.48} roughness={0.56} />
      </mesh>
      {[-7.5, 7.5].map((x) => <BoxBeam key={x} position={[36 + x, 3, 29]} scale={[0.35, 12, 0.35]} color="#666971" />)}
      <BoxBeam position={[36, 9, 29]} scale={[15.5, 0.35, 0.35]} color="#666971" />
      {showMedia && (
        <Suspense fallback={null}>
          <ThreeImage url="/portfolio/media/team3598.webp" position={[36, 3.2, 29.25]} scale={[13.4, 4.73]} toneMapped={false} />
          <ThreeImage url="/portfolio/media/team3598/competition-crowd.webp" position={[28.4, 4.4, 34]} rotation={[0, 0.7, 0]} scale={[5.2, 4]} toneMapped={false} />
          <ThreeImage url="/portfolio/media/team3598/outreach-reach.webp" position={[43.6, 4.2, 34]} rotation={[0, -0.7, 0]} scale={[4.8, 4.18]} toneMapped={false} />
        </Suspense>
      )}
      <pointLight position={[36, 8, 35]} color="#f0ede6" intensity={42} distance={25} />
      <pointLight position={[36, 3, 31]} color="#b95c6b" intensity={24} distance={18} />
    </group>
  );
}

function SignalTerminus() {
  const w = [[-2.7, 2.1, 42], [-2.1, 0, 42], [-1.25, 1.2, 42], [-0.45, 0, 42], [0.05, 2.1, 42]] as [number, number, number][];
  const n = [[0.65, 0, 42], [0.65, 2.1, 42], [3.1, 0, 42], [3.1, 2.1, 42]] as [number, number, number][];
  return (
    <group>
      <mesh position={[0, -3, 42]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 96]} />
        <meshStandardMaterial color="#07090d" roughness={0.7} />
      </mesh>
      <Line points={w} color="#e5b86b" lineWidth={2.2} />
      <Line points={n} color="#e5b86b" lineWidth={2.2} />
      <pointLight position={[0, 2, 49]} color="#e5b86b" intensity={28} distance={18} />
    </group>
  );
}

function FoundryWorld({ progress, activeIndex, settled }: { progress: React.MutableRefObject<number>; activeIndex: number; settled: boolean }) {
  return (
    <>
      <color attach="background" args={["#03050a"]} />
      <fog attach="fog" args={["#03050a", 12, 48]} />
      <ambientLight intensity={1.05} color="#929baa" />
      {activeIndex <= 1 && <CalibrationChamber />}
      {activeIndex <= 2 && <SignalVault />}
      {activeIndex >= 1 && activeIndex <= 3 && <CaptureField />}
      {activeIndex >= 2 && activeIndex <= 4 && <BearingIris />}
      {activeIndex >= 3 && activeIndex <= 5 && !(settled && activeIndex === 4) && <SectioningHall showModel />}
      {activeIndex >= 4 && activeIndex <= 6 && !(settled && activeIndex === 5) && <FabricationBay showModel />}
      {activeIndex >= 5 && activeIndex <= 6 && !(settled && activeIndex === 6) && <CompetitionGantry showMedia={activeIndex === 6} />}
      {activeIndex >= 6 && <SignalTerminus />}
      <CameraRig progress={progress} />
    </>
  );
}

const homepageEvidence = {
  4: {
    src: "/portfolio/media/vulcan-hero.webp",
    alt: "Sectioned CAD render of the complete Vulcan V1 six-axis robot arm",
    caption: "V1 ASSEMBLY OVERVIEW · SECTIONED CAD RENDER",
    layout: "wide",
  },
  5: {
    src: "/portfolio/media/ender3-2/full-build.webp",
    alt: "Front view of the completed Ender3-2 frame and enlarged build surface",
    secondarySrc: "/portfolio/media/ender3-2/machine-in-operation.webp",
    secondaryAlt: "The completed Ender3-2 operating on its enlarged build surface",
    caption: "FULL MACHINE + PRINTING DEMONSTRATION · ORIGINAL BUILD PHOTOGRAPHS",
    layout: "diptych",
  },
  6: {
    src: "/portfolio/media/team3598.webp",
    alt: "William Nzive with the full Team 3598 student group",
    caption: "TEAM 3598 · FULL TEAM",
    layout: "panorama",
  },
} as const;

function HomeEvidence({ index, visible }: { index: number; visible: boolean }) {
  const evidence = homepageEvidence[index as keyof typeof homepageEvidence];
  if (!evidence) return null;
  const secondary = "secondarySrc" in evidence ? evidence.secondarySrc : undefined;
  const secondaryAlt = "secondaryAlt" in evidence ? evidence.secondaryAlt : undefined;
  return (
    <figure className={`home-evidence home-evidence-${evidence.layout} ${visible ? "is-visible" : ""}`}>
      <div className="home-evidence-frame">
        <div className="home-evidence-image"><img src={evidence.src} alt={evidence.alt} /></div>
        {secondary && <div className="home-evidence-image"><img src={secondary} alt={secondaryAlt} /></div>}
      </div>
      <figcaption><span>{evidence.caption}</span><span>ORIGINAL PROJECT MEDIA</span></figcaption>
    </figure>
  );
}

function CsiEvidenceCard({ visible }: { visible: boolean }) {
  return (
    <aside className={`csi-evidence-card ${visible ? "is-visible" : ""}`} aria-label="Verified CSI project evidence">
      <div className="csi-evidence-heading"><span>VERIFIED TRANSPORT TEST</span><span>60 SECOND SOAK</span></div>
      <h2>650,386 raw records captured without a recorded transport error.</h2>
      <dl className="csi-metrics">
        <div><dt>Throughput</dt><dd>10,839 <small>records/s</small></dd></div>
        <div><dt>Data rate</dt><dd>9.019 <small>Mb/s</small></dd></div>
        <div><dt>CRC errors</dt><dd>0</dd></div>
        <div><dt>Sequence gaps</dt><dd>0</dd></div>
      </dl>
      <div className="csi-boundary">
        <p><span>Demonstrated</span> Audio-activity detection · speaker identification</p>
        <p><span>Ongoing</span> General audio reconstruction</p>
        <p><span>Evidence still needed</span> Rig photograph · labeled classification result</p>
      </div>
    </aside>
  );
}

function playChapterCue(context: AudioContext, index: number) {
  const frequencies = [82, 320, 520, 92, 58, 110, 147, 164];
  const durations = [0.6, 0.26, 0.38, 0.52, 0.7, 0.42, 0.65, 1.05];
  const base = frequencies[index] ?? 110;
  const duration = durations[index] ?? 0.4;
  const now = context.currentTime;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.065, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  gain.connect(context.destination);
  [1, index === 7 ? 1.5 : 2].forEach((ratio, voice) => {
    const oscillator = context.createOscillator();
    oscillator.type = voice ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(base * ratio, now);
    oscillator.frequency.exponentialRampToValueAtTime(base * ratio * (index === 3 ? 0.78 : 1.04), now + duration);
    oscillator.connect(gain);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  });
}

function ChapterCaption({
  index,
  settled,
  onAdvance,
}: {
  index: number;
  settled: boolean;
  onAdvance: () => void;
}) {
  const chapter = chapters[index];
  return (
    <section className={`chapter-caption ${settled ? "is-settled" : "is-travelling"}`} aria-live="polite">
      <div className="chapter-kicker">
        <span>{chapter.number}</span>
        <span>{chapter.domain}</span>
      </div>
      {chapter.status && <p className="chapter-status" style={{ color: chapter.accent }}>{chapter.status}</p>}
      <h1>{chapter.title}</h1>
      <p className="chapter-body">{chapter.body}</p>
      <div className="chapter-actions">
        {chapter.route ? (
          <Link className="action-primary" href={chapter.route}>Open project journey <span aria-hidden="true">↗</span></Link>
        ) : index === chapters.length - 1 ? (
          <>
            <a className="action-primary" href={`mailto:${contact.email}`}>{contact.email} <span aria-hidden="true">↗</span></a>
            <a href={contact.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </>
        ) : (
          <button className="action-primary" type="button" onClick={onAdvance}>{index === 0 ? "Enter selected work" : "Continue"} <span aria-hidden="true">→</span></button>
        )}
        {chapter.repo && <a href={chapter.repo} target="_blank" rel="noreferrer">Repository <span aria-hidden="true">↗</span></a>}
      </div>
    </section>
  );
}

function IndexDialog({
  open,
  activeIndex,
  onChoose,
  onClose,
}: {
  open: boolean;
  activeIndex: number;
  onChoose: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} className="project-index" onClose={onClose} onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <div className="index-heading">
        <div>
          <span>SELECT A DESTINATION</span>
          <h2>The Signal Foundry</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="Close project index">Close</button>
      </div>
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <button type="button" className={activeIndex === index ? "is-active" : ""} onClick={() => onChoose(index)}>
              <span>{chapter.number}</span>
              <strong>{chapter.id === "computer-science" ? "Computer science" : chapter.id === "mechanical-systems" ? "Mechanical systems" : chapter.id.replace("-", " ")}</strong>
              <small>{chapter.domain}</small>
            </button>
          </li>
        ))}
      </ol>
    </dialog>
  );
}

export function SignalFoundry() {
  const router = useRouter();
  const anchors = useMemo(() => chapters.map((chapter) => chapter.anchor), []);
  const { activeIndex, settled, positionRef, goToIndex, setProgress } = useKineticJourney(anchors);
  const [indexOpen, setIndexOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const directionRef = useRef(0);

  const choose = useCallback((index: number) => {
    setIndexOpen(false);
    goToIndex(index);
  }, [goToIndex]);

  const toggleSound = useCallback(async () => {
    if (!audioRef.current) audioRef.current = new AudioContext();
    if (audioRef.current.state === "suspended") await audioRef.current.resume();
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playChapterCue(audioRef.current, activeIndex);
  }, [activeIndex, soundEnabled]);

  useEffect(() => {
    const chapter = chapters[activeIndex];
    window.history.replaceState(null, "", `#${chapter.id}`);
    if (soundEnabled && audioRef.current && directionRef.current !== activeIndex) {
      playChapterCue(audioRef.current, activeIndex);
    }
    directionRef.current = activeIndex;
  }, [activeIndex, soundEnabled]);

  useEffect(() => {
    const onOpenActive = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || (event.target as HTMLElement | null)?.closest("a, button, dialog")) return;
      const route = chapters[activeIndex].route;
      if (route) router.push(route);
    };
    window.addEventListener("keydown", onOpenActive);
    return () => window.removeEventListener("keydown", onOpenActive);
  }, [activeIndex, router]);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("shot") ?? window.location.hash.slice(1);
    const index = chapters.findIndex((chapter) => chapter.id === requested);
    if (index >= 0) goToIndex(index, true);
  }, [goToIndex]);

  useEffect(() => {
    const testApi = {
      ready: Promise.resolve(),
      setProgress: (value: number) => setProgress(value, true),
      setChapter: (id: string) => {
        const index = chapters.findIndex((chapter) => chapter.id === id);
        if (index >= 0) goToIndex(index, true);
      },
      freezeTime: () => undefined,
      settle: () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
      getSnapshotState: () => ({
        chapter: document.querySelector("main")?.getAttribute("data-chapter") ?? chapters[0].id,
        progress: positionRef.current,
        settled: document.querySelector(".chapter-caption")?.classList.contains("is-settled") ?? false,
      }),
    };
    const host = window as Window & { __PORTFOLIO_TEST__?: typeof testApi };
    host.__PORTFOLIO_TEST__ = testApi;
    return () => {
      if (host.__PORTFOLIO_TEST__ === testApi) delete host.__PORTFOLIO_TEST__;
    };
  }, [goToIndex, positionRef, setProgress]);

  return (
    <main className="foundry-shell" data-chapter={chapters[activeIndex].id} data-ready="true">
      <div className="foundry-canvas" aria-hidden="true">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          camera={{ fov: 42, near: 0.08, far: 160, position: cameraHolds[0].toArray() }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.22;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <FoundryWorld progress={positionRef} activeIndex={activeIndex} settled={settled} />
        </Canvas>
      </div>

      <header className="site-header">
        <button className="identity" type="button" onClick={() => goToIndex(0)} aria-label="Return to introduction">
          <span className="identity-mark">WN</span>
          <span>WILLIAM NZIVE</span>
        </button>
        <div className="chapter-location"><span>{chapters[activeIndex].number}</span> / {chapters[activeIndex].id.replaceAll("-", " ")}</div>
        <nav aria-label="Experience controls">
          <button type="button" onClick={toggleSound}>Sound {soundEnabled ? "on" : "off"}</button>
          <button type="button" onClick={() => setIndexOpen(true)}>Index</button>
        </nav>
      </header>

      <ChapterCaption index={activeIndex} settled={settled} onAdvance={() => goToIndex(activeIndex + 1)} />
      <CsiEvidenceCard visible={activeIndex === 2 && settled} />
      <HomeEvidence index={activeIndex} visible={settled} />

      <div className="journey-controls" aria-label="Journey navigation">
        <button type="button" onClick={() => goToIndex(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous chapter">←</button>
        <span><b>{String(activeIndex + 1).padStart(2, "0")}</b> / {String(chapters.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => goToIndex(activeIndex + 1)} disabled={activeIndex === chapters.length - 1} aria-label="Next chapter">→</button>
      </div>
      <p className="journey-hint">Wheel · drag · arrows</p>

      <IndexDialog open={indexOpen} activeIndex={activeIndex} onChoose={choose} onClose={() => setIndexOpen(false)} />
    </main>
  );
}
