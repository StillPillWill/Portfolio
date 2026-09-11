import type { Metadata } from "next";
import { contact } from "../data/portfolio";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "About · William Nzive",
  description: "Background, education, and technical focus of William Nzive, CSE student at UC Davis.",
};

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="project-page" id="main">
      <header className="site-header project-site-header">
        <a href="/" className="wordmark" aria-label="William Nzive home">
          <span className="wordmark-mark">WN</span>
          <span>William Nzive</span>
        </a>
        <nav className="site-nav" aria-label="About navigation">
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
              <p className="eyebrow eyebrow-accent">Background</p>
              <h1 className="display">About William Nzive.</h1>
            </div>
            <p className="section-heading-note">
              Undergraduate at UC Davis studying Computer Science and Engineering, building physical and embedded systems.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ maxWidth: "72ch", fontSize: "17px", lineHeight: "1.7", color: "var(--text-2)", marginTop: "32px", display: "grid", gap: "20px" }}>
            <p>
              I am an engineering student at the University of California, Davis, pursuing a B.S. in Computer Science and Engineering.
              My work focuses on the intersection of low-level software, embedded hardware, and physical mechanical design.
            </p>
            <p>
              I believe in building reliable systems from first principles. When standard USB serial endpoints cannot sustain the throughput needed for Wi-Fi channel-state information sensing, I design native USB firmware transports with custom CRC validation. When precision robot gearboxes are prohibitively expensive, I engineer high-reduction belt-driven transmissions and 3D-printable cycloidal actuators.
            </p>
            <p>
              Beyond software, my work extends into the physical shop: CAD kinematics in Creo and SolidWorks, manual machining, MIG/TIG welding, and rapid additive prototyping.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="about-details" style={{ marginTop: "48px" }}>
            <div>
              <span className="eyebrow">Academic Status</span>
              <strong>UC Davis · CSE</strong>
              <span>B.S. Computer Science &amp; Engineering · expected Jun 2030</span>
            </div>
            <div>
              <span className="eyebrow">Core Domains</span>
              <strong>Embedded &amp; Robotics</strong>
              <span>Firmware, kinematics, RF sensing, ML classification</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ marginTop: "56px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="/projects" className="button button-solid">
              Explore projects <Arrow />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="button button-ghost">
              Download resume <Arrow />
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer section-wrap">
        <span>William Nzive · About</span>
        <span>UC Davis CSE</span>
        <a href={`mailto:${contact.email}`}>
          Get in touch <Arrow />
        </a>
      </footer>
    </main>
  );
}
