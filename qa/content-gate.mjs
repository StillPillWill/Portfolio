// Gate: break content in 6 ways, confirm the checker catches each with a clear message, and that a clean copy passes.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "content-gate-"));
const cdir = path.join(tmp, "projects");
const pdir = path.join(tmp, "public");

function fresh() {
  fs.rmSync(cdir, { recursive: true, force: true });
  fs.rmSync(pdir, { recursive: true, force: true });
  fs.cpSync(path.join(root, "content", "projects"), cdir, { recursive: true });
  fs.cpSync(path.join(root, "public", "projects"), pdir, { recursive: true });
  // content files import ../define.ts; place the shared content files beside the temp dir
  for (const f of ["define.ts", "types.ts", "taxonomy.ts", "validate.ts"]) fs.copyFileSync(path.join(root, "content", f), path.join(tmp, f));
}
function run() {
  const r = spawnSync("node", [path.join(root, "tools", "content-check.mjs")], { env: { ...process.env, CONTENT_DIR: cdir, PUBLIC_DIR: pdir }, encoding: "utf8" });
  return { code: r.status, out: (r.stdout ?? "") + (r.stderr ?? "") };
}
const edit = (file, fn) => {
  const p = path.join(cdir, file);
  fs.writeFileSync(p, fn(fs.readFileSync(p, "utf8")));
};

const cases = [
  ["duplicate featured rank", () => edit("vulcan.ts", (s) => s.replace("featured: 2", "featured: 1")), /featured rank 1 already used/],
  ["missing image file", () => fs.rmSync(path.join(pdir, "vulcan", "vulcan-detail.webp")), /media file missing: public\/projects\/vulcan\/vulcan-detail\.webp/],
  ["unknown category", () => edit("csi.ts", (s) => s.replace('"research"', '"quantum"')), /unknown category "quantum"/],
  ["missing required field (summary)", () => edit("csi.ts", (s) => s.replace(/\n {2}summary: ".*",/, "")), /summary is required/],
  ["slug != filename", () => edit("csi.ts", (s) => s.replace('slug: "csi"', 'slug: "csi-two"')), /slug "csi-two" must match the filename/],
  ["summary too long", () => edit("csi.ts", (s) => s.replace(/summary: "[^"]*"/, `summary: "${"x".repeat(200)}"`)), /summary is 200 chars; max 160/],
];

let failed = 0;
fresh();
const clean = run();
console.log(`${clean.code === 0 ? "PASS" : "FAIL"}  clean copy passes -> ${clean.out.trim().split("\n").pop()}`);
if (clean.code !== 0) { failed++; console.log(clean.out); }
for (const [name, mutate, expect] of cases) {
  fresh();
  mutate();
  const r = run();
  const ok = r.code === 1 && expect.test(r.out);
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name} -> ${r.out.split("\n").find((l) => expect.test(l))?.trim() ?? "(not reported)\n" + r.out}`);
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(failed ? `\n${failed} FAILED` : "\nall gates passed");
process.exit(failed ? 1 : 0);
