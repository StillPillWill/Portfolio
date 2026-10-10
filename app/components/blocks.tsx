import type { ReactNode } from "react";
import { contact, projects, projectStats, type ProjectKey, type Stat } from "../data/portfolio";
import { cv, type CvRecord } from "../data/cv";
import { CountUp } from "./CountUp";
import { CopyEmail } from "./CopyEmail";
import { ModelViewer } from "./ModelViewer";
import { BedMesh } from "./motion/BedMesh";
import { OutreachParticles } from "./motion/OutreachParticles";
import { Spectrogram } from "./motion/Spectrogram";
import { Timeline } from "./Timeline";

/* Shared, server-rendered building blocks used by every route. */

export function Arrow({ dir = "ne" }: { dir?: "ne" | "e" | "w" }) {
  return (
    <span className={`arrow arrow-${dir}`} aria-hidden="true">
      {dir === "ne" ? "↗" : dir === "e" ? "→" : "←"}
    </span>
  );
}

export function Specimen({ projectKey, size = "md" }: { projectKey: ProjectKey; size?: "md" | "lg" }) {
  const cls = `specimen specimen-${size}`;
  switch (projectKey) {
    case "csi":
      return (
        <div className={cls}>
          <Spectrogram />
          <p className="specimen-cap">Illustrative simulation of speech energy across subcarriers — not recorded data.</p>
        </div>
      );
    case "vulcan":
      return (
        <div className={cls}>
          <ModelViewer url="/portfolio/models/vulcan/vulcan-showcase.glb" projectKey="vulcan" label="Vulcan V1 · CAD export" />
        </div>
      );
    case "ender3-2":
      return (
        <div className={cls}>
          <BedMesh />
          <p className="specimen-cap">The 12 × 18 probe grid at the real bed proportions; height profile illustrative, Z exaggerated.</p>
        </div>
      );
    case "team-3598":
      return (
        <div className={cls}>
          <OutreachParticles />
        </div>
      );
  }
}

export function StatValue({ s }: { s: Stat }) {
  if (s.text) return <>{s.text}</>;
  return <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />;
}

export function Stats({ projectKey, compact = false }: { projectKey: ProjectKey; compact?: boolean }) {
  return (
    <dl className={`stats${compact ? " stats-compact" : ""}`}>
      {projectStats[projectKey].map((s, i) => (
        <div key={s.label} className="stat" data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
          <dt>{s.label}</dt>
          <dd>
            <StatValue s={s} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function SectionHead({ id, index, title, aside }: { id: string; index: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="section-head" data-reveal>
      <span className="section-index mono" aria-hidden="true">
        {index}
      </span>
      <h2 id={id}>{title}</h2>
      {aside ? <div className="section-aside">{aside}</div> : null}
    </div>
  );
}

function Dossier({ item }: { item: CvRecord }) {
  const d = item.dossier;
  if (!d) return null;
  return (
    <div className="dossier">
      <div>
        <h4>What it is</h4>
        <p>{d.architecture}</p>
      </div>
      <div>
        <h4>Decisions</h4>
        <ul>
          {d.keyDecisions.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Tools</h4>
        <p className="dossier-tools">{d.stack.join(" · ")}</p>
      </div>
    </div>
  );
}

/** Accordion index of the smaller projects. Native <details>, animated height in CSS. */
export function WorkIndex({ items = cv.additionalExperience }: { items?: CvRecord[] }) {
  return (
    <ol className="index">
      {items.map((item, i) => (
        <li key={item.title} className="index-row" data-reveal style={{ ["--d" as string]: `${Math.min(i, 4) * 50}ms` }}>
          <details>
            <summary>
              <span className="index-n mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="index-title">{item.title}</span>
              <span className="index-meta">{item.meta.split(" / ").slice(-1)[0]}</span>
              <span className="index-toggle" aria-hidden="true" />
            </summary>
            <div className="index-body">
              <p className="index-lede">{item.summary}</p>
              <p className="index-proof">{item.proof}</p>
              <Dossier item={item} />
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

export function ExperienceTimeline() {
  return (
    <Timeline>
      {cv.experience.map((item) => {
        const [area, , when] = item.meta.split(" / ");
        return (
          <li key={item.title} className="tl-item" data-reveal>
            <span className="tl-dot" aria-hidden="true" />
            <div className="tl-when mono">{when ?? area}</div>
            <div className="tl-main">
              <h3>
                {item.route ? (
                  <a href={item.route}>
                    {item.title} <Arrow dir="e" />
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="tl-role">{item.role}</p>
              <p>{item.summary}</p>
              <p className="tl-proof">{item.proof}</p>
            </div>
          </li>
        );
      })}
    </Timeline>
  );
}

export function Toolkit() {
  return (
    <dl className="toolkit">
      {cv.skills.map((s) => (
        <div key={s.label} data-reveal>
          <dt>{s.label}</dt>
          <dd>{s.items.split(" · ").join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AboutBlock() {
  return (
    <div className="about">
      <div className="about-copy" data-reveal>
        <p className="about-lead">
          I like hard problems I don&apos;t yet know how to solve, and I like finding out whether the answer actually
          works by measuring it.
        </p>
        <p>
          I&apos;m a first-year Computer Science and Engineering student at UC Davis, and I graduated salutatorian from the
          School of Engineering and Sciences in Sacramento. The projects on this site are how I practice that, not the limits of it: they happen to cover
          firmware, signal processing, model training, CAD, and machining because those are what each problem called for.
          The next one could be anything.
        </p>
        <p>
          Before that I captained FRC Team 3598, taught myself computer architecture by writing a bootloader and a toy OS,
          and reverse-engineered the controller libraries for a solar regatta boat.
        </p>
      </div>
      <div className="about-side" data-reveal>
        <h3 className="label">Education</h3>
        <ul className="edu">
          {cv.education.map((e) => (
            <li key={e.institution}>
              <strong>{e.institution}</strong>
              <span>{e.detail}</span>
            </li>
          ))}
        </ul>
        <h3 className="label">Toolkit</h3>
        <Toolkit />
      </div>
    </div>
  );
}

export function ContactBlock({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <div className="contact">
      <p className="label" data-reveal>
        Open to internships, co-ops, and research collaborations
      </p>
      <H id="contact-title" className="contact-title" data-reveal>
        Let&apos;s build <em>something that measures well.</em>
      </H>
      <div className="contact-row" data-reveal>
        <a className="contact-mail" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        <CopyEmail email={contact.email} />
      </div>
      <ul className="contact-links" data-reveal>
        <li>
          <a href={contact.github} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
        </li>
        <li>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Arrow />
          </a>
        </li>
        <li>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Résumé (PDF) <Arrow />
          </a>
        </li>
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© 2026 William Nzive</span>
        <nav aria-label="Footer">
          <a href="/projects">Projects</a>
          <a href="/experience">Experience</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <a href="#top" className="footer-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

export function ProjectLink({ k }: { k: ProjectKey }) {
  return (
    <a className="link" href={`/projects/${k}`}>
      Read the case study<span className="sr-only">: {projects[k].name}</span> <Arrow dir="e" />
    </a>
  );
}
