import { domainOf, neighbours, related, yearLabel, CATEGORY_LABEL, type Project } from "../../content";
import { Arrow, SiteFooter, Stats } from "./blocks";
import { Gallery } from "./Gallery";
import { ModelViewer } from "./ModelViewer";
import { SiteHeader } from "./SiteHeader";
import { Specimen } from "./specimens";

/**
 * One template for every project. Each section renders only when the project
 * has data for it, so a small project gets a short, tidy page.
 */
export function ProjectPage({ project: p }: { project: Project }) {
  const nb = neighbours(p.slug);
  const rel = related(p.slug);
  const hasHero = Boolean(p.specimen || p.thumb);
  // a model that isn't the hero graphic (e.g. a flagship whose hero is a different specimen) gets its own band
  const extraModel = p.model && p.specimen !== "model";
  const links = Object.entries(p.links ?? {}).filter(([, v]) => v) as Array<[string, string]>;
  const LINK_LABEL: Record<string, string> = { repo: "Source on GitHub", demo: "Live demo", paper: "Paper", writeup: "Write-up" };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current="/projects" />
      <main id="main" className={`project project-${p.slug}`}>
        <section className={`p-hero${hasHero ? "" : " p-hero-solo"}`} aria-labelledby="project-title">
          <div className="p-hero-copy">
            <nav className="crumbs label" aria-label="Breadcrumb">
              <a href="/projects">Projects</a> <span aria-hidden="true">/</span> <span aria-current="page">{p.name}</span>
            </nav>
            <h1 id="project-title" className="p-title">
              {p.name}
            </h1>
            <p className="p-domain label">{domainOf(p)}</p>
            <p className="p-deck">{p.deck ?? p.summary}</p>
            <p className="p-status">
              <span className="dot" aria-hidden="true" /> {p.statusNote ?? p.status} <span className="mono p-year">{yearLabel(p)}</span>
            </p>
            {links.length ? (
              <div className="p-links">
                {links.map(([k, href], i) => (
                  <a key={k} className={i === 0 ? "btn" : "link"} href={href} target="_blank" rel="noreferrer">
                    {LINK_LABEL[k] ?? k} <Arrow />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          {hasHero ? (
            <div className="p-hero-visual">
              <Specimen project={p} size="lg" />
            </div>
          ) : null}
        </section>

        {p.stats?.length ? (
          <section className="p-stats" aria-label={`${p.name} in numbers`}>
            <Stats project={p} />
          </section>
        ) : null}

        {p.proof ? (
          <section className="p-proof" data-reveal aria-label="Result">
            <p className="label">Result</p>
            <p className="p-proof-text">{p.proof}</p>
          </section>
        ) : null}

        {p.notes?.length ? (
          <section className="p-notes" aria-labelledby="notes-title">
            <h2 id="notes-title" className="sr-only">
              Project notes
            </h2>
            <ol className="notes">
              {p.notes.map((b) => (
                <li key={b.title} className="note" data-reveal>
                  <div className="note-side">
                    <span className="label">{b.label}</span>
                  </div>
                  <div className="note-main">
                    <h3>{b.title}</h3>
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
        ) : null}

        {p.dossier ? (
          <section className="p-dossier" aria-labelledby="dossier-title" data-reveal>
            <h2 id="dossier-title" className="p-sub">
              How it works
            </h2>
            <div className="dossier dossier-page">
              <div>
                <h3>What it is</h3>
                <p>{p.dossier.architecture}</p>
              </div>
              <div>
                <h3>Decisions</h3>
                <ul>
                  {p.dossier.decisions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Tools</h3>
                <p className="dossier-tools">{p.dossier.tools.join(" · ")}</p>
              </div>
            </div>
          </section>
        ) : null}

        {extraModel ? (
          <section className="p-model" aria-label={`${p.name} 3D model`}>
            <div className="specimen specimen-lg" data-reveal>
              <ModelViewer url={p.model as string} still={p.still} rotation={p.modelRotation} label={`${p.name} · CAD export`} />
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

        {rel.length ? (
          <section className="p-related" aria-labelledby="related-title">
            <h2 id="related-title" className="p-sub" data-reveal>
              Related work
            </h2>
            <ul className="related">
              {rel.map((r) => (
                <li key={r.slug} data-reveal>
                  <a href={r.href}>
                    <span className="label">{r.categories.map((c) => CATEGORY_LABEL[c]).join(" · ")}</span>
                    <span className="related-name">{r.name}</span>
                    <span className="related-sum">{r.summary}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {nb ? (
          <nav className="p-pager" aria-label="More projects">
            <a href={nb.prev.href} className="pager-prev">
              <span className="label">
                <Arrow dir="w" /> Previous
              </span>
              <span className="pager-name">{nb.prev.name}</span>
            </a>
            <a href={nb.next.href} className="pager-next">
              <span className="label">
                Next <Arrow dir="e" />
              </span>
              <span className="pager-name">{nb.next.name}</span>
            </a>
          </nav>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
