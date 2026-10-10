import type { Metadata } from "next";
import { featured, projects } from "../data/portfolio";
import { Arrow, SiteFooter, Specimen, WorkIndex } from "../components/blocks";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Projects · William Nzive",
  description:
    "Embedded Wi-Fi sensing research, a six-axis robot arm, a large-format printer rebuilt from scrap, FRC leadership, and smaller systems and ML projects by William Nzive.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current="/projects" />
      <main id="main" className="page">
        <header className="page-head">
          <p className="label">Projects</p>
          <h1 className="page-title">
            Things I&apos;ve <em>built</em> and measured
          </h1>
        </header>
        <ul className="tiles">
          {featured.map((f) => (
            <li key={f.key} className="tile" data-reveal>
              <a href={`/projects/${f.key}`} className="tile-link">
                <div className="tile-visual" aria-hidden="true">
                  <Specimen projectKey={f.key} />
                </div>
                <div className="tile-copy">
                  <p className="label">
                    <span className="mono">{projects[f.key].number}</span> {f.kicker}
                  </p>
                  <h2>{f.title}</h2>
                  <p>{f.line}</p>
                  <span className="link">
                    Case study <Arrow dir="e" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <section className="section" aria-labelledby="more-title">
          <h2 id="more-title" className="p-sub" data-reveal>
            More projects &amp; research
          </h2>
          <WorkIndex />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
