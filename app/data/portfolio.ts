export type ChapterId =
  | "intro"
  | "education-skills"
  | "csi"
  | "software-ml"
  | "vulcan"
  | "fabrication"
  | "team-3598"
  | "contact";

export type ChapterRecord = {
  label: string;
  value: string;
};

export type ProjectKey = "csi" | "vulcan" | "ender3-2" | "team-3598";

export type Chapter = {
  id: ChapterId;
  anchor: number;
  number: string;
  domain: string;
  status?: string;
  title: string;
  body: string;
  accent: string;
  records?: ChapterRecord[];
  route?: `/projects/${ProjectKey}`;
  repo?: string;
};

export type ProjectBeat = {
  label: string;
  title: string;
  body: string;
  facts?: string[];
  visual: "instrument" | "model" | "media" | "ledger";
};

export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
  ratio: "wide" | "portrait" | "square";
  fit?: "contain" | "cover";
  kind?: "image" | "video";
};

export type Project = {
  key: ProjectKey;
  number: string;
  name: string;
  domain: string;
  status: string;
  deck: string;
  accent: string;
  repo?: string;
  model?: string;
  beats: ProjectBeat[];
  media: ProjectMedia[];
};

export const chapters: Chapter[] = [
  {
    id: "intro",
    anchor: 0,
    number: "01",
    domain: "PROFILE · WILLIAM NZIVE",
    title: "Computer Science & Engineering at UC Davis.",
    body: "I am a Computer Science and Engineering student at UC Davis working across embedded systems, machine learning, mechanical design, and fabrication.",
    records: [
      { label: "Focus", value: "Software · sensing · robotics · fabrication" },
      { label: "Interests", value: "Embedded firmware, robotics kinematics, and sensor systems" },
      { label: "Location", value: "University of California, Davis" },
    ],
    accent: "#e5b86b",
  },
  {
    id: "education-skills",
    anchor: 0.12,
    number: "02",
    domain: "EDUCATION · TECHNICAL TOOLKIT",
    title: "Languages, tools, and platforms.",
    body: "My work spans low-level firmware, data pipelines, machine learning, CAD, electronics, and physical fabrication.",
    records: [
      { label: "Education", value: "UC Davis · Computer Science and Engineering" },
      { label: "Languages", value: "Python · C / C++ · Rust · TypeScript / JavaScript · HTML / CSS" },
      { label: "Systems", value: "Embedded firmware · native USB · Linux · capture pipelines" },
      { label: "Build", value: "CAD · mechanisms · 3D printing · technical documentation" },
    ],
    accent: "#8176e9",
  },
  {
    id: "csi",
    anchor: 0.28,
    number: "03",
    domain: "EXPERIENCE · RESEARCH + EMBEDDED SENSING",
    status: "ACTIVE RESEARCH · DETECTION + SPEAKER ID DEMONSTRATED",
    title: "Researching audio sensing through Wi‑Fi CSI.",
    body: "As researcher and embedded-systems builder, I created the firmware, native USB transport, synchronized collection, storage, decoding, and host orchestration behind the experiments.",
    records: [
      { label: "Stack", value: "ESP32-S3 / C6 · C / C++ · Python · native USB" },
      { label: "Corpus", value: "4.6B packets · 98 hrs audio · $40 hardware" },
      { label: "Outcome", value: "90% speaker recognition over 122 runs (400 hrs training)" },
    ],
    accent: "#8176e9",
    route: "/projects/csi",
    repo: "https://github.com/StillPillWill/Research",
  },
  {
    id: "software-ml",
    anchor: 0.42,
    number: "04",
    domain: "EXPERIENCE · SOFTWARE SYSTEMS + MACHINE LEARNING",
    title: "Systems software, machine learning, and rapid prototypes.",
    body: "Independent work spanning low-level systems, custom programming languages, deep-learning models, classification pipelines, and physical computing.",
    records: [
      { label: "Systems", value: "Built a minimal operating system and a programming language" },
      { label: "ML", value: "Fine-tuned language and image-diffusion models; trained classifiers" },
      { label: "Tooling", value: "Built extensive ComfyUI workflows for image-generation systems" },
      { label: "Rapid build", value: "Completed a game jam under a fixed creative deadline" },
    ],
    accent: "#c8774d",
  },
  {
    id: "vulcan",
    anchor: 0.57,
    number: "05",
    domain: "EXPERIENCE · MECHANICAL DESIGN",
    status: "DESIGN STUDY · V1 DOCUMENTED IN CAD · NOT PHYSICALLY BUILT · V2 IN PROGRESS",
    title: "Vulcan: six-axis robot architecture in CAD.",
    body: "As mechanical designer, I resolved the assembly, belt-reduction transmissions, component selection, printable parts, and technical record for an open-source six-axis arm.",
    records: [
      { label: "Scope", value: "Six axes · belt reduction · differential wrist · open CAD" },
      { label: "Evidence", value: "Complete V1 design record and technical zine" },
      { label: "Boundary", value: "V1 was not physically built; V2 cost reduction is in progress" },
    ],
    accent: "#c8774d",
    route: "/projects/vulcan",
    repo: "https://github.com/StillPillWill/Vulcan",
  },
  {
    id: "fabrication",
    anchor: 0.71,
    number: "06",
    domain: "EXPERIENCE · FABRICATION + RAPID PROTOTYPING",
    status: "PHYSICAL BUILDS · HACKATHON HARDWARE · CUSTOM FIRMWARE",
    title: "Physical builds and rapid prototyping.",
    body: "My fabrication work includes a large-format printer rebuilt from two failed Ender 3s and a five-axis gesture-controlled arm completed during a hardware hackathon.",
    records: [
      { label: "Ender3-2", value: "585 × 775 × 230 mm machine · live-editable firmware · Open Sauce plotter" },
      { label: "Hackathon", value: "Five-axis gesture-controlled robotic arm" },
      { label: "Methods", value: "Salvage · CAD · electronics · firmware · 3D printing · iteration" },
    ],
    accent: "#e5b86b",
    route: "/projects/ender3-2",
    repo: "https://github.com/StillPillWill/Ender3-2",
  },
  {
    id: "team-3598",
    anchor: 0.86,
    number: "07",
    domain: "EXPERIENCE · LEADERSHIP + COMMUNITY",
    status: "PAST LEADERSHIP ROLE · SEASON COMPLETE",
    title: "Robotics team captaincy & outreach.",
    body: "As former captain of Team 3598, I coordinated more than 50 students across mechanical, electrical, software, operations, competition preparation, and outreach.",
    records: [
      { label: "Team", value: "40+ students across five working groups" },
      { label: "Competition", value: "District qualification · FIRST Impact Award · World Championship berth" },
      { label: "Community", value: "Documented outreach reaching 4,452 students" },
    ],
    accent: "#b95c6b",
    route: "/projects/team-3598",
  },
  {
    id: "contact",
    anchor: 1,
    number: "08",
    domain: "CONTACT",
    title: "Open to research, robotics, and engineering roles.",
    body: "I am interested in internships and technical opportunities involving embedded firmware, robotics, and sensing systems.",
    records: [
      { label: "Email", value: "williamnzive2007@gmail.com" },
      { label: "Profiles", value: "GitHub · LinkedIn" },
      { label: "Interests", value: "Software systems · embedded research · ML · robotics · fabrication" },
    ],
    accent: "#e5b86b",
  },
];

export const projects: Record<ProjectKey, Project> = {
  csi: {
    key: "csi",
    number: "01",
    name: "CSI Research",
    domain: "COMPUTER SCIENCE · EMBEDDED SENSING",
    status: "ONGOING RESEARCH",
    deck: "An ESP32 firmware, transport, and deep-learning pipeline built to investigate audio sensing through Wi-Fi channel-state information—achieving 90% speaker recognition across 4.6B packets and 400 hours of training on $40 of hardware.",
    accent: "#8176e9",
    repo: "https://github.com/StillPillWill/Research",
    beats: [
      {
        label: "RESEARCH QUESTION",
        title: "Can a low-cost Wi‑Fi sensor reveal sound activity?",
        body: "I am investigating whether channel-state information from low-cost ESP32 hardware contains enough structure to detect audio activity, identify a speaker, and eventually recover more of the underlying signal.",
        facts: ["Wi-Fi CSI", "ESP32-S3 / C6", "Origin: UCSC SIP 2025", "Active research"],
        visual: "instrument",
      },
      {
        label: "TRANSPORT PIPELINE",
        title: "Native USB moved 10,839 records per second without packet drops.",
        body: "I built a native USB capture path with CRC and sequence validation. A 60-second soak sustained 10,839 raw records per second at 9.019 Mb/s with zero CRC errors, sequence gaps, corruption, or device drops.",
        facts: ["10,839 records/s", "60-second soak", "0 gaps or CRC errors"],
        visual: "instrument",
      },
      {
        label: "DATA PIPELINE",
        title: "Synchronized collection made the experiments repeatable.",
        body: "The system combines embedded firmware with synchronized CSI and audio collection, crash-resilient chunked storage, decoding, and host-side orchestration. That pipeline has produced a 4.6-billion-packet corpus with 98 hours of synchronized audio, on roughly $40 of hardware.",
        facts: ["4.6B packets", "98 hours of audio", "~$40 hardware"],
        visual: "instrument",
      },
      {
        label: "RESULTS",
        title: "Achieved 90% speaker identification and verified event detection.",
        body: "The prototype demonstrated reliable audio-event detection and 90% speaker identification from captured CSI across 122 training runs and 400 hours of compute, confirming the acoustic sensing signal on consumer microcontrollers.",
        facts: ["90% speaker ID", "122 training runs", "400 hours training"],
        visual: "ledger",
      },
      {
        label: "CURRENT STATUS",
        title: "General audio reconstruction is still an open question.",
        body: "I am continuing to test how much of the underlying audio can be recovered. New results will be documented as experiments are completed and validated.",
        facts: ["Ongoing", "No reconstruction claim"],
        visual: "ledger",
      },
    ],
    media: [],
  },
  vulcan: {
    key: "vulcan",
    number: "02",
    name: "Vulcan",
    domain: "MECHANICAL SYSTEMS · ROBOT ARCHITECTURE",
    status: "DESIGN STUDY · V1 DOCUMENTED IN CAD · NOT PHYSICALLY BUILT · V2 IN PROGRESS",
    deck: "A complete open-source six-axis robot arm design study, detailing kinematics, belt reductions, and printable structural parts in CAD.",
    accent: "#c8774d",
    repo: "https://github.com/StillPillWill/Vulcan",
    model: "/portfolio/models/vulcan/vulcan-showcase.glb",
    beats: [
      {
        label: "OVERVIEW",
        title: "V1 resolved the six-axis architecture in CAD.",
        body: "I completed V1 as an open-source six-axis arm design: the CAD assembly, joint transmissions, selected components, and technical documentation. V1 was not physically built.",
        facts: ["6 axes", "Complete V1 CAD", "Not physically built"],
        visual: "model",
      },
      {
        label: "BELT TRANSMISSION",
        title: "Belt reduction replaced precision gearboxes.",
        body: "The first four axes use reduced NEMA 23 motors; the wrist uses two NEMA 17 motors in a belted differential. Reprinting pulleys changes the speed–torque tradeoff without replacing an entire gearbox.",
        facts: ["Belt-driven", "1:16 main reduction", "Differential wrist"],
        visual: "model",
      },
      {
        label: "TORQUE SPECS",
        title: "Joint targets followed the loads.",
        body: "The documented V1 design targeted approximately 31–32 N·m on joints 1–3, 10.28 N·m on joint 4, and 7.2 N·m on wrist joints 5 and 6.",
        facts: ["31–32 N·m · J1–J3", "10.28 N·m · J4", "7.2 N·m · J5–J6"],
        visual: "model",
      },
      {
        label: "CAD & DOCUMENTATION",
        title: "Open CAD models and complete engineering records.",
        body: "The repository provides the full assembly, mechanism studies, bill of materials, and a technical zine documenting the engineering calculations and design decisions.",
        facts: ["Assembly CAD", "Mechanism renders", "Technical zine"],
        visual: "media",
      },
      {
        label: "V2 ITERATION",
        title: "V2 is reducing cost and fabrication complexity.",
        body: "I am redesigning V2 to remove expensive parts and simplify fabrication. The current goal is roughly one-third of V1’s projected cost; that target remains in progress.",
        facts: ["V2 in progress", "Lower-cost target"],
        visual: "ledger",
      },
    ],
    media: [
      { src: "/portfolio/media/vulcan-hero.webp", alt: "Vulcan V1 full robot-arm CAD render", caption: "V1 ASSEMBLY OVERVIEW · CAD RENDER", ratio: "wide", fit: "contain" },
      { src: "/portfolio/media/vulcan-detail.webp", alt: "Vulcan V1 alternate full-assembly CAD view", caption: "V1 ALTERNATE ASSEMBLY VIEW · CAD RENDER", ratio: "wide", fit: "contain" },
      { src: "/portfolio/media/vulcan-assembly.webp", alt: "Vulcan V1 alternate assembly view", caption: "V1 FINAL FORM · CAD RENDER", ratio: "wide", fit: "contain" },
      { src: "/portfolio/media/vulcan-zine.jpg", alt: "Vulcan V1 technical zine", caption: "V1 TECHNICAL ZINE · DESIGN RECORD", ratio: "portrait", fit: "contain" },
    ],
  },
  "ender3-2": {
    key: "ender3-2",
    number: "03",
    name: "Ender3-2",
    domain: "MECHANICAL SYSTEMS · FABRICATION",
    status: "PHYSICALLY BUILT + DEMONSTRATED",
    deck: "A salvage-driven large-format printer, completed in hardware and later demonstrated as a plotter at Open Sauce.",
    accent: "#e5b86b",
    repo: "https://github.com/StillPillWill/Ender3-2",
    model: "/portfolio/models/ender3-2/ender-showcase.glb",
    beats: [
      {
        label: "BACKGROUND",
        title: "Rebuilding two broken printers into one expanded machine.",
        body: "I salvaged usable mechanical and electrical parts from two broken Ender 3s, restructuring them into a working Cartesian printer with an expanded 585 × 775 × 230 mm build volume.",
        facts: ["2 donor printers", "585 × 775 × 230 mm documented envelope", "Physically built"],
        visual: "model",
      },
      {
        label: "FRAME & MOTION",
        title: "Reinforced extrusion frame with dual-axis stabilization.",
        body: "The enlarged frame uses extended 4040 aluminum extrusion, a dual-lead-screw Y axis, dual stepper motors, and a reinforced bed to ensure stability across the oversized span.",
        facts: ["4040 extrusion", "Dual lead screws", "Dual motors"],
        visual: "model",
      },
      {
        label: "FIRMWARE & LEVELING",
        title: "Custom firmware made the unusual geometry tunable.",
        body: "The finished machine runs on a Creality 4.2.2 controller with custom live-editable firmware and a 12 × 18 probe mesh for the oversized build surface.",
        facts: ["Creality 4.2.2", "12 × 18 probe mesh", "Live-editable firmware"],
        visual: "model",
      },
      {
        label: "MATERIALS & BUDGET",
        title: "Built on a $16 new material budget over 64 hours.",
        body: "The project log documents roughly 64 hours of hands-on build time and just $16 spent on new material (replacement belts and bed plywood). All other structural and electrical parts were salvaged from the donor units.",
        facts: ["~64 hours", "~$16 new material", "Mostly salvaged"],
        visual: "media",
      },
      {
        label: "DEMONSTRATION",
        title: "The completed machine became an Open Sauce plotter.",
        body: "At Open Sauce, I converted the completed motion platform into a plotter and used it as the centerpiece of my booth, demonstrating a second practical use for the machine.",
        facts: ["Open Sauce", "Plotter conversion", "Completed machine"],
        visual: "media",
      },
    ],
    media: [
      { src: "/portfolio/media/ender3-2/printing-motion.mp4", alt: "Ender3-2 running a large-format boat print", caption: "COMPLETED MACHINE · ORIGINAL BUILD VIDEO", ratio: "portrait", fit: "contain", kind: "video" },
      { src: "/portfolio/media/ender3-2/machine-in-operation.webp", alt: "Ender3-2 printing a large multicolor boat", caption: "COMPLETED MACHINE · PRINTING", ratio: "portrait", fit: "contain" },
      { src: "/portfolio/media/ender3-2/full-build.webp", alt: "Full Ender3-2 machine and oversized build surface", caption: "FULL BUILD · PHYSICAL MACHINE", ratio: "portrait", fit: "contain" },
      { src: "/portfolio/media/ender3-2/boat-print.webp", alt: "Large boat print on Ender3-2", caption: "LARGE-FORMAT PRINT · MACHINE IN OPERATION", ratio: "portrait", fit: "contain" },
      { src: "/portfolio/media/ender3-2/assembly-stage.webp", alt: "Ender3-2 during physical assembly", caption: "ASSEMBLY STAGE · BUILD RECORD", ratio: "portrait", fit: "contain" },
    ],
  },
  "team-3598": {
    key: "team-3598",
    number: "04",
    name: "Team 3598",
    domain: "LEADERSHIP · COMPETITIVE ROBOTICS",
    status: "FORMER CAPTAIN · SEASON COMPLETE",
    deck: "Team captaincy across engineering, competition operations, and community outreach for an FRC robotics team of more than 40 students.",
    accent: "#b95c6b",
    beats: [
      {
        label: "LEADERSHIP SCOPE",
        title: "Led 40+ students across engineering, operations, and outreach.",
        body: "As captain, I coordinated more than 40 students across mechanical design, manufacturing, programming, competition strategy, and community outreach.",
        facts: ["40+ students", "Former captain", "Cross-discipline"],
        visual: "media",
      },
      {
        label: "SUBTEAMS",
        title: "Synchronized milestones across five working groups.",
        body: "I led shared sprint milestones across mechanical, electrical, software, operations, and outreach groups, managing rapid repairs and iterations between regional competitions.",
        facts: ["Mechanical", "Electrical", "Software", "Operations", "Outreach"],
        visual: "media",
      },
      {
        label: "COMPETITION SEASON",
        title: "District qualification, the Impact Award, and a Worlds berth.",
        body: "During my captaincy, Team 3598 advanced to district championships, earned the prestigious FIRST Impact Award, and qualified for the FIRST World Championship.",
        facts: ["District qualification", "FIRST Impact Award", "World Championship"],
        visual: "media",
      },
      {
        label: "COMMUNITY OUTREACH",
        title: "STEM outreach programs reached 4,452 students.",
        body: "Documented team records track hands-on workshops, school demonstrations, library visits, and community partnerships that reached 4,452 students across the Sacramento area.",
        facts: ["4,452 students", "Workshops", "School visits"],
        visual: "media",
      },
      {
        label: "TEAM ACKNOWLEDGMENT",
        title: "Engineering leadership through collective execution.",
        body: "Competitive robotics is fundamentally a collective endeavor. These records reflect the combined effort of the entire student team and mentors, highlighting the operational systems and leadership that brought everyone together.",
        facts: ["Past role", "Team-attributed outcomes"],
        visual: "ledger",
      },
    ],
    media: [
      { src: "/portfolio/media/team3598.webp", alt: "Full Team 3598 group", caption: "TEAM 3598 · FULL TEAM", ratio: "wide", fit: "contain" },
      { src: "/portfolio/media/team3598/competition-crowd.webp", alt: "Team 3598 students at competition", caption: "COMPETITION TEAM · SEASON RECORD", ratio: "wide", fit: "contain" },
      { src: "/portfolio/media/team3598/outreach-reach.webp", alt: "Team 3598 outreach record", caption: "OUTREACH RECORD · 4,452 STUDENTS", ratio: "wide", fit: "contain" },
      { src: "/portfolio/media/team3598/team-identity.webp", alt: "Team 3598 identity and location record", caption: "SESTEMATIC ELIMINATORS · TEAM IDENTITY", ratio: "portrait", fit: "contain" },
    ],
  },
};

export const contact = {
  email: "williamnzive2007@gmail.com",
  github: "https://github.com/StillPillWill",
  linkedin: "https://www.linkedin.com/in/william-nzive-622226376/",
};
