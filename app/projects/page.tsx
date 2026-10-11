import type { Metadata } from "next";
import { categoryCounts } from "../../content";
import { SiteFooter } from "../components/blocks";
import { buildCards } from "../components/cards";
import { ProjectExplorer } from "../components/ProjectExplorer";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Projects · William Nzive",
  description:
    "Research, machine learning, robotics, fabrication, and systems projects by William Nzive — filterable by category and searchable by skill.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const cards = buildCards();

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
