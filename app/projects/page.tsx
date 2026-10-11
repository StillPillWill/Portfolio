import type { Metadata } from "next";
import { allProjects, categoryCounts, yearLabel } from "../../content";
import { SiteFooter } from "../components/blocks";
import { ProjectExplorer, type Card } from "../components/ProjectExplorer";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Projects · William Nzive",
  description:
    "Research, machine learning, robotics, fabrication, and systems projects by William Nzive — filterable by category and searchable by skill.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const cards: Card[] = allProjects.map((p) => ({
    slug: p.slug,
    name: p.name,
    summary: p.summary,
    proof: p.proof,
    categories: p.categories,
    skills: p.skills ?? [],
    start: p.start,
    endYear: p.end === "present" ? 9999 : (p.end ?? p.start),
    years: yearLabel(p),
    status: p.status,
    featured: p.featured !== undefined,
    href: p.href,
    thumb: p.thumb,
    flagship: p.tier === "flagship",
  }));

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
        <ProjectExplorer cards={cards} categories={categoryCounts()} />
      </main>
      <SiteFooter />
    </>
  );
}
