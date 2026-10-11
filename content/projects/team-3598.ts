import { defineProject } from "../define.ts";

export default defineProject({
  slug: "team-3598",
  name: "Team 3598",
  tier: "flagship",
  status: "complete",
  statusNote: "Former Captain (Season Complete)",
  start: 2025,
  end: 2026,
  featured: 4,
  categories: ["leadership","robotics"],
  skills: ["Java","Git","Onshape","Machining","Team leadership","STEM outreach"],
  role: "Team captain",
  domain: "Leadership & Competitive Robotics",
  summary: "Captain of a 40+ student FRC team. The team earned the FIRST Impact Award and qualified for the World Championship; its outreach record totals 4,452 students.",
  headline: "Captain, FRC Team 3598",
  kicker: "Leadership · competitive robotics",
  deck: "Captain of FRC Team 3598, SEStematic Eliminators, a school robotics team in Sacramento with more than 40 members. Led design, fabrication, programming, electrical integration, competition preparation, and outreach.",
  stats: [
    {
      to: 40,
      suffix: "+",
      label: "students led as captain",
    },
    {
      to: 4452,
      label: "students reached through outreach",
    },
    {
      to: 0,
      text: "Impact",
      label: "FIRST Impact Award and World Championship qualification",
    },
  ],
  specimen: "particles",
  media: [
    {
      file: "team-group-photo.webp",
      alt: "Full Team 3598 group",
      caption: "Team 3598 students",
      ratio: "wide",
    },
    {
      file: "competition-crowd.webp",
      alt: "Team 3598 students at competition",
      caption: "Team 3598 at a competition",
      ratio: "wide",
    },
    {
      file: "outreach-reach.webp",
      alt: "Team 3598 outreach record",
      caption: "Outreach record: students reached, by program (total 4,452)",
      ratio: "wide",
    },
    {
      file: "team-identity.webp",
      alt: "Team 3598 identity and location record",
      caption: "Team 3598, SEStematic Eliminators, School of Engineering and Sciences, Sacramento, est. 2011",
      ratio: "portrait",
    },
  ],
  notes: [
    {
      label: "Role",
      title: "Captain of a team of more than 40.",
      body: "As captain of FRC Team 3598 (SEStematic Eliminators) in 2025–2026 I led a team of more than 40 members through design, fabrication, programming, electrical integration, competition preparation, and outreach.",
      facts: ["40+ members", "Team captain", "2025–2026", "Sacramento, CA"],
    },
    {
      label: "Mentoring",
      title: "Teaching Java, Git, CAD, machining, and 3D printing.",
      body: "I mentored students in Java, Git, CAD, machining, and 3D printing.",
      facts: ["Java", "Git", "CAD", "Machining", "3D printing"],
    },
    {
      label: "Outcomes",
      title: "FIRST Impact Award and a World Championship berth.",
      body: "During my captaincy the team earned the FIRST Impact Award and qualified for the FIRST World Championship.",
      facts: ["FIRST Impact Award", "World Championship qualification"],
    },
    {
      label: "Outreach",
      title: "The outreach record totals 4,452 students.",
      body: "The team's outreach record, shown above, lists students reached by program: Saturday workshops (101), the Thursday Series (360), MOSAC (30), Sacramento Library (179), Girl Scouts and the Sacramento Zoo (61), 21 Reasons (21), Sisters of Nia (120), the Kappa Solar Car Race (110), school tours (301), and mentor presentations (3,169), for a total of 4,452.",
      facts: ["4,452 students in total", "Mentor presentations: 3,169", "School tours: 301", "Thursday Series: 360"],
    },
  ],
  seo: {
    title: "FRC Team 3598 captain · William Nzive",
    description: "Captain of FRC Team 3598 (SEStematic Eliminators): FIRST Impact Award, World Championship qualification, and an outreach record of 4,452 students.",
    ogTitle: "FRC Team 3598 captain · William Nzive",
    ogDescription: "Captain of a 40+ member FRC team that won the FIRST Impact Award and qualified for the World Championship.",
  },
});
