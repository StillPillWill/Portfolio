export type CvRecord = {
  title: string;
  role: string;
  meta: string;
  summary: string;
  proof: string;
  route?: string;
};

export const cv = {
  name: "William Nzive",
  headline: "Computer science student building software, sensing systems, and machines.",
  summary:
    "I work across embedded systems, machine learning, mechanical design, and fabrication. My strongest work starts with a hard constraint, builds the underlying system, and documents what the evidence actually supports.",
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
    { label: "Working style", items: "Constraint-first design · measurement · iteration · honest technical communication" },
  ],
  experience: [
    {
      title: "UCSC Science Internship Program",
      role: "Research intern",
      meta: "Wi-Fi CSI sensing / machine learning / summer 2025",
      summary: "Nine-week research internship with graduate researchers on Wi-Fi channel-state information, sensing, and machine learning. Proposed an original direction using Wi-Fi signals for audio sensing.",
      proof: "Built deep-learning pipelines, configured experiments, and evaluated classification; identified packet sampling as the primary bottleneck, which became the roadmap for the independent continuation.",
    },
    {
      title: "CSI Research",
      role: "Researcher / embedded systems builder",
      meta: "Embedded sensing / machine learning / ongoing research",
      summary: "Built an ESP32 CSI capture and synchronized audio pipeline to investigate low-cost audio sensing through Wi-Fi channel-state information.",
      proof: "10,839 records/s over a 60-second soak with 0 CRC errors and 0 sequence gaps. Corpus to date: 4.6B packets and 98 hours of audio across 122 training runs (400 hours), reaching 90% speaker recognition on ~$40 of hardware.",
      route: "/projects/csi",
    },
    {
      title: "Vulcan",
      role: "Mechanical designer",
      meta: "Mechanical design / open-source robotics / V1 documented",
      summary: "Designed and documented a six-axis robot arm around belt reduction, printable parts, open CAD, and a complete engineering record.",
      proof: "V1 is a CAD design study, not a physically built arm. V2 is in progress with a target of roughly one-third of V1's projected cost.",
      route: "/projects/vulcan",
    },
    {
      title: "Ender3-2",
      role: "Builder / firmware author",
      meta: "Fabrication / firmware / physical build",
      summary: "Rebuilt two failed Ender 3 printers into one large-format Cartesian machine with a documented 585 x 775 x 230 mm envelope.",
      proof: "Physically built and demonstrated at Open Sauce as a printer and later as a plotter, with custom live-editable firmware.",
      route: "/projects/ender3-2",
    },
    {
      title: "Team 3598",
      role: "Former captain",
      meta: "Technical leadership / competitive robotics / outreach",
      summary: "Former captain coordinating engineering, competition preparation, operations, and outreach for a 50+ student robotics team.",
      proof: "Three competitions and district-championship qualification; first-party team records document outreach reaching 4,452 students. Outcomes are team-attributed.",
      route: "/projects/team-3598",
    },
  ] as CvRecord[],
  additionalExperience: [
    {
      title: "Parkinson's DaTscan classification",
      role: "Machine learning competitor",
      meta: "3D medical imaging / validation-driven modeling / 2026–present",
      summary: "ML pipelines for 3D DaTscan classification across preprocessing, augmentation, learned representations, routing, and ensembles, compared with fold-based validation and held-out testing.",
      proof: "Ranked 23rd of 864 registered competitors (top 2.7%).",
    },
    {
      title: "Hybrid language-model research",
      role: "Independent researcher",
      meta: "Efficient cross-architecture diffusion / 2026–present",
      summary: "Experiments in efficient diffusion between language models of different architectures and sizes, repurposing JEPA and DINO techniques.",
      proof: "Compared loss, KL divergence, intermediate representations, and behavior across experiments.",
    },
    {
      title: "Low-cost 3D-printed robotic joints",
      role: "Mechanical designer",
      meta: "Integrated joints / torque density / 2026–present",
      summary: "Integrated robotic joints built around 3D-printed components, iterating joint, transmission, bearings, actuator packaging, and interfaces.",
      proof: "Increasing torque capacity while keeping the design inexpensive to manufacture.",
    },
    {
      title: "SMUD Solar Regatta",
      role: "Programming captain",
      meta: "Embedded control / competition boat / 2025",
      summary: "Reverse-engineered poorly documented C# controller libraries and wrote custom steering and throttle logic for a solar-powered competition boat.",
      proof: "Traced a sensor-interface failure across programming and electrical systems and improved cross-team documentation.",
    },
    {
      title: "Custom operating system & language",
      role: "Independent systems builder",
      meta: "Bootloader / OS prototype / programming language / 2024",
      summary: "Built a bootloader, operating-system prototype, and custom programming language while learning lower-level computer architecture, including a Snake game written in Assembly.",
      proof: "Later applied directly to firmware optimization work.",
    },
    {
      title: "Hackathons & exhibitions",
      role: "Builder / exhibitor",
      meta: "Rapid prototyping / public demos",
      summary: "Five-axis gesture-controlled robotic arm at a 72-hour hardware hackathon; Open Sauce exhibitor; hardware hackathons, game jams, and arcade programs.",
      proof: "Time-boxed physical systems combining sensing, control, mechanisms, and iteration.",
    },
  ] as CvRecord[],
  contact: "williamnzive2007@gmail.com",
};
