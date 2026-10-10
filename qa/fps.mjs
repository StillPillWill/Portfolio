import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:4174/", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 1500));
// baseline: bare rAF rate in this headless browser, and cost of each canvas draw
const out = await page.evaluate(async () => {
  const fps = () => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 2000) requestAnimationFrame(f); else res(n / 2); }; requestAnimationFrame(f); });
  const result = { heroFps: await fps() };
  for (const [name, scroll] of [["spectro", ".chapter-csi"], ["mesh", ".chapter-ender3-2"], ["particles", ".chapter-team-3598"]]) {
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelector(scroll).scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    result[name + "Fps"] = await fps();
  }
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 400));
  result.heroFpsTop = await fps();
  return result;
});
console.log(out);
await browser.close();
