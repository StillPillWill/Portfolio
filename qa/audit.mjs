// Site audit: screenshots, console errors, broken links/assets, overflow, a11y basics.
// Usage: node qa/audit.mjs [baseUrl] [outDir]
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:4173";
const OUT = process.argv[3] ?? "qa/out";
fs.mkdirSync(OUT, { recursive: true });

// derived from content/ so new projects are audited automatically
const paged = fs.readdirSync(new URL("../content/projects/", import.meta.url)).filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, "")).filter((slug) => !/tier: "note"/.test(fs.readFileSync(new URL(`../content/projects/${slug}.ts`, import.meta.url), "utf8")));
const ROUTES = ["/", "/projects", ...paged.map((s) => `/projects/${s}`), "/experience", "/about", "/contact", "/work", "/does-not-exist"];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

const report = {};
const linkSet = new Set();

for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    const errors = [];
    const failed = [];
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`.slice(0, 300)));
    page.on("requestfailed", (r) => failed.push(`${r.url()} ${r.failure()?.errorText}`));
    page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
    const res = await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 45000 }).catch((e) => ({ status: () => "ERR " + e.message }));
    // scroll through to trigger reveals / lazy work
    {
      // scroll like a person: real wheel events with pauses, so reveal logic sees genuine input
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 400) { await page.mouse.wheel({ deltaY: 400 }); await new Promise((r) => setTimeout(r, 110)); }
      await new Promise((r) => setTimeout(r, 700));
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await new Promise((r) => setTimeout(r, 700));
    }
    const info = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const overflow = [...document.querySelectorAll("body *")]
        .filter((el) => { const r = el.getBoundingClientRect(); if (el.closest(".chips, .collage")) return false; /* deliberate: swipe row + clipped decorative bleed */ return r.width > 0 && (r.right > vw + 1 || r.left < -1); })
        .slice(0, 8).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join(".")} [${Math.round(el.getBoundingClientRect().left)}..${Math.round(el.getBoundingClientRect().right)}]`);
      const imgsNoAlt = [...document.images].filter((i) => !i.hasAttribute("alt")).length;
      const brokenImgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
      const h1 = document.querySelectorAll("h1").length;
      const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
      const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
      const hashLinks = [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute("href")).filter((h) => h.length > 1 && !document.getElementById(h.slice(1)));
      const links = [...document.querySelectorAll("a[href]")].map((a) => a.href);
      const hiddenReveal = [...document.querySelectorAll("*")].filter((el) => { if (el.closest("details:not([open])") || el.closest(".nav")) return false; const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return r.height > 20 && parseFloat(s.opacity) < 0.05 && el.textContent.trim().length > 20; }).length;
      return { title: document.title, h1, imgsNoAlt, brokenImgs, dupIds, hashLinks, links, overflow, hiddenReveal, height: document.documentElement.scrollHeight };
    });
    info.links.forEach((l) => linkSet.add(l));
    delete info.links;
    const file = path.join(OUT, `${vp.name}${route.replace(/\//g, "_") || "_home"}.png`);
    await page.screenshot({ path: file, fullPage: true, captureBeyondViewport: true }).catch(() => {});
    await page.screenshot({ path: file.replace(".png", "-fold.png") });
    report[`${vp.name} ${route}`] = { status: res.status(), ...info, errors: [...new Set(errors)], failed: [...new Set(failed)] };
    await page.close();
  }
}

// link check
const linkResults = {};
for (const l of linkSet) {
  if (!l.startsWith(BASE)) { linkResults[l] = "external"; continue; }
  const u = l.split("#")[0];
  if (u === BASE + "/does-not-exist") continue;
  try { const r = await fetch(u); linkResults[l] = r.status; } catch { linkResults[l] = "ERR"; }
}
report.links = Object.fromEntries(Object.entries(linkResults).filter(([, s]) => s !== 200));
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
await browser.close();
