import { CATEGORIES } from "./taxonomy.ts";
import type { ExperienceItem, ProjectInput } from "./types.ts";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const URL_RE = /^https?:\/\/[^\s]+$/;
export const SUMMARY_MAX = 160;

/**
 * Pure content checks (no filesystem) shared by the build-time registry and
 * `npm run content:check`. Returns human-readable errors; empty means valid.
 */
export function validateProjects(projects: ProjectInput[], experience: ExperienceItem[] = []): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  const ranks = new Map<number, string>();
  const cats = new Set<string>(CATEGORIES.map((c) => c.id));

  for (const p of projects) {
    const at = `project "${p.slug}"`;
    const err = (m: string) => errors.push(`${at}: ${m}`);

    if (!p.slug || !SLUG.test(p.slug)) err(`slug must be lowercase-hyphen (got "${p.slug}")`);
    if (seen.has(p.slug)) err("duplicate slug");
    seen.add(p.slug);

    if (!p.name?.trim()) err("name is required");
    if (!["flagship", "standard", "note"].includes(p.tier)) err(`unknown tier "${p.tier}"`);
    if (!["active", "complete", "paused", "archived"].includes(p.status)) err(`unknown status "${p.status}"`);
    if (!Number.isInteger(p.start) || p.start < 2000 || p.start > 2100) err(`start must be a year (got ${p.start})`);
    if (p.end !== undefined && p.end !== "present" && (!Number.isInteger(p.end) || p.end < p.start)) err(`end must be "present" or a year >= start`);

    if (!Array.isArray(p.categories) || p.categories.length === 0) err("needs at least one category");
    for (const c of p.categories ?? []) if (!cats.has(c)) err(`unknown category "${c}" (see content/taxonomy.ts)`);

    if (!p.summary?.trim()) err("summary is required");
    else if (p.summary.length > SUMMARY_MAX) err(`summary is ${p.summary.length} chars; max ${SUMMARY_MAX}`);

    if (p.featured !== undefined) {
      if (!Number.isInteger(p.featured) || p.featured < 1) err("featured must be a positive integer rank");
      else if (ranks.has(p.featured)) err(`featured rank ${p.featured} already used by "${ranks.get(p.featured)}"`);
      else ranks.set(p.featured, p.slug);
      if (p.tier === "note") err("a note has no page, so it cannot be featured");
    }

    if (p.tier === "flagship") {
      if (!p.deck) err("flagship needs a deck (intro paragraph)");
      if (!p.notes?.length) err("flagship needs at least one note (case-study section)");
      if (!p.stats?.length) err("flagship needs stats");
      if (!p.specimen && !p.media?.length) err("flagship needs a specimen graphic or media");
    }
    if (p.tier === "standard" && !p.deck && !p.proof && !p.notes?.length) err("standard needs a deck, proof, or notes");
    if (p.tier === "note" && !p.proof && !p.deck) err("note needs proof or deck text");

    if (p.specimen === "model" && !p.model) err('specimen "model" needs a `model` file');

    for (const [k, v] of Object.entries(p.links ?? {})) if (v && !URL_RE.test(v)) err(`links.${k} is not an http(s) URL`);
    for (const s of p.stats ?? []) {
      if (!s.label) err("a stat is missing its label");
      if (!s.text && !Number.isFinite(s.to)) err(`stat "${s.label}" needs a numeric \`to\` or \`text\``);
    }
    for (const m of p.media ?? []) {
      if (!m.file || !m.alt || !m.caption) err(`media entry "${m.file}" needs file, alt, and caption`);
      if (m.file.startsWith("/") || m.file.includes("..")) err(`media "${m.file}" must be relative to public/projects/${p.slug}/`);
    }
    for (const n of p.notes ?? []) if (!n.label || !n.title || !n.body) err(`a note is missing label, title, or body ("${n.title ?? n.label}")`);
  }

  for (const e of experience) {
    if (e.project && !seen.has(e.project)) errors.push(`experience "${e.title}": project "${e.project}" does not exist`);
  }
  return errors;
}
