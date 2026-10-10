import { projects, type ProjectKey } from "../data/portfolio";
import { Arrow, SiteFooter, Specimen, Stats } from "./blocks";
import { Gallery } from "./Gallery";
import { ModelViewer } from "./ModelViewer";
import { SiteHeader } from "./SiteHeader";

const ORDER: ProjectKey[] = ["csi", "vulcan", "ender3-2", "team-3598"];

export function ProjectPage({ projectKey }: { projectKey: ProjectKey }) {
  const p = projects[projectKey];
  const i = ORDER.indexOf(projectKey);
  const prev = projects[ORDER[(i + ORDER.length - 1) % ORDER.length]];
  const next = projects[ORDER[(i + 1) % ORDER.length]];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current="/projects" />
      <main id="main" className={`project project-${projectKey}`}>
        <section className="p-hero" aria-labelledby="project-title">
          <div className="p-hero-copy">
            <nav className="crumbs label" aria-label="Breadcrumb">
              <a href="/projects">Projects</a> <span aria-hidden="true">/</span> <span aria-current="page">{p.name}</span>
            </nav>
            <h1 id="project-title" className="p-title">
              {p.name}
            </h1>
            <p className="p-domain label">{p.domain}</p>
            <p className="p-deck">{p.deck}</p>
            <p className="p-status">
              <span className="dot" aria-hidden="true" /> {p.status}
            </p>
            {p.repo ? (
              <a className="btn" href={p.repo} target="_blank" rel="noreferrer">
                Source on GitHub <Arrow />
              </a>
            ) : null}
          </div>
          <div className="p-hero-visual">
            <Specimen projectKey={projectKey} size="lg" />
          </div>
        </section>

        <section className="p-stats" aria-label={`${p.name} in numbers`}>
          <Stats projectKey={projectKey} />
        </section>

        <section className="p-notes" aria-labelledby="notes-title">
          <h2 id="notes-title" className="sr-only">
            Project notes
          </h2>
          <ol className="notes">
            {p.beats.map((b, n) => (
              <li key={b.title} className="note" data-reveal>
                <div className="note-side">
                  <span className="mono note-n">{String(n + 1).padStart(2, "0")}</span>
                  <span className="label">{b.label}</span>
                </div>
                <div className="note-main">
                  <h3>{b.title}</h3>
                  <p className="note-intent">{b.intent}</p>
                  <p>{b.body}</p>
                  {b.facts ? (
                    <ul className="facts">
                      {b.facts.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {projectKey === "ender3-2" && p.model ? (
          <section className="p-model" aria-label="Ender3-2 3D model">
            <div className="specimen specimen-lg" data-reveal>
              <ModelSlot url={p.model} />
            </div>
          </section>
        ) : null}

        {p.media.length > 0 ? (
          <section className="p-gallery" aria-labelledby="gallery-title">
            <h2 id="gallery-title" className="p-sub" data-reveal>
              From the build
            </h2>
            <Gallery items={p.media} />
          </section>
        ) : null}

        <nav className="p-pager" aria-label="More projects">
          <a href={`/projects/${prev.key}`} className="pager-prev">
            <span className="label">
              <Arrow dir="w" /> Previous
            </span>
            <span className="pager-name">{prev.name}</span>
          </a>
          <a href={`/projects/${next.key}`} className="pager-next">
            <span className="label">
              Next <Arrow dir="e" />
            </span>
            <span className="pager-name">{next.name}</span>
          </a>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}

function ModelSlot({ url }: { url: string }) {
  return <ModelViewer url={url} projectKey="ender3-2" label="Ender3-2 · full machine CAD" />;
}
