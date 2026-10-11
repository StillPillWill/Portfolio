import { defineProject } from "../define.ts";

export default defineProject({
  slug: "printed-robotic-joints",
  name: "Low-Cost 3D-Printed Integrated Robotic Joints",
  tier: "standard",
  status: "active",
  start: 2026,
  end: "present",
  categories: ["robotics","fabrication"],
  skills: ["CAD","3D printing","Bearings","Actuator packaging"],
  role: "Mechanical designer",
  domain: "Actuator packaging / mechanical design",
  summary: "Low-cost integrated robotic joints built around 3D-printed parts, designed to raise torque capacity while staying cheap to make.",
  deck: "Low-cost integrated robotic joints built around 3D-printed components. I designed and iterated the joint, transmission, bearings, actuator packaging, and mechanical interfaces to increase torque capacity while keeping the design inexpensive to manufacture.",
  proof: "Ongoing since 2026.",
  dossier: {
    architecture: "Integrated robotic joints built around 3D-printed components.",
    decisions: [
      "Designed and iterated the joint, transmission, bearings, actuator packaging, and mechanical interfaces.",
      "Aimed to increase torque capacity while keeping the design inexpensive to manufacture.",
    ],
    tools: ["CAD", "3D printing"],
  },
});
