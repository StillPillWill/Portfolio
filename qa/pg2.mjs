import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:4174/projects/ender3-2", { waitUntil: "networkidle2" });
const h = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < h; y += 400) { await p.mouse.wheel({ deltaY: 400 }); await new Promise(r => setTimeout(r, 120)); }
await new Promise(r => setTimeout(r, 1500));
console.log(await p.evaluate(() => ({ imgs: document.querySelectorAll(".gallery img").length, ok: [...document.querySelectorAll(".gallery img")].filter(i => i.complete && i.naturalWidth > 0).length })));
await p.evaluate(() => document.querySelector(".gallery").scrollIntoView({ behavior: "instant" })); await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: "qa/x/pg-ender-a.png" });
await p.evaluate(() => scrollBy({ top: 800, behavior: "instant" })); await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: "qa/x/pg-ender-b.png" });
await b.close();
