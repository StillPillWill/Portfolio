import { defineProject } from "../define.ts";

export default defineProject({
  slug: "parkinsons-datscan",
  name: "Parkinson's DaTscan Classification",
  tier: "standard",
  status: "active",
  start: 2026,
  end: "present",
  categories: ["ml","research"],
  skills: ["Python","PyTorch","Scikit-Learn","CUDA","NumPy / Pandas","Medical Image Processing"],
  role: "Machine learning challenge competitor",
  domain: "3D medical imaging / ML pipeline",
  summary: "Built ML pipelines for 3D DaTscan classification, testing preprocessing, augmentation, learned image representations, routing, and model ensembles.",
  proof: "Ranked 23rd of 864 registered competitors (Top 2.7%) using fold-based validation and held-out testing.",
  dossier: {
    architecture: "Machine learning pipeline for 3D DaTscan classification testing preprocessing, data augmentation, learned representations, model routing, and ensemble methods.",
    decisions: [
      "Used fold-based validation and held-out testing to catch overfitting before carrying model changes forward.",
      "Systematically evaluated preprocessing and augmentation pipelines to improve generalization on 3D volumetric data.",
      "Tested model ensembling and representation routing to combine complementary predictive features.",
    ],
    tools: ["Python","PyTorch","Scikit-Learn","CUDA","NumPy / Pandas","Medical Image Processing"],
  },
  cover: "registration.webp",
  media: [
    { file: "registration.webp", alt: "Raw DaTscan volume slices next to the registered template", caption: "Raw DaTscan volumes (axial, coronal, sagittal) beside the template they are registered to. Public NTUA Parkinson dataset.", ratio: "wide", figure: true },
  ],
});
