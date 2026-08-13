import Link from "next/link";
import { contact } from "../data/portfolio";
import { cv } from "../data/cv";

/* eslint-disable @next/next/no-img-element */

const featuredProjects = [
  {
    key: "csi" as const,
    eyebrow: "Research / embedded sensing",
    title: "Wi-Fi CSI sensing",
    description:
      "An ESP32 capture and transport stack for investigating audio activity and speaker identification through channel-state information.",
    visual: "signal-visual",
    stat: "10,839 records/s",
  },
  {
    key: "vulcan" as const,
    eyebrow: "Mechanical design / robotics",
    title: "Vulcan",
    description:
      "A documented six-axis robot arm architecture built around belt reduction, printable parts, and honest design boundaries.",
    image: "/portfolio/media/vulcan-hero.webp",
    stat: "6-axis arm",
  },
  {
    key: "ender3-2" as const,
    eyebrow: "Fabrication / firmware",
    title: "Ender3-2",
    description:
      "Two failed printers rebuilt into one large-format machine, then converted into a plotter for Open Sauce.",
    image: "/portfolio/media/ender3-2/full-build.webp",
    stat: "585 × 775 × 230 mm",
  },
  {
    key: "team-3598" as const,
    eyebrow: "Leadership / robotics",
    title: "Team 3598",
    description:
      "Technical leadership across engineering, operations, competition preparation, and outreach for a 50+ student team.",
    image: "/portfolio/media/team3598.webp",
    stat: "4,452 students reached",
  },
];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function ProjectVisual({ project }: { project: (typeof featuredProjects)[number] }) {
  if (project.image) {
    return (
      <div className="project-card-visual">
        <img src={project.image} alt="" />
        <span className="visual-label">Selected work / {project.key}</span>
      </div>
    );
  }

  return (
    <div className={`project-card-visual ${project.visual ?? ""}`} aria-hidden="true">
      <div className="signal-grid" />
      <div className="signal-trace signal-trace-one" />
      <div className="signal-trace signal-trace-two" />
      <span className="visual-label">Capture stack / live system</span>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: (typeof featuredProjects)[number]; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? "project-card-featured" : ""}`}>
      <ProjectVisual project={project} />
      <div className="project-card-content">
        <div className="project-card-heading">
          <p className="eyebrow">{project.eyebrow}</p>
          <span className="project-card-number">{String(featuredProjects.indexOf(project) + 1).padStart(2, "0")}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-card-footer">
          <span>{project.stat}</span>
          <Link href={`/projects/${project.key}`}>View project <Arrow /></Link>
        </div>
      </div>
    </article>
  );
}

export function SignalFoundry() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="William Nzive home">
          <span className="wordmark-mark">WN</span>
          <span>William Nzive</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-status" href={`mailto:${contact.email}`}>
          <span className="status-dot" /> Available for technical work
        </a>
      </header>

      <section className="hero section-wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-accent">Computer science + engineering / UC Davis</p>
          <h1 id="hero-title">I build software that meets the physical world.</h1>
          <p className="hero-intro">
            I&apos;m William, a computer science and engineering student working across embedded systems, machine learning, mechanical design, and fabrication.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">Explore selected work <Arrow /></a>
            <a className="text-link" href={`mailto:${contact.email}`}>Let&apos;s talk <Arrow /></a>
          </div>
        </div>
        <div className="hero-art" aria-label="Vulcan robot arm CAD study">
          <div className="hero-art-frame">
            <img src="/portfolio/media/vulcan-hero.webp" alt="Sectioned CAD render of the Vulcan robot arm" />
          </div>
          <div className="hero-art-meta">
            <span>01 / 04</span>
            <span>Vulcan / V1 assembly study</span>
          </div>
        </div>
      </section>

      <section className="proof-strip section-wrap" aria-label="Selected proof points">
        <div><span>Currently</span><strong>Building sensing systems</strong></div>
        <div><span>Based at</span><strong>UC Davis / California</strong></div>
        <div><span>Works across</span><strong>Software + hardware</strong></div>
        <div><span>Best at</span><strong>Turning constraints into systems</strong></div>
      </section>

      <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">A few things I&apos;ve made real.</h2>
          </div>
          <p className="section-heading-note">Research, machines, and the systems between them.</p>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project, index) => <ProjectCard key={project.key} project={project} featured={index === 0} />)}
        </div>
      </section>

      <section className="about-section section-wrap" id="about" aria-labelledby="about-title">
        <div className="about-lead">
          <p className="eyebrow">A little context</p>
          <h2 id="about-title">Curious about the layer where ideas become artifacts.</h2>
        </div>
        <div className="about-copy">
          <p>{cv.summary}</p>
          <div className="about-details">
            <div>
              <span className="eyebrow">Education</span>
              <strong>University of California, Davis</strong>
              <span>Computer Science and Engineering</span>
            </div>
            <div>
              <span className="eyebrow">Toolkit</span>
              <strong>Python / C++ / TypeScript</strong>
              <span>Embedded firmware / ML / CAD / fabrication</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow eyebrow-accent">Have an interesting constraint?</p>
          <h2 id="contact-title">Let&apos;s make something that works.</h2>
        </div>
        <div className="contact-actions">
          <a className="button button-light" href={`mailto:${contact.email}`}>{contact.email} <Arrow /></a>
          <div className="social-links">
            <a href={contact.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          </div>
        </div>
      </section>

      <footer className="site-footer section-wrap">
        <span>William Nzive / Portfolio</span>
        <span>Built with care, documented honestly.</span>
        <a href="#hero-title">Back to top ↑</a>
      </footer>
    </main>
  );
}
