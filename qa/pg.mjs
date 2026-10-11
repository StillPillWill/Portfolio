import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
const errs = []; p.on("pageerror", e => errs.push(e.message)); p.on("console", m => m.type() === "error" && errs.push(m.text()));
for (const slug of ["ender3-2", "vulcan", "csi", "parkinsons-datscan"]) {
  await p.goto("http://localhost:4174/projects/" + slug, { waitUntil: "networkidle2" }); await new Promise(r => setTimeout(r, 800));
  await p.evaluate(() => { const g = document.querySelector(".gallery"); if (g) g.scrollIntoView({ behavior: "instant", block: "start" }); }); await new Promise(r => setTimeout(r, 1500));
  await p.screenshot({ path: `qa/x/pg-${slug}.png` });
  const info = await p.evaluate(() => ({ items: document.querySelectorAll(".gallery-item").length, imgsOk: [...document.querySelectorAll(".gallery img")].filter(i => i.complete && i.naturalWidth > 0).length, imgs: document.querySelectorAll(".gallery img").length, vids: document.querySelectorAll(".gallery video").length, vidsReady: [...document.querySelectorAll(".gallery video")].filter(v => v.readyState >= 2).length, overflow: document.documentElement.scrollWidth - innerWidth }));
  console.log(slug, JSON.stringify(info));
}
console.log("errs", errs.slice(0, 4));
await b.close();
