import { defineProject } from "../define.ts";

export default defineProject({
  slug: "parkinsons-datscan",
  name: "Parkinson's DaTscan Classification",
  tier: "standard",
  status: "active",
  start: 2026,
  end: "present",
  categories: ["ml","research"],
  skills: ["Python","CUDA","Model ensembles","Fold-based validation"],
  role: "Machine learning challenge competitor",
  domain: "3D medical imaging / ML challenge",
  summary: "Machine-learning pipelines for classifying 3D DaTscan volumes in a competition. Currently 23rd of 864 registered competitors.",
  proof: "Current standing: 23rd of 864 registered competitors (top 2.7%).",
  dossier: {
    architecture: "Pipelines for 3D DaTscan classification, testing preprocessing, augmentation, learned image representations, routing, and model ensembles.",
    decisions: [
      "Used fold-based validation and held-out testing to catch overfitting and to compare each change before carrying it forward.",
      "Tested preprocessing, augmentation, learned representations, routing, and ensembles as separate changes.",
    ],
    tools: ["Python", "CUDA"],
  },
  cover: "registration.webp",
  media: [
    { file: "registration.webp", alt: "Raw DaTscan volume slices next to the registered template", caption: "Raw DaTscan volumes (axial, coronal, sagittal) beside the template they are registered to. Public NTUA Parkinson dataset.", ratio: "wide", figure: true },
  ],
});
