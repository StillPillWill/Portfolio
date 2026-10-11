import puppeteer from "puppeteer-core";
const base = "http://localhost:4174";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
const sel = [
  ".brand", ".nav", ".intro-inner", ".intro-name", ".intro-lede", ".intro-links",
  ".section-head", ".section-head h2", ".explorer-bar", ".chips", ".explorer-tools", ".explorer-count", ".tiles",
  ".timeline", ".about", ".contact", ".contact-title", ".footer-inner",
  ".page-head", ".page-title", ".page-head .label", ".crumbs", ".p-hero-copy", ".p-title", ".p-hero-visual", ".p-stats", ".p-notes", ".p-model", ".p-gallery", ".p-pager", ".related",
];
for (const w of [1440, 1100, 390]) {
  await p.setViewport({ width: w, height: 900 });
  for (const path of ["/", "/projects", "/projects/vulcan", "/projects/ender3-2", "/about", "/experience", "/contact"]) {
    await p.goto(base + path, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 500));
    const rows = await p.evaluate((sel) => {
      const out = [];
      for (const s of sel) {
        const e = document.querySelector(s);
        if (!e) continue;
        const r = e.getBoundingClientRect();
        if (r.width === 0) continue;
        out.push([s, Math.round(r.left), Math.round(r.right)]);
      }
      return out;
    }, sel);
    console.log(`\n== ${w} ${path}`);
    console.log(rows.map((r) => `${r[0]} ${r[1]}-${r[2]}`).join(" | "));
  }
}
await b.close();
