import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
const errs = []; p.on("pageerror", e => errs.push(e.message)); p.on("console", m => m.type() === "error" && errs.push(m.text()));
await p.goto("http://localhost:4174/", { waitUntil: "networkidle2" }); await new Promise(r => setTimeout(r, 1000));
await p.evaluate(() => scrollTo({ top: document.querySelector(".explorer-bar").getBoundingClientRect().top + scrollY - 90, behavior: "instant" })); await new Promise(r => setTimeout(r, 1500));
await p.screenshot({ path: "qa/x/wall-1.png" });
for (let i = 2; i <= 4; i++) { await p.evaluate(() => scrollBy({ top: 760, behavior: "instant" })); await new Promise(r => setTimeout(r, 900)); await p.screenshot({ path: `qa/x/wall-${i}.png` }); }
const g = await p.evaluate(() => { const t = [...document.querySelectorAll(".tile")].map(e => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; }); return t; });
console.log("tile boxes:", JSON.stringify(g));
console.log("tiles", g.length, "imgs ok", await p.$$eval(".tile img", e => e.filter(i => i.complete && i.naturalWidth > 0).length), "/", await p.$$eval(".tile img", e => e.length), "plates", await p.$$eval(".plate", e => e.length), "overflow", await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
console.log("errs", errs.slice(0, 3));
await b.close();
