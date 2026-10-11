import { defineProject } from "../define.ts";

export default defineProject({
  slug: "smud-solar-regatta",
  name: "SMUD Solar Regatta",
  tier: "standard",
  status: "complete",
  start: 2025,
  categories: ["systems","leadership"],
  skills: ["C#","Embedded Systems","Sensor Interfaces","Diagnostic Tools","Cross-team Schematics"],
  role: "Programming captain",
  domain: "Embedded control / competition boat",
  summary: "Reverse-engineered poorly documented controller libraries in C# and wrote custom steering and throttle logic for a solar-powered competition boat.",
  proof: "Traced a sensor-interface failure across programming and electrical systems and used it to improve cross-team documentation.",
  dossier: {
    architecture: "Embedded control software and telemetry integration for a solar-powered competition boat, interfacing custom C# steering and throttle control logic with onboard motor controllers and sensors.",
    decisions: [
      "Reverse-engineered poorly documented C# libraries to gain direct control over boat steering and throttle dynamics.",
      "Traced sensor-interface failure across programming and electrical boundaries, identifying root causes in the physical interface.",
      "Authored comprehensive interface documentation to prevent cross-disciplinary integration issues during competition.",
    ],
    tools: ["C#","Embedded Systems","Sensor Interfaces","Diagnostic Tools","Cross-team Schematics"],
  },
});
