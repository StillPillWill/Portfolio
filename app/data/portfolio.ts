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
    intent: "Engineer high-throughput physical systems, bare-metal firmware, and robotic kinematics from first principles.",
    body: "Undergraduate Computer Science and Engineering student at UC Davis operating at the intersection of embedded systems, RF sensing, mechanical CAD, and physical fabrication.",
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
    intent: "Maintain full-stack hardware-software competency spanning assembly, firmware, high-rate USB protocols, ML pipelines, and precision shop tooling.",
    body: "Direct technical experience spanning real-time FreeRTOS firmware, native USB bulk transfers, PyTorch deep learning, CAD kinematics, and physical CNC/manual fabrication.",
    records: [
      { label: "Education", value: "UC Davis · B.S. Computer Science & Engineering" },
      { label: "Languages", value: "C / C++ · Python · Rust · Assembly (x86) · Java · TypeScript / JavaScript" },
      { label: "Systems & RF", value: "ESP32 / ESP-IDF · native USB bulk · Linux · FreeRTOS · Wi-Fi CSI · bootloaders" },
      { label: "Mechanical", value: "Creo · SolidWorks · Onshape · GT2 belt drives · CNC machining · 3D printing · TIG/MIG" },
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
    intent: "Evaluate whether ambient sound pressure waves vibrating physical surfaces impart measurable phase and amplitude shifts onto commodity 802.11 subcarriers.",
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
    intent: "Tackle high-constraint algorithmic problems ranging from bare-metal interrupt service routines to 3D convolutional medical diagnostics.",
    body: "Ranked 23rd of 864 competitors in Parkinson's 3D DaTscan classification (top 2.7%), built bare-metal x86 bootloaders and virtual machines, and researched cross-architecture LLM latent diffusion.",
    records: [
      { label: "3D Medical ML", value: "Ranked 23rd of 864 globally · Parkinson's DaTscan 3D CNN ensemble" },
      { label: "Systems", value: "Bare-metal x86 bootloader, protected-mode kernel, and bytecode VM" },
      { label: "LLM Research", value: "Cross-architecture representation diffusion using JEPA/DINO bottlenecks" },
      { label: "Embedded Telemetry", value: "Reverse-engineered C# marine protocols for competition solar boat" },
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
    intent: "Eliminate the prohibitive multi-thousand dollar cost of industrial harmonic gearboxes by engineering accessible, pre-tensioned belt reduction transmissions.",
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
    intent: "Re-engineer discarded mechanical components into high-utility, oversized Cartesian CNC platforms while maintaining sub-millimeter precision.",
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
    intent: "Direct systems engineering, closed-loop swerve drive kinematics, and community impact across a 40+ student competitive robotics organization.",
    body: "Coordinated technical milestones across mechanical, electrical, software, and operations groups, earning the FIRST Impact Award and reaching 4,452 students across Northern California.",
    records: [
      { label: "Team Scale", value: "40+ students across five technical working groups" },
      { label: "Engineering", value: "Closed-loop swerve kinematics with magnetic CANcoder velocity control" },
      { label: "Honors", value: "FIRST Impact Award · District Championship · World Championship berth" },
      { label: "STEM Outreach", value: "4,452 students reached through workshops and library programs" },
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
    intent: "Connect with engineering teams building mission-critical embedded systems, robotics, and sensing hardware.",
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
        intent: "Determine whether physical sound vibrations altering antenna ground planes and surrounding surfaces impart extractable phase signatures onto commodity 802.11 Channel State Information.",
        body: "Sound waves induce microscopic surface vibrations in physical obstacles and antenna ground planes, altering RF multipath propagation. While military radar or optical vibrometry achieves this with expensive lasers, this research evaluates whether sub-$5 ESP32-S3 and C6 microcontrollers can capture sufficient multipath subcarrier structure to detect acoustic events and identify human speakers.",
        facts: ["Physical-layer OFDM", "ESP32-S3 / C6 silicon", "Origin: UCSC SIP 2025", "Non-line-of-sight sensing"],
        visual: "instrument",
      },
      {
        label: "TRANSPORT ARCHITECTURE",
        title: "Native USB bulk transfer sustained 10,839 records/s with zero dropouts.",
        intent: "Bypass commodity operating system kernel networking latency and standard UART 921.6k baud rate ceilings that dropped >30% of high-frequency packet samples.",
        body: "Initial experiments demonstrated that OS-level NIC polling introduced variable scheduling jitter and dropped up to 30% of packets above 1 kHz, destroying acoustic phase coherence. I engineered a bare-metal ESP32 firmware utilizing dual-core FreeRTOS ping-pong ring buffers and native USB CDC/bulk endpoints with 16-bit CRC framing and monotonic sequence counters. In 60-second continuous soak tests, the transport sustained 10,839 raw records/s (9.019 Mb/s) with 0 CRC corruptions, 0 sequence skips, and 0 host drops.",
        facts: ["10,839 records/s", "60-second soak test", "0 CRC errors or gaps", "9.019 Mb/s sustained"],
        visual: "instrument",
      },
      {
        label: "DATA ORCHESTRATION",
        title: "Hardware-synchronized audio capture and crash-resilient chunked storage.",
        intent: "Build a reproducible, synchronized multi-modal dataset pairing physical RF phase disturbances directly with calibrated acoustic ground truth.",
        body: "Supervised acoustic training requires exact temporal alignment between RF perturbations and acoustic waveforms. I developed a host-side collection daemon in Python that synchronizes dual microcontrollers with multi-channel audio input, streaming into crash-resilient chunked binary storage with index tables. This system compiled a corpus of 4.6 billion raw packets and 98 hours of paired audio on roughly $40 of total hardware.",
        facts: ["4.6B raw packets", "98 hours paired audio", "~$40 hardware BOM", "Sub-millisecond sync"],
        visual: "instrument",
      },
      {
        label: "EMPIRICAL RESULTS",
        title: "90% closed-set speaker recognition verified across 122 training runs.",
        intent: "Empirically benchmark whether deep neural networks can extract biometric speaker signatures directly from raw subcarrier phase differences.",
        body: "Over 400 hours of GPU compute across 122 training iterations, convolutional and recurrent architectures trained on preprocessed subcarrier spectrograms achieved 90% speaker identification accuracy in closed-set evaluations, as well as reliable voice-activity event detection. This confirmed that acoustic biometric signatures are preserved in multipath phase data despite environmental reflections.",
        facts: ["90% speaker ID", "122 training runs", "400 hours GPU compute", "VAD verified"],
        visual: "ledger",
      },
      {
        label: "SCIENTIFIC BOUNDARIES",
        title: "Speech classification is demonstrated; continuous waveform reconstruction remains open.",
        intent: "Define honest empirical boundaries between proven biometric classification and unproven arbitrary waveform synthesis.",
        body: "A foundational engineering principle is documenting limitations honestly. While speaker recognition and voice-activity detection are demonstrated, arbitrary acoustic waveform reconstruction (synthesizing continuous intelligible speech from raw RF alone) remains an unsolved research problem due to phase unwrapping ambiguities and hardware phase noise. Ongoing work focuses on spatial beamforming and antenna array diversity to improve SNR.",
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
        intent: "Eliminate the multi-thousand dollar barrier of precision industrial harmonic gearboxes by engineering accessible, backlash-adjustable belt drive transmissions.",
        body: "Traditional six-axis robot arms rely on expensive strain-wave (harmonic) or cycloidal gearboxes requiring sub-10-micron manufacturing tolerances. Vulcan V1 was conceived as an open-source mechanical architecture engineered around standard NEMA steppers, off-the-shelf GT2 timing belts, and FDM-printable structural parts, allowing makers and students to build a full 6-DOF manipulator without industrial CNC access.",
        facts: ["6 degrees of freedom", "Zero harmonic drives", "CAD design study", "Desktop printable"],
        visual: "model",
      },
      {
        label: "TRANSMISSION ARCHITECTURE",
        title: "Multi-stage synchronous belt drives with modular reduction ratios.",
        intent: "Provide high torque density and eliminate transmission backlash through pre-tensioned synchronous belts while allowing easy gear ratio re-tuning.",
        body: "Joints 1 through 4 utilize two-stage synchronous belt reductions (1:16 primary reduction) driven by NEMA 23 stepper motors. Unlike 3D-printed plastic gear teeth, which suffer from rapid abrasive wear and backlash, belts distribute load across multiple teeth simultaneously. Eccentric idler tensioners allow zero-backlash preload adjustment, while changing joint torque simply requires reprinting a drive pulley.",
        facts: ["1:16 main reduction", "Two-stage belt drive", "Eccentric tensioners", "Zero gear backlash"],
        visual: "model",
      },
      {
        label: "DIFFERENTIAL WRIST",
        title: "Decoupled 2-DOF wrist kinematics driven by dual rear-mounted NEMA 17s.",
        intent: "Minimize forearm inertia and cantilevered mass by relocating wrist actuation motors back toward the elbow.",
        body: "Joints 5 (pitch) and 6 (roll) are resolved through a bevel-gear differential wrist driven by two NEMA 17 motors mounted coaxially further back on the forearm. By driving both motors in the same direction, the wrist pitches; driving them in opposite directions rolls the tool flange. This design prevents heavy motor mass from concentrating at the end-effector, substantially reducing required holding torque for upstream joints.",
        facts: ["Differential wrist", "Dual NEMA 17", "Coaxial forearm mounting", "Reduced link inertia"],
        visual: "model",
      },
      {
        label: "STRUCTURAL KINEMATICS",
        title: "Targeted torque curves matched joint load distributions.",
        intent: "Size motor torque and structural cross-sections according to worst-case cantilever bending moments during maximum reach extensions.",
        body: "Static load analysis across the arm kinematic envelope established target holding torques: 31–32 N·m on high-load joints 1–3, 10.28 N·m on joint 4, and 7.2 N·m on the wrist. Structural members incorporate ribbed internal infill geometries and counterbalanced shoulder geometry to offset gravitational cantilever moments.",
        facts: ["31–32 N·m · J1–J3", "10.28 N·m · J4", "7.2 N·m · J5–J6", "Ribbed load distribution"],
        visual: "model",
      },
      {
        label: "V2 REDESIGN",
        title: "V1 established the kinematic baseline; V2 focuses on aggressive cost reduction.",
        intent: "Translate lessons from V1 CAD tolerance analyses into a simplified, lower-part-count V2 architecture targeting one-third the projected BOM cost.",
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
        intent: "Maximize material reuse by salvaging functional extrusions, stepper motors, and electronics from two broken Ender 3s into an expanded large-format Cartesian platform for under $20.",
        body: "Standard desktop 3D printers are bounded by ~220 × 220 mm beds, while commercial large-format machines cost thousands. Salvaging structural extrusions, leadscrews, stepper motors, and motion hardware from two discarded Ender 3 units, I engineered an expanded Cartesian platform achieving an expansive 585 × 775 × 230 mm build volume with just $16 in new expenditure for timing belts and plywood.",
        facts: ["2 donor printers salvaged", "585 × 775 × 230 mm envelope", "$16 new material BOM", "Over 3× standard volume"],
        visual: "model",
      },
      {
        label: "STRUCTURAL MECHANICS",
        title: "Dual-motor leadscrew synchronization across an oversized 775 mm span.",
        intent: "Eliminate gantry sag, racking, and resonance induced by doubling structural beam lengths.",
        body: "Doubling gantry spans exposes Cartesian machines to severe torsion and beam deflection under acceleration. The frame was reinforced using spliced 4040 aluminum extrusions with internal steel alignment dowels, while the Y and Z axes were upgraded to dual-motor, dual-leadscrew synchronization. Bed mounting brackets were widened to prevent cantilevering during heavy bed movement.",
        facts: ["4040 extrusion splice", "Dual Z leadscrews", "Dual motor drive", "Reinforced gantry"],
        visual: "model",
      },
      {
        label: "FIRMWARE CALIBRATION",
        title: "Custom Marlin firmware with 12 × 18 bilinear bed compensation mesh.",
        intent: "Compensate for unavoidable surface height non-uniformities across large non-cast aluminum beds.",
        body: "Large-format heated beds inevitably exhibit thermal warping and mechanical runout that standard 3x3 bed leveling cannot resolve. I compiled custom Marlin firmware for the Creality 4.2.2 32-bit board, configuring calibrated microstepping, acceleration curves, and an extensive 12 × 18 point bilinear probe mesh that dynamically interpolates nozzle height across all 4,533 cm² of print area.",
        facts: ["Creality 4.2.2 32-bit", "12 × 18 bilinear mesh", "Custom Marlin build", "Dynamic height mapping"],
        visual: "model",
      },
      {
        label: "MATERIALS & BUDGET",
        title: "Documented 64 hours of hands-on build time on a $16 new material budget.",
        intent: "Demonstrate rigorous project accounting and resourcefulness by achieving full machine operation using salvaged components.",
        body: "The project engineering log documents 64 hours of fabrication, assembly, wiring, and tuning. Total incremental capital expenditure was held to $16 (replacement timing belts and bed plywood). All other structural extrusions, power supplies, stepper motors, and wiring harnesses were reclaimed and reconditioned from donor units.",
        facts: ["64 hours build log", "$16 incremental budget", "Salvage engineering", "Documented BOM"],
        visual: "media",
      },
      {
        label: "PUBLIC DEMO & PLOTTER",
        title: "Modular toolhead conversion for live demonstration at Open Sauce.",
        intent: "Demonstrate multi-tool flexibility by adapting the oversized motion platform into a high-speed precision pen plotter for continuous live public exhibition.",
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
    deck: "Engineering captaincy coordinating mechanical design, closed-loop swerve drive programming, competition operations, and community outreach for a 40+ student FIRST Robotics team.",
    accent: "#b95c6b",
    beats: [
      {
        label: "TECHNICAL LEADERSHIP",
        title: "Direction of 40+ students building 120-lb competitive industrial robots.",
        intent: "Execute systems engineering across five interdependent disciplines under rigid six-week design and fabrication deadlines.",
        body: "As captain of FRC Team 3598, I directed technical strategy and project management for 40+ high school students across mechanical, electrical, software, operations, and outreach. Every season demanded designing, modeling, machining, wiring, and tuning a 120-lb aluminum robot to withstand high-velocity full-contact field play.",
        facts: ["40+ student team", "120-lb robot classification", "6-week design-build cycle", "Cross-disciplinary oversight"],
        visual: "media",
      },
      {
        label: "SYSTEMS ENGINEERING",
        title: "Closed-loop swerve drive kinematics with CANcoder feedback.",
        intent: "Upgrade robot mobility from skid-steer tank drive to omnidirectional swerve kinematics with PID feedforward velocity tuning to reduce cycle times.",
        body: "Led the transition to independent coaxial swerve modules utilizing CTRE magnetic CANcoders, brushless motors, and WPILib kinematics. Developed PID velocity feedforward loops and field-oriented drive controls that eliminated wheel slip and reduced autonomous scoring cycle times by over 30%.",
        facts: ["Independent swerve", "CANcoder magnetic feedback", "PID velocity loops", "Field-oriented drive"],
        visual: "media",
      },
      {
        label: "DESIGN CAD REVIEWS",
        title: "Standardized CAD pipelines and tolerance-stacking reviews.",
        intent: "Prevent costly fabrication delays by enforcing CAD-first design validation and standardized fastener inventories.",
        body: "Instituted formal weekly CAD design reviews in Onshape, checking gear meshing tolerances, belt clearances, and center-of-gravity balance before cutting metal. Established standardized fastener BOMs and CNC router CAM templates that cut manufacturing turnaround times in half.",
        facts: ["Onshape CAD reviews", "Standardized BOM", "CAM templates", "Tolerance verification"],
        visual: "media",
      },
      {
        label: "COMPETITION OUTCOMES",
        title: "District championship qualification and the FIRST Impact Award.",
        intent: "Deliver peak operational performance on the competition field while proving holistic team excellence.",
        body: "Under this leadership framework, the team achieved playoff qualification at multiple regional events, qualified for the Northern California District Championship, and earned the FIRST Impact Award—the organization's highest honor recognizing culture, engineering sustainability, and community impact.",
        facts: ["FIRST Impact Award", "District qualification", "World Championship berth", "Playoff captain"],
        visual: "media",
      },
      {
        label: "COMMUNITY IMPACT",
        title: "Documented STEM outreach reaching 4,452 students.",
        intent: "Democratize hands-on engineering education across underserved schools and community libraries.",
        body: "Spearheaded community engineering initiatives including hands-on robotics workshops, public library exhibitions, elementary school demonstrations, and STEM mentorship programs that collectively reached 4,452 students across the greater Sacramento region.",
        facts: ["4,452 students reached", "Workshops & demos", "Community partnerships", "Sacramento region"],
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
