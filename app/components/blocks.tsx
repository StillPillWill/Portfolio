import type { ReactNode } from "react";
import { allProjects, experience, site, yearLabel, domainOf, type Project } from "../../content";
import { CountUp } from "./CountUp";
import { CopyEmail } from "./CopyEmail";
import { Timeline } from "./Timeline";

/* Shared, server-rendered building blocks used by every route. */

export function Arrow({ dir = "ne" }: { dir?: "ne" | "e" | "w" }) {
  return (
    <span className={`arrow arrow-${dir}`} aria-hidden="true">
      {dir === "ne" ? "↗" : dir === "e" ? "→" : "←"}
    </span>
  );
}

export function Stats({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (!project.stats?.length) return null;
  return (
    <dl className={`stats${compact ? " stats-compact" : ""}`}>
      {project.stats.map((s, i) => (
        <div key={s.label} className="stat" data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
          <dt>{s.label}</dt>
          <dd>{s.text ?? <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SectionHead({ id, title, aside }: { id: string; index?: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="section-head" data-reveal>
      <h2 id={id}>{title}</h2>
      {aside ? <div className="section-aside">{aside}</div> : null}
    </div>
  );
}

function Dossier({ project }: { project: Project }) {
  const d = project.dossier;
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
          {d.decisions.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Tools</h4>
        <p className="dossier-tools">{d.tools.join(" · ")}</p>
      </div>
    </div>
  );
}

/** Accordion list of projects. Native <details>, animated in CSS. Works for any number of rows. */
export function WorkIndex({ items }: { items: Project[] }) {
  return (
    <ol className="index">
      {items.map((p, i) => (
        <li key={p.slug} className="index-row" data-reveal style={{ ["--d" as string]: `${Math.min(i, 4) * 50}ms` }}>
          <details>
            <summary>
              <span className="index-n mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="index-title">{p.name}</span>
              <span className="index-meta">{yearLabel(p)}</span>
              <span className="index-toggle" aria-hidden="true" />
            </summary>
            <div className="index-body">
              <p className="index-lede">{p.deck ?? p.summary}</p>
              {p.proof ? <p className="index-proof">{p.proof}</p> : null}
              <Dossier project={p} />
              {p.href ? (
                <a className="link" href={p.href}>
                  Open the project page <Arrow dir="e" />
                </a>
              ) : null}
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
      {experience.map((item) => {
        const proj = item.project ? allProjects.find((p) => p.slug === item.project) : undefined;
        return (
          <li key={item.title} className="tl-item" data-reveal>
            <span className="tl-dot" aria-hidden="true" />
            <div className="tl-when mono">{item.when}</div>
            <div className="tl-main">
              <h3>
                {proj?.href ? (
                  <a href={proj.href}>
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
      {site.skills.map((s) => (
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
          School of Engineering and Sciences in Sacramento. The projects on this site are how I practice that, not the limits
          of it: they happen to cover firmware, signal processing, model training, CAD, and machining because those are what
          each problem called for. The next one could be anything.
        </p>
        <p>
          Before that I captained FRC Team 3598, taught myself computer architecture by writing a bootloader and a toy OS,
          and reverse-engineered the controller libraries for a solar regatta boat.
        </p>
      </div>
      <div className="about-side" data-reveal>
        <h3 className="label">Education</h3>
        <ul className="edu">
          {site.education.map((e) => (
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
        Get in touch
      </H>
      <div className="contact-row" data-reveal>
        <a className="contact-mail" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <CopyEmail email={site.email} />
      </div>
      <ul className="contact-links" data-reveal>
        <li>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
        </li>
        <li>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
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

export function ProjectLink({ project }: { project: Project }) {
  if (!project.href) return null;
  return (
    <a className="link" href={project.href}>
      Read the case study<span className="sr-only">: {project.name}</span> <Arrow dir="e" />
    </a>
  );
}

export { domainOf };
