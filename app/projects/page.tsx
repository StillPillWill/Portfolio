import type { Metadata } from "next";
import { contact, projects, type ProjectKey } from "../data/portfolio";
import { cv } from "../data/cv";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Projects & Research · William Nzive",
  description:
    "Comprehensive directory of engineering projects, embedded Wi-Fi sensing research, 6-axis robotics, CNC fabrication, and systems software by William Nzive.",
};

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

const FEATURED_KEYS: ProjectKey[] = ["csi", "vulcan", "ender3-2", "team-3598"];

export default function ProjectsPage() {
  return (
    <main className="project-directory-page" id="main">
      <header className="site-header project-site-header">
        <div className="site-header-inner">
          <a href="/" className="wordmark" aria-label="William Nzive home">
            <span className="wordmark-mark">WN</span>
            <span>William Nzive</span>
          </a>
          <nav className="site-nav" aria-label="Projects navigation">
            <a className="site-nav-link" href="/">
              Home
            </a>
            <a className="site-nav-link" href="/projects">
              Projects
            </a>
            <a className="site-nav-link" href="/about">
              About
            </a>
            <a className="site-nav-link" href="/contact">
              Contact
            </a>
            <a className="site-nav-link" href="/resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>
          </nav>
          <a className="header-status" href={`mailto:${contact.email}`}>
            <span className="status-dot" />
            <span className="header-status-label">Get in touch</span>
          </a>
        </div>
      </header>

      <section className="project-directory-hero section-wrap">
        <Reveal>
          <div className="directory-hero-copy">
            <p className="eyebrow eyebrow-accent">Systems &amp; Research Directory</p>
            <h1 className="display">All projects &amp; engineering records.</h1>
            <p className="directory-hero-lede">
              A comprehensive index of embedded sensing research, robotic kinematics, large-format CNC machines,
              and low-level systems prototypes built by William Nzive at UC Davis.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section-wrap" aria-labelledby="featured-projects-title">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Dedicated Project Pages</p>
              <h2 className="display" id="featured-projects-title">
                Featured builds.
              </h2>
            </div>
            <p className="section-heading-note">
              Comprehensive case studies with complete CAD models, video records, and quantitative benchmarks.
            </p>
          </div>
        </Reveal>

        <div className="directory-cards-grid">
          {FEATURED_KEYS.map((key) => {
            const project = projects[key];
            return (
              <Reveal key={project.key} className="directory-card">
                <div className="directory-card-head">
                  <span className="directory-card-num">{project.number} / 04</span>
                  <span className="directory-card-domain">{project.domain}</span>
                </div>
                <h3 className="directory-card-title">{project.name}</h3>
                <p className="directory-card-deck">{project.deck}</p>
                <div className="directory-card-status">
                  <span className="status-dot" /> {project.status}
                </div>
                <div className="directory-card-actions">
                  <a href={`/projects/${project.key}`} className="button button-solid">
                    View full project page <Arrow />
                  </a>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="button button-ghost"
                    >
                      Repository <Arrow />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-wrap" aria-labelledby="research-systems-title">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Additional Systems &amp; Prototypes</p>
              <h2 className="display" id="research-systems-title">
                Research &amp; additional systems.
              </h2>
            </div>
            <p className="section-heading-note">
              Machine learning competitions, cross-architecture diffusion, modular actuators, and bare-metal systems.
            </p>
          </div>
        </Reveal>

        <div className="directory-dossier-list">
          {cv.additionalExperience.map((item, idx) => (
            <Reveal key={item.title} className="directory-dossier-card">
              <div className="directory-dossier-layout">
                <div className="directory-dossier-meta">
                  <div className="directory-dossier-head">
                    <span className="exp-index">{String(idx + 5).padStart(2, "0")}</span>
                    <div>
                      <p className="eyebrow">{item.meta}</p>
                      <h3>{item.title}</h3>
                      <p className="exp-role">{item.role}</p>
                    </div>
                  </div>
                </div>
                <div className="directory-dossier-body">
                  <p className="directory-dossier-summary">{item.summary}</p>
                  <p className="directory-dossier-proof">{item.proof}</p>

                  {item.dossier && (
                    <details className="exp-details" open>
                      <summary className="exp-toggle">
                        <span className="exp-toggle-icon" aria-hidden="true">▸</span>
                        <span>Technical breakdown &amp; specifications</span>
                      </summary>
                      <div className="exp-drawer">
                        {item.dossier.intent && (
                          <div className="exp-drawer-section exp-drawer-section-full">
                            <span className="exp-drawer-label">Project Objective</span>
                            <p className="exp-drawer-intent">{item.dossier.intent}</p>
                          </div>
                        )}
                        <div className="exp-drawer-section">
                          <span className="exp-drawer-label">System Architecture</span>
                          <p>{item.dossier.architecture}</p>
                        </div>

                        <div className="exp-drawer-section">
                          <span className="exp-drawer-label">Stack &amp; Tools</span>
                          <div className="exp-tags">
                            {item.dossier.stack.map((tool) => (
                              <span key={tool} className="exp-badge">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="exp-drawer-section">
                          <span className="exp-drawer-label">Measured Metrics &amp; Benchmarks</span>
                          <ul className="exp-metrics-list">
                            {item.dossier.metrics.map((m, mIdx) => (
                              <li key={mIdx}>{m}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="exp-drawer-section">
                          <span className="exp-drawer-label">Engineering Decisions &amp; Trade-offs</span>
                          <ul className="exp-decisions-list">
                            {item.dossier.keyDecisions.map((d, dIdx) => (
                              <li key={dIdx}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="site-footer section-wrap">
        <span>William Nzive · Projects Directory</span>
        <span>Computer Science &amp; Engineering · UC Davis</span>
        <a href={`mailto:${contact.email}`}>
          Get in touch <Arrow />
        </a>
      </footer>
    </main>
  );
}
