// Viewport screenshots at scroll steps. Usage: node qa/shots.mjs base route outPrefix [w] [h] [steps]
import puppeteer from "puppeteer-core";
const [base, route, out, w = "1440", h = "900", steps = "8"] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage();
const mobile = +w < 600;
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
await page.goto(base + route, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));
const H = await page.evaluate(() => document.documentElement.scrollHeight);
const n = Math.min(+steps, Math.ceil(H / +h));
for (let i = 0; i < n; i++) {
  const y = Math.round((i * (H - +h)) / Math.max(1, n - 1));
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${out}-${String(i).padStart(2, "0")}.png` });
}
console.log("height", H, "shots", n);
await browser.close();
