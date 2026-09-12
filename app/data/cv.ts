export type TechnicalDossier = {
  intent: string;
  architecture: string;
  stack: string[];
  metrics: string[];
  keyDecisions: string[];
  relatedRoute?: string;
  relatedRouteLabel?: string;
};

export type CvRecord = {
  title: string;
  role: string;
  meta: string;
  intent?: string;
  summary: string;
  proof: string;
  route?: string;
  dossier?: TechnicalDossier;
};

export const cv = {
  name: "William Nzive",
  headline: "Computer Science & Engineering student at UC Davis building embedded software, robotics, and physical systems.",
  summary:
    "Undergraduate Computer Science and Engineering student at UC Davis working across embedded firmware, robotics kinematics, RF sensing, and mechanical fabrication.",
  education: [
    {
      institution: "University of California, Davis",
      detail: "B.S. Computer Science and Engineering · Expected June 2030",
    },
    {
      institution: "School of Engineering and Sciences",
      detail: "High School Diploma, Salutatorian · 2026",
    },
  ],
  skills: [
    { label: "Languages", items: "Python · C · C++ · Rust · Assembly · Java · C# · SQL · JavaScript" },
    { label: "ML / AI", items: "CUDA · model construction & training · fine-tuning · computer vision · signal processing · RAG · model evaluation" },
    { label: "Systems", items: "ESP32 · ESP-IDF · Linux · firmware optimization · networking · Docker · Git · bootloaders · operating systems" },
    { label: "Engineering", items: "Creo · SolidWorks · Onshape · KiCad · CNC machining · 3D printing · MIG/TIG welding" },
  ],
  experience: [
    {
      title: "UCSC Science Internship Program",
      role: "Research intern",
      meta: "Wi-Fi CSI sensing / machine learning / summer 2025",
      intent: "Investigate whether commodity Wi-Fi channel-state information can detect audio activity and sound vibrations.",
      summary: "Nine-week research internship with graduate researchers focused on Wi-Fi channel-state information (CSI), sensing, and machine learning. Proposed an original direction using Wi-Fi signals for audio sensing.",
      proof: "Built deep-learning pipelines, configured experiments, collected data, and evaluated classification performance; identified packet sampling as the primary experimental bottleneck, creating the roadmap for independent continuation.",
      route: "/projects/csi",
      dossier: {
        intent: "Test feasibility of extracting acoustic signals from commodity 802.11 channel-state information and isolate experimental limits.",
        architecture: "Captured physical-layer 802.11 CSI subcarrier matrices to evaluate perturbations induced by ambient acoustic vibrations. Built spectrogram preprocessing and deep-learning classification pipelines.",
        stack: ["Wi-Fi CSI Tool (Linux)", "PyTorch", "NumPy / SciPy", "STFT Spectrograms", "RF Testing Hardware"],
        metrics: [
          "9-week intensive research under graduate mentors",
          "Proposed original research direction using Wi-Fi signals for audio sensing",
          "Identified packet sampling rate as primary bottleneck, setting roadmap for independent continuation",
        ],
        keyDecisions: [
          "Demonstrated that standard operating-system network stacks introduce timing jitter unsuitable for high-frequency acoustic sensing.",
          "Benchmarked deep-learning classification pipelines on raw CSI subcarrier matrices and spectrogram representations.",
        ],
        relatedRoute: "/projects/csi",
        relatedRouteLabel: "Explore independent CSI project →",
      },
    },
    {
      title: "Wi-Fi CSI Audio Sensing",
      role: "Independent researcher / embedded systems builder",
      meta: "Embedded sensing / machine learning / 2025–present",
      intent: "Rework embedded firmware and capture pipeline to achieve high-rate sampling and demonstrate speaker recognition on low-cost hardware.",
      summary: "Continued the SIP project independently, developing a low-cost ESP32-based system for extracting audio information from RF channel-state measurements.",
      proof: "4.6 billion packets captured, 98 hours of audio, 400 hours of training across 122 training runs, achieving 90% speaker recognition on $40 of hardware (validated at 10,839 records/s with 0 drops).",
      route: "/projects/csi",
      dossier: {
        intent: "Overcome standard Wi-Fi abstraction limits to stream uncompressed CSI frames at maximum physical packet arrival rates.",
        architecture: "Embedded ESP32 firmware capturing Wi-Fi channel-state information (CSI) streamed over high-throughput native USB with CRC and sequence validation, paired with synchronized audio recording and a PyTorch ML classification pipeline.",
        stack: ["ESP32-S3 / C6 (ESP-IDF)", "C / C++", "Native USB Transport", "Python / PyTorch", "CUDA", "Chunked Storage"],
        metrics: [
          "4.6 billion packets captured",
          "98 hours of synchronized audio corpus",
          "400 hours of training across 122 training runs",
          "90% speaker recognition accuracy achieved",
          "10,839 records/s sustained throughput with 0 packet drops or CRC errors",
          "Increased capture rate from ~300 to 7,000+ packets/s",
          "$40 total hardware cost",
        ],
        keyDecisions: [
          "Switched from standard UART to native USB bulk endpoints to sustain 10,839 records/s without packet drops.",
          "Engineered binary packet framing with CRC and monotonically increasing sequence counters to detect dropped or corrupted frames in hardware.",
          "Built synchronized CSI and audio collection pipeline with chunked binary storage and host-side orchestration.",
        ],
        relatedRoute: "/projects/csi",
        relatedRouteLabel: "View full CSI research page →",
      },
    },
    {
      title: "Vulcan",
      role: "Mechanical designer",
      meta: "Mechanical design / open-source robotics / 2025–2026",
      intent: "Design an open-source six-axis robotic arm CAD architecture utilizing accessible belt reductions, printable parts, and transparent engineering records.",
      summary: "Developed a low-cost, open-source large robotic arm, including CAD, component selection, bill of materials, and build documentation.",
      proof: "Completed full CAD assembly, joint calculations (31–32 N·m J1–J3, 10.28 N·m J4, 7.2 N·m wrist), and published technical zine. V1 CAD study complete; V2 in progress targeting ~1/3 of V1 cost.",
      route: "/projects/vulcan",
      dossier: {
        intent: "Replace expensive precision gearboxes with accessible synchronous belt reductions and 3D-printable structural components.",
        architecture: "Six-axis articulated robotic arm utilizing NEMA stepper motors, timing belt reductions, 3D-printable structural parts, and a differential wrist mechanism. First four axes use reduced NEMA 23 motors; wrist uses two NEMA 17 motors in a belted differential.",
        stack: ["Creo", "SolidWorks", "Onshape", "CAD Kinematics", "Timing Belt Transmissions", "Technical Zine"],
        metrics: [
          "6 degrees of freedom articulated kinematic chain",
          "1:16 main reduction stage on primary joints",
          "Target holding torques: ~31–32 N·m J1–J3, 10.28 N·m J4, 7.2 N·m J5–J6",
          "Complete V1 CAD assembly and technical documentation published",
          "V1 documented in CAD (not physically built); V2 in progress targeting ~1/3 V1 projected cost",
        ],
        keyDecisions: [
          "Selected timing belt reductions over commercial gearboxes so reprinting drive pulleys can tune the speed-torque tradeoff without replacing gearboxes.",
          "Engineered differential wrist driven by two rear-mounted NEMA 17 motors to reduce cantilevered link inertia at the end-effector.",
          "Established V1 as a comprehensive CAD design study and published technical zine before committing to physical manufacturing in V2.",
        ],
        relatedRoute: "/projects/vulcan",
        relatedRouteLabel: "View full Vulcan project page →",
      },
    },
    {
      title: "Ender3-2",
      role: "Builder / firmware author",
      meta: "Fabrication / firmware / 2026",
      intent: "Salvage usable mechanical and electrical components from two broken, basically e-waste Ender 3s into an expanded 585 × 775 × 230 mm Cartesian platform for ~$16 in new material.",
      summary: "Salvaged usable mechanical and electrical parts from two basically e-waste Ender 3s, restructuring them into a working Cartesian printer with an expanded 585 × 775 × 230 mm build volume.",
      proof: "Physically built and demonstrated live at Open Sauce; logged ~64 hours build time on a ~$16 new material budget.",
      route: "/projects/ender3-2",
      dossier: {
        intent: "Expand Cartesian build volume using salvaged e-waste parts while ensuring mechanical stability and bed level calibration.",
        architecture: "Cartesian machine reconstruction combining salvaged extrusions, motors, leadscrews, and controller from two decommissioned, basically e-waste Ender 3 printers into an expanded 585 × 775 × 230 mm platform. Custom live-editable firmware with a 12 × 18 bed probe mesh.",
        stack: ["Cartesian Mechanics", "Creality 4.2.2 Board", "Custom Firmware", "4040 Aluminum Extrusions", "Dual Lead Screws", "Machine Calibration"],
        metrics: [
          "585 × 775 × 230 mm machine build envelope",
          "~$16 total spent on new material (replacement belts and bed plywood)",
          "~64 hours of hands-on build time logged",
          "12 × 18 probe mesh for oversized bed leveling",
          "Demonstrated live at Open Sauce maker festival under continuous multi-hour operation",
        ],
        keyDecisions: [
          "Enlarged frame using extended 4040 aluminum extrusions and reinforced plywood bed with salvaged metal.",
          "Upgraded Y axis to dual lead screws and dual stepper motors for stability across the oversized span.",
          "Compiled custom live-editable firmware on Creality 4.2.2 controller with 12 × 18 mesh bed leveling.",
          "Ran continuous multi-hour live operations as an exhibition centerpiece at Open Sauce.",
        ],
        relatedRoute: "/projects/ender3-2",
        relatedRouteLabel: "View full Ender3-2 project page →",
      },
    },
    {
      title: "FRC Team 3598 — SEStematic Eliminators",
      role: "Team captain",
      meta: "Technical leadership / competitive robotics / 2025–2026",
      intent: "Coordinate mechanical design, manufacturing, electrical, programming, operations, and outreach across 5 working groups for a 40+ member team.",
      summary: "Led a 40+ member robotics team through design, fabrication, programming, electrical integration, competition preparation, and outreach across 5 working groups.",
      proof: "Earned FIRST Impact Award and qualified for FIRST World Championship; mentored students in Java, Git, CAD, machining, and 3D printing; documented outreach reached 4,452 students.",
      route: "/projects/team-3598",
      dossier: {
        intent: "Synchronize milestones across 5 subteams to build competition-ready robots and drive regional STEM impact.",
        architecture: "Engineering leadership and project management across mechanical design, fabrication, electrical wiring, Java robot programming, competition strategy, and community outreach for a 40+ member FRC robotics team.",
        stack: ["Java", "Git", "CAD (Onshape)", "CNC Machining", "3D Printing", "MIG/TIG Welding", "Electrical Integration"],
        metrics: [
          "40+ member team coordinated across 5 working groups (mechanical, electrical, software, operations, outreach)",
          "FIRST Impact Award winner & World Championship qualification",
          "District championship qualification across 3 competitions",
          "Outreach programs documented reaching 4,452 students across Sacramento",
        ],
        keyDecisions: [
          "Instituted synchronized sprint milestones across mechanical, electrical, software, operations, and outreach groups.",
          "Mentored team members directly in Java, Git, CAD modeling, manual/CNC machining, and 3D printing.",
          "Organized STEM outreach programs including hands-on workshops, school visits, library demonstrations, and community partnerships.",
        ],
        relatedRoute: "/projects/team-3598",
        relatedRouteLabel: "View full Team 3598 page →",
      },
    },
  ] as CvRecord[],
  additionalExperience: [
    {
      title: "Parkinson's DaTscan Classification",
      role: "Machine learning challenge competitor",
      meta: "3D medical imaging / ML pipeline / 2026–present",
      intent: "Build ML pipelines for 3D DaTscan classification using fold-based validation and held-out testing to prevent overfitting.",
      summary: "Built ML pipelines for 3D DaTscan classification, testing preprocessing, augmentation, learned image representations, routing, and model ensembles.",
      proof: "Ranked 23rd of 864 registered competitors (Top 2.7%) using fold-based validation and held-out testing.",
      dossier: {
        intent: "Develop robust classification pipelines for 3D dopamine transporter SPECT scans with rigorous validation.",
        architecture: "Machine learning pipeline for 3D DaTscan classification testing preprocessing, data augmentation, learned representations, model routing, and ensemble methods.",
        stack: ["Python", "PyTorch", "Scikit-Learn", "CUDA", "NumPy / Pandas", "Medical Image Processing"],
        metrics: [
          "Ranked 23rd of 864 registered competitors (Top 2.7%)",
          "Fold-based cross-validation and held-out test splits to prevent overfitting",
          "Systematic benchmarking of preprocessing, augmentation, and model ensembles",
        ],
        keyDecisions: [
          "Used fold-based validation and held-out testing to catch overfitting before carrying model changes forward.",
          "Systematically evaluated preprocessing and augmentation pipelines to improve generalization on 3D volumetric data.",
          "Tested model ensembling and representation routing to combine complementary predictive features.",
        ],
      },
    },
    {
      title: "Hybrid Language Model Research",
      role: "Independent researcher",
      meta: "Cross-architecture representation diffusion / 2026–present",
      intent: "Experiment with efficient diffusion between language models of different architectures and sizes using repurposed representation techniques.",
      summary: "Experimentation with efficient diffusion between language models of different architectures and sizes, repurposing techniques including JEPA and DINO to aid the diffusion process.",
      proof: "Compared language-model loss, KL divergence, intermediate representations, and model behavior across experiments.",
      dossier: {
        intent: "Investigate efficient representation transfer and diffusion between models with differing topologies.",
        architecture: "Experimental framework for studying latent diffusion and representation alignment between language models of varying architectures and sizes, incorporating principles from Joint-Embedding Predictive Architecture (JEPA) and DINO.",
        stack: ["Python", "PyTorch", "Transformers", "CUDA", "Representation Analysis Tools"],
        metrics: [
          "Evaluated representation alignment across distinct model architectures",
          "Tracked layer-wise loss, KL divergence, and intermediate hidden representations",
          "Compared behavioral outputs and semantic consistency across diffusion experiments",
        ],
        keyDecisions: [
          "Repurposed JEPA and DINO self-supervised techniques to guide and stabilize the cross-architecture diffusion process.",
          "Monitored intermediate representations and KL divergence alongside task loss to understand feature transfer dynamics.",
          "Compared model behavior across architecture boundaries to identify representation bottlenecks.",
        ],
      },
    },
    {
      title: "Low-Cost 3D-Printed Integrated Robotic Joints",
      role: "Mechanical designer",
      meta: "Actuator packaging / mechanical design / 2026–present",
      intent: "Develop low-cost integrated robotic joints built around 3D-printed components to increase torque capacity while keeping manufacturing inexpensive.",
      summary: "Developed low-cost integrated robotic joints built around 3D-printed components, iterating the joint, transmission, bearings, actuator packaging, and mechanical interfaces.",
      proof: "Designed and iterated joint transmissions, bearings, and motor packaging to maximize torque capacity within accessible 3D-printing constraints.",
      dossier: {
        intent: "Design functional, high-torque actuator joints that can be manufactured inexpensively on desktop 3D printers.",
        architecture: "Integrated robotic joint design incorporating mechanical transmissions, bearing assemblies, motor packaging, and structural interfaces optimized for 3D-printed fabrication.",
        stack: ["CAD (SolidWorks / Onshape)", "FDM 3D Printing", "Bearing Interfaces", "Actuator Packaging", "Mechanism Prototyping"],
        metrics: [
          "Iterated transmissions and bearing arrangements for increased torque capacity",
          "Designed for low-cost manufacturing using standard 3D printers and off-the-shelf hardware",
          "Modular mechanical interfaces for multi-axis robot integration",
        ],
        keyDecisions: [
          "Iterated bearing placement and transmission geometry to handle mechanical loads within 3D-printed structural limits.",
          "Integrated actuator packaging and wire routing directly into the joint housing.",
          "Optimized print orientation and interface tolerances to ensure repeatable fit without secondary machining.",
        ],
      },
    },
    {
      title: "SMUD Solar Regatta",
      role: "Programming captain",
      meta: "Embedded control / competition boat / 2025",
      intent: "Reverse-engineer poorly documented controller libraries and author steering and throttle logic for a solar competition boat.",
      summary: "Reverse-engineered poorly documented controller libraries in C# and wrote custom steering and throttle logic for a solar-powered competition boat.",
      proof: "Traced a sensor-interface failure across programming and electrical systems and used it to improve cross-team documentation.",
      dossier: {
        intent: "Deliver reliable steering and throttle control software while bridging programming and electrical subsystem interfaces.",
        architecture: "Embedded control software and telemetry integration for a solar-powered competition boat, interfacing custom C# steering and throttle control logic with onboard motor controllers and sensors.",
        stack: ["C#", "Embedded Systems", "Sensor Interfaces", "Diagnostic Tools", "Cross-team Schematics"],
        metrics: [
          "Reverse-engineered undocumented controller libraries to implement custom steering and throttle controls",
          "Diagnosed and resolved cross-subsystem sensor interface failure",
          "Established unified technical documentation between programming and electrical teams",
        ],
        keyDecisions: [
          "Reverse-engineered poorly documented C# libraries to gain direct control over boat steering and throttle dynamics.",
          "Traced sensor-interface failure across programming and electrical boundaries, identifying root causes in the physical interface.",
          "Authored comprehensive interface documentation to prevent cross-disciplinary integration issues during competition.",
        ],
      },
    },
    {
      title: "Custom Operating System & Programming Language",
      role: "Independent systems builder",
      meta: "Bootloader / OS prototype / systems / 2024",
      intent: "Build a bootloader, operating system prototype, and programming language to learn lower-level computer architecture through direct implementation.",
      summary: "Built a bootloader, operating-system prototype, and custom programming language while teaching myself lower-level computer architecture.",
      proof: "Implemented a simple Snake game within that OS in Assembly; used insights later in firmware optimization.",
      dossier: {
        intent: "Understand hardware-software boundaries, memory management, and interrupt handling by building an OS and language from scratch.",
        architecture: "Bare-metal bootloader, minimal operating-system kernel prototype, and custom programming language interpreter/compiler, complete with an Assembly game demo.",
        stack: ["Assembly", "C", "Bootloaders", "Computer Architecture", "Language Design"],
        metrics: [
          "Self-taught lower-level computer architecture through bare-metal implementation",
          "Playable Snake game implemented directly in Assembly within the custom OS",
          "Applied low-level systems insights to subsequent ESP32 firmware optimization",
        ],
        keyDecisions: [
          "Implemented the bootloader and kernel prototype from scratch to learn memory layout and hardware control without OS abstractions.",
          "Wrote a Snake game in Assembly to validate interrupt handling, input scanning, and display rendering.",
          "Directly transferred low-level register and memory lessons to high-throughput ESP32 USB firmware optimization.",
        ],
      },
    },
    {
      title: "Hackathons & Exhibitions",
      role: "Builder / exhibitor",
      meta: "Rapid prototyping / public exhibitions / 2025–2026",
      intent: "Rapidly prototype hardware and software systems under tight hackathon deadlines and exhibit working machines publicly.",
      summary: "Active participant in hardware hackathons and maker exhibitions, building rapid prototypes across microcontrollers, mechanics, and interactive software.",
      proof: "Exhibited as an independent maker at Open Sauce (2026); participated in Hack Club Outpost 72-Hour Hardware Hackathon (SF, 2026), Hack Club Fallout (2026), Hack Club Daydream Global Game Jam (2025), and Hack Club Shiba Arcade (2025).",
      dossier: {
        intent: "Execute end-to-end hardware and software prototypes under fixed, high-pressure hackathon constraints.",
        architecture: "Rapid prototyping across physical mechanisms, embedded electronics, and software under tight deadlines, including live public demonstrations.",
        stack: ["Microcontrollers", "3D Printing & Laser Cutting", "Rapid Prototyping", "C / C++", "Python", "Interactive Demos"],
        metrics: [
          "Open Sauce 2026 — Project Exhibitor (San Mateo, CA)",
          "Hack Club Outpost 2026 — 72-Hour Hardware Hackathon (San Francisco, CA)",
          "Hack Club Fallout 2026 — Hardware Hackathon Participant",
          "Hack Club Daydream 2025 — Global Game Jam",
          "Hack Club Shiba Arcade 2025 — Game Development / Arcade Program",
        ],
        keyDecisions: [
          "Prioritized resilient physical mechanisms and live-tunable code during timed hackathons to ensure reliable operation.",
          "Adapted hardware projects into interactive public demos for engaging crowds at Open Sauce.",
          "Iterated rapidly across mechanical, electrical, and software domains in multi-day build sprints.",
        ],
      },
    },
  ] as CvRecord[],
  contact: "williamnzive2007@gmail.com",
};
