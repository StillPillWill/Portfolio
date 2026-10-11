import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:4174/", { waitUntil: "networkidle2" }); await new Promise(r => setTimeout(r, 800));
await p.evaluate(() => document.querySelector("#more").scrollIntoView({ behavior: "instant" })); await new Promise(r => setTimeout(r, 1200));
await p.screenshot({ path: "qa/x/home-more.png" });
await b.close();
