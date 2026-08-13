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

export type FutureShot = {
  id: string;
  title: string;
  brief: string;
  angle: string;
  purpose: string;
  ratio: string;
  minimum: string;
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
  futureShots: FutureShot[];
};

export const chapters: Chapter[] = [
  {
    id: "intro",
    anchor: 0,
    number: "01",
    domain: "PROFILE · WILLIAM NZIVE",
    title: "Computer science, from signal to machine.",
    body: "I am a Computer Science and Engineering student at UC Davis working across embedded systems, machine learning, mechanical design, and fabrication.",
    records: [
      { label: "Focus", value: "Software · sensing · robotics · fabrication" },
      { label: "Approach", value: "Constraint-first engineering, measurement, and honest documentation" },
      { label: "Location", value: "University of California, Davis" },
    ],
    accent: "#e5b86b",
  },
  {
    id: "education-skills",
    anchor: 0.12,
    number: "02",
    domain: "EDUCATION · TECHNICAL TOOLKIT",
    title: "A toolkit that crosses the stack.",
    body: "My work moves between low-level software, data and ML systems, browser interfaces, CAD, electronics, and physical fabrication.",
    records: [
      { label: "Education", value: "UC Davis · Computer Science and Engineering" },
      { label: "Languages", value: "Python · C / C++ · TypeScript / JavaScript · HTML / CSS" },
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
      { label: "Evidence", value: "10,839 records/s · 650,386 records · 0 CRC errors or sequence gaps" },
      { label: "Outcome", value: "Audio-activity detection and speaker identification demonstrated" },
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
    title: "The work extends beyond one research project.",
    body: "Earlier and independent work spans low-level systems, programming-language design, model fine-tuning, classification, and practical generative-ML pipelines.",
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
    title: "Building physical systems under real constraints.",
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
    title: "Technical leadership at the scale of a team.",
    body: "As former captain of Team 3598, I coordinated more than 50 students across mechanical, electrical, software, operations, competition preparation, and outreach.",
    records: [
      { label: "Team", value: "50+ students across five working groups" },
      { label: "Competition", value: "Three events · district-championship qualification" },
      { label: "Community", value: "Documented outreach reaching 4,452 students" },
    ],
    accent: "#b95c6b",
    route: "/projects/team-3598",
  },
  {
    id: "contact",
    anchor: 1,
    number: "08",
    domain: "THE NEXT PROBLEM",
    title: "Bring me the problem that crosses disciplines.",
    body: "I am interested in technical opportunities where software has to understand hardware, data has to survive the real world, and ideas have to become working systems.",
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
    deck: "An ESP32 firmware, transport, and capture stack built to investigate audio sensing through Wi-Fi channel-state information.",
    accent: "#8176e9",
    repo: "https://github.com/StillPillWill/Research",
    beats: [
      {
        label: "THE RESEARCH QUESTION",
        title: "Can a low-cost Wi‑Fi sensor reveal sound activity?",
        body: "I am investigating whether channel-state information from low-cost ESP32 hardware contains enough structure to detect audio activity, identify a speaker, and eventually recover more of the underlying signal.",
        facts: ["Wi-Fi CSI", "ESP32-S3 / C6", "Active research"],
        visual: "instrument",
      },
      {
        label: "THE TRANSPORT",
        title: "Native USB moved 10,839 records per second without a recorded error.",
        body: "I built a native USB capture path with CRC and sequence validation. A 60-second soak sustained 10,839 raw records per second at 9.019 Mb/s with zero CRC errors, sequence gaps, corruption, or device drops.",
        facts: ["10,839 records/s", "60-second soak", "0 gaps or CRC errors"],
        visual: "instrument",
      },
      {
        label: "THE CAPTURE STACK",
        title: "Synchronized collection made the experiments repeatable.",
        body: "The system combines embedded firmware with synchronized CSI and audio collection, crash-resilient chunked storage, decoding, and host-side orchestration. That pipeline produces the labeled data used by the sensing experiments.",
        facts: ["Synchronized CSI + audio", "Lossless storage", "Host orchestration"],
        visual: "instrument",
      },
      {
        label: "DEMONSTRATED MILESTONE",
        title: "Audio detection and speaker identification worked.",
        body: "The prototype has demonstrated audio-event detection and speaker identification from captured CSI. That result is narrower—and more defensible—than claiming that the original audio has been reconstructed.",
        facts: ["Audio detection", "Speaker identification", "Demonstrated"],
        visual: "ledger",
      },
      {
        label: "CURRENT BOUNDARY",
        title: "General audio reconstruction is still an open question.",
        body: "I am still testing how much of the underlying audio can be recovered. The evidence bay names the exact captures and comparison plots that belong here when the work is validated; it does not fabricate substitutes.",
        facts: ["Ongoing", "No reconstruction claim"],
        visual: "ledger",
      },
    ],
    media: [],
    futureShots: [
      {
        id: "CSI-HERO-01",
        title: "Capture rig",
        brief: "Real bench photograph, 20–30° overhead. Show the ESP32 apparatus, capture computer, and test geometry with wiring legible.",
        angle: "20–30° overhead",
        purpose: "Establish the real apparatus and make the experimental geometry inspectable.",
        ratio: "3:2 landscape",
        minimum: "2400 × 1600",
      },
      {
        id: "CSI-PROOF-01",
        title: "Synchronized trace",
        brief: "Exported capture with CSI response and audio event markers on the same readable time axis.",
        angle: "Direct UI export",
        purpose: "Prove that CSI and reference audio were captured on a shared timeline.",
        ratio: "16:9 landscape",
        minimum: "2560 × 1440",
      },
      {
        id: "CSI-PROOF-02",
        title: "Speaker-ID result",
        brief: "Evaluation output with test setup, labels, and result context visible in one frame.",
        angle: "Direct result export",
        purpose: "Show the demonstrated classification result without overstating reconstruction.",
        ratio: "16:9 landscape",
        minimum: "2560 × 1440",
      },
    ],
  },
  vulcan: {
    key: "vulcan",
    number: "02",
    name: "Vulcan",
    domain: "MECHANICAL SYSTEMS · ROBOT ARCHITECTURE",
    status: "DESIGN STUDY · V1 DOCUMENTED IN CAD · NOT PHYSICALLY BUILT · V2 IN PROGRESS",
    deck: "A complete six-axis V1 design record, presented honestly as engineering design rather than physical performance.",
    accent: "#c8774d",
    repo: "https://github.com/StillPillWill/Vulcan",
    model: "/portfolio/models/vulcan/vulcan-showcase.glb",
    beats: [
      {
        label: "DESIGN SCOPE",
        title: "V1 resolved the six-axis architecture in CAD.",
        body: "I completed V1 as an open-source six-axis arm design: the CAD assembly, joint transmissions, selected components, and technical documentation. V1 was not physically built.",
        facts: ["6 axes", "Complete V1 CAD", "Not physically built"],
        visual: "model",
      },
      {
        label: "TRANSMISSION DECISION",
        title: "Belt reduction replaced precision gearboxes.",
        body: "The first four axes use reduced NEMA 23 motors; the wrist uses two NEMA 17 motors in a belted differential. Reprinting pulleys changes the speed–torque tradeoff without replacing an entire gearbox.",
        facts: ["Belt-driven", "1:16 main reduction", "Differential wrist"],
        visual: "model",
      },
      {
        label: "DESIGN TARGETS",
        title: "Joint targets followed the loads.",
        body: "The documented V1 design targeted approximately 31–32 N·m on joints 1–3, 10.28 N·m on joint 4, and 7.2 N·m on wrist joints 5 and 6.",
        facts: ["31–32 N·m · J1–J3", "10.28 N·m · J4", "7.2 N·m · J5–J6"],
        visual: "model",
      },
      {
        label: "AUDITABLE EVIDENCE",
        title: "The repository records the decisions.",
        body: "The repository records the assembly, mechanisms, selected components, and a technical zine. These artifacts document the design process; V1 was not physically built.",
        facts: ["Assembly CAD", "Mechanism renders", "Technical zine"],
        visual: "media",
      },
      {
        label: "ONGOING REVISION",
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
    futureShots: [
      {
        id: "VULCAN-V2-01",
        title: "V2 comparison",
        brief: "Matched V1/V2 CAD view after V2 geometry is stable. Use the same camera, pose, and scale for a defensible comparison.",
        angle: "Matched 3/4 CAD view",
        purpose: "Make the V2 cost and fabrication changes visually comparable to V1.",
        ratio: "16:9 landscape",
        minimum: "3840 × 2160",
      },
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
        label: "STARTING CONSTRAINT",
        title: "I rebuilt two failed printers into one larger machine.",
        body: "I dismantled two broken Ender 3s, kept their usable mechanical and electrical parts, and rebuilt them into a working Cartesian printer with a documented 585 × 775 × 230 mm machine envelope.",
        facts: ["2 donor printers", "585 × 775 × 230 mm documented envelope", "Physically built"],
        visual: "model",
      },
      {
        label: "MOTION SYSTEM",
        title: "The frame grew around a documented 585 × 775 × 230 mm envelope.",
        body: "The enlarged frame uses extended 4040 extrusion, a dual-lead-screw Y axis, dual motors, and a plywood bed reinforced with salvaged metal.",
        facts: ["4040 extrusion", "Dual lead screws", "Dual motors"],
        visual: "model",
      },
      {
        label: "CONTROL SYSTEM",
        title: "Custom firmware made the unusual geometry tunable.",
        body: "The finished machine runs on a Creality 4.2.2 controller with custom live-editable firmware and a 12 × 18 probe mesh for the oversized build surface.",
        facts: ["Creality 4.2.2", "12 × 18 probe mesh", "Live-editable firmware"],
        visual: "model",
      },
      {
        label: "BUILD CONSTRAINT",
        title: "$16 in new material; about 64 hours of work.",
        body: "The repository records approximately 64 hours of build time and about $16 in new material: the replacement belt and plywood. The rest came from the donor machines and found material.",
        facts: ["~64 hours", "~$16 new material", "Mostly salvaged"],
        visual: "media",
      },
      {
        label: "PUBLIC DEMONSTRATION",
        title: "The completed machine became an Open Sauce plotter.",
        body: "At Open Sauce, I converted the completed motion platform into a plotter and used it as the centerpiece of my booth. The completed-machine video appears in the preceding beat; this final slot is reserved for a full-frame record of the plotter setup.",
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
    futureShots: [
      {
        id: "ENDER-OPEN-SAUCE-01",
        title: "Open Sauce plotter configuration",
        brief: "Full machine in plotter configuration with the drawing output visible. Keep the complete motion envelope in frame.",
        angle: "Eye-level front 3/4",
        purpose: "Document the completed machine in its public plotter configuration and show the output it produced.",
        ratio: "3:2 landscape",
        minimum: "2400 × 1600",
      },
    ],
  },
  "team-3598": {
    key: "team-3598",
    number: "04",
    name: "Team 3598",
    domain: "LEADERSHIP · COMPETITIVE ROBOTICS",
    status: "FORMER CAPTAIN · SEASON COMPLETE",
    deck: "Past captaincy across engineering, competition operations, and outreach for an FRC team of more than 50 students.",
    accent: "#b95c6b",
    beats: [
      {
        label: "LEADERSHIP SCOPE",
        title: "Led 50+ students across engineering, operations, and outreach.",
        body: "As captain, I coordinated more than 50 students across design, manufacturing, programming, competition preparation, and outreach.",
        facts: ["50+ students", "Former captain", "Cross-discipline"],
        visual: "media",
      },
      {
        label: "ONE TEAM · MANY DISCIPLINES",
        title: "The team ran on shared milestones across five working groups.",
        body: "I coordinated shared milestones across mechanical, electrical, software, logistics, and outreach groups, including the repair and iteration required between events.",
        facts: ["Mechanical", "Electrical", "Software", "Operations", "Outreach"],
        visual: "media",
      },
      {
        label: "SEASON OUTCOME",
        title: "Three events ended in district-championship qualification.",
        body: "During my captaincy, Team 3598 competed three times and qualified for the district championship.",
        facts: ["3 competitions", "District qualification"],
        visual: "media",
      },
      {
        label: "COMMUNITY OUTCOME",
        title: "Outreach programs reached 4,452 students across Sacramento.",
        body: "First-party team records document workshops, school visits, presentations, and community partnerships that reached 4,452 students across Sacramento.",
        facts: ["4,452 students", "Workshops", "School visits"],
        visual: "media",
      },
      {
        label: "ATTRIBUTION",
        title: "The season was a team result.",
        body: "The records document a collective season. They support my leadership role and the team’s outcomes; they do not assign every fabrication or outreach result to me individually.",
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
    futureShots: [],
  },
};

export const contact = {
  email: "williamnzive2007@gmail.com",
  github: "https://github.com/StillPillWill",
  linkedin: "https://www.linkedin.com/in/william-nzive-622226376/",
};
