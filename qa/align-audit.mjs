// Alignment audit: every visible heading/paragraph/media block must start on the page content edge
// (or an explicitly allowed inner column), and nothing may poke past the content width.
import puppeteer from "puppeteer-core";
const base = process.argv[2] || "http://localhost:4174";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
const routes = ["/", "/projects", "/projects/vulcan", "/projects/ender3-2", "/projects/csi", "/projects/team-3598", "/projects/parkinsons-datscan", "/about", "/experience", "/contact"];
let bad = 0, checked = 0;
for (const w of [1440, 1100, 820, 390]) {
  await p.setViewport({ width: w, height: 900 });
  for (const r of routes) {
    await p.goto(base + r, { waitUntil: "networkidle2" });
    await new Promise((x) => setTimeout(x, 400));
    const res = await p.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const probe = document.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden;width:var(--pad)";
      document.body.appendChild(probe);
      const P = probe.getBoundingClientRect().width;
      const max = (() => { probe.style.width = "var(--max)"; return probe.getBoundingClientRect().width; })();
      probe.remove();
      const left = Math.max(P, (vw - max) / 2 + P);
      const right = vw - left;
      const issues = [];
      const sel = "main h1, main h2, main h3, main > section > p, main .label, main .tile, main .stat, main .note, main .gallery-item, main .tl-item, main .about, main .p-hero-copy, main .p-hero-visual, .footer-inner > *:first-child";
      let n = 0;
      for (const e of document.querySelectorAll(sel)) {
        const r = e.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (e.closest(".hero .collage, .collage, [aria-hidden=true]")) continue;
        n++;
        if (r.right > right + 1.5 || r.left < left - 1.5) issues.push(`${e.className || e.tagName}: ${Math.round(r.left)}-${Math.round(r.right)} (content ${Math.round(left)}-${Math.round(right)})`);
      }
      // top-level content blocks: left edge must equal the content edge
      const heads = [...document.querySelectorAll("main h1, main h2, .section-head, .page-head, .intro-inner, .contact, .p-hero-copy, .crumbs")].filter((e) => e.getBoundingClientRect().width > 0);
      for (const e of heads) {
        const l = e.getBoundingClientRect().left;
        if (Math.abs(l - left) > 1.5 && !e.closest(".p-hero-visual")) issues.push(`left edge ${e.className || e.tagName}: ${Math.round(l)} != ${Math.round(left)}`);
      }
      // photos in the same wall row: equal media height
      const rows = {};
      for (const t of document.querySelectorAll(".tiles-wall .tile-media")) { const r = t.getBoundingClientRect(); (rows[Math.round(r.top)] ??= []).push(Math.round(r.height)); }
      for (const [y, hs] of Object.entries(rows)) if (new Set(hs).size > 1) issues.push(`tile photos in row y=${y} differ in height: ${hs.join(",")}`);
      // vertical rhythm: first content block must start within a sane distance below the page title
      const ph = document.querySelector(".page-head"), nx = ph && ph.nextElementSibling;
      if (ph && nx) { const gap = nx.getBoundingClientRect().top - ph.getBoundingClientRect().bottom; if (gap > 130) issues.push(`gap under page title is ${Math.round(gap)}px`); }
      // hero: text block and visual share a top edge (within 6px)
      const c = document.querySelector(".p-hero-copy .crumbs"), v = document.querySelector(".p-hero-visual");
      if (c && v && innerWidth > 900) { const d = Math.abs(c.getBoundingClientRect().top - v.getBoundingClientRect().top); if (d > 8) issues.push(`project hero: text top is ${Math.round(d)}px off the visual top`); }
      // pseudo-element dividers must sit inside their parent's box (a static parent makes them attach to the page)
      for (const e of document.querySelectorAll(".explorer-bar")) {
        const ps = getComputedStyle(e).position, af = getComputedStyle(e, "::after");
        if (af.content !== "none" && af.display !== "none" && ps === "static") issues.push("explorer-bar divider on a static box (line crosses page)");
      }
      return { n, issues };
    });
    checked += res.n;
    if (res.issues.length) { bad += res.issues.length; console.log(`${w} ${r}\n  ` + [...new Set(res.issues)].slice(0, 6).join("\n  ")); }
  }
}
console.log(`\nalignment: ${checked} blocks checked, ${bad} problems`);
await b.close();
process.exit(bad ? 1 : 0);
