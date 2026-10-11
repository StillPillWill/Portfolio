import puppeteer from "puppeteer-core";
const base = process.argv[2] || "http://localhost:4174";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
const pages = [["/", "home"], ["/projects/vulcan", "vulcan"], ["/projects/parkinsons-datscan", "datscan"]];
for (const [path, name] of pages) {
  await p.goto(base + path, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1200));
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  let i = 0;
  for (let y = 0; y < Math.min(h, 5400); y += 800) {
    await p.evaluate((yy) => scrollTo({ top: yy, behavior: "instant" }), y);
    await new Promise((r) => setTimeout(r, 700));
    await p.screenshot({ path: `qa/x/look-${name}-${i++}.png` });
  }
  console.log(name, h, i);
}
await b.close();
