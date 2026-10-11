import { defineProject } from "../define.ts";

export default defineProject({
  slug: "printed-robotic-joints",
  name: "Low-Cost 3D-Printed Integrated Robotic Joints",
  tier: "standard",
  status: "active",
  start: 2026,
  end: "present",
  categories: ["robotics","fabrication"],
  skills: [
    "CAD (SolidWorks / Onshape)",
    "FDM 3D Printing",
    "Bearing Interfaces",
    "Actuator Packaging",
    "Mechanism Prototyping",
  ],
  role: "Mechanical designer",
  domain: "Actuator packaging / mechanical design",
  summary: "Developed low-cost integrated robotic joints built around 3D-printed components, iterating the joint, transmission, bearings, actuator packaging, and…",
  deck: "Developed low-cost integrated robotic joints built around 3D-printed components, iterating the joint, transmission, bearings, actuator packaging, and mechanical interfaces.",
  proof: "Designed and iterated joint transmissions, bearings, and motor packaging to maximize torque capacity within accessible 3D-printing constraints.",
  dossier: {
    architecture: "Integrated robotic joint design incorporating mechanical transmissions, bearing assemblies, motor packaging, and structural interfaces optimized for 3D-printed fabrication.",
    decisions: [
      "Iterated bearing placement and transmission geometry to handle mechanical loads within 3D-printed structural limits.",
      "Integrated actuator packaging and wire routing directly into the joint housing.",
      "Optimized print orientation and interface tolerances to ensure repeatable fit without secondary machining.",
    ],
    tools: [
      "CAD (SolidWorks / Onshape)",
      "FDM 3D Printing",
      "Bearing Interfaces",
      "Actuator Packaging",
      "Mechanism Prototyping",
    ],
  },
});
