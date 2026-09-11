import Link from "next/link";
import { contact } from "../data/portfolio";
import { cv } from "../data/cv";
import { CountUp } from "./CountUp";
import { Magnetic } from "./Magnetic";
import { ModelViewer } from "./ModelViewer";
import { Reveal } from "./Reveal";
import { Waveform } from "./Waveform";
import { WorkStack } from "./WorkStack";

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
      "An ESP32 capture and transport stack for investigating audio activity and speaker identification through channel-state information.",
    stat: "10,839 records/s",
  },
  {
    key: "vulcan" as const,
    eyebrow: "Mechanical design / robotics",
    title: "Vulcan",
    description:
      "A documented six-axis robot arm architecture built around belt reduction, printable parts, and honest design boundaries.",
    stat: "Six-axis arm",
  },
  {
    key: "ender3-2" as const,
    eyebrow: "Fabrication / firmware",
    title: "Ender3-2",
    description:
      "Two failed printers rebuilt into one large-format machine, then converted into a plotter for Open Sauce.",
    stat: "585 × 775 × 230 mm",
  },
  {
    key: "team-3598" as const,
    eyebrow: "Leadership / robotics",
    title: "Team 3598",
    description:
      "Technical leadership across engineering, operations, competition preparation, and outreach for a 40+ student team.",
    stat: "4,452 students reached",
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
    <div className="data-panel" aria-label="CSI transport validation results">
      <div className="data-panel-heading">
        <span>Transport validation</span>
        <span>60-second soak</span>
      </div>
      <dl className="data-panel-metrics">
        <div>
          <dt>Captured</dt>
          <dd>
            <CountUp value="650,386" />
          </dd>
        </div>
        <div>
          <dt>Throughput</dt>
          <dd>
            <CountUp value="10,839" />
            <span> / sec</span>
          </dd>
        </div>
        <div>
          <dt>CRC + gaps</dt>
          <dd>0</dd>
        </div>
      </dl>
      <span className="data-panel-foot">Native USB / validated capture</span>
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
      alt: "Ender3-2 large-format printer physical build",
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
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
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
          <Link href={`/projects/${project.key}`}>
            View project <Arrow />
          </Link>
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
        <Link href="/" className="wordmark" aria-label="William Nzive home">
          <span className="wordmark-mark">WN</span>
          <span>William Nzive</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume <Arrow />
          </a>
        </nav>
        <a className="header-status" href={`mailto:${contact.email}`}>
          <span className="status-dot" />
          <span className="header-status-label">Email</span>
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-accent hero-kicker">
            Computer science + engineering / UC Davis
          </p>
          <h1 id="hero-title">
            I build software that meets <em>the physical world.</em>
          </h1>
          <p className="hero-lede">
            I&apos;m William, working across embedded systems, machine learning,
            mechanical design, and fabrication. Constraint first, measured always,
            documented honestly.
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
              Currently / <strong>Wi-Fi sensing research</strong>
            </span>
            <span>
              Based / <strong>California</strong>
            </span>
            <span>
              Status / <strong>Open to opportunities</strong>
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

      <section className="instrument-strip section-wrap" aria-label="Selected proof points">
        <div>
          <span>Discipline</span>
          <strong>Software × hardware</strong>
        </div>
        <div>
          <span>Research</span>
          <strong>Wi-Fi CSI sensing</strong>
        </div>
        <div>
          <span>Machines</span>
          <strong>Designed &amp; physically built</strong>
        </div>
        <div>
          <span>Method</span>
          <strong>Constraints into systems</strong>
        </div>
      </section>

      <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="display" id="work-title">
                Four systems, built end to end.
              </h2>
            </div>
            <p className="section-heading-note">
              Research instruments, machines, and the leadership system between them.
            </p>
          </div>
        </Reveal>
        <div className="project-grid work-stack-grid">
          <WorkStack
            cards={featuredProjects.map((project, index) => (
              <ProjectCard key={project.key} project={project} index={index} />
            ))}
          />
        </div>
      </section>

      <section className="matrix-section section-wrap" aria-labelledby="matrix-title">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Toolkit</p>
              <h2 className="display" id="matrix-title">
                The stack behind the work.
              </h2>
            </div>
            <p className="section-heading-note">Everything here has shipped something real.</p>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <table className="matrix-table">
            <tbody>
              {cv.skills.map((skill) => (
                <tr key={skill.label}>
                  <th scope="row">{skill.label}</th>
                  <td>{skill.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      <section className="exp-section section-wrap" id="experience" aria-labelledby="exp-title">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Experience</p>
              <h2 className="display" id="exp-title">
                Research roles and independent builds.
              </h2>
            </div>
            <p className="section-heading-note">
              The internship, the competitions, and the side quests — full detail in the resume.
            </p>
          </div>
        </Reveal>
        <ol className="exp-list">
          {[cv.experience[0], ...cv.additionalExperience].map((exp, index) => (
            <Reveal as="li" key={exp.title} className="exp-item" delay={Math.min(index, 3) * 60}>
              <span className="exp-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="exp-main">
                <p className="eyebrow">{exp.meta}</p>
                <h3>{exp.title}</h3>
                <p className="exp-role">{exp.role}</p>
                <p className="exp-summary">{exp.summary}</p>
                <p className="exp-proof">{exp.proof}</p>
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
            <p className="eyebrow">A little context</p>
            <h2 className="display" id="about-title">
              Curious about where ideas become artifacts.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div className="about-copy">
            <p>{cv.summary}</p>
            <div className="about-details">
              <div>
                <span className="eyebrow">Education</span>
                <strong>University of California, Davis</strong>
                <span>B.S. Computer Science &amp; Engineering · expected Jun 2030</span>
              </div>
              <div>
                <span className="eyebrow">Working style</span>
                <strong>Measure, iterate, document</strong>
                <span>Claims stay inside what the evidence supports</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
        <Reveal>
          <div>
            <p className="eyebrow eyebrow-accent">Have an interesting constraint?</p>
            <h2 className="display" id="contact-title">
              Let&apos;s make something that works.
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
        <span>William Nzive / Portfolio</span>
        <span>Built with care, documented honestly.</span>
        <a href="#hero-title">Back to top ↑</a>
      </footer>
    </main>
  );
}
