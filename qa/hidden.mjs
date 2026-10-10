import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844, isMobile: true, hasTouch: true }]]) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  await page.goto("http://localhost:4174/", { waitUntil: "networkidle2" });
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  });
  await new Promise((r) => setTimeout(r, 1500));
  const res = await page.evaluate(() => {
    const out = [...document.querySelectorAll("[data-reveal]")].filter((el) => !el.classList.contains("is-in")).map((el) => el.tagName + "." + el.className + " " + el.textContent.slice(0, 30));
    const hidden = [...document.querySelectorAll("*")].filter((el) => { const r = el.getBoundingClientRect(); return r.height > 20 && parseFloat(getComputedStyle(el).opacity) < 0.05 && el.textContent.trim().length > 20; }).map((el) => el.tagName + "." + el.className);
    return { notRevealed: out, hidden };
  });
  console.log(name, JSON.stringify(res));
  await page.close();
}
await browser.close();
