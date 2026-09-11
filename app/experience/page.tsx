import type { Metadata } from "next";
import { contact } from "../data/portfolio";
import { cv } from "../data/cv";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Experience & History · William Nzive",
  description: "Complete technical timeline, research history, and engineering records by William Nzive.",
};

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

export default function ExperiencePage() {
  const allExp = [...cv.experience, ...cv.additionalExperience];

  return (
    <main className="project-page" id="main">
      <header className="site-header project-site-header">
        <div className="site-header-inner">
          <a href="/" className="wordmark" aria-label="William Nzive home">
            <span className="wordmark-mark">WN</span>
            <span>William Nzive</span>
          </a>
          <nav className="site-nav" aria-label="Experience navigation">
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

      <section className="section-wrap" style={{ paddingTop: "72px", paddingBottom: "72px" }}>
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-accent">Timeline · Research &amp; Engineering</p>
              <h1 className="display">Experience &amp; projects.</h1>
            </div>
            <p className="section-heading-note">
              Detailed technical records across research internships, competitive robotics, and independent builds.
            </p>
          </div>
        </Reveal>

        <ol className="exp-list" style={{ marginTop: "40px" }}>
          {allExp.map((exp, index) => (
            <Reveal as="li" key={exp.title} className="exp-item" delay={Math.min(index, 3) * 60}>
              <span className="exp-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="exp-main">
                <div className="exp-meta-block">
                  <p className="eyebrow">{exp.meta}</p>
                  <h3>{exp.title}</h3>
                  <p className="exp-role">{exp.role}</p>
                  {exp.intent && (
                    <p className="exp-intent">
                      <span className="intent-badge">INTENT</span>
                      <span className="intent-text">{exp.intent}</span>
                    </p>
                  )}
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
                            <span className="exp-drawer-label">Core Engineering Intent</span>
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
          <div className="exp-resume" style={{ marginTop: "48px" }}>
            <a className="button button-ghost" href="/resume.pdf" target="_blank" rel="noreferrer">
              Download resume (PDF) <Arrow />
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer section-wrap">
        <span>William Nzive · Experience</span>
        <span>UC Davis CSE</span>
        <a href={`mailto:${contact.email}`}>
          Get in touch <Arrow />
        </a>
      </footer>
    </main>
  );
}
