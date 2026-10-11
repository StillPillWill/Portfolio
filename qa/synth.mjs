// Scale test helper. node qa/synth.mjs add <n> | remove
import fs from "node:fs";
import path from "node:path";
const dir = path.resolve(import.meta.dirname, "..", "content", "projects");
const cmd = process.argv[2];
if (cmd === "remove") {
  let n = 0;
  for (const f of fs.readdirSync(dir)) if (f.startsWith("zz-synth-")) { fs.rmSync(path.join(dir, f)); n++; }
  console.log("removed", n);
} else {
  const n = Number(process.argv[3] ?? 40);
  const cats = ["research", "ml", "systems", "robotics", "fabrication", "leadership"];
  const tiers = ["standard", "standard", "standard", "note", "flagship"];
  for (let i = 0; i < n; i++) {
    const slug = `zz-synth-${String(i).padStart(2, "0")}`;
    const tier = tiers[i % tiers.length];
    const start = 2018 + (i % 9);
    const c1 = cats[i % 6], c2 = cats[(i * 5 + 1) % 6];
    const body =
      tier === "flagship"
        ? `deck: "Synthetic flagship ${i}. A longer introduction paragraph used only for the scale test.", stats: [{ to: ${i + 1}, label: "synthetic metric" }], notes: [{ label: "Problem", title: "Synthetic note ${i}", body: "Body text." }], specimen: "spectrogram",`
        : tier === "standard"
          ? `deck: "Synthetic standard project ${i}.", proof: "Synthetic result ${i}.",`
          : `proof: "Synthetic note ${i}.",`;
    fs.writeFileSync(
      path.join(dir, `${slug}.ts`),
      `import { defineProject } from "../define.ts";\nexport default defineProject({ slug: "${slug}", name: "Synthetic Project ${i}", tier: "${tier}", status: "complete", start: ${start}, end: ${start + 1}, categories: ["${c1}", "${c2}"], skills: ["skill-${i % 7}", "ESP32"], summary: "Synthetic summary ${i} for the scale test.", ${body} });\n`,
    );
  }
  console.log("added", n);
}
