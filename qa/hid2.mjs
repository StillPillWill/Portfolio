import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:4174/projects/ender3-2", { waitUntil: "networkidle2" });
await p.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, h); await new Promise(r => setTimeout(r, 300)); window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 900)); });
console.log(await p.evaluate(() => [...document.querySelectorAll("*")].filter(el => { if (el.closest("details:not([open])")||el.closest(".nav")) return false; const r = el.getBoundingClientRect(); return r.height > 20 && parseFloat(getComputedStyle(el).opacity) < 0.05 && el.textContent.trim().length > 20; }).map(el => el.tagName + "." + el.className + " | " + el.textContent.slice(0, 40) + " | in=" + el.classList.contains("is-in") + " top=" + Math.round(el.getBoundingClientRect().top + scrollY))));
await b.close();
