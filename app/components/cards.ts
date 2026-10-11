import { allProjects, yearLabel } from "../../content";
import type { Card } from "./ProjectCard";

/** Every project as serialisable card data. One place, used by the homepage and /projects. */
export function buildCards(): Card[] {
  return allProjects.map((p) => ({
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
    thumbIsFigure: p.thumbIsFigure,
    preview: p.preview,
    flagship: p.tier === "flagship",
  }));
}
