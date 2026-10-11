import type { Metadata } from "next";
import { allProjects } from "../../content";
import { Arrow, ExperienceTimeline, SiteFooter, WorkIndex } from "../components/blocks";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Experience · William Nzive",
  description: "Research internship, independent research, robotics leadership, and engineering projects — William Nzive.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current="/experience" />
      <main id="main" className="page">
        <header className="page-head">
          <p className="label">Experience</p>
          <h1 className="page-title">
            Research, <em>builds,</em> and teams
          </h1>
          <a className="link" href="/resume.pdf" target="_blank" rel="noreferrer">
            Résumé (PDF) <Arrow />
          </a>
        </header>
        <section className="section section-tight" aria-label="Main experience">
          <ExperienceTimeline />
        </section>
        <section className="section" aria-labelledby="more-title">
          <h2 id="more-title" className="p-sub" data-reveal>
            Additional projects
          </h2>
          <WorkIndex items={allProjects.filter((p) => p.tier !== "flagship")} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
