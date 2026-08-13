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
    { label: "Languages", items: "Python · C / C++ · TypeScript / JavaScript · HTML / CSS" },
    { label: "Systems", items: "Embedded firmware · native USB · data capture · Linux · host orchestration" },
    { label: "ML + research", items: "Signal processing · classification · model fine-tuning · ComfyUI workflows" },
    { label: "Build", items: "CAD · mechanical systems · 3D printing · fabrication · technical documentation" },
    { label: "Working style", items: "Constraint-first design · measurement · iteration · honest technical communication" },
  ],
  experience: [
    {
      title: "CSI Research",
      role: "Researcher / embedded systems builder",
      meta: "Embedded sensing / machine learning / ongoing research",
      summary: "Built an ESP32 CSI capture and synchronized audio pipeline to investigate low-cost audio sensing through Wi-Fi channel-state information.",
      proof: "10,839 records/s over a 60-second soak; 650,386 records; 0 CRC errors and 0 sequence gaps. Audio-activity detection and speaker identification demonstrated; general audio reconstruction remains ongoing.",
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
      title: "Low-level systems work",
      role: "Independent systems builder",
      meta: "Operating systems / programming languages",
      summary: "Built a minimal operating system and a programming language as earlier low-level engineering work.",
      proof: "Demonstrates interest in language/runtime fundamentals and the layers beneath application software.",
    },
    {
      title: "Gesture-controlled robotic arm",
      role: "Hardware hackathon builder",
      meta: "Robotics / interaction / rapid prototyping",
      summary: "Built a five-axis robotic arm controlled through gesture input during a hardware hackathon.",
      proof: "A time-boxed physical system combining sensing, control, mechanisms, and rapid iteration.",
    },
    {
      title: "Machine learning practice",
      role: "Independent ML practitioner",
      meta: "Fine-tuning / classification / generative tooling",
      summary: "Fine-tuned language and image diffusion models, trained classification models, and built ComfyUI workflows.",
      proof: "Breadth across model training, evaluation-oriented classification, and practical image-generation pipelines.",
    },
    {
      title: "Game jam",
      role: "Participant",
      meta: "Interactive software / rapid delivery",
      summary: "Participated in a game jam as an additional example of building under a short deadline and a fixed creative constraint.",
      proof: "Included as breadth of practice, not presented as a flagship technical project.",
    },
  ] as CvRecord[],
  contact: "williamnzive2007@gmail.com",
};
