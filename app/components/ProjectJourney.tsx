import Link from "next/link";
import { contact, type ProjectKey, type ProjectMedia, projects } from "../data/portfolio";
import { ModelViewer } from "./ModelViewer";
import { Reveal } from "./Reveal";

/* eslint-disable @next/next/no-img-element */

const NEXT_PROJECT: Record<ProjectKey, ProjectKey> = {
  csi: "vulcan",
  vulcan: "ender3-2",
  "ender3-2": "team-3598",
  "team-3598": "csi",
};

const projectStats: Record<ProjectKey, Array<{ label: string; value: string }>> = {
  csi: [
    { label: "Corpus", value: "4.6B packets" },
    { label: "Speaker recognition", value: "90%" },
    { label: "Training runs", value: "122 runs" },
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
    { label: "Team size", value: "40+ students" },
    { label: "Competition", value: "Impact Award · Worlds berth" },
    { label: "Outreach", value: "4,452 students" },
  ],
};

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function CsiEvidencePanel() {
  return (
    <div className="project-hero-art">
      <div className="data-panel" aria-label="CSI research corpus totals">
        <div className="data-panel-heading">
          <span>Independent research corpus</span>
          <span>2025 – present</span>
        </div>
        <div className="csi-evidence-total">
          <strong>4.6B</strong>
          <span>packets captured</span>
        </div>
        <dl className="data-panel-metrics">
          <div>
            <dt>Audio</dt>
            <dd>
              98<span> hours</span>
            </dd>
          </div>
          <div>
            <dt>Training</dt>
            <dd>
              400<span> hours</span>
            </dd>
          </div>
          <div>
            <dt>Hardware</dt>
            <dd>~$40</dd>
          </div>
        </dl>
        <span className="data-panel-foot">122 training runs · 90% speaker recognition</span>
      </div>
      <span>Corpus totals · live instrumentation</span>
    </div>
  );
}

function HeroArtwork({ projectKey }: { projectKey: ProjectKey }) {
  const project = projects[projectKey];

  if (project.model) {
    return (
      <ModelViewer
        url={project.model}
        projectKey={projectKey as "vulcan" | "ender3-2"}
        label={`${project.name} · interactive model`}
        hudRight={`CAD · ${project.number}/04`}
      />
    );
  }

  if (projectKey === "csi") return <CsiEvidencePanel />;

  const firstMedia = project.media[0];
  if (!firstMedia) return null;

  return (
    <div
      className={`project-hero-art${firstMedia.fit === "contain" ? " project-gallery-contain-art" : ""}`}
    >
      {firstMedia.kind === "video" ? (
        <video src={firstMedia.src} muted autoPlay loop playsInline aria-label={firstMedia.alt} />
      ) : (
        <img src={firstMedia.src} alt={firstMedia.alt} decoding="async" />
      )}
      <span>{firstMedia.caption}</span>
    </div>
  );
}

function MediaCard({ src, alt, caption, kind, fit, ratio }: ProjectMedia) {
  const contain = fit === "contain";
  return (
    <Reveal
      className={`project-gallery-item project-gallery-${ratio}${contain ? " project-gallery-contain" : ""}`}
    >
      <figure style={{ margin: 0 }}>
        <div className="project-gallery-frame">
          {kind === "video" ? (
            <video src={src} muted controls playsInline preload="metadata" aria-label={alt} />
          ) : (
            <img src={src} alt={alt} loading="lazy" decoding="async" />
          )}
        </div>
        <figcaption>{caption}</figcaption>
      </figure>
    </Reveal>
  );
}

function EvidenceNote({ projectKey }: { projectKey: ProjectKey }) {
  if (projectKey !== "csi") return null;

  return (
    <aside className="evidence-note">
      <Reveal>
        <div>
          <span className="eyebrow eyebrow-accent">Evidence boundary</span>
          <h2 className="display">Specific results, carefully claimed.</h2>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <div className="evidence-note-copy">
          <p>
            Audio-activity detection and speaker identification have been demonstrated. General
            audio reconstruction remains an open research question.
          </p>
          <a href={projects.csi.repo} target="_blank" rel="noreferrer">
            Read the repository <Arrow />
          </a>
        </div>
      </Reveal>
    </aside>
  );
}

export function ProjectJourney({ projectKey }: { projectKey: ProjectKey }) {
  const project = projects[projectKey];
  const stats = projectStats[projectKey];
  const next = projects[NEXT_PROJECT[projectKey]];

  return (
    <main className={`project-page project-page-${projectKey}`} id="main">
      <a className="skip-link" href="#project-notes-title">
        Skip to project notes
      </a>
      <header className="site-header project-site-header">
        <Link href="/" className="wordmark" aria-label="William Nzive home">
          <span className="wordmark-mark">WN</span>
          <span>William Nzive</span>
        </Link>
        <Link href="/#work" className="back-to-work">
          ← Selected work
        </Link>
        <a className="header-status" href={`mailto:${contact.email}`}>
          <span className="status-dot" />
          <span className="header-status-label">Get in touch</span>
        </a>
      </header>

      <section className="project-hero" aria-labelledby="project-title">
        <Reveal>
          <div className="project-hero-copy">
            <p className="eyebrow eyebrow-accent">{project.domain}</p>
            <p className="project-number">
              {project.number} / 04
            </p>
            <h1 id="project-title">{project.name}</h1>
            <p className="project-deck">{project.deck}</p>
            <div className="project-status">
              <span className="status-dot" /> {project.status}
            </div>
            <div className="hero-actions">
              {project.repo && (
                <a className="button button-solid" href={project.repo} target="_blank" rel="noreferrer">
                  View repository <Arrow />
                </a>
              )}
              <Link className="text-link" href="/#work">
                All work <Arrow />
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={110}>
          <HeroArtwork projectKey={projectKey} />
        </Reveal>
      </section>

      <section className="stat-strip section-wrap" aria-label={`${project.name} highlights`}>
        {stats.map((stat) => (
          <div key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </section>

      <section className="project-notes section-wrap" aria-labelledby="project-notes-title">
        <Reveal>
          <div className="section-heading project-notes-heading">
            <div>
              <p className="eyebrow">Project notes</p>
              <h2 className="display" id="project-notes-title">
                How the system came together.
              </h2>
            </div>
            <p className="section-heading-note">The decisions, constraints, and results in sequence.</p>
          </div>
        </Reveal>
        <ol className="project-note-list">
          {project.beats.map((beat, index) => (
            <Reveal key={beat.title} as="li" className="project-note">
              <div className="project-note-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="project-note-content">
                <p className="eyebrow">{beat.label}</p>
                <h3>{beat.title}</h3>
                <p>{beat.body}</p>
                {beat.facts && (
                  <ul className="project-facts">
                    {beat.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <EvidenceNote projectKey={projectKey} />

      {project.model && (
        <section className="model-section section-wrap" aria-label={`${project.name} 3D model`}>
          <Reveal>
            <ModelViewer
              url={project.model}
              projectKey={projectKey as "vulcan" | "ender3-2"}
              label={`${project.name} · full assembly`}
              hudRight="drag to orbit · scroll to continue"
            />
            <div className="model-section-meta">
              <span>Interactive · WebGL</span>
              <span>Source CAD exported to GLB</span>
            </div>
          </Reveal>
        </section>
      )}

      {project.media.length > 0 && (
        <section className="project-gallery section-wrap" aria-labelledby="gallery-title">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">Project record</p>
                <h2 className="display" id="gallery-title">
                  The work, in frames.
                </h2>
              </div>
              <p className="section-heading-note">Original project media and build documentation.</p>
            </div>
          </Reveal>
          <div className="project-gallery-grid">
            {project.media.map((media) => (
              <MediaCard key={media.src} {...media} />
            ))}
          </div>
        </section>
      )}

      <section className="project-next">
        <div className="section-wrap">
          <Reveal>
            <Link href={`/projects/${next.key}`} className="next-project-card">
              <div>
                <p className="eyebrow eyebrow-accent">Next project / {next.domain}</p>
                <h2>{next.name}</h2>
              </div>
              <span className="next-project-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer section-wrap">
        <span>William Nzive / {project.name}</span>
        <span>Questions, collaboration, or a hard problem?</span>
        <a href={`mailto:${contact.email}`}>
          Get in touch <Arrow />
        </a>
      </footer>
    </main>
  );
}
