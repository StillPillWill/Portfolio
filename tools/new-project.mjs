// Scaffold a project:  npm run new:project -- my-project-slug [flagship|standard|note]
import fs from "node:fs";
import path from "node:path";

const [slug, tier = "standard"] = process.argv.slice(2);
const root = path.resolve(import.meta.dirname, "..");
if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error("usage: npm run new:project -- <lowercase-slug> [flagship|standard|note]");
  process.exit(1);
}
if (!["flagship", "standard", "note"].includes(tier)) {
  console.error(`unknown tier "${tier}"`);
  process.exit(1);
}
const file = path.join(root, "content", "projects", `${slug}.ts`);
if (fs.existsSync(file)) {
  console.error(`content/projects/${slug}.ts already exists`);
  process.exit(1);
}
const name = slug
  .split("-")
  .map((w) => w[0].toUpperCase() + w.slice(1))
  .join(" ");
const year = new Date().getFullYear();

const flagship = `  // Homepage showcase rank (1 = first). Delete this line to keep it off the homepage.
  // featured: 5,
  headline: "Card title for the homepage",
  kicker: "Category · discipline",
  deck: "Two or three sentences that introduce the project on its page.",
  proof: "The headline result, in one sentence.",
  stats: [
    { to: 0, label: "what this number measures" },
    // { to: 4.6, decimals: 1, suffix: "B", label: "..." }, { to: 40, prefix: "$", label: "..." }
  ],
  // specimen: "model",   // spectrogram | bedmesh | particles | model  (omit for a plain lead image)
  media: [
    // { file: "photo.webp", alt: "What it shows", caption: "Caption", ratio: "wide" },
  ],
  notes: [
    { label: "Problem", title: "What had to be solved", intent: "One-line goal.", body: "What you did and what happened.", facts: ["fact", "fact"] },
  ],
`;
const standard = `  deck: "Two or three sentences that introduce the project on its page.",
  proof: "The headline result, in one sentence.",
  // Optional sections — each appears on the page only if present:
  // stats: [{ to: 0, label: "..." }],
  // media: [{ file: "photo.webp", alt: "...", caption: "...", ratio: "wide" }],
  // notes: [{ label: "...", title: "...", body: "..." }],
  // dossier: { architecture: "...", decisions: ["..."], tools: ["..."] },
`;
const note = `  proof: "What it was and what came of it, in a sentence or two.",
`;
const body = tier === "flagship" ? flagship : tier === "standard" ? standard : note;

fs.writeFileSync(
  file,
  `import { defineProject } from "../define.ts";

export default defineProject({
  slug: "${slug}",
  name: "${name}",
  tier: "${tier}",
  status: "active", // active | complete | paused | archived
  start: ${year},
  // end: "present",   // or a year; omit for a single-year project
  categories: ["systems"], // research | ml | systems | robotics | fabrication | leadership  (content/taxonomy.ts)
  skills: [],
  role: "",
  summary: "One line, 160 characters max. Shown on cards, lists, and in search results.",
${body}  // links: { repo: "https://github.com/..." },
});
`,
);
if (tier !== "note") fs.mkdirSync(path.join(root, "public", "projects", slug), { recursive: true });
console.log(`created content/projects/${slug}.ts${tier !== "note" ? ` and public/projects/${slug}/ (put photos and models there)` : ""}`);
console.log("next: fill it in, then  npm run content:check");
