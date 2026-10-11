import type { ReactNode } from "react";
import type { Project, SpecimenId } from "../../content";
import { ModelViewer } from "./ModelViewer";
import { BedMesh } from "./motion/BedMesh";
import { OutreachParticles } from "./motion/OutreachParticles";
import { Spectrogram } from "./motion/Spectrogram";

/* eslint-disable @next/next/no-img-element */

/**
 * Specimen registry: maps a project's `specimen` id to the interactive graphic
 * shown at the top of its page. To add a graphic: build the component in
 * ./motion, add its id to SpecimenId (content/types.ts), and add one line here.
 */
const SPECIMENS: Record<SpecimenId, (p: Project) => ReactNode> = {
  spectrogram: () => (
    <>
      <Spectrogram />
      <p className="specimen-cap">Illustrative simulation of speech energy across subcarriers — not recorded data.</p>
    </>
  ),
  bedmesh: () => (
    <>
      <BedMesh />
      <p className="specimen-cap">The 12 × 18 probe grid at the real bed proportions; height profile illustrative, Z exaggerated.</p>
    </>
  ),
  particles: () => <OutreachParticles />,
  model: (p) =>
    p.model ? <ModelViewer url={p.model} still={p.still} rotation={p.modelRotation} label={`${p.name} · CAD export`} /> : null,
};

/** Graphic for a project; falls back to its lead image, or nothing. */
export function Specimen({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const cls = `specimen specimen-${size}`;
  if (project.specimen) return <div className={cls}>{SPECIMENS[project.specimen](project)}</div>;
  const img = project.thumb;
  if (!img) return null;
  return (
    <div className={cls}>
      <img className="specimen-img" src={img} alt={project.media[0]?.alt ?? project.name} decoding="async" />
    </div>
  );
}
