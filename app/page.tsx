"use client";

import { useState } from "react";

const projects = [
  {
    index: "01",
    title: "Arc / Fintech",
    type: "Product system",
    year: "2024",
    accent: "violet",
    description:
      "A calmer, clearer operating system for the people shaping the future of money.",
    tags: ["Strategy", "Product", "Motion"],
  },
  {
    index: "02",
    title: "Noma / Culture",
    type: "Digital identity",
    year: "2023",
    accent: "peach",
    description:
      "A living archive for a new generation of artists, makers, and rule-breakers.",
    tags: ["Identity", "Web design", "Direction"],
  },
  {
    index: "03",
    title: "Aether / Mobility",
    type: "Brand world",
    year: "2023",
    accent: "aqua",
    description:
      "Making the invisible infrastructure of movement feel human, immediate, and alive.",
    tags: ["Branding", "3D", "Experience"],
  },
];

function ArrowIcon() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="topbar" aria-label="Main navigation">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Back to top">
          <span className="brand-mark">N</span>
          <span>NOAH / STUDIO</span>
        </button>
        <div className="nav-links">
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button className="nav-contact" onClick={() => scrollTo("contact")}>Let&apos;s talk <ArrowIcon /></button>
        </div>
      </nav>

      <section className="hero section-pad" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse-dot" /> Independent digital designer · NYC / Remote</p>
          <h1>Ideas with<br /><em>gravity.</em></h1>
          <p className="hero-intro">I&apos;m Noah. I build identities, digital products, and spaces for brands with something real to say.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollTo("work")}>Explore selected work <ArrowIcon /></button>
            <button className="text-link" onClick={() => scrollTo("about")}>More about me <span aria-hidden="true">↓</span></button>
          </div>
        </div>

        <div className="hero-art" aria-label="Abstract 3D art: a luminous glass orb rotating in space" role="img">
          <div className="art-label art-label-top">Object study / 001</div>
          <div className="orb-scene">
            <div className="orb-orbit orbit-one" />
            <div className="orb-orbit orbit-two" />
            <div className="orb-ring ring-one" />
            <div className="orb-ring ring-two" />
            <div className="orb-core"><span className="orb-shine" /></div>
            <div className="orb-shadow" />
          </div>
          <div className="art-label art-label-bottom"><span>02° 14&apos; 09&apos;&apos; N</span><span>48° 51&apos; 24&apos;&apos; W</span></div>
        </div>

        <div className="hero-meta">
          <span>Scroll to descend</span>
          <span className="scroll-line" />
          <span>2024—2025</span>
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="section-heading">
          <p className="eyebrow">A few things I&apos;ve made</p>
          <span className="section-count">(03)</span>
        </div>
        <div className="work-layout">
          <div className="project-list">
            {projects.map((project, index) => (
              <button
                className={`project-row ${activeProject === index ? "is-active" : ""}`}
                key={project.title}
                onClick={() => setActiveProject(index)}
                onMouseEnter={() => setActiveProject(index)}
                aria-pressed={activeProject === index}
              >
                <span className="project-index">{project.index}</span>
                <span className="project-name"><strong>{project.title}</strong><small>{project.type}</small></span>
                <span className="project-year">{project.year}</span>
                <span className="row-arrow"><ArrowIcon /></span>
              </button>
            ))}
          </div>
          <div className={`project-preview preview-${projects[activeProject].accent}`}>
            <div className="preview-noise" />
            <div className="preview-topline"><span>Selected / {projects[activeProject].index}</span><span>View case study <ArrowIcon /></span></div>
            <div className="preview-shape shape-back" />
            <div className="preview-shape shape-front" />
            <div className="preview-copy"><span>{projects[activeProject].title.split(" /")[0]}</span><b>{projects[activeProject].type}</b></div>
            <p className="preview-caption">{projects[activeProject].description}</p>
            <div className="tag-list">{projects[activeProject].tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="statement section-pad" id="about">
        <p className="eyebrow">A little context</p>
        <div className="statement-grid">
          <h2>Good work should feel <em>inevitable.</em></h2>
          <div className="statement-body">
            <p>I work at the intersection of story, system, and sensation. The goal is never more noise. It&apos;s finding the one clear idea, then giving it enough room to resonate.</p>
            <button className="text-link" onClick={() => scrollTo("contact")}>Let&apos;s make something felt <ArrowIcon /></button>
          </div>
        </div>
        <div className="stats-row">
          <div><strong>08</strong><span>Years making</span></div>
          <div><strong>19</strong><span>Good people met</span></div>
          <div><strong>∞</strong><span>Curiosity left</span></div>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-orbit" aria-hidden="true"><span /></div>
        <div className="contact-copy">
          <p className="eyebrow">Have a good feeling?</p>
          <h2>Let&apos;s make<br /><em>it real.</em></h2>
          <a className="email-link" href="mailto:hello@noah.studio">hello@noah.studio <ArrowIcon /></a>
        </div>
        <div className="contact-side"><span>Available for select<br />collaborations in 2025</span><span>NYC · London · Everywhere</span></div>
      </section>

      <footer className="footer section-pad">
        <span>© 2025 Noah / Studio</span>
        <span>Designed with intention <span className="footer-dot">✦</span></span>
        <div><a href="#top">Instagram</a><a href="#top">Are.na</a><a href="#top">LinkedIn</a></div>
      </footer>
    </main>
  );
}
