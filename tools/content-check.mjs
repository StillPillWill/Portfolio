// Validate content/ without building: schema rules + files on disk.
// Usage: node tools/content-check.mjs        (exit code 1 on any problem)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { validateProjects } from "../content/validate.ts";
import { experience } from "../content/experience.ts";

const root = path.resolve(import.meta.dirname, "..");
const dir = process.env.CONTENT_DIR ? path.resolve(process.env.CONTENT_DIR) : path.join(root, "content", "projects");
const pub = process.env.PUBLIC_DIR ? path.resolve(process.env.PUBLIC_DIR) : path.join(root, "public", "projects");

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
const projects = [];
const errors = [];
for (const f of files) {
  const mod = await import(pathToFileURL(path.join(dir, f)).href);
  const p = mod.default;
  if (!p) {
    errors.push(`${f}: no default export (use export default defineProject({...}))`);
    continue;
  }
  if (p.slug !== f.replace(/\.ts$/, "")) errors.push(`${f}: slug "${p.slug}" must match the filename`);
  projects.push(p);
}
errors.push(...validateProjects(projects, experience));

// files on disk
const exists = (slug, rel) => fs.existsSync(path.join(pub, slug, rel));
const referenced = new Map(); // slug -> Set(files)
for (const p of projects) {
  const set = new Set();
  referenced.set(p.slug, set);
  for (const m of p.media ?? []) {
    set.add(m.file);
    if (!exists(p.slug, m.file)) errors.push(`project "${p.slug}": media file missing: public/projects/${p.slug}/${m.file}`);
  }
  for (const m of p.media ?? []) {
    if (m.poster) {
      set.add(m.poster);
      if (!exists(p.slug, m.poster)) errors.push(`project "${p.slug}": poster file missing: public/projects/${p.slug}/${m.poster}`);
    }
  }
  for (const k of ["model", "still", "cover", "preview"]) {
    if (!p[k]) continue;
    set.add(p[k]);
    if (!exists(p.slug, p[k])) errors.push(`project "${p.slug}": ${k} file missing: public/projects/${p.slug}/${p[k]}`);
  }
}
// orphans: media folders with no project, and files nobody references
const warnings = [];
if (fs.existsSync(pub)) {
  for (const d of fs.readdirSync(pub, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    if (!referenced.has(d.name)) {
      warnings.push(`public/projects/${d.name}/ has no matching content/projects/${d.name}.ts`);
      continue;
    }
    for (const f of fs.readdirSync(path.join(pub, d.name))) {
      if (!referenced.get(d.name).has(f)) warnings.push(`public/projects/${d.name}/${f} is not referenced by its project`);
    }
  }
}

for (const w of warnings) console.warn("warn  " + w);
if (errors.length) {
  console.error(`\n${errors.length} content problem${errors.length > 1 ? "s" : ""}:`);
  for (const e of errors) console.error("  x " + e);
  process.exit(1);
}
const n = (t) => projects.filter((p) => p.tier === t).length;
console.log(`content ok: ${projects.length} projects (${n("flagship")} flagship, ${n("standard")} standard, ${n("note")} note), ${warnings.length} warnings`);
