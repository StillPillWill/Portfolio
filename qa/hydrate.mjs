import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage();
page.on("console", (m) => console.log("console", m.type(), m.text().slice(0, 300)));
page.on("pageerror", (e) => console.log("pageerror", e.message.slice(0, 300)));
page.on("requestfailed", (r) => console.log("reqfail", r.url()));
await page.goto("http://localhost:4174/", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 1500));
console.log(await page.evaluate(() => ({
  htmlClass: document.documentElement.className,
  reactRoot: !!document.querySelector("[data-reveal]"),
  isIn: document.querySelectorAll(".is-in").length,
  total: document.querySelectorAll("[data-reveal]").length,
  menuBtnProps: Object.keys(document.querySelector(".menu-btn") ?? {}).slice(0, 3),
  canvasReady: document.querySelector("canvas")?.dataset.ready,
  frames: document.querySelector("canvas")?.dataset.frames,
})));
await browser.close();
