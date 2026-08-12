"use client";

/* eslint-disable react/no-unknown-property, @next/next/no-img-element, react-hooks/immutability */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, useGLTF } from "@react-three/drei";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { ProjectKey, projects } from "../data/portfolio";
import { useKineticJourney } from "../lib/useKineticJourney";

const projectAnchors = [0, 0.24, 0.49, 0.74, 1];

const rigs: Record<ProjectKey, Array<[number, number, number]>> = {
  csi: [[0, 2.5, 12], [-8, 4.2, 8], [8, 6.2, 7], [3, 1.4, 9], [-10, 5.2, 8]],
  vulcan: [[10, 4.4, 13], [15, 3.8, 11], [3, 7.2, 12], [-8, 3.6, 9], [1, 4.8, 15]],
  "ender3-2": [[10, 6, 13], [-9, 6.8, 10], [1, 11, 10], [13, 3.8, 5], [0, 6, 16]],
  "team-3598": [[0, 3, 13], [-8, 5, 8], [7, 7, 5], [10, 3, -1], [0, 5, 12]],
};

const targets: Record<ProjectKey, Array<[number, number, number]>> = {
  csi: [[1.8, 0.4, 0], [0, 0.4, 0], [-1, 1.6, 0], [1.5, 0, 0], [0, 0.7, 0]],
  vulcan: [[3.8, -0.65, 0], [3.8, -0.8, 0], [3.6, -0.35, 0], [3.8, -0.7, 0], [3.8, -0.45, 0]],
  "ender3-2": [[2.5, -0.9, 0], [2.5, -0.7, 0], [2.2, -0.2, 0], [2.8, -0.9, 0], [2.5, -0.5, 0]],
  "team-3598": [[0, 1.8, 0], [0, 2, -1], [0, 1.8, -2], [0, 1.2, -4], [0, 1.8, 0]],
};

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

function ProjectCamera({ progress, kind }: { progress: React.MutableRefObject<number>; kind: ProjectKey }) {
  const { camera, size } = useThree();
  const position = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const p0 = useMemo(() => new THREE.Vector3(), []);
  const p1 = useMemo(() => new THREE.Vector3(), []);
  const p2 = useMemo(() => new THREE.Vector3(), []);
  const p3 = useMemo(() => new THREE.Vector3(), []);
  const delta = useMemo(() => new THREE.Vector3(), []);
  const lateral = useMemo(() => new THREE.Vector3(), []);
  const nextTarget = useMemo(() => new THREE.Vector3(), []);
  const viewOffset = useMemo(() => new THREE.Vector3(), []);
  const curve = useMemo(() => new THREE.CubicBezierCurve3(), []);

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    camera.fov = size.width < 700 ? 52 : 40;
    camera.near = 0.06;
    camera.far = 90;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  useFrame(() => {
    let segment = 0;
    while (segment < projectAnchors.length - 2 && progress.current > projectAnchors[segment + 1]) segment += 1;
    const start = projectAnchors[segment];
    const end = projectAnchors[segment + 1];
    const local = smoothstep((progress.current - start) / (end - start));
    p0.fromArray(rigs[kind][segment]);
    p3.fromArray(rigs[kind][segment + 1]);
    delta.copy(p3).sub(p0);
    lateral.set(-delta.z, Math.sin((segment + 1) * 1.7) * 3.2, delta.x).normalize().multiplyScalar(Math.min(4.5, delta.length() * 0.2));
    p1.copy(p0).addScaledVector(delta, 0.3).add(lateral);
    p2.copy(p0).addScaledVector(delta, 0.7).add(lateral);
    curve.v0.copy(p0);
    curve.v1.copy(p1);
    curve.v2.copy(p2);
    curve.v3.copy(p3);
    curve.getPoint(local, position);
    nextTarget.fromArray(targets[kind][segment + 1]);
    target.fromArray(targets[kind][segment]).lerp(nextTarget, local);
    if (size.width < 700) {
      target.y += 3.35;
      target.x += 1.25;
      viewOffset.copy(position).sub(target).multiplyScalar(1.27);
      position.copy(target).add(viewOffset);
    }
    camera.position.copy(position);
    camera.up.set(0, 1, 0);
    camera.lookAt(target);
  });

  return null;
}

function AutoModel({ kind }: { kind: "vulcan" | "ender3-2" }) {
  const project = projects[kind];
  const gltf = useGLTF(project.model!);
  const prepared = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      if (kind === "ender3-2") {
        object.material = new THREE.MeshStandardMaterial({
          color: "#69727c",
          metalness: 0.28,
          roughness: 0.52,
          emissive: "#11151a",
          emissiveIntensity: 0.16,
        });
        return;
      }
      const source = Array.isArray(object.material) ? object.material[0] : object.material;
      const next = source?.clone() ?? new THREE.MeshStandardMaterial();
      if ("metalness" in next) next.metalness = 0.5;
      if ("roughness" in next) next.roughness = 0.38;
      if ("color" in next && next.color instanceof THREE.Color) {
        next.color.lerp(new THREE.Color("#eef2f7"), 0.62);
      }
      if ("emissive" in next && next.emissive instanceof THREE.Color) {
        next.emissive.set("#261109");
        next.emissiveIntensity = 0.1;
      }
      object.material = next;
    });

    const root = new THREE.Group();
    root.add(clone);
    // The source GLBs are Z-up and were previously converted with the
    // opposite sign, leaving both assemblies upside down in the scene.
    root.rotation.x = Math.PI / 2;
    root.updateMatrixWorld(true);
    let bounds = new THREE.Box3().setFromObject(root);
    const size = bounds.getSize(new THREE.Vector3());
    const scale = (kind === "vulcan" ? 7.5 : 8.8) / Math.max(size.x, size.y, size.z);
    root.scale.setScalar(scale);
    root.updateMatrixWorld(true);
    bounds = new THREE.Box3().setFromObject(root);
    const center = bounds.getCenter(new THREE.Vector3());
    root.position.set(-center.x, -bounds.min.y, -center.z);
    return root;
  }, [gltf.scene, kind]);

  return (
    <group position={kind === "vulcan" ? [6.1, -2.9, 0] : [5.15, -2.9, 0]} rotation={[0, kind === "ender3-2" ? 0.58 : Math.PI + 0.55, 0]}>
      <primitive object={prepared} />
    </group>
  );
}

function CsiInstrument() {
  const traces = useMemo(() => Array.from({ length: 32 }, (_, row) => Array.from({ length: 80 }, (_, column) => {
    const x = -5 + (column / 79) * 10;
    const z = -2.5 + row * 0.16;
    const y = Math.sin(column * 0.33 + row * 0.77) * 0.17 + Math.sin(column * 0.08) * 0.12;
    return new THREE.Vector3(x, y + 0.4, z);
  })), []);
  return (
    <group>
      {traces.map((points, index) => <Line key={index} points={points} color={index % 8 === 0 ? "#e5b86b" : "#8176e9"} lineWidth={index % 8 === 0 ? 1.2 : 0.55} transparent opacity={index % 8 === 0 ? 0.85 : 0.34} />)}
      <mesh position={[0, -2.92, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.1, 2.14, 72]} />
        <meshBasicMaterial color="#8176e9" transparent opacity={0.42} />
      </mesh>
      <Line points={[[-5.4, -2.9, 0], [5.4, -2.9, 0]]} color="#8176e9" lineWidth={0.75} transparent opacity={0.32} />
      <Line points={[[0, -2.9, -3.5], [0, -2.9, 3.5]]} color="#8176e9" lineWidth={0.75} transparent opacity={0.32} />
      <pointLight position={[-4, 4, 5]} color="#8176e9" intensity={38} distance={18} />
    </group>
  );
}

function TeamArchive() {
  return (
    <group>
      {[-7.1, 7.1].map((x) => (
        <mesh key={x} position={[x, 2.1, -1]} scale={[0.22, 10, 0.22]}>
          <boxGeometry />
          <meshStandardMaterial color="#757983" metalness={0.82} roughness={0.27} />
        </mesh>
      ))}
      <pointLight position={[0, 6, 6]} color="#f0ede6" intensity={38} distance={22} />
      <pointLight position={[0, 2, 1]} color="#b95c6b" intensity={25} distance={18} />
    </group>
  );
}

function ProjectWorld({ kind, progress, activeIndex }: { kind: ProjectKey; progress: React.MutableRefObject<number>; activeIndex: number }) {
  return (
    <>
      <color attach="background" args={["#03050a"]} />
      <fog attach="fog" args={["#03050a", 18, 52]} />
      <ambientLight intensity={1.16} color="#9aa3b1" />
      <hemisphereLight args={["#dce5f2", "#20130d", 1.25]} />
      <directionalLight position={[6, 10, 8]} color="#f0ede6" intensity={1.65} />
      <mesh position={[0, -3.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[13.5, 96]} />
        <meshStandardMaterial color="#090b10" roughness={0.68} metalness={0.28} />
      </mesh>
      {kind === "csi" && <CsiInstrument />}
      {(kind === "vulcan" || kind === "ender3-2") && activeIndex > 0 && activeIndex < 3 && (
        <Suspense fallback={null}>
          <AutoModel kind={kind} />
        </Suspense>
      )}
      {kind === "team-3598" && <TeamArchive />}
      {kind === "vulcan" && <pointLight position={[-5, 6, 7]} color="#f0e6dc" intensity={150} distance={28} />}
      {kind === "vulcan" && <pointLight position={[7, 1, -4]} color="#c8774d" intensity={110} distance={25} />}
      {kind === "ender3-2" && <pointLight position={[5, 9, 7]} color="#f0ede6" intensity={170} distance={30} />}
      {kind === "ender3-2" && <pointLight position={[-7, 4, -3]} color="#c8774d" intensity={75} distance={24} />}
      <ProjectCamera progress={progress} kind={kind} />
    </>
  );
}

function FutureShotSlate({ kind, shotIndex }: { kind: ProjectKey; shotIndex: number }) {
  const project = projects[kind];
  const shot = project.futureShots[shotIndex % Math.max(project.futureShots.length, 1)];
  if (!shot) return null;
  return (
    <div className="future-shot" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="future-shot-topline"><span>{shot.id}</span><span>EVIDENCE NOT YET CAPTURED</span></div>
      <div className="future-shot-reticle" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="future-shot-copy">
        <span>REQUIRED EVIDENCE</span>
        <h3>{shot.title}</h3>
        <p>{shot.brief}</p>
        <dl>
          <div><dt>Frame</dt><dd>{shot.ratio}</dd></div>
          <div><dt>Minimum</dt><dd>{shot.minimum}</dd></div>
          <div><dt>Angle</dt><dd>{shot.angle}</dd></div>
          <div className="future-shot-purpose"><dt>Purpose</dt><dd>{shot.purpose}</dd></div>
        </dl>
      </div>
    </div>
  );
}

function CsiBeatEvidence({ activeIndex }: { activeIndex: number }) {
  if (activeIndex < 1 || activeIndex > 3) return null;

  if (activeIndex === 1) {
    return (
      <aside className="csi-project-evidence csi-project-transport" aria-label="CSI transport validation evidence">
        <header><span>TRANSPORT VALIDATION</span><span>NATIVE USB · 60 SECOND RECORDED RUN</span></header>
        <div className="csi-project-total"><strong>650,386</strong><span>raw records captured</span></div>
        <dl className="csi-project-metrics">
          <div><dt>Throughput</dt><dd>10,839 <small>records/s</small></dd></div>
          <div><dt>Data rate</dt><dd>9.019 <small>Mb/s</small></dd></div>
          <div><dt>CRC errors</dt><dd>0</dd></div>
          <div><dt>Sequence gaps</dt><dd>0</dd></div>
        </dl>
        <p className="csi-project-note">No corruption or device drops were recorded during the soak.</p>
      </aside>
    );
  }

  if (activeIndex === 2) {
    return (
      <aside className="csi-project-evidence csi-project-pipeline" aria-label="CSI capture stack architecture">
        <header><span>CAPTURE ARCHITECTURE</span><span>REPEATABLE EXPERIMENT PATH</span></header>
        <h2>From radio measurement to labeled experiment.</h2>
        <ol>
          <li><span>01</span><strong>ESP32 firmware</strong><small>CSI acquisition</small></li>
          <li><span>02</span><strong>Native USB</strong><small>Framed transport</small></li>
          <li><span>03</span><strong>Host validator</strong><small>CRC + sequence checks</small></li>
          <li><span>04</span><strong>Sync capture</strong><small>CSI + reference audio</small></li>
          <li><span>05</span><strong>Chunked storage</strong><small>Crash-resilient records</small></li>
        </ol>
      </aside>
    );
  }

  return (
    <aside className="csi-project-evidence csi-project-boundary" aria-label="CSI demonstrated result and research boundary">
      <header><span>EVIDENCE BOUNDARY</span><span>CLAIMS KEPT NARROW</span></header>
      <div className="csi-boundary-columns">
        <section>
          <span>DEMONSTRATED</span>
          <h2>Detection + identification</h2>
          <ul><li>Audio-activity detection</li><li>Speaker identification</li></ul>
        </section>
        <section>
          <span>NOT YET CLAIMED</span>
          <h2>General reconstruction</h2>
          <p>Recovering the underlying audio remains an open research question.</p>
        </section>
      </div>
      <p className="csi-project-note"><span>NEXT REQUIRED EVIDENCE</span> Labeled evaluation export with test setup and result context.</p>
    </aside>
  );
}

function MediaEvidence({ kind, activeIndex }: { kind: ProjectKey; activeIndex: number }) {
  const project = projects[kind];
  const shouldShow = kind === "team-3598" || ((kind === "vulcan" || kind === "ender3-2") && (activeIndex === 0 || activeIndex >= 3));
  const finalBeatUsesShotBrief = activeIndex === project.beats.length - 1 && project.futureShots.length > 0;
  if (!shouldShow || finalBeatUsesShotBrief || project.media.length === 0) return null;
  const mediaIndex = kind === "team-3598"
    ? [0, 1, 1, 2, 3][activeIndex] ?? 0
    : kind === "ender3-2"
      ? activeIndex === 0 ? 2 : 0
      : activeIndex === 0 ? 0 : 1;
  const media = project.media[mediaIndex];
  return (
    <figure className={`project-media project-media-${media.ratio} project-media-${kind} project-media-source-${mediaIndex}`}>
      <div className="media-frame">
        {media.kind === "video" ? (
          <video src={media.src} autoPlay loop muted playsInline aria-label={media.alt} />
        ) : (
          <img src={media.src} alt={media.alt} />
        )}
      </div>
      <figcaption><span>{media.caption}</span><span>ORIGINAL PROJECT MEDIA</span></figcaption>
    </figure>
  );
}

export function ProjectJourney({ projectKey }: { projectKey: ProjectKey }) {
  const project = projects[projectKey];
  const { activeIndex, settled, positionRef, goToIndex, setProgress } = useKineticJourney(projectAnchors);
  const [shotIndex, setShotIndex] = useState(0);

  useEffect(() => {
    const requestedBeat = Number(new URLSearchParams(window.location.search).get("beat"));
    if (Number.isInteger(requestedBeat) && requestedBeat >= 1 && requestedBeat <= project.beats.length) {
      goToIndex(requestedBeat - 1, true);
    }
  }, [goToIndex, project.beats.length]);

  useEffect(() => {
    const testApi = {
      ready: Promise.resolve(),
      setProgress: (value: number) => setProgress(value, true),
      setChapter: (id: string) => {
        const index = Number(id.replace(/\D/g, ""));
        if (Number.isFinite(index)) goToIndex(Math.max(0, index - 1), true);
      },
      settle: () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
      getSnapshotState: () => ({
        project: projectKey,
        beat: Number(document.querySelector("main")?.getAttribute("data-beat") ?? 1),
        progress: positionRef.current,
      }),
    };
    const host = window as Window & { __PORTFOLIO_TEST__?: typeof testApi };
    host.__PORTFOLIO_TEST__ = testApi;
    return () => {
      if (host.__PORTFOLIO_TEST__ === testApi) delete host.__PORTFOLIO_TEST__;
    };
  }, [goToIndex, positionRef, projectKey, setProgress]);

  const beat = project.beats[activeIndex];
  const showFutureShot = project.futureShots.length > 0 && activeIndex === project.beats.length - 1;
  const showProjectMedia = !showFutureShot && project.media.length > 0 && (
    projectKey === "team-3598" || ((projectKey === "vulcan" || projectKey === "ender3-2") && (activeIndex === 0 || activeIndex >= 3))
  );
  const showCsiEvidence = projectKey === "csi" && activeIndex > 0 && activeIndex < 4;
  const showLiveModel = (projectKey === "vulcan" || projectKey === "ender3-2") && activeIndex > 0 && activeIndex < 3;

  return (
    <main className={`project-shell ${showFutureShot ? "has-future-shot" : ""} ${showProjectMedia ? "has-project-media" : ""} ${showCsiEvidence ? "has-csi-evidence" : ""} ${showLiveModel ? "has-live-model" : ""}`} data-project={projectKey} data-beat={activeIndex + 1} style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="project-canvas" aria-hidden="true">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          camera={{ fov: 40, near: 0.06, far: 90, position: rigs[projectKey][0] }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <ProjectWorld kind={projectKey} progress={positionRef} activeIndex={activeIndex} />
        </Canvas>
      </div>

      <header className="project-header">
        <Link href="/" className="back-link">← Selected work</Link>
        <div className="project-identity"><span>{project.number}</span><strong>{project.name}</strong><small>{project.domain}</small></div>
        <a href={project.repo ?? "/"} target={project.repo ? "_blank" : undefined} rel={project.repo ? "noreferrer" : undefined}>{project.repo ? "Repository ↗" : "William Nzive"}</a>
      </header>

      <section className={`project-caption ${settled ? "is-settled" : "is-travelling"}`} aria-live="polite">
        <div className="project-beat-label"><span>{String(activeIndex + 1).padStart(2, "0")}</span><span>{beat.label}</span></div>
        {activeIndex === 0 && <p className="project-persistent-status">{project.status}</p>}
        <h1>{beat.title}</h1>
        <p className="project-beat-body">{beat.body}</p>
        {beat.facts && <ul className="project-facts">{beat.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}
        {activeIndex === project.beats.length - 1 && (
          <div className="project-end-actions">
            {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Inspect repository ↗</a>}
            <Link href="/">Return to selected work →</Link>
          </div>
        )}
      </section>

      <MediaEvidence kind={projectKey} activeIndex={activeIndex} />
      {showCsiEvidence && <CsiBeatEvidence key={activeIndex} activeIndex={activeIndex} />}
      {showFutureShot && <FutureShotSlate kind={projectKey} shotIndex={shotIndex} />}
      {showFutureShot && project.futureShots.length > 1 && (
        <div className="future-shot-controls">
          <button type="button" aria-label="Previous future media brief" onClick={() => setShotIndex((value) => (value - 1 + project.futureShots.length) % project.futureShots.length)}>←</button>
          <span>{shotIndex + 1} / {project.futureShots.length}</span>
          <button type="button" aria-label="Next future media brief" onClick={() => setShotIndex((value) => (value + 1) % project.futureShots.length)}>→</button>
        </div>
      )}

      <nav className="project-stepper" aria-label="Project journey navigation">
        <button type="button" onClick={() => goToIndex(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous project beat">←</button>
        <span className="project-step-count"><b>{String(activeIndex + 1).padStart(2, "0")}</b> / {String(project.beats.length).padStart(2, "0")}</span>
        <ol>
          {project.beats.map((item, index) => (
            <li key={item.label}><button type="button" className={index === activeIndex ? "is-active" : ""} onClick={() => goToIndex(index)} aria-label={`Go to ${item.label}`}><span>{String(index + 1).padStart(2, "0")}</span></button></li>
          ))}
        </ol>
        <button type="button" onClick={() => goToIndex(activeIndex + 1)} disabled={activeIndex === project.beats.length - 1} aria-label="Next project beat">→</button>
      </nav>
    </main>
  );
}
