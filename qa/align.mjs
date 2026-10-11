import puppeteer from "puppeteer-core";
const base = "http://localhost:4174";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
const list = [["/", "al-home"], ["/projects/vulcan", "al-vulcan"], ["/projects/ender3-2", "al-ender"], ["/about", "al-about"], ["/experience", "al-exp"], ["/contact", "al-contact"]];
for (const [path, name] of list) {
  await p.goto(base + path, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 800));
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  let i = 0;
  for (let y = 0; y < h && i < 8; y += 820) {
    await p.evaluate((yy) => scrollTo({ top: yy, behavior: "instant" }), y);
    await new Promise((r) => setTimeout(r, 600));
    await p.screenshot({ path: `qa/x/${name}-${i++}.png` });
  }
  console.log(name, h, i);
}
await b.close();
