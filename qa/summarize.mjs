// One-shot summary of the audit report. Usage: node qa/summarize.mjs
import fs from "node:fs";
const r = JSON.parse(fs.readFileSync(new URL("./after/report.json", import.meta.url), "utf8"));
const t = { errors: 0, failedRequests: 0, overflow: 0, brokenImgs: 0, dupIds: 0, hashLinks: 0, hiddenText: 0 };
let n = 0;
for (const [k, v] of Object.entries(r)) {
  if (k === "links" || k.includes("/does-not-exist")) continue;
  n++;
  t.errors += v.errors.length;
  t.failedRequests += v.failed.length;
  t.overflow += v.overflow.length;
  t.brokenImgs += v.brokenImgs.length;
  t.dupIds += v.dupIds.length;
  t.hashLinks += v.hashLinks.length;
  t.hiddenText += v.hiddenReveal;
  if (v.status !== 200 || v.h1 !== 1) console.log("BAD", k, v.status, "h1:", v.h1);
}
console.log(`audit: ${n} route-views`, JSON.stringify(t));
