// ONE-TIME migration: app/data/{portfolio,cv}.ts  ->  content/projects/*.ts + content/experience.ts + content/site.ts
// Reads the live data and emits files, so no text is retyped. Safe to re-run (overwrites generated files).
import fs from "node:fs";
import { projects, projectStats, featured, contact } from "../app/data/portfolio.ts";
import { cv } from "../app/data/cv.ts";

const q = (v, ind = 0) => {
  const pad = "  ".repeat(ind);
  if (Array.isArray(v)) {
    if (v.length === 0) return "[]";
    if (v.every((x) => typeof x === "string") && JSON.stringify(v).length < 90) return JSON.stringify(v);
    return "[\n" + v.map((x) => pad + "  " + q(x, ind + 1)).join(",\n") + ",\n" + pad + "]";
  }
  if (v && typeof v === "object") {
    const ents = Object.entries(v).filter(([, x]) => x !== undefined);
    return "{\n" + ents.map(([k, x]) => `${pad}  ${/^[a-z_$][\w$]*$/i.test(k) ? k : JSON.stringify(k)}: ${q(x, ind + 1)}`).join(",\n") + ",\n" + pad + "}";
  }
  return JSON.stringify(v);
};
const emit = (slug, obj) => {
  fs.writeFileSync(`content/projects/${slug}.ts`, `import { defineProject } from "../define.ts";\n\nexport default defineProject(${q(obj)});\n`);
};

// ---- the four flagships (media paths rewritten to be relative to public/projects/<slug>/)
const rel = (slug, src) => src.replace(/^\/portfolio\/media\//, "").replace(/^\/portfolio\/models\/[^/]+\//, "");
const MOVES = []; // [from, to]
const mv = (from, to) => MOVES.push([from.replace(/^\//, "public/"), to]);

const meta = {
  csi: { start: 2025, end: "present", status: "active", categories: ["research", "ml", "systems"], skills: ["ESP32", "ESP-IDF", "C/C++", "PyTorch", "CUDA", "Signal processing", "Native USB"], specimen: "spectrogram", featured: 1, role: "Independent researcher",
    seo: { title: "CSI Audio Sensing Research · Wi-Fi RF Capture & ML · William Nzive", description: "ESP32 firmware, native USB 10,839 records/s transport, and deep learning pipeline achieving 90% speaker recognition across 4.6B packets and 98 hours of audio.", ogTitle: "CSI Research — Audio Sensing through Wi-Fi CSI · William Nzive", ogDescription: "ESP32 firmware, native USB transport (10,839 records/s), and PyTorch ML models capturing 4.6 billion packets to investigate RF audio sensing." } },
  vulcan: { start: 2025, end: 2026, status: "active", categories: ["robotics", "fabrication"], skills: ["Creo", "SolidWorks", "Onshape", "Kinematics", "Timing-belt drives", "3D printing"], specimen: "model", featured: 2, role: "Mechanical designer",
    seo: { title: "Vulcan 6-Axis Robot Arm · Mechanical Design Study · William Nzive", description: "Complete open-source 6-axis robot arm CAD architecture featuring 1:16 belt reductions, differential wrist mechanism, and printable chassis design.", ogTitle: "Vulcan — 6-Axis Robot Arm CAD Design Study · William Nzive", ogDescription: "A complete open-source six-axis robot arm design study, detailing kinematics, belt reductions, and printable structural parts in CAD." } },
  "ender3-2": { start: 2026, status: "complete", categories: ["fabrication", "systems"], skills: ["Marlin firmware", "4040 extrusion", "Machine calibration", "Creality 4.2.2"], specimen: "bedmesh", featured: 3, role: "Builder / firmware author",
    seo: { title: "Ender3-2 Large-Format 3D Printer · Physical Build · William Nzive", description: "Rebuilt two scrapped Ender 3 printers into an expanded 585 × 775 × 230 mm Cartesian machine with custom firmware, exhibited live at Open Sauce.", ogTitle: "Ender3-2 — Large-Format Machine Salvage & Firmware · William Nzive", ogDescription: "Salvaged and combined two scrapped Ender 3s into an expanded 585 × 775 × 230 mm Cartesian platform with custom firmware, demonstrated live at Open Sauce." } },
  "team-3598": { start: 2025, end: 2026, status: "complete", categories: ["leadership", "robotics"], skills: ["Java", "Git", "Onshape", "Machining", "Team leadership", "STEM outreach"], specimen: "particles", featured: 4, role: "Team captain",
    seo: { title: "Team 3598 Robotics Captaincy & Outreach · William Nzive", description: "Team captaincy, mechanical design reviews, FIRST Impact Award, World Championship qualification, and STEM outreach reaching 4,452 students across Sacramento.", ogTitle: "Team 3598 — Robotics Leadership & Outreach · William Nzive", ogDescription: "Former captain coordinating 40+ students across design, manufacturing, competition operations, and outreach reaching 4,452 students." } },
};
const featuredBy = Object.fromEntries(featured.map((f) => [f.key, f]));

for (const [slug, p] of Object.entries(projects)) {
  const m = meta[slug];
  const f = featuredBy[slug];
  const media = p.media.map((x) => {
    const file = rel(slug, x.src).replace(/^(ender3-2|team3598)\//, "").replace(/^team3598\.webp$/, "team-group-photo.webp");
    mv(x.src, `public/projects/${slug}/${file}`);
    return { file, alt: x.alt, caption: x.caption, ratio: x.ratio, ...(x.kind === "video" ? { kind: "video" } : {}) };
  });
  let model, still;
  if (p.model) {
    model = p.model.split("/").pop();
    mv(p.model, `public/projects/${slug}/${model}`);
  }
  const stills = { vulcan: "/portfolio/media/vulcan-hero.webp", "ender3-2": "/portfolio/media/ender3-2/full-build.webp" };
  if (stills[slug]) still = stills[slug].split("/").pop();
  const obj = {
    slug, name: p.name, tier: "flagship", status: m.status, statusNote: p.status,
    start: m.start, ...(m.end ? { end: m.end } : {}), featured: m.featured,
    categories: m.categories, skills: m.skills, role: m.role, domain: p.domain,
    summary: f.line, headline: f.title, kicker: f.kicker, deck: p.deck,
    links: p.repo ? { repo: p.repo } : undefined,
    stats: projectStats[slug], specimen: m.specimen, model, still, media,
    notes: p.beats.map(({ label, title, intent, body, facts }) => ({ label, title, intent, body, facts })),
    seo: m.seo,
  };
  emit(slug, obj);
}

// ---- smaller projects from cv.additionalExperience -> standard/note
const slugOf = (t) => t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").replace(/-+/g, "-");
const extra = {
  "Parkinson's DaTscan Classification": { slug: "parkinsons-datscan", start: 2026, end: "present", status: "active", categories: ["ml", "research"], tier: "standard" },
  "Hybrid Language Model Research": { slug: "hybrid-language-models", start: 2026, end: "present", status: "active", categories: ["ml", "research"], tier: "standard" },
  "Low-Cost 3D-Printed Integrated Robotic Joints": { slug: "printed-robotic-joints", start: 2026, end: "present", status: "active", categories: ["robotics", "fabrication"], tier: "standard" },
  "SMUD Solar Regatta": { slug: "smud-solar-regatta", start: 2025, status: "complete", categories: ["systems", "leadership"], tier: "standard" },
  "Custom Operating System & Programming Language": { slug: "custom-os-and-language", start: 2024, status: "complete", categories: ["systems"], tier: "standard" },
  "Hackathons & Exhibitions": { slug: "hackathons-and-exhibitions", start: 2025, end: 2026, status: "active", categories: ["fabrication", "systems"], tier: "note" },
};
for (const e of cv.additionalExperience) {
  const x = extra[e.title];
  if (!x) throw new Error("unmapped: " + e.title);
  const d = e.dossier;
  const summary = e.summary.length <= 160 ? e.summary : e.summary.slice(0, 157).replace(/\s+\S*$/, "") + "…";
  emit(x.slug, {
    slug: x.slug, name: e.title, tier: x.tier, status: x.status, start: x.start, ...(x.end ? { end: x.end } : {}),
    categories: x.categories, skills: d?.stack, role: e.role, domain: e.meta.split(" / ").slice(0, -1).join(" / "),
    summary, deck: e.summary, proof: e.proof,
    dossier: d ? { architecture: d.architecture, decisions: d.keyDecisions, tools: d.stack } : undefined,
    statNotes: undefined,
  });
}

// ---- experience (roles) + site
const expProject = { "UCSC Science Internship Program": "csi", "Wi-Fi CSI Audio Sensing": "csi", Vulcan: "vulcan", "Ender3-2": "ender3-2", "FRC Team 3598 — SEStematic Eliminators": "team-3598" };
const experience = cv.experience.map((e) => ({
  title: e.title, role: e.role, when: e.meta.split(" / ").slice(-1)[0], summary: e.summary, proof: e.proof, project: expProject[e.title],
}));
fs.writeFileSync("content/experience.ts", `import type { ExperienceItem } from "./types.ts";\n\n/** Roles and positions, newest first. \`project\` links an entry to a page in content/projects/. */\nexport const experience: ExperienceItem[] = ${q(experience)};\n`);
fs.writeFileSync("content/site.ts", `export const site = ${q({ name: cv.name, headline: cv.headline, summary: cv.summary, email: contact.email, github: contact.github, linkedin: contact.linkedin, education: cv.education, skills: cv.skills })} as const;\n`);

fs.writeFileSync("qa/migration-moves.json", JSON.stringify(MOVES, null, 1));
console.log("projects:", fs.readdirSync("content/projects").join(", "));
console.log("moves:", MOVES.length);
