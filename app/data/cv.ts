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
    "Undergraduate Computer Science and Engineering student at UC Davis operating at the intersection of bare-metal firmware, robotics kinematics, RF sensing, and mechanical fabrication. Focused on building reliable, verifiable systems from first principles.",
  education: [
    {
      institution: "University of California, Davis",
      detail: "B.S. Computer Science and Engineering · expected Jun 2030",
    },
  ],
  skills: [
    { label: "Languages", items: "C / C++ · Python · Rust · x86 Assembly · Java · C# · TypeScript / JavaScript · SQL · HTML / CSS" },
    { label: "Embedded & Systems", items: "ESP32 / ESP-IDF · native USB bulk · FreeRTOS · Linux · bootloaders · logic analyzers · oscilloscopes · GDB · Docker" },
    { label: "ML & Signal Processing", items: "PyTorch · CUDA · MONAI · TorchIO · STFT spectrograms · classification · model fine-tuning · computer vision" },
    { label: "CAD & Kinematics", items: "Creo · SolidWorks · Onshape · GT2 synchronous belt reduction · cycloidal drives · differential wrists" },
    { label: "Fabrication & Hardware", items: "CNC machining · manual milling · 3D printing (FDM, SLA) · TIG/MIG welding · solder rework · electrical schematics" },
  ],
  experience: [
    {
      title: "UCSC Science Internship Program",
      role: "Research intern",
      meta: "Wi-Fi CSI sensing / machine learning / summer 2025",
      intent: "Evaluate whether ambient sound pressure waves vibrating physical surfaces impart measurable phase and amplitude shifts onto commodity 802.11 subcarriers.",
      summary: "Nine-week research internship with graduate researchers investigating physical-layer Wi-Fi channel-state information (CSI) for acoustic detection, discovering kernel-level sampling bottlenecks that inspired the independent hardware continuation.",
      proof: "Constructed deep-learning classification pipelines on Linux Atheros NICs; diagnosed that standard OS network polling introduced variable scheduling jitter and dropped up to 30% of high-rate packets, establishing the technical roadmap for dedicated microcontroller capture.",
      route: "/projects/csi",
      dossier: {
        intent: "Test feasibility of extracting acoustic speech signatures from commodity 802.11 OFDM multipath disturbances and isolate physical sampling limits.",
        architecture: "Captured physical-layer 802.11 CSI subcarrier matrices across 2.4 GHz and 5 GHz bands to evaluate micro-Doppler and amplitude perturbations induced by ambient acoustic vibrations. Built spectrogram preprocessing and deep-learning classification pipelines.",
        stack: ["Wi-Fi CSI Tool (Linux Atheros)", "PyTorch", "NumPy / SciPy", "STFT Spectrograms", "RF Testing Hardware"],
        metrics: [
          "9-week intensive research under graduate mentors",
          "Identified Linux NIC kernel packet-loss bottleneck (up to 30% drops at >1 kHz)",
          "Formulated the research proposal for dedicated microcontroller capture, directly spawning the independent CSI research continuation",
        ],
        keyDecisions: [
          "Identified that commodity OS networking stacks introduce timing jitter unsuitable for acoustic reconstruction, defining the hardware requirements for the subsequent ESP32 pipeline.",
          "Benchmarked CNN vs. spectrogram classification baselines on raw CSI subcarrier matrices.",
        ],
        relatedRoute: "/projects/csi",
        relatedRouteLabel: "Explore independent CSI project →",
      },
    },
    {
      title: "CSI Research",
      role: "Researcher / embedded systems builder",
      meta: "Embedded sensing / machine learning / ongoing research",
      intent: "Engineer a bare-metal ESP32 capture pipeline with native USB transport (10,839 records/s) to prove audio activity detection and speaker recognition on $40 of hardware.",
      summary: "Engineered bare-metal ESP32 firmware, high-throughput native USB bulk transport, synchronized collection daemon, and deep-learning classifiers to evaluate RF acoustic sensing on sub-$5 silicon.",
      proof: "Compiled 4.6 billion packets and 98 hours of synchronized audio; achieved 90% speaker recognition across 400 hours of training on 122 runs; sustained 10,839 records/s with 0 drops over native USB on $40 total BOM.",
      route: "/projects/csi",
      dossier: {
        intent: "Overcome UART and OS kernel bandwidth ceilings to stream uncompressed CSI frames at maximum physical packet arrival rates.",
        architecture: "Embedded ESP32 firmware capturing Wi-Fi channel-state information (CSI) streamed over high-throughput native USB with CRC/sequence validation, paired with synchronized multi-channel audio recording and a PyTorch ML classification pipeline.",
        stack: ["ESP32-S3 / C6 (ESP-IDF)", "C / C++", "Native USB Transport", "Python / PyTorch", "CUDA", "Crash-resilient Chunked Storage"],
        metrics: [
          "4.6 billion packets captured",
          "98 hours of synchronized audio corpus",
          "400 hours of training across 122 training runs",
          "90% speaker recognition accuracy achieved",
          "10,839 records/s sustained throughput with 0 packet drops or CRC errors",
          "$40 total bill of materials",
        ],
        keyDecisions: [
          "Switched from UART to native USB bulk endpoints to overcome the 921.6k baud rate ceiling, achieving 10,839 records/s.",
          "Engineered custom binary packet framing with 16-bit CRC and monotonically increasing sequence counters to detect dropped or corrupted frames in hardware.",
          "Separated high-rate packet capture into dual-core ESP32 tasks with ping-pong ring buffers to prevent memory starvation.",
        ],
        relatedRoute: "/projects/csi",
        relatedRouteLabel: "View full CSI research page →",
      },
    },
    {
      title: "Vulcan",
      role: "Mechanical designer",
      meta: "Mechanical design / open-source robotics / V1 documented",
      intent: "Design a complete 6-DOF robotic arm CAD architecture utilizing accessible multi-stage belt reductions and printable chassis to bypass expensive industrial gearboxes.",
      summary: "Designed an open-source six-axis articulated robot arm around two-stage synchronous belt drives, decoupled differential wrist, and 3D-printable structural components.",
      proof: "Completed full CAD assembly, joint torque calculations (31–32 N·m J1–J3, 10.28 N·m J4, 7.2 N·m wrist), and technical zine. V1 CAD study completed; V2 redesign in progress to cut projected BOM cost by two-thirds.",
      route: "/projects/vulcan",
      dossier: {
        intent: "Eliminate expensive strain-wave harmonic gearboxes by engineering zero-backlash pre-tensioned belt drives.",
        architecture: "Complete mechanical engineering design study for a 6-axis articulated robotic arm utilizing NEMA stepper motors, multi-stage synchronous belt reductions, a 3D-printable modular chassis, and an integrated differential wrist mechanism.",
        stack: ["Creo", "SolidWorks", "Onshape", "CAD Assembly Kinematics", "GT2 Belt Transmissions", "Finite Element Analysis"],
        metrics: [
          "6 degrees of freedom articulated kinematic chain",
          "1:16 primary joint belt reduction with zero backlash preload adjustment",
          "Full engineering design record, assembly guide, and printable parts catalog",
        ],
        keyDecisions: [
          "Selected synchronous timing belts over planetary gearboxes to eliminate backlash while maintaining accessible fabrication on desktop FDM 3D printers.",
          "Integrated counterbalancing geometry into the shoulder casting to reduce motor holding torque during reach extensions.",
          "Established V1 as a comprehensive CAD design study to evaluate joint stiffness before committing capital to V2 physical fabrication.",
        ],
        relatedRoute: "/projects/vulcan",
        relatedRouteLabel: "View full Vulcan project page →",
      },
    },
    {
      title: "Ender3-2",
      role: "Builder / firmware author",
      meta: "Fabrication / firmware / physical build",
      intent: "Salvage usable motion components from two discarded Ender 3s into an expanded 585 × 775 × 230 mm Cartesian platform for <$20 with custom firmware.",
      summary: "Reconstructed usable extrusions, leadscrews, and steppers from two non-functional Ender 3s into a large-format Cartesian machine with custom Marlin firmware, 12 × 18 bed leveling mesh, and modular plotter toolhead.",
      proof: "Physically built and demonstrated at Open Sauce maker festival; documented 64 hours of hands-on fabrication and $16 in incremental expenditure.",
      route: "/projects/ender3-2",
      dossier: {
        intent: "Triple the build envelope of consumer Cartesian printers using salvaged materials while maintaining structural rigidity.",
        architecture: "Physical machine salvage and reconstruction combining components from two decommissioned Ender 3 printers into an expanded-format Cartesian CNC platform. Custom Marlin/Klipper firmware configuration with calibrated stepper step-timings and custom printhead carriage.",
        stack: ["Cartesian CNC Mechanics", "Marlin / Klipper Firmware", "C / C++", "V-slot Extrusions & Lead Screws", "3D Printing & Laser Plotting Tools"],
        metrics: [
          "585 × 775 × 230 mm expanded build envelope (over 3× standard volume)",
          "~$16 total incremental hardware cost using salvaged extrusions and fasteners",
          "Demonstrated live at Open Sauce maker festival as both a large-format 3D printer and precision pen plotter",
        ],
        keyDecisions: [
          "Spliced and reinforced 2020/2040 aluminum extrusions with internal steel alignment pins to maintain structural rigidity over extended spans.",
          "Repurposed dual Z-axis stepper drivers in parallel to prevent gantry sagging across the 775 mm span.",
          "Engineered modular quick-swap toolhead mounts allowing conversion between Bowden hotend extrusion and spring-loaded plotting pens in under 2 minutes.",
        ],
        relatedRoute: "/projects/ender3-2",
        relatedRouteLabel: "View full Ender3-2 project page →",
      },
    },
    {
      title: "Team 3598",
      role: "Former captain",
      meta: "Technical leadership / competitive robotics / outreach",
      intent: "Direct systems engineering, closed-loop swerve drive kinematics, and community outreach for a 40+ student FRC robotics team building 120-lb competitive robots.",
      summary: "Directed technical strategy, mechanical design reviews, swerve drive programming, and competition execution for a 40+ student competitive robotics organization.",
      proof: "Earned the FIRST Impact Award and World Championship berth; transitioned team drive platform to closed-loop CANcoder swerve; documented outreach reaching 4,452 students across Sacramento.",
      route: "/projects/team-3598",
      dossier: {
        intent: "Standardize engineering workflows and transition robot base to high-agility omnidirectional swerve kinematics.",
        architecture: "Technical direction, systems engineering, mechanical design, software architecture, and outreach coordination for a 40+ student competitive robotics organization building 120-lb industrial robots under strict 6-week build seasons.",
        stack: ["FRC Java / WPILib", "CAN Bus / CANcoder", "Swerve Drive Kinematics", "Onshape / CAD", "CNC Router / Manual Mill / TIG Welding", "PID / Feedforward Control"],
        metrics: [
          "40+ students coordinated across 5 specialized subteams",
          "FIRST Impact Award winner & World Championship qualification",
          "STEM outreach programs documented reaching 4,452 students across Northern California",
        ],
        keyDecisions: [
          "Transitioned team drive platform to independent swerve modules with closed-loop CANcoders and PID velocity feedforward, improving autonomous cycle times by 35%.",
          "Instituted rigorous CAD-first design reviews and standardized fastener BOMs to eliminate fabrication bottlenecks during build season.",
          "Authored detailed student training curriculums in CAD modeling, basic shop safety, and Java robot programming.",
        ],
        relatedRoute: "/projects/team-3598",
        relatedRouteLabel: "View full Team 3598 page →",
      },
    },
  ] as CvRecord[],
  additionalExperience: [
    {
      title: "Parkinson's DaTscan classification",
      role: "Machine learning competitor",
      meta: "3D medical imaging / validation-driven modeling / 2026–present",
      intent: "Build an ensemble 3D CNN deep learning pipeline with patient-stratified cross-validation to classify dopamine transporter SPECT scans without data leakage, ranking top 2.7% globally.",
      summary: "Engineered deep learning pipelines for 3D DaTscan (dopamine transporter SPECT) classification, applying volumetric intensity normalization, striatum bounding-box alignment, spatial attention, and ensemble model averaging.",
      proof: "Ranked 23rd of 864 registered international competitors (top 2.7%) using multi-fold patient-stratified cross-validation.",
      dossier: {
        intent: "Classify neurodegenerative dopamine transporter SPECT scans accurately without patient-level data leakage across multi-session scans.",
        architecture: "Machine learning pipeline for 3D DaTscan (dopamine transporter SPECT imaging) classification. Pipeline encompasses 3D volumetric intensity normalization, striatum bounding-box alignment, 3D convolutional neural networks with spatial attention, and ensemble prediction.",
        stack: ["Python", "PyTorch", "MONAI", "TorchIO", "Scikit-Learn", "CUDA / TensorRT", "NumPy / Pandas"],
        metrics: [
          "Ranked 23rd of 864 registered international competitors (top 2.7%)",
          "Multi-fold stratified cross-validation preserving zero patient leakage",
          "Achieved competitive ROC-AUC and F1 scores against established medical benchmarks",
        ],
        keyDecisions: [
          "Enforced patient-level stratified splitting across folds to prevent cross-contamination between baseline and follow-up scans from the same subject.",
          "Integrated 3D test-time augmentation (TTA) with subtle affine rotations and intensity jittering to improve generalization on low-signal SPECT volumes.",
          "Blended predictions from dual-backbone 3D architectures (ResNet3D and DenseNet3D) to capture both fine striatal asymmetry and broader brain background intensity.",
        ],
      },
    },
    {
      title: "Hybrid language-model research",
      role: "Independent researcher",
      meta: "Efficient cross-architecture diffusion / 2026–present",
      intent: "Explore representation transfer and latent diffusion between disparate LLM architectures using learned low-rank projection bottlenecks and JEPA/DINO self-supervised objectives.",
      summary: "Conducted experiments in cross-architecture knowledge distillation and latent diffusion between language models of varying scales and parameterizations.",
      proof: "Repurposed JEPA and DINO self-supervised objectives across non-identical hidden dimension topologies; monitored layer-wise KL divergence and cosine alignment.",
      dossier: {
        intent: "Transfer latent feature spaces between disparate transformer models without requiring full retraining or representation collapse.",
        architecture: "Independent exploration into cross-architecture representation alignment and latent diffusion between disparate large language models. Repurposing Joint-Embedding Predictive Architecture (JEPA) and self-supervised DINO techniques to transfer latent feature spaces without full retraining.",
        stack: ["Python", "PyTorch", "Hugging Face Transformers", "Accelerate", "DeepSpeed", "Custom Attention Probes"],
        metrics: [
          "Evaluated cross-layer representation alignment across 7B to 13B parameter architectures",
          "Monitored layer-wise KL divergence and cosine similarity across intermediate hidden states",
          "Observed reduced loss in target models without destructive catastrophic forgetting",
        ],
        keyDecisions: [
          "Employed learned low-rank projection bottlenecks to map non-identical hidden-dimension manifolds before computing loss functions.",
          "Used stop-gradient teacher-student dynamics to prevent representation collapse in the cross-attention mapping layers.",
          "Benchmarked zero-shot reasoning retention on downstream tasks to ensure distilled models preserved semantic breadth.",
        ],
      },
    },
    {
      title: "Low-cost 3D-printed robotic joints",
      role: "Mechanical designer",
      meta: "Integrated joints / torque density / 2026–present",
      intent: "Design modular planetary and cycloidal robotic actuator joints fabricated on consumer 3D printers with perimeter-parallel herringbone teeth to eliminate axial thrust and layer shear.",
      summary: "Engineered compact modular robotic actuator joints combining high-reduction planetary and cycloidal gear stages designed for direct fabrication on desktop 3D printers.",
      proof: "Achieved 15:1 and 24:1 reduction stages with sub-0.3° backlash and integrated BLDC motor and AS5600 magnetic encoder packaging for under $35 per joint.",
      dossier: {
        intent: "Overcome anisotropic layer weakness in FDM-printed gears while packing high gear reductions into 75 mm actuator envelopes.",
        architecture: "Modular robotic actuator joints combining high-reduction compound planetary and cycloidal transmissions designed for direct fabrication on consumer FDM 3D printers. Integrated thin-section bearings, captive fastener seats, and brushless DC motor packaging.",
        stack: ["Onshape", "SolidWorks", "Bambu Studio", "PETG-CF & PA-CF Filament", "BLDC Actuators", "AS5600 Magnetic Encoders"],
        metrics: [
          "15:1 and 24:1 gear reduction ratios packed inside compact 75 mm diameter housings",
          "Sub-0.3° backlash achieved through tuned tooth offset and compliant bearing races",
          "Under $35 total bill of materials per actuator joint (motor, encoder, bearings, printed parts)",
        ],
        keyDecisions: [
          "Oriented critical gear tooth perimeters parallel to the build plate to maximize tensile hoop strength and eliminate delamination along layer lines.",
          "Selected modified herringbone tooth profiles to eliminate axial thrust forces, removing the need for expensive dual-thrust bearing setups.",
          "Engineered integrated cable pass-through conduits through the joint center-axis to prevent wire binding during continuous 360° rotation.",
        ],
      },
    },
    {
      title: "SMUD Solar Regatta",
      role: "Programming captain",
      meta: "Embedded control / competition boat / 2025",
      intent: "Reverse-engineer undocumented legacy C# libraries and design noise-filtered throttle/steering controls for a competition solar boat, achieving 100% race-day telemetry uptime.",
      summary: "Led embedded software and power telemetry for a solar-powered competition boat, reverse-engineering undocumented C# controller libraries and authoring electronic throttle logic.",
      proof: "Isolated a ground-loop sensor timeout across 48V motor and 12V logic buses; sustained 100% race telemetry uptime with 18% reserve battery capacity via dynamic throttle power-capping.",
      dossier: {
        intent: "Bypass proprietary throttle latency limits and eliminate motor electrical noise coupling into telemetry.",
        architecture: "Embedded telemetry, electronic throttle control, and digital steering logic for a full-scale solar-powered endurance racing boat. Reverse-engineered proprietary serial/CAN bus controller protocols to interface solar charge controllers with marine motor inverters.",
        stack: ["C# / .NET Micro Framework", "CAN Bus / RS-485", "C / Embedded Systems", "Digital Oscilloscope & Logic Analyzer", "Solar MPPT Controllers"],
        metrics: [
          "100% telemetry uptime during competition heats with zero sensor signal loss",
          "18% battery capacity reserve maintained through dynamic solar-yield throttle capping",
          "Authored comprehensive cross-team electrical and software interface schematics",
        ],
        keyDecisions: [
          "Decompiled and reverse-engineered undocumented legacy manufacturer C# control libraries to bypass hardcoded throttle latency limits.",
          "Diagnosed and eliminated an elusive intermittent sensor timeout by tracking down electrical ground loops between the 48V motor pack and 12V logic bus.",
          "Implemented software low-pass filtering and hysteresis on hall-effect throttle inputs to eliminate watercraft wake vibration oscillations.",
        ],
      },
    },
    {
      title: "Custom operating system & language",
      role: "Independent systems builder",
      meta: "Bootloader / OS prototype / programming language / 2024",
      intent: "Build a bare-metal two-stage x86 bootloader, protected-mode kernel, and stack-based bytecode virtual machine to master hardware interrupts and memory registers from first principles.",
      summary: "Developed a two-stage x86 bootloader, protected-mode kernel prototype, and custom stack-based bytecode virtual machine and compiler.",
      proof: "Implemented a playable Snake game directly in bare-metal x86 assembly to validate timer ISRs and direct video buffer writes (0xB8000), directly informing later high-rate ESP32 firmware optimization.",
      dossier: {
        intent: "Master CPU protected-mode switching, GDT/IDT register setups, and memory layout at the bare-metal hardware level.",
        architecture: "Two-stage bare-metal x86 bootloader, protected-mode kernel prototype, and custom stack-based bytecode compiler and virtual machine. Direct hardware interfacing for VGA text mode (0xB8000), 8259 PIC interrupt remapping, and PS/2 keyboard scanning.",
        stack: ["x86 Assembly (NASM)", "C", "QEMU / GDB", "Custom Lexer & Recursive-Descent Parser", "Makefile Toolchain"],
        metrics: [
          "Two-stage bootloader fitting strictly within the 512-byte MBR sector",
          "Sub-100ms cold boot execution in QEMU emulator",
          "Playable Snake game written entirely in raw x86 assembly to validate ISRs and direct video buffer writes",
        ],
        keyDecisions: [
          "Implemented a playable Snake game directly in raw Assembly to verify hardware timer interrupts (IRQ0) and VGA character memory manipulation before writing C abstractions.",
          "Built a minimal stack-based virtual machine and bytecode interpreter from scratch to master stack frames, pointer arithmetic, and calling conventions.",
          "Applied the resulting low-level memory layout and ISR timing knowledge directly to subsequent ESP32 high-speed USB firmware optimization.",
        ],
      },
    },
    {
      title: "Hackathons & exhibitions",
      role: "Builder / exhibitor",
      meta: "Rapid prototyping / public demos",
      intent: "Rapidly prototype computer vision kinematics under tight time constraints, building a 5-axis gesture-controlled arm in 72 hours and delivering 8+ hours of uninterrupted public demos at Open Sauce.",
      summary: "Built a five-axis gesture-controlled robotic arm in 72 hours using computer vision and serial kinematics; exhibited as an independent maker at Open Sauce with live interactive hardware installations.",
      proof: "Integrated MediaPipe hand tracking with dead-zone smoothing over serial; sustained 8+ hours of continuous hands-on public interaction with zero mechanical failures.",
      dossier: {
        intent: "Build robust, fail-safe physical computing systems capable of surviving continuous live public interaction.",
        architecture: "Rapid-turnaround hardware and software prototyping under tight time constraints. Built a 5-axis gesture-controlled robotic arm in 72 hours, an interactive plotter and hardware installation exhibited at Open Sauce, and physics prototypes for competitive game jams.",
        stack: ["Python", "OpenCV & MediaPipe", "Arduino / C++", "Laser Cutting & FDM 3D Printing", "Serial Telemetry", "Pygame / Godot"],
        metrics: [
          "72-hour continuous development sprint for gesture-controlled 5-axis arm",
          "8+ hours of continuous hands-on public interaction at Open Sauce maker festival with zero mechanical failures",
          "Ranked submissions in timed game jams with custom mechanics and physics",
        ],
        keyDecisions: [
          "Integrated MediaPipe landmark smoothing and dead-zone filtering to eliminate servo jitter when tracking human hand gestures via webcam.",
          "Used interlocking laser-cut acrylic and compliant 3D-printed snap-fits to enable rapid joint repairs during live public maker exhibitions.",
          "Prioritized modular software state machines to handle graceful degradation whenever camera tracking or hardware power fluctuates.",
        ],
      },
    },
  ] as CvRecord[],
  contact: "williamnzive2007@gmail.com",
};
