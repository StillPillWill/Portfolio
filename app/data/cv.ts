export type TechnicalDossier = {
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
  summary: string;
  proof: string;
  route?: string;
  dossier?: TechnicalDossier;
};

export const cv = {
  name: "William Nzive",
  headline: "Computer Science & Engineering student at UC Davis building embedded software, robotics, and physical systems.",
  summary:
    "I study Computer Science and Engineering at UC Davis, working across embedded firmware, robotics kinematics, signal processing, and mechanical fabrication. I focus on building reliable systems from first principles.",
  education: [
    {
      institution: "University of California, Davis",
      detail: "Computer Science and Engineering student",
    },
  ],
  skills: [
    { label: "Languages", items: "Python · C / C++ · Rust · Assembly · Java · C# · SQL · TypeScript / JavaScript · HTML / CSS" },
    { label: "Systems", items: "ESP32 / ESP-IDF · embedded firmware · native USB · Linux · Docker · Git · bootloaders · data capture · host orchestration" },
    { label: "ML + research", items: "CUDA · signal processing · classification · model training · fine-tuning · computer vision · RAG · model evaluation · ComfyUI workflows" },
    { label: "Build", items: "Creo · SolidWorks · Onshape · KiCad · CAD · CNC machining · 3D printing · MIG/TIG welding · fabrication · technical documentation" },
    { label: "Hardware & Lab", items: "Oscilloscopes · logic analyzers · solder rework · power supplies · 3D printing · CNC · hand tools" },
  ],
  experience: [
    {
      title: "UCSC Science Internship Program",
      role: "Research intern",
      meta: "Wi-Fi CSI sensing / machine learning / summer 2025",
      summary: "Nine-week research internship with graduate researchers on Wi-Fi channel-state information, sensing, and machine learning. Proposed an original direction using Wi-Fi signals for audio sensing.",
      proof: "Built deep-learning pipelines, configured experiments, and evaluated classification; identified packet sampling as the primary bottleneck, which became the roadmap for the independent continuation.",
      route: "/projects/csi",
      dossier: {
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
      summary: "Built an ESP32 CSI capture pipeline and ML models to investigate low-cost audio sensing—capturing 4.6 billion packets and 98 hours of audio to achieve 90% speaker recognition across 400 hours of training on $40 of hardware.",
      proof: "4.6 billion packets captured, 98 hours of audio, 400 hours of training across 122 training runs, achieving 90% speaker recognition on $40 of hardware (validated at 10,839 records/s with 0 drops).",
      route: "/projects/csi",
      dossier: {
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
      summary: "Designed and documented a six-axis robot arm around belt reduction, printable parts, open CAD, and a complete engineering record.",
      proof: "V1 is a CAD design study, not a physically built arm. V2 is in progress with a target of roughly one-third of V1's projected cost.",
      route: "/projects/vulcan",
      dossier: {
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
      summary: "Rebuilt two failed Ender 3 printers into one large-format Cartesian machine with a documented 585 x 775 x 230 mm envelope.",
      proof: "Physically built and demonstrated at Open Sauce as a printer and later as a plotter, with custom live-editable firmware.",
      route: "/projects/ender3-2",
      dossier: {
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
      summary: "Former captain coordinating engineering, competition preparation, operations, and outreach for a 40+ student robotics team.",
      proof: "Three competitions, district qualification, and FIRST Impact Award; outreach programs reached 4,452 students across Sacramento.",
      route: "/projects/team-3598",
      dossier: {
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
      summary: "ML pipelines for 3D DaTscan classification across preprocessing, augmentation, learned representations, routing, and ensembles, compared with fold-based validation and held-out testing.",
      proof: "Ranked 23rd of 864 registered competitors (top 2.7%).",
      dossier: {
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
      summary: "Experiments in efficient diffusion between language models of different architectures and sizes, repurposing JEPA and DINO techniques.",
      proof: "Compared loss, KL divergence, intermediate representations, and behavior across experiments.",
      dossier: {
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
      summary: "Modular robotic actuator joints designed with 3D-printed housings, planetary gear reductions, bearing interfaces, and motor packaging.",
      proof: "Maximized torque density and rigidity while keeping fabrication accessible on consumer 3D printers.",
      dossier: {
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
      summary: "Reverse-engineered poorly documented C# controller libraries and wrote custom steering and throttle logic for a solar-powered competition boat.",
      proof: "Traced a sensor-interface failure across programming and electrical systems and improved cross-team documentation.",
      dossier: {
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
      summary: "Built a bootloader, operating-system prototype, and custom programming language while learning lower-level computer architecture, including a Snake game written in Assembly.",
      proof: "Later applied directly to firmware optimization work.",
      dossier: {
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
      summary: "Built a five-axis gesture-controlled robotic arm during a 72-hour hardware hackathon; exhibited as an independent maker at Open Sauce; competed in game jams and built interactive hardware installations.",
      proof: "Rapid prototyping under tight constraints, combining microcontrollers, computer vision, sensors, and custom mechanics.",
      dossier: {
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
