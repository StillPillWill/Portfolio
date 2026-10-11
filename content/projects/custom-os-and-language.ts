import { defineProject } from "../define.ts";

export default defineProject({
  slug: "custom-os-and-language",
  name: "Custom Operating System & Programming Language",
  tier: "standard",
  status: "complete",
  start: 2024,
  categories: ["systems"],
  skills: ["Assembly","C","Bootloaders","Computer Architecture","Language Design"],
  role: "Independent systems builder",
  domain: "Bootloader / OS prototype / systems",
  summary: "Built a bootloader, operating-system prototype, and custom programming language while teaching myself lower-level computer architecture.",
  proof: "Implemented a simple Snake game within that OS in Assembly; used insights later in firmware optimization.",
  dossier: {
    architecture: "Bare-metal bootloader, minimal operating-system kernel prototype, and custom programming language interpreter/compiler, complete with an Assembly game demo.",
    decisions: [
      "Implemented the bootloader and kernel prototype from scratch to learn memory layout and hardware control without OS abstractions.",
      "Wrote a Snake game in Assembly to validate interrupt handling, input scanning, and display rendering.",
      "Directly transferred low-level register and memory lessons to high-throughput ESP32 USB firmware optimization.",
    ],
    tools: ["Assembly","C","Bootloaders","Computer Architecture","Language Design"],
  },
});
