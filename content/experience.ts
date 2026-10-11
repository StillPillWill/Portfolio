import type { ExperienceItem } from "./types.ts";

/** Roles and positions, newest first. `project` links an entry to a page in content/projects/. */
export const experience: ExperienceItem[] = [
  {
    title: "UCSC Science Internship Program",
    role: "Research intern",
    when: "2025",
    summary: "Nine-week research internship with graduate researchers focused on Wi-Fi channel-state information (CSI), sensing, and machine learning. Proposed an original direction using Wi-Fi signals for audio sensing.",
    proof: "Built deep-learning pipelines, configured experiments, collected data, and evaluated classification performance; identified packet sampling as the primary experimental bottleneck, creating the roadmap for independent continuation.",
    project: "csi",
  },
  {
    title: "Wi-Fi CSI Audio Sensing",
    role: "Independent researcher / embedded systems builder",
    when: "2025–present",
    summary: "Continued the SIP project independently, developing a low-cost ESP32-based system for extracting audio information from RF channel-state measurements.",
    proof: "Raised capture from about 300 to 7,000 packets/s; a native USB path moved 10,839 records/s for 60 s with zero CRC errors or sequence gaps.",
    project: "csi",
  },
  {
    title: "Vulcan",
    role: "Mechanical designer",
    when: "2025–2026",
    summary: "Developed a low-cost, open-source large robotic arm, including CAD, component selection, bill of materials, and build documentation.",
    proof: "Complete CAD assembly, bill of materials, build documentation, and a technical zine. V1 is a design study; V2 is aiming at roughly one-third of V1's projected cost.",
    project: "vulcan",
  },
  {
    title: "Ender3-2",
    role: "Builder / firmware author",
    when: "2026",
    summary: "Rebuilt two broken Ender 3 printers into one large Cartesian printer with a 585 × 775 × 230 mm build volume and custom firmware.",
    proof: "Built and printing; about 64 hours of logged build time and about $16 of new material.",
    project: "ender3-2",
  },
  {
    title: "FRC Team 3598: SEStematic Eliminators",
    role: "Team captain",
    when: "2025–2026",
    summary: "Led a 40+ member robotics team through design, fabrication, programming, electrical integration, competition preparation, and outreach.",
    proof: "The team earned the FIRST Impact Award and qualified for the FIRST World Championship; its outreach record totals 4,452 students.",
    project: "team-3598",
  },
];
