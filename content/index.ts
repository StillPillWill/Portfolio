/// <reference types="vite/client" />
import { CATEGORIES, CATEGORY_LABEL, type CategoryId } from "./taxonomy.ts";
import { experience } from "./experience.ts";
import { site } from "./site.ts";
import type { Media, Project, ProjectInput, Status } from "./types.ts";
import { validateProjects } from "./validate.ts";

export { CATEGORIES, CATEGORY_LABEL, experience, site };
export type { CategoryId, Project, Status };
export type { ProjectInput, Tier, SpecimenId, Stat } from "./types.ts";

/**
 * The registry. Every file in content/projects/ is picked up automatically —
 * to add a project, add a file. Nothing here needs editing.
 */
const modules = import.meta.glob<{ default: ProjectInput }>("./projects/*.ts", { eager: true });

const inputs: ProjectInput[] = Object.entries(modules).map(([path, mod]) => {
  const p = mod.default;
  const file = path.replace(/^\.\/projects\//, "").replace(/\.ts$/, "");
  if (p.slug !== file) throw new Error(`content/projects/${file}.ts: slug "${p.slug}" must match the filename`);
  return p;
});

const problems = validateProjects(inputs, experience);
if (problems.length) {
  throw new Error(`Invalid content (${problems.length}):\n - ${problems.join("\n - ")}`);
}

const asset = (slug: string, file: string) => `/projects/${slug}/${file}`;
const IMG = /\.(webp|jpe?g|png|avif)$/i;

function build(p: ProjectInput): Project {
  const media: Media[] = (p.media ?? []).map(({ file, ...m }) => ({ ...m, src: asset(p.slug, file) }));
  const firstImage = media.find((m) => m.kind !== "video" && IMG.test(m.src));
  return {
    ...p,
    media,
    model: p.model ? asset(p.slug, p.model) : undefined,
    still: p.still ? asset(p.slug, p.still) : undefined,
    thumb: p.still ? asset(p.slug, p.still) : firstImage?.src,
    href: p.tier === "note" ? undefined : `/projects/${p.slug}`,
  };
}

const endYear = (p: Project) => (p.end === "present" ? 9999 : (p.end ?? p.start));

/** Newest first; ongoing work on top; ties broken by name for a stable order. */
function byRecency(a: Project, b: Project) {
  return endYear(b) - endYear(a) || b.start - a.start || a.name.localeCompare(b.name);
}

export const allProjects: Project[] = inputs.map(build).sort(byRecency);

/** Everything that has its own page. */
export const pagedProjects = allProjects.filter((p) => p.tier !== "note");

/** Homepage showcase, in `featured` rank order. */
export const featuredProjects = allProjects
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => (a.featured as number) - (b.featured as number));

/** Reading order for prev/next: featured first (by rank), then the rest by recency. */
export const pageOrder: Project[] = [
  ...featuredProjects,
  ...pagedProjects.filter((p) => p.featured === undefined),
];

export const getProject = (slug: string) => allProjects.find((p) => p.slug === slug);

export function neighbours(slug: string) {
  const i = pageOrder.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  const n = pageOrder.length;
  return { prev: pageOrder[(i + n - 1) % n], next: pageOrder[(i + 1) % n] };
}

/** Projects sharing the most categories/skills with `slug` (excludes itself and notes). */
export function related(slug: string, limit = 3): Project[] {
  const me = getProject(slug);
  if (!me) return [];
  const mySkills = new Set((me.skills ?? []).map((s) => s.toLowerCase()));
  return pagedProjects
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score:
        p.categories.filter((c) => me.categories.includes(c)).length * 3 +
        (p.skills ?? []).filter((s) => mySkills.has(s.toLowerCase())).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || byRecency(a.p, b.p))
    .slice(0, limit)
    .map((x) => x.p);
}

export function categoryCounts(list: Project[] = allProjects): Array<{ id: CategoryId; label: string; count: number }> {
  return CATEGORIES.map((c) => ({ id: c.id, label: c.label, count: list.filter((p) => p.categories.includes(c.id)).length })).filter(
    (c) => c.count > 0,
  );
}

export const yearLabel = (p: Pick<Project, "start" | "end">) =>
  p.end === "present" ? `${p.start}–present` : p.end && p.end !== p.start ? `${p.start}–${p.end}` : `${p.start}`;

export const domainOf = (p: Project) => p.domain ?? p.categories.map((c) => CATEGORY_LABEL[c]).join(" · ");
