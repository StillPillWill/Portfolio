import { defineProject } from "../define.ts";

export default defineProject({
  slug: "hybrid-language-models",
  name: "Hybrid Language Model Research",
  tier: "standard",
  status: "active",
  start: 2026,
  end: "present",
  categories: ["ml","research"],
  skills: ["Python","PyTorch","Transformers","CUDA","Representation Analysis Tools"],
  role: "Independent researcher",
  domain: "Cross-architecture representation diffusion",
  summary: "Experimentation with efficient diffusion between language models of different architectures and sizes, repurposing techniques including JEPA and DINO to aid…",
  deck: "Experimentation with efficient diffusion between language models of different architectures and sizes, repurposing techniques including JEPA and DINO to aid the diffusion process.",
  proof: "Compared language-model loss, KL divergence, intermediate representations, and model behavior across experiments.",
  dossier: {
    architecture: "Experimental framework for studying latent diffusion and representation alignment between language models of varying architectures and sizes, incorporating principles from Joint-Embedding Predictive Architecture (JEPA) and DINO.",
    decisions: [
      "Repurposed JEPA and DINO self-supervised techniques to guide and stabilize the cross-architecture diffusion process.",
      "Monitored intermediate representations and KL divergence alongside task loss to understand feature transfer dynamics.",
      "Compared model behavior across architecture boundaries to identify representation bottlenecks.",
    ],
    tools: ["Python","PyTorch","Transformers","CUDA","Representation Analysis Tools"],
  },
});
