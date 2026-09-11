import type { Metadata } from "next";
import { contact } from "../data/portfolio";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Contact · William Nzive",
  description: "Get in touch with William Nzive for research, internships, and engineering opportunities.",
};

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

export default function ContactPage() {
  return (
    <main className="project-page" id="main">
      <header className="site-header project-site-header">
        <a href="/" className="wordmark" aria-label="William Nzive home">
          <span className="wordmark-mark">WN</span>
          <span>William Nzive</span>
        </a>
        <nav className="site-nav" aria-label="Contact navigation">
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
      </header>

      <section className="section-wrap" style={{ paddingTop: "72px", paddingBottom: "72px" }}>
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-accent">Communication</p>
              <h1 className="display">Get in touch.</h1>
            </div>
            <p className="section-heading-note">
              Open to technical internships, research collaborations, and engineering discussions.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="contact-actions" style={{ marginTop: "40px" }}>
            <a className="button button-solid" href={`mailto:${contact.email}`}>
              {contact.email} <Arrow />
            </a>
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

        <Reveal delay={100}>
          <div style={{ marginTop: "64px", maxWidth: "60ch", color: "var(--text-3)", fontSize: "14px", lineHeight: "1.6" }}>
            <p>
              Primary interests: Embedded firmware, robotics kinematics, RF sensing pipelines, systems software, and mechanical prototyping.
            </p>
            <p style={{ marginTop: "12px" }}>
              Based in Davis / Sacramento, California. Available for Summer 2026 internships and co-ops.
            </p>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer section-wrap">
        <span>William Nzive · Contact</span>
        <span>williamnzive2007@gmail.com</span>
        <a href="/">Back to home ↑</a>
      </footer>
    </main>
  );
}
