import puppeteer from "puppeteer-core";
const base = "http://localhost:4174";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
const shots = [
  [1440, 900, "/", 0, "f-home-top"],
  [1440, 900, "/", 700, "f-home-wall"],
  [1440, 900, "/projects/ender3-2", 0, "f-ender"],
  [1440, 900, "/projects/vulcan", 1500, "f-vulcan-mid"],
  [1440, 900, "/projects/csi", 0, "f-csi"],
  [1440, 900, "/projects/parkinsons-datscan", 0, "f-datscan"],
  [390, 844, "/", 0, "f-m-home"],
  [390, 844, "/", 760, "f-m-wall"],
];
for (const [w, h, path, y, name] of shots) {
  await p.setViewport({ width: w, height: h, deviceScaleFactor: w < 500 ? 2 : 1 });
  await p.goto(base + path, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 900));
  await p.evaluate((yy) => scrollTo({ top: yy, behavior: "instant" }), y);
  await new Promise((r) => setTimeout(r, 900));
  await p.screenshot({ path: `qa/x/${name}.png` });
  console.log(name, "overflow", await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
}
await b.close();
