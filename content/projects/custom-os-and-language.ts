import { defineProject } from "../define.ts";

export default defineProject({
  slug: "custom-os-and-language",
  name: "Custom Operating System & Programming Language",
  tier: "standard",
  status: "complete",
  start: 2024,
  categories: ["systems"],
  skills: ["Assembly","C","Bootloaders","Computer architecture","Language design"],
  role: "Independent systems builder",
  domain: "Bootloader / OS prototype / systems",
  summary: "A bootloader, an operating-system prototype, and a custom programming language, built while teaching myself lower-level computer architecture.",
  proof: "Wrote a simple Snake game inside that OS in Assembly, and used what I learned later in firmware optimization.",
  dossier: {
    architecture: "A bootloader, an operating-system prototype, and a custom programming language.",
    decisions: [
      "Taught myself lower-level computer architecture while building it.",
      "Implemented a simple Snake game within the OS in Assembly.",
      "Used the low-level lessons later in firmware optimization.",
    ],
    tools: ["Assembly", "C"],
  },
});
