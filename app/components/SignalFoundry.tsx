import { contact } from "../data/portfolio";
import { cv } from "../data/cv";
import { CountUp } from "./CountUp";
import { Magnetic } from "./Magnetic";
import { ModelViewer } from "./ModelViewer";
import { Reveal } from "./Reveal";
import { Waveform } from "./Waveform";

/* eslint-disable @next/next/no-img-element */

const ACCENTS: Record<string, string> = {
  csi: "#8176e9",
  vulcan: "#c8774d",
  "ender3-2": "#e5b86b",
  "team-3598": "#b95c6b",
};

const featuredProjects = [
  {
    key: "csi" as const,
    eyebrow: "Research / embedded sensing",
    title: "Wi-Fi CSI sensing",
    description:
      "ESP32 capture pipeline and machine-learning models investigating audio sensing through Wi-Fi channel-state information—achieving 90% speaker recognition across 400 hours of training on $40 of hardware.",
    stat: "90% speaker ID · 4.6B packets",
  },
  {
    key: "vulcan" as const,
    eyebrow: "Mechanical design / robotics",
    title: "Vulcan",
    description:
      "An open-source six-axis robot arm designed around belt reductions, 3D-printed structural parts, and transparent CAD documentation.",
    stat: "Six-axis arm · 1:16 reduction",
  },
  {
    key: "ender3-2" as const,
    eyebrow: "Fabrication / firmware",
    title: "Ender3-2",
    description:
      "Two failed printers rebuilt into one large-format machine with custom Marlin firmware, expanded to 585 × 775 × 230 mm, then demonstrated live at Open Sauce.",
    stat: "585 × 775 × 230 mm · Dual-Z",
  },
  {
    key: "team-3598" as const,
    eyebrow: "Leadership / competitive robotics",
    title: "Team 3598",
    description:
      "Technical leadership across engineering, operations, competition preparation, and outreach for a 40+ student team.",
    stat: "4,452 students reached · Worlds berth",
  },
];

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function CsiDataPanel() {
  return (
    <div className="data-panel" aria-label="CSI research corpus and model performance">
      <div className="data-panel-heading">
        <span>Research corpus &amp; models</span>
        <span>$40 hardware</span>
      </div>
      <div className="csi-evidence-total">
        <strong>4.6B</strong>
        <span>packets captured</span>
      </div>
      <dl className="data-panel-metrics">
        <div>
          <dt>Audio</dt>
          <dd>
            <CountUp value="98" />
            <span> hrs</span>
          </dd>
        </div>
        <div>
          <dt>Training</dt>
          <dd>
            <CountUp value="400" />
            <span> hrs</span>
          </dd>
        </div>
        <div>
          <dt>Recognition</dt>
          <dd>
            <CountUp value="90" />
            <span>%</span>
          </dd>
        </div>
      </dl>
      <span className="data-panel-foot">122 training runs · 400 hrs training · 90% speaker recognition</span>
    </div>
  );
}

function ProjectVisual({ project }: { project: (typeof featuredProjects)[number] }) {
  if (project.key === "csi") return <CsiDataPanel />;

  const images: Record<string, { src: string; alt: string }> = {
    vulcan: {
      src: "/portfolio/media/vulcan-hero.webp",
      alt: "Vulcan six-axis robot arm CAD assembly render",
    },
    "ender3-2": {
      src: "/portfolio/media/ender3-2/full-build.webp",
      alt: "Ender3-2 large-format 3D printer gantry",
    },
    "team-3598": {
      src: "/portfolio/media/team3598.webp",
      alt: "Team 3598 robotics team group photo",
    },
  };

  const image = images[project.key];
  if (!image) return null;

  return (
    <div className="project-card-visual">
      <img src={image.src} alt={image.alt} decoding="async" />
      <span className="visual-label">Selected work / {project.key}</span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
}) {
  const featured = index === 0;

  return (
    <Reveal
      className={`project-card${featured ? " project-card-featured" : ""}`}
      delay={index * 70}
      accent={ACCENTS[project.key]}
    >
      <div className="project-card-content">
        <div className="project-card-heading">
          <p className="eyebrow">{project.eyebrow}</p>
          <span className="project-card-number">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-card-footer">
          <span>{project.stat}</span>
          <a href={`/projects/${project.key}`}>
            View project <Arrow />
          </a>
        </div>
      </div>
      <ProjectVisual project={project} />
    </Reveal>
  );
}

export function SignalFoundry() {
  return (
    <main className="site-shell" id="main">
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" className="wordmark" aria-label="William Nzive home">
            <span className="wordmark-mark">WN</span>
            <span>William Nzive</span>
          </a>
          <nav className="site-nav" aria-label="Primary">
            <a className="site-nav-link" href="#work">
              Work
            </a>
            <a className="site-nav-link" href="#experience">
              Experience
            </a>
            <a className="site-nav-link" href="#about">
              About
            </a>
            <a className="site-nav-link" href="#contact">
              Contact
            </a>
            <a className="site-nav-link" href="/resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>
          </nav>
          <a className="header-status" href={`mailto:${contact.email}`}>
            <span className="status-dot" />
            <span className="header-status-label">Email</span>
          </a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-accent hero-kicker">
            Computer science + engineering / UC Davis
          </p>
          <h1 id="hero-title">
            Software, embedded systems, <em>and robotics.</em>
          </h1>
          <p className="hero-lede">
            I study Computer Science and Engineering at UC Davis. I work across software,
            firmware, and mechanical design—including Wi-Fi CSI acoustic sensing (90% speaker
            recognition over 4.6 billion packets on $40 hardware), a 6-axis robotic arm in CAD,
            and custom Cartesian CNC machines.
          </p>
          <div className="hero-actions">
            <Magnetic>
              <a className="button button-solid" href="#work">
                Explore selected work <Arrow />
              </a>
            </Magnetic>
            <a className="text-link" href={`mailto:${contact.email}`}>
              Let&apos;s talk <Arrow />
            </a>
          </div>
          <div className="hero-meta">
            <span>
              Research / <strong>Wi-Fi CSI Acoustic Sensing</strong>
            </span>
            <span>
              Hardware / <strong>ESP32, Robotics, CNC</strong>
            </span>
            <span>
              Status / <strong>Open to technical roles &amp; co-ops</strong>
            </span>
          </div>
        </div>

        <div>
          <ModelViewer
            url="/portfolio/models/vulcan/vulcan-showcase.glb"
            projectKey="vulcan"
            label="Vulcan V1 · assembly study"
            hudRight="CAD · GLB"
          />
          <Waveform />
        </div>
      </section>

      <section className="instrument-strip section-wrap" aria-label="Technical focus">
        <div>
          <span>Major</span>
          <strong>B.S. CSE · UC Davis</strong>
        </div>
        <div>
          <span>Research</span>
          <strong>Wi-Fi CSI Sensing</strong>
        </div>
        <div>
          <span>Robotics</span>
          <strong>6-Axis Arm &amp; FRC Captain</strong>
        </div>
        <div>
          <span>Core Stack</span>
          <strong>C/C++, Python, CAD</strong>
        </div>
      </section>

      <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="display" id="work-title">
                Featured projects.
              </h2>
            </div>
            <p className="section-heading-note">
              Embedded sensing research, robotic systems design, and engineering team leadership.
            </p>
          </div>
        </Reveal>
        <div className="project-grid work-stack-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.key} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="more-section section-wrap" aria-labelledby="more-title">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">More builds · Systems &amp; Research</p>
              <h2 className="display" id="more-title">
                Research dossiers &amp; builds.
              </h2>
            </div>
            <a href="/projects" className="button button-ghost">
              View all projects &amp; directory <Arrow />
            </a>
          </div>
        </Reveal>
        <Reveal delay={70}>
          <div className="more-grid">
            {cv.additionalExperience.slice(0, 3).map((item) => (
              <a key={item.title} href="/projects" className="more-card">
                <div className="more-card-main">
                  <p className="eyebrow">{item.meta}</p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <div className="more-card-footer">
                  <span className="more-card-stat">{item.proof}</span>
                  <span className="more-card-link">
                    Explore dossier <Arrow />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="matrix-section section-wrap" aria-labelledby="matrix-title">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Skills &amp; Tooling</p>
              <h2 className="display" id="matrix-title">
                Technical toolkit.
              </h2>
            </div>
            <p className="section-heading-note">Languages, hardware platforms, and fabrication tools.</p>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div className="matrix-grid">
            {cv.skills.map((skill) => (
              <div key={skill.label} className="matrix-card">
                <div className="matrix-card-head">
                  <span className="mono-label">{skill.label}</span>
                </div>
                <div className="matrix-card-tags">
                  {skill.items.split(" · ").map((item) => (
                    <span key={item} className="exp-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="exp-section section-wrap" id="experience" aria-labelledby="exp-title">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Experience</p>
              <h2 className="display" id="exp-title">
                Experience &amp; projects.
              </h2>
            </div>
            <p className="section-heading-note">
              Research internships, engineering competitions, and independent builds. Full history in resume.
            </p>
          </div>
        </Reveal>
        <ol className="exp-list">
          {[...cv.experience, ...cv.additionalExperience].map((exp, index) => (
            <Reveal as="li" key={exp.title} className="exp-item" delay={Math.min(index, 3) * 60}>
              <span className="exp-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="exp-main">
                <div className="exp-meta-block">
                  <p className="eyebrow">{exp.meta}</p>
                  <h3>{exp.title}</h3>
                  <p className="exp-role">{exp.role}</p>
                </div>
                <div className="exp-body-block">
                  <p className="exp-summary">{exp.summary}</p>
                  <p className="exp-proof">{exp.proof}</p>

                  {exp.dossier && (
                    <details className="exp-details">
                      <summary className="exp-toggle">
                        <span className="exp-toggle-icon" aria-hidden="true">▸</span>
                        <span>Technical dossier &amp; notes</span>
                      </summary>
                      <div className="exp-drawer">
                        {exp.dossier.intent && (
                          <div className="exp-drawer-section exp-drawer-section-full">
                            <span className="exp-drawer-label">Project Objective</span>
                            <p className="exp-drawer-intent">{exp.dossier.intent}</p>
                          </div>
                        )}
                        <div className="exp-drawer-section">
                          <span className="exp-drawer-label">System Architecture</span>
                          <p>{exp.dossier.architecture}</p>
                        </div>

                        <div className="exp-drawer-section">
                          <span className="exp-drawer-label">Stack &amp; Tools</span>
                          <div className="exp-tags">
                            {exp.dossier.stack.map((item) => (
                              <span key={item} className="exp-badge">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="exp-drawer-section">
                          <span className="exp-drawer-label">Key Metrics &amp; Benchmarks</span>
                          <ul className="exp-metrics-list">
                            {exp.dossier.metrics.map((metric, mIdx) => (
                              <li key={mIdx}>{metric}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="exp-drawer-section">
                          <span className="exp-drawer-label">Engineering Decisions &amp; Trade-offs</span>
                          <ul className="exp-decisions-list">
                            {exp.dossier.keyDecisions.map((decision, dIdx) => (
                              <li key={dIdx}>{decision}</li>
                            ))}
                          </ul>
                        </div>

                        {(exp.route || exp.dossier.relatedRoute) && (
                          <div className="exp-drawer-actions exp-drawer-section-full">
                            <a
                              href={exp.route || exp.dossier.relatedRoute}
                              className="exp-project-link"
                            >
                              {exp.dossier.relatedRouteLabel || "View dedicated project page →"}
                            </a>
                          </div>
                        )}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <div className="exp-resume">
            <a className="button button-ghost" href="/resume.pdf" target="_blank" rel="noreferrer">
              Download resume <Arrow />
            </a>
          </div>
        </Reveal>
      </section>

      <section className="about-section section-wrap" id="about" aria-labelledby="about-title">
        <Reveal>
          <div className="about-lead">
            <p className="eyebrow">Background</p>
            <h2 className="display" id="about-title">
              About me.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div className="about-copy">
            <p>
              I&apos;m an undergraduate studying Computer Science and Engineering at UC Davis,
              working across embedded systems, robotics, and machine learning. From writing USB bulk
              capture pipelines for RF sensing to designing belt transmissions for robotic joints,
              I focus on building reliable hardware and software with clear, verified measurements.
            </p>
            <div className="about-details">
              <div>
                <span className="eyebrow">Education</span>
                <strong>University of California, Davis</strong>
                <span>B.S. Computer Science &amp; Engineering · expected Jun 2030</span>
              </div>
              <div>
                <span className="eyebrow">Technical Interests</span>
                <strong>Embedded, Robotics &amp; ML</strong>
                <span>Firmware, kinematics, signal processing, and physical fabrication</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
        <Reveal>
          <div>
            <p className="eyebrow eyebrow-accent">Contact</p>
            <h2 className="display" id="contact-title">
              Get in touch.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="contact-actions">
            <Magnetic>
              <a className="button button-solid" href={`mailto:${contact.email}`}>
                {contact.email} <Arrow />
              </a>
            </Magnetic>
            <div className="social-links">
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                Resume <Arrow />
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub <Arrow />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Arrow />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer section-wrap">
        <span>William Nzive · UC Davis</span>
        <span>Computer Science &amp; Engineering</span>
        <a href="#hero-title">Back to top ↑</a>
      </footer>
    </main>
  );
}
