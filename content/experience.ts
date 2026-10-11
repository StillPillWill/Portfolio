import type { ExperienceItem } from "./types.ts";

/** Roles and positions, newest first. `project` links an entry to a page in content/projects/. */
export const experience: ExperienceItem[] = [
  {
    title: "UCSC Science Internship Program",
    role: "Research intern",
    when: "summer 2025",
    summary: "Nine-week research internship with graduate researchers focused on Wi-Fi channel-state information (CSI), sensing, and machine learning. Proposed an original direction using Wi-Fi signals for audio sensing.",
    proof: "Built deep-learning pipelines, configured experiments, collected data, and evaluated classification performance; identified packet sampling as the primary experimental bottleneck, creating the roadmap for independent continuation.",
    project: "csi",
  },
  {
    title: "Wi-Fi CSI Audio Sensing",
    role: "Independent researcher / embedded systems builder",
    when: "2025–present",
    summary: "Continued the SIP project independently, developing a low-cost ESP32-based system for extracting audio information from RF channel-state measurements.",
    proof: "4.6 billion packets captured, 98 hours of audio, 400 hours of training across 122 training runs, achieving 90% speaker recognition on $40 of hardware (validated at 10,839 records/s with 0 drops).",
    project: "csi",
  },
  {
    title: "Vulcan",
    role: "Mechanical designer",
    when: "2025–2026",
    summary: "Developed a low-cost, open-source large robotic arm, including CAD, component selection, bill of materials, and build documentation.",
    proof: "Completed full CAD assembly, joint calculations (31–32 N·m J1–J3, 10.28 N·m J4, 7.2 N·m wrist), and published technical zine. V1 CAD study complete; V2 in progress targeting ~1/3 of V1 cost.",
    project: "vulcan",
  },
  {
    title: "Ender3-2",
    role: "Builder / firmware author",
    when: "2026",
    summary: "Salvaged usable mechanical and electrical parts from two scrapped Ender 3s, restructuring them into a working Cartesian printer with an expanded 585 × 775 × 230 mm build volume.",
    proof: "Physically built and demonstrated live at Open Sauce; logged ~64 hours build time on a ~$16 new material budget.",
    project: "ender3-2",
  },
  {
    title: "FRC Team 3598: SEStematic Eliminators",
    role: "Team captain",
    when: "2025–2026",
    summary: "Led a 40+ member robotics team through design, fabrication, programming, electrical integration, competition preparation, and outreach across 5 working groups.",
    proof: "Earned FIRST Impact Award and qualified for FIRST World Championship; mentored students in Java, Git, CAD, machining, and 3D printing; documented outreach reached 4,452 students.",
    project: "team-3598",
  },
];
