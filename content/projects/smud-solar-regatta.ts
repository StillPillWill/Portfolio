import { defineProject } from "../define.ts";

export default defineProject({
  slug: "smud-solar-regatta",
  name: "SMUD Solar Regatta",
  tier: "standard",
  status: "complete",
  start: 2025,
  categories: ["systems","leadership"],
  skills: ["C#","Embedded control","Debugging","Documentation"],
  role: "Programming captain",
  domain: "Embedded control / competition boat",
  summary: "Programming captain of a solar-powered competition boat: reverse-engineered poorly documented controller libraries; wrote custom steering and throttle in C#.",
  proof: "Traced a sensor-interface failure across the programming and electrical systems and used it to improve cross-team documentation.",
  dossier: {
    architecture: "Software for a solar-powered competition boat, written in C#.",
    decisions: [
      "Reverse-engineered poorly documented controller libraries in C#.",
      "Wrote custom steering and throttle logic.",
      "Traced a sensor-interface failure across programming and electrical systems, and used it to improve cross-team documentation.",
    ],
    tools: ["C#"],
  },
});
