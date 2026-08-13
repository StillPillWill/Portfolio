import Link from "next/link";
import { contact, ProjectKey, projects } from "../data/portfolio";

/* eslint-disable @next/next/no-img-element */

const projectStats: Record<ProjectKey, Array<{ label: string; value: string }>> = {
  csi: [
    { label: "Throughput", value: "10,839 records/s" },
    { label: "Captured", value: "650,386 records" },
    { label: "Transport errors", value: "0" },
  ],
  vulcan: [
    { label: "Architecture", value: "Six-axis arm" },
    { label: "Primary reduction", value: "1:16 belt drive" },
    { label: "Current state", value: "V2 in progress" },
  ],
  "ender3-2": [
    { label: "Build envelope", value: "585 × 775 × 230 mm" },
    { label: "New material", value: "~$16" },
    { label: "Public demo", value: "Open Sauce plotter" },
  ],
  "team-3598": [
    { label: "Team size", value: "50+ students" },
    { label: "Competition", value: "District qualification" },
    { label: "Outreach", value: "4,452 students" },
  ],
};

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function ProjectArtwork({ projectKey }: { projectKey: ProjectKey }) {
  const project = projects[projectKey];
  const firstMedia = project.media[0];

  if (firstMedia) {
    return (
      <div className="project-hero-art">
        {firstMedia.kind === "video" ? (
          <video src={firstMedia.src} muted autoPlay loop playsInline aria-label={firstMedia.alt} />
        ) : (
          <img src={firstMedia.src} alt={firstMedia.alt} />
        )}
        <span>{firstMedia.caption}</span>
      </div>
    );
  }

  return (
    <div className={`project-hero-art project-hero-art-${projectKey}`} aria-label="Abstract visualization of the capture stack">
      <div className="project-art-grid" />
      <div className="project-art-line project-art-line-one" />
      <div className="project-art-line project-art-line-two" />
      <div className="project-art-orb" />
      <span>Capture stack / validated transport</span>
    </div>
  );
}

function MediaCard({ src, alt, caption, kind, fit }: { src: string; alt: string; caption: string; kind?: "image" | "video"; fit?: "contain" | "cover" }) {
  return (
    <figure className={`project-gallery-item project-gallery-${fit ?? "cover"}`}>
      <div className="project-gallery-frame">
        {kind === "video" ? (
          <video src={src} muted controls playsInline preload="metadata" aria-label={alt} />
        ) : (
          <img src={src} alt={alt} />
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function EvidenceNote({ projectKey }: { projectKey: ProjectKey }) {
  if (projectKey !== "csi") return null;

  return (
    <aside className="evidence-note">
      <div>
        <span className="eyebrow">Evidence boundary</span>
        <h2>Specific results, carefully claimed.</h2>
      </div>
      <div className="evidence-note-copy">
        <p>Audio-activity detection and speaker identification have been demonstrated. General audio reconstruction remains an open research question.</p>
        <a href={projects.csi.repo} target="_blank" rel="noreferrer">Read the repository <Arrow /></a>
      </div>
    </aside>
  );
}

export function ProjectJourney({ projectKey }: { projectKey: ProjectKey }) {
  const project = projects[projectKey];
  const stats = projectStats[projectKey];

  return (
    <main className={`project-page project-page-${projectKey}`}>
      <header className="site-header project-site-header">
        <Link href="/" className="wordmark" aria-label="William Nzive home">
          <span className="wordmark-mark">WN</span>
          <span>William Nzive</span>
        </Link>
        <Link href="/#work" className="back-to-work">← Selected work</Link>
        <a className="header-status" href={`mailto:${contact.email}`}>
          <span className="status-dot" /> Get in touch
        </a>
      </header>

      <section className="project-hero section-wrap" aria-labelledby="project-title">
        <div className="project-hero-copy">
          <p className="eyebrow eyebrow-accent">{project.domain}</p>
          <p className="project-number">{project.number} / 04</p>
          <h1 id="project-title">{project.name}</h1>
          <p className="project-deck">{project.deck}</p>
          <div className="project-status"><span className="status-dot" /> {project.status}</div>
          <div className="hero-actions">
            {project.repo && <a className="button button-dark" href={project.repo} target="_blank" rel="noreferrer">View repository <Arrow /></a>}
            <Link className="text-link" href="/#work">All work <Arrow /></Link>
          </div>
        </div>
        <ProjectArtwork projectKey={projectKey} />
      </section>

      <section className="project-stats section-wrap" aria-label={`${project.name} highlights`}>
        {stats.map((stat) => <div key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></div>)}
      </section>

      <section className="project-notes section-wrap" aria-labelledby="project-notes-title">
        <div className="section-heading project-notes-heading">
          <div>
            <p className="eyebrow">Project notes</p>
            <h2 id="project-notes-title">How the system came together.</h2>
          </div>
          <p className="section-heading-note">The decisions, constraints, and results in sequence.</p>
        </div>
        <ol className="project-note-list">
          {project.beats.map((beat, index) => (
            <li className="project-note" key={beat.title}>
              <div className="project-note-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="project-note-content">
                <p className="eyebrow">{beat.label}</p>
                <h3>{beat.title}</h3>
                <p>{beat.body}</p>
                {beat.facts && <ul className="project-facts">{beat.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <EvidenceNote projectKey={projectKey} />

      {project.media.length > 0 && (
        <section className="project-gallery section-wrap" aria-labelledby="gallery-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Project record</p>
              <h2 id="gallery-title">The work, in frames.</h2>
            </div>
            <p className="section-heading-note">Original project media and build documentation.</p>
          </div>
          <div className="project-gallery-grid">
            {project.media.map((media) => <MediaCard key={media.src} {...media} />)}
          </div>
        </section>
      )}

      <section className="project-next section-wrap">
        <p className="eyebrow eyebrow-accent">Keep exploring</p>
        <h2>More work at the intersection of software and hardware.</h2>
        <Link className="button button-light" href="/#work">Back to selected work <Arrow /></Link>
      </section>

      <footer className="site-footer section-wrap">
        <span>William Nzive / {project.name}</span>
        <span>Questions, collaboration, or a hard problem?</span>
        <a href={`mailto:${contact.email}`}>Get in touch <Arrow /></a>
      </footer>
    </main>
  );
}

