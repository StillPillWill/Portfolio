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
  intent?: string;
  body: string;
  accent: string;
  records?: ChapterRecord[];
  route?: `/projects/${ProjectKey}`;
  repo?: string;
};

export type ProjectBeat = {
  label: string;
  title: string;
  intent: string;
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
    intent: "Build firmware, robotics kinematics, and RF sensor pipelines backed by empirical benchmarks.",
    body: "Undergraduate Computer Science and Engineering student at UC Davis working across embedded firmware, RF sensing, robotics CAD, and physical fabrication.",
    records: [
      { label: "Focus", value: "Bare-metal firmware · RF sensing · robot kinematics · fabrication" },
      { label: "Demonstrated", value: "90% CSI speaker recognition · 4.6B packets · 6-axis CAD · large-format CNC" },
      { label: "Institution", value: "University of California, Davis" },
    ],
    accent: "#e5b86b",
  },
  {
    id: "education-skills",
    anchor: 0.12,
    number: "02",
    domain: "EDUCATION · TECHNICAL TOOLKIT",
    title: "Engineering stack, platforms, and laboratory tools.",
    intent: "Develop across firmware, data pipelines, deep learning models, and CAD/shop fabrication.",
    body: "Direct technical experience spanning embedded firmware, high-rate USB transport, PyTorch deep learning, CAD kinematics, and physical fabrication.",
    records: [
      { label: "Education", value: "UC Davis (CSE) · Salutatorian 2026" },
      { label: "Languages", value: "Python · C · C++ · Rust · Assembly · Java · C# · SQL · JavaScript" },
      { label: "ML & AI", value: "CUDA · model training · computer vision · signal processing · RAG · evaluation" },
      { label: "Systems & Eng", value: "ESP32 · Linux · firmware · Creo · SolidWorks · Onshape · CNC · 3D printing · welding" },
    ],
    accent: "#8176e9",
  },
  {
    id: "csi",
    anchor: 0.28,
    number: "03",
    domain: "EXPERIENCE · RESEARCH + EMBEDDED SENSING",
    status: "ACTIVE RESEARCH · 90% SPEAKER RECOGNITION DEMONSTRATED",
    title: "Acoustic sensing via Wi‑Fi Channel State Information.",
    intent: "Evaluate whether ambient acoustic vibrations impart measurable phase and amplitude shifts onto commodity 802.11 subcarriers.",
    body: "Designed bare-metal ESP32 firmware, 10,839 records/s native USB bulk transport, synchronized audio capture, and deep learning classification pipelines on $40 of hardware.",
    records: [
      { label: "Hardware BOM", value: "$40 total · ESP32-S3 / C6 silicon · native USB bulk transport" },
      { label: "Throughput", value: "10,839 records/s sustained · 0 packet drops or CRC errors" },
      { label: "Corpus & Compute", value: "4.6B packets · 98 hrs audio · 400 hrs GPU training across 122 runs" },
      { label: "Outcome", value: "90% speaker recognition verified; general speech synthesis open" },
    ],
    accent: "#8176e9",
    route: "/projects/csi",
    repo: "https://github.com/StillPillWill/Research",
  },
  {
    id: "software-ml",
    anchor: 0.42,
    number: "04",
    domain: "EXPERIENCE · SYSTEMS SOFTWARE + MACHINE LEARNING",
    title: "Low-level kernels, 3D medical ML, and representation diffusion.",
    intent: "Develop systems software, medical imaging ML pipelines, and representation transfer experiments.",
    body: "Ranked 23rd of 864 competitors in Parkinson's 3D DaTscan classification (top 2.7%), built bare-metal x86 bootloaders and virtual machines, and researched cross-architecture representation diffusion.",
    records: [
      { label: "3D Medical ML", value: "Ranked 23rd of 864 globally (top 2.7%) · Parkinson's DaTscan ML pipeline" },
      { label: "Systems", value: "Bootloader, OS prototype, custom language, and Assembly Snake game" },
      { label: "LLM Research", value: "Cross-architecture representation diffusion repurposing JEPA and DINO" },
      { label: "Embedded Control", value: "Reverse-engineered C# controller libraries for solar competition boat" },
    ],
    accent: "#c8774d",
  },
  {
    id: "vulcan",
    anchor: 0.57,
    number: "05",
    domain: "EXPERIENCE · MECHANICAL SYSTEMS & ROBOT KINEMATICS",
    status: "DESIGN STUDY · V1 DOCUMENTED IN CAD · V2 IN PROGRESS",
    title: "Vulcan: open-source six-axis robot arm architecture in CAD.",
    intent: "Design an accessible, backlash-adjustable 6-axis arm using synchronous belt drives and 3D-printed joints.",
    body: "Engineered full CAD assembly, 1:16 two-stage synchronous belt drives, decoupled differential wrist, and technical calculations for an open 6-DOF manipulator.",
    records: [
      { label: "Kinematics", value: "6 degrees of freedom · NEMA 23/17 drive · decoupled differential wrist" },
      { label: "Transmission", value: "1:16 primary reduction · synchronous timing belts · zero gear backlash" },
      { label: "Load Targets", value: "31–32 N·m holding torque J1–J3 · 10.28 N·m J4 · 7.2 N·m wrist" },
      { label: "V2 Objective", value: "Integrated thin-section ball races targeting 1/3 of V1 projected cost" },
    ],
    accent: "#c8774d",
    route: "/projects/vulcan",
    repo: "https://github.com/StillPillWill/Vulcan",
  },
  {
    id: "fabrication",
    anchor: 0.71,
    number: "06",
    domain: "EXPERIENCE · FABRICATION & MACHINE DESIGN",
    status: "PHYSICALLY BUILT + DEMONSTRATED AT OPEN SAUCE",
    title: "Ender3-2: large-format machine salvage and rapid builds.",
    intent: "Rebuild decommissioned printer hardware into an expanded Cartesian platform for under $20 in new materials.",
    body: "Rebuilt two failed Ender 3s into an expanded 585 × 775 × 230 mm Cartesian machine with custom Marlin firmware, 12 × 18 bed leveling mesh, and modular plotter toolhead.",
    records: [
      { label: "Build Volume", value: "585 × 775 × 230 mm envelope (over 3× standard build volume)" },
      { label: "Budget & Time", value: "$16 new material expenditure · ~64 hours fabrication" },
      { label: "Firmware", value: "Custom Marlin 32-bit build · 12 × 18 dynamic bilinear probe mesh" },
      { label: "Exhibition", value: "Continuous multi-hour live vector plotting demo at Open Sauce" },
    ],
    accent: "#e5b86b",
    route: "/projects/ender3-2",
    repo: "https://github.com/StillPillWill/Ender3-2",
  },
  {
    id: "team-3598",
    anchor: 0.86,
    number: "07",
    domain: "EXPERIENCE · SYSTEMS LEADERSHIP & OUTREACH",
    status: "FORMER CAPTAIN · SEASON COMPLETE",
    title: "FRC Team 3598 robotics captaincy & regional outreach.",
    intent: "Lead mechanical, electrical, software, operations, and outreach groups for a 40+ member robotics team.",
    body: "Coordinated technical milestones across mechanical, electrical, software, and operations groups, earning the FIRST Impact Award and reaching 4,452 students across Sacramento.",
    records: [
      { label: "Team Scale", value: "40+ students across five working groups" },
      { label: "Mentorship", value: "Mentored students in Java, Git, CAD, machining, and 3D printing" },
      { label: "Honors", value: "FIRST Impact Award · District Championship · World Championship berth" },
      { label: "STEM Outreach", value: "4,452 students reached through workshops and school visits" },
    ],
    accent: "#b95c6b",
    route: "/projects/team-3598",
  },
  {
    id: "contact",
    anchor: 1,
    number: "08",
    domain: "CONTACT & OPPORTUNITIES",
    title: "Available for engineering roles and research collaborations.",
    intent: "Connect with engineering teams building embedded systems, robotics, and hardware.",
    body: "Open to internships and technical roles in embedded firmware, robotics kinematics, RF sensing pipelines, and systems software.",
    records: [
      { label: "Email", value: "williamnzive2007@gmail.com" },
      { label: "Profiles", value: "GitHub (@StillPillWill) · LinkedIn" },
      { label: "Availability", value: "Summer 2026 internships · co-ops · research collaborations" },
    ],
    accent: "#e5b86b",
  },
];

export const projects: Record<ProjectKey, Project> = {
  csi: {
    key: "csi",
    number: "01",
    name: "CSI Research",
    domain: "COMPUTER SCIENCE · EMBEDDED RF SENSING",
    status: "ACTIVE RESEARCH · 90% SPEAKER RECOGNITION VERIFIED",
    deck: "An ESP32 firmware, high-throughput native USB transport, and deep-learning pipeline built to evaluate acoustic sensing through Wi-Fi channel-state information—capturing 4.6B packets and 98 hours of synchronized audio to achieve 90% speaker recognition across 400 hours of training on $40 of hardware.",
    accent: "#8176e9",
    repo: "https://github.com/StillPillWill/Research",
    beats: [
      {
        label: "RESEARCH HYPOTHESIS",
        title: "Can acoustic pressure waves modulate commodity Wi‑Fi subcarrier multipath?",
        intent: "Determine whether sound vibrations altering antenna ground planes and surfaces impart extractable phase signatures onto 802.11 CSI.",
        body: "Sound waves induce microscopic surface vibrations in physical obstacles and antenna ground planes, altering RF multipath propagation. While military radar or optical vibrometry achieves this with expensive lasers, this research evaluates whether sub-$5 ESP32-S3 and C6 microcontrollers can capture sufficient multipath subcarrier structure to detect acoustic events and identify human speakers.",
        facts: ["Physical-layer OFDM", "ESP32-S3 / C6 silicon", "Origin: UCSC SIP 2025", "Non-line-of-sight sensing"],
        visual: "instrument",
      },
      {
        label: "TRANSPORT ARCHITECTURE",
        title: "Native USB bulk transfer sustained 10,839 records/s with zero dropouts.",
        intent: "Bypass OS network stack latency and standard serial baud rate limits that dropped packets at high frequencies.",
        body: "Initial experiments demonstrated that OS-level NIC polling introduced variable scheduling jitter and dropped up to 30% of packets above 1 kHz, destroying acoustic phase coherence. I wrote ESP32 firmware utilizing FreeRTOS ping-pong ring buffers and native USB CDC/bulk endpoints with 16-bit CRC framing and monotonic sequence counters. In 60-second continuous soak tests, the transport sustained 10,839 raw records/s (9.019 Mb/s) with 0 CRC corruptions, 0 sequence skips, and 0 host drops.",
        facts: ["10,839 records/s", "60-second soak test", "0 CRC errors or gaps", "9.019 Mb/s sustained"],
        visual: "instrument",
      },
      {
        label: "DATA ORCHESTRATION",
        title: "Hardware-synchronized audio capture and chunked binary storage.",
        intent: "Build a synchronized dataset pairing RF phase disturbances directly with calibrated acoustic ground truth.",
        body: "Supervised acoustic training requires exact temporal alignment between RF perturbations and acoustic waveforms. I developed a host-side collection daemon in Python that synchronizes dual microcontrollers with multi-channel audio input, streaming into chunked binary storage with index tables. This system compiled a corpus of 4.6 billion raw packets and 98 hours of paired audio on roughly $40 of total hardware.",
        facts: ["4.6B raw packets", "98 hours paired audio", "~$40 hardware BOM", "Sub-millisecond sync"],
        visual: "instrument",
      },
      {
        label: "EMPIRICAL RESULTS",
        title: "90% closed-set speaker recognition verified across 122 training runs.",
        intent: "Evaluate whether neural networks can extract speaker identity from raw subcarrier phase differences.",
        body: "Over 400 hours of GPU compute across 122 training iterations, convolutional and recurrent architectures trained on preprocessed subcarrier spectrograms achieved 90% speaker identification accuracy in closed-set evaluations, as well as reliable voice-activity event detection. This confirmed that acoustic signatures are preserved in multipath phase data despite environmental reflections.",
        facts: ["90% speaker ID", "122 training runs", "400 hours GPU compute", "VAD verified"],
        visual: "ledger",
      },
      {
        label: "SCIENTIFIC BOUNDARIES",
        title: "Speech classification is demonstrated; continuous waveform reconstruction remains open.",
        intent: "Distinguish demonstrated speaker classification from unproven continuous speech synthesis.",
        body: "Documenting technical limitations clearly is essential. While speaker recognition and voice-activity detection are demonstrated, arbitrary acoustic waveform reconstruction (synthesizing continuous intelligible speech from raw RF alone) remains an unsolved research problem due to phase unwrapping ambiguities and hardware phase noise. Ongoing work focuses on spatial beamforming and antenna array diversity to improve SNR.",
        facts: ["Proven: Classification & VAD", "Open: Continuous audio synthesis", "Phase unwrapping limits"],
        visual: "ledger",
      },
    ],
    media: [],
  },
  vulcan: {
    key: "vulcan",
    number: "02",
    name: "Vulcan",
    domain: "MECHANICAL SYSTEMS · ROBOT KINEMATICS",
    status: "DESIGN STUDY · V1 DOCUMENTED IN CAD · V2 IN PROGRESS",
    deck: "A complete open-source six-axis robot arm mechanical design study, engineering kinematics, multi-stage synchronous belt reductions, and printable structural parts in CAD.",
    accent: "#c8774d",
    repo: "https://github.com/StillPillWill/Vulcan",
    model: "/portfolio/models/vulcan/vulcan-showcase.glb",
    beats: [
      {
        label: "DESIGN CHALLENGE",
        title: "Resolving 6-DOF industrial kinematics within desktop 3D printing constraints.",
        intent: "Avoid expensive industrial gearboxes by designing an accessible, belt-driven transmission.",
        body: "Traditional six-axis robot arms rely on expensive precision gearboxes. Vulcan V1 was designed as an open-source mechanical architecture around standard NEMA steppers, off-the-shelf timing belts, and 3D-printable structural parts, allowing a full 6-DOF manipulator to be built without industrial CNC machining.",
        facts: ["6 degrees of freedom", "Zero harmonic drives", "CAD design study", "Desktop printable"],
        visual: "model",
      },
      {
        label: "TRANSMISSION ARCHITECTURE",
        title: "Multi-stage synchronous belt drives with modular reduction ratios.",
        intent: "Deliver smooth torque transmission without gear backlash using pre-tensioned timing belts.",
        body: "Joints 1 through 4 utilize two-stage synchronous belt reductions (1:16 primary reduction) driven by NEMA 23 stepper motors. Unlike 3D-printed plastic gear teeth, which suffer from rapid abrasive wear and backlash, belts distribute load across multiple teeth simultaneously. Changing joint torque simply requires reprinting a drive pulley.",
        facts: ["1:16 main reduction", "Two-stage belt drive", "Modular pulleys", "Belt transmission"],
        visual: "model",
      },
      {
        label: "DIFFERENTIAL WRIST",
        title: "Decoupled 2-DOF wrist kinematics driven by dual rear-mounted NEMA 17s.",
        intent: "Minimize forearm inertia by relocating wrist actuation motors back toward the elbow.",
        body: "Joints 5 (pitch) and 6 (roll) are resolved through a bevel-gear differential wrist driven by two NEMA 17 motors mounted coaxially further back on the forearm. By driving both motors in the same direction, the wrist pitches; driving them in opposite directions rolls the tool flange. This design prevents heavy motor mass from concentrating at the end-effector, substantially reducing required holding torque for upstream joints.",
        facts: ["Differential wrist", "Dual NEMA 17", "Coaxial forearm mounting", "Reduced link inertia"],
        visual: "model",
      },
      {
        label: "STRUCTURAL KINEMATICS",
        title: "Targeted torque curves matched joint load distributions.",
        intent: "Size motor torque and structural cross-sections to withstand maximum cantilever bending moments.",
        body: "Static load analysis across the arm kinematic envelope established target holding torques: 31–32 N·m on high-load joints 1–3, 10.28 N·m on joint 4, and 7.2 N·m on the wrist. Structural members incorporate ribbed internal infill geometries and counterbalanced shoulder geometry to offset gravitational cantilever moments.",
        facts: ["31–32 N·m · J1–J3", "10.28 N·m · J4", "7.2 N·m · J5–J6", "Ribbed load distribution"],
        visual: "model",
      },
      {
        label: "V2 REDESIGN",
        title: "V1 established the kinematic baseline; V2 focuses on aggressive cost reduction.",
        intent: "Simplify assembly and reduce part count in V2 based on V1 tolerance analysis.",
        body: "V1 was completed and documented as a thorough CAD study and technical zine. Critical review revealed that V1's large bearing count and complex fastener assemblies added unnecessary assembly friction. V2 redesign is currently underway, replacing complex bearing stacks with integrated thin-section ball races and molded sub-assemblies to achieve a target cost roughly one-third of V1.",
        facts: ["V1 design study complete", "V2 in progress", "Target: 1/3 V1 cost", "Part-count optimization"],
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
    domain: "MECHANICAL SYSTEMS · MACHINE DESIGN",
    status: "PHYSICALLY BUILT + DEMONSTRATED AT OPEN SAUCE",
    deck: "A salvage-driven large-format Cartesian machine rebuilt from two failed donor printers, scaled to a 585 × 775 × 230 mm envelope with custom firmware and later converted into a precision plotter for Open Sauce.",
    accent: "#e5b86b",
    repo: "https://github.com/StillPillWill/Ender3-2",
    model: "/portfolio/models/ender3-2/ender-showcase.glb",
    beats: [
      {
        label: "PROBLEM & SALVAGE",
        title: "Rebuilding decommissioned machines into a 3× larger build envelope.",
        intent: "Reclaim functional extrusions, motors, and electronics from two broken printers into an expanded build envelope.",
        body: "Standard desktop 3D printers have ~220 × 220 mm beds. Salvaging structural extrusions, leadscrews, stepper motors, and motion hardware from two discarded Ender 3 units, I built an expanded Cartesian platform achieving a 585 × 775 × 230 mm build volume with $16 in new expenditure for timing belts and plywood.",
        facts: ["2 donor printers salvaged", "585 × 775 × 230 mm envelope", "$16 new material BOM", "Over 3× standard volume"],
        visual: "model",
      },
      {
        label: "STRUCTURAL MECHANICS",
        title: "Extended 4040 extrusion frame with dual-axis stabilization.",
        intent: "Ensure structural rigidity across the expanded Cartesian motion envelope using reinforced hardware.",
        body: "The enlarged frame uses extended 4040 aluminum extrusion, a dual-lead-screw Y axis, dual stepper motors, and a plywood bed reinforced with salvaged metal to ensure stability and smooth motion across the oversized span.",
        facts: ["Extended 4040 extrusion", "Dual lead screws", "Dual motors", "Reinforced bed"],
        visual: "model",
      },
      {
        label: "FIRMWARE CALIBRATION",
        title: "Custom Marlin firmware with 12 × 18 bilinear bed compensation mesh.",
        intent: "Compensate for bed surface height variations across the large build platform.",
        body: "Large-format heated beds inevitably exhibit thermal warping and mechanical runout that standard 3x3 bed leveling cannot resolve. I compiled custom Marlin firmware for the Creality 4.2.2 32-bit board, configuring calibrated microstepping, acceleration curves, and an extensive 12 × 18 point bilinear probe mesh that dynamically interpolates nozzle height across all 4,533 cm² of print area.",
        facts: ["Creality 4.2.2 32-bit", "12 × 18 bilinear mesh", "Custom Marlin build", "Dynamic height mapping"],
        visual: "model",
      },
      {
        label: "MATERIALS & BUDGET",
        title: "Documented 64 hours of hands-on build time on a $16 new material budget.",
        intent: "Track fabrication hours and minimize cost through component salvage.",
        body: "The project engineering log documents 64 hours of fabrication, assembly, wiring, and tuning. Total incremental capital expenditure was held to $16 (replacement timing belts and bed plywood). All other structural extrusions, power supplies, stepper motors, and wiring harnesses were reclaimed and reconditioned from donor units.",
        facts: ["64 hours build log", "$16 incremental budget", "Salvage engineering", "Documented BOM"],
        visual: "media",
      },
      {
        label: "PUBLIC DEMO & PLOTTER",
        title: "Modular toolhead conversion for live demonstration at Open Sauce.",
        intent: "Convert the motion platform into a vector pen plotter for continuous live exhibition.",
        body: "Ahead of the Open Sauce maker festival in San Francisco, I designed a spring-loaded toolhead quick-mount to convert the platform from FDM filament extrusion to automated vector pen plotting. The machine served as the working centerpiece of my exhibition booth, operating continuously for hours producing large-scale vector drawings for hundreds of attendees.",
        facts: ["Open Sauce exhibitor", "Spring-loaded pen mount", "Multi-hour continuous demo", "Vector plotting"],
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
    deck: "Engineering captaincy coordinating mechanical design, programming, competition operations, and community outreach for an FRC robotics team of more than 40 students.",
    accent: "#b95c6b",
    beats: [
      {
        label: "LEADERSHIP SCOPE",
        title: "Led 40+ students across engineering, operations, and outreach.",
        intent: "Coordinate mechanical design, manufacturing, electrical, programming, operations, and outreach across five working groups.",
        body: "As captain of FRC Team 3598 (SEStematic Eliminators), I coordinated more than 40 high school students across mechanical design, manufacturing, electrical, programming, operations, and community outreach, directing technical milestones and competition strategy.",
        facts: ["40+ student team", "Former captain", "5 working groups", "Cross-disciplinary oversight"],
        visual: "media",
      },
      {
        label: "SUBTEAMS & OPERATIONS",
        title: "Synchronized milestones across five working groups.",
        intent: "Align sprint milestones and shop resources across mechanical, electrical, software, operations, and outreach subteams.",
        body: "I led shared sprint milestones across mechanical, electrical, software, operations, and outreach groups, coordinating machine shop access, bill of materials tracking, and rapid repairs and iterations between regional events.",
        facts: ["Mechanical", "Electrical", "Software", "Operations", "Outreach"],
        visual: "media",
      },
      {
        label: "STUDENT MENTORSHIP",
        title: "Hands-on engineering mentorship in programming, CAD, and shop fabrication.",
        intent: "Mentor students in robot programming, CAD modeling, manual/CNC machining, and shop safety.",
        body: "Mentored students directly in Java robot programming, Git version control, Onshape CAD modeling, manual machining, CNC fabrication, and 3D printing, building technical capability and ensuring shop safety standards.",
        facts: ["Java & Git", "Onshape CAD", "Machining & welding", "3D printing mentorship"],
        visual: "media",
      },
      {
        label: "COMPETITION OUTCOMES",
        title: "District championship qualification, FIRST Impact Award, and World Championship berth.",
        intent: "Execute competition strategy and guide the team to championship qualification and award recognition.",
        body: "Team 3598 competed across three events, advanced to the district championship, qualified for the FIRST World Championship, and earned the FIRST Impact Award—the organization's highest honor celebrating engineering sustainability and team culture.",
        facts: ["FIRST Impact Award", "World Championship berth", "District qualification", "3 competitions"],
        visual: "media",
      },
      {
        label: "COMMUNITY IMPACT",
        title: "Documented STEM outreach reaching 4,452 students across Sacramento.",
        intent: "Organize hands-on robotics workshops and STEM demonstrations for schools and community libraries.",
        body: "Led community engineering initiatives including hands-on robotics workshops, public library exhibitions, school visits, demonstrations, and community partnerships that reached 4,452 students across the greater Sacramento region.",
        facts: ["4,452 students reached", "Workshops & demos", "School visits", "Sacramento region"],
        visual: "media",
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
