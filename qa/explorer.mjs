// Explorer verification: filter chips, search, sort, wall/list, URL state, empty state, keyboard.
import puppeteer from "puppeteer-core";
const BASE = process.argv[2] ?? "http://localhost:4174";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const results = [];
const check = (name, ok, detail = "") => { results.push(ok); console.log(`${ok ? "PASS" : "FAIL"} ${name} ${ok ? "" : detail}`.trim()); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const errors = [];
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

const count = () => page.$$eval(".tile", (e) => e.length);
const names = () => page.$$eval(".tile-name", (e) => e.map((x) => x.textContent));
const status = () => page.$eval(".explorer-count", (e) => e.textContent.trim());
const url = () => new URL(page.url());

await page.goto(BASE + "/projects", { waitUntil: "networkidle2" });
await sleep(600);
const total = await count();
check("all projects listed initially", total >= 10, `total=${total}`);

// category filter
await page.evaluate(() => [...document.querySelectorAll(".chip")].find((b) => /Robotics/.test(b.textContent)).click());
await sleep(200);
const robo = await count();
check("category chip filters the list", robo > 0 && robo < total, `robo=${robo} total=${total}`);
check("chip count matches the number shown", (await page.$$eval(".chip", (e) => e.find((b) => /Robotics/.test(b.textContent)).textContent)).includes(String(robo)));
check("chip is aria-pressed", await page.$$eval(".chip", (e) => e.find((b) => /Robotics/.test(b.textContent)).getAttribute("aria-pressed") === "true"));
check("URL carries ?cat=robotics", url().searchParams.get("cat") === "robotics", page.url());
check("status line announces filtered count", new RegExp(`${robo} of ${total}`).test(await status()), await status());

// search (combined with category)
await page.type('input[type="search"]', "esp32");
await sleep(250);
const combo = await count();
check("search narrows within the category", combo <= robo, `combo=${combo} robo=${robo}`);
check("URL carries ?q=esp32", url().searchParams.get("q") === "esp32");

// empty state
await page.click('input[type="search"]', { clickCount: 3 });
await page.type('input[type="search"]', "zzzz-no-such-thing");
await sleep(250);
check("empty state shown for no matches", (await count()) === 0 && (await page.$(".explorer-empty")) !== null);
await page.evaluate(() => document.querySelector(".explorer-empty button").click());
await sleep(250);
check("'clear the filters' restores everything", (await count()) === total && !url().search);

// sort
await page.select(".select select", "name");
await sleep(200);
const n = await names();
const sorted = [...n].sort((a, b) => a.localeCompare(b));
check("A–Z sort orders by name", JSON.stringify(n) === JSON.stringify(sorted));
check("no year headings when sorted A–Z", (await page.$$(".year-h")).length === 0);
await page.select(".select select", "recent");
await sleep(200);
const heads = await page.$$eval(".year-h", (e) => e.map((x) => x.textContent));
check("wall view has no year headings (keeps the grid packed)", heads.length === 0, heads.join(","));
await page.evaluate(() => [...document.querySelectorAll(".seg button")].find((b) => b.textContent === "List").click());
await sleep(200);
const lheads = await page.$$eval(".year-h", (e) => e.map((x) => x.textContent));
check("list view newest sort groups by year, Ongoing first", lheads[0] === "Ongoing" && lheads.length > 1, lheads.join(","));
const ys = lheads.filter((h) => /^\d+$/.test(h)).map(Number);
check("year headings strictly descending", ys.every((y, i) => i === 0 || ys[i - 1] > y), ys.join(","));
await page.evaluate(() => [...document.querySelectorAll(".seg button")].find((b) => b.textContent === "Wall").click());
await sleep(200);
check("URL carries ?sort when not default", (await (async () => { await page.select(".select select", "oldest"); await sleep(150); return url().searchParams.get("sort"); })()) === "oldest");

// view switch
await page.evaluate(() => [...document.querySelectorAll(".seg button")].find((b) => b.textContent === "List").click());
await sleep(200);
check("list layout applied", (await page.$(".tiles-list")) !== null && (await page.$(".tiles-wall")) === null);
check("URL carries ?view=list", url().searchParams.get("view") === "list");

// deep link restores state after a full reload
await page.goto(BASE + "/projects?cat=ml&sort=name&view=list&q=model", { waitUntil: "networkidle2" });
await sleep(700);
check("deep link restores category", await page.$$eval(".chip", (e) => e.find((b) => /Machine learning/.test(b.textContent))?.getAttribute("aria-pressed") === "true"));
check("deep link restores search text", (await page.$eval('input[type="search"]', (e) => e.value)) === "model");
check("deep link restores sort + view", (await page.$eval(".select select", (e) => e.value)) === "name" && (await page.$(".tiles-list")) !== null);
const dl = await count();
check("deep link result set is a subset", dl >= 0 && dl < total, `dl=${dl}`);

// cards navigate; note cards are not links
await page.goto(BASE + "/projects", { waitUntil: "networkidle2" });
await sleep(500);
const hrefs = await page.$$eval("a.tile-link", (e) => e.map((a) => a.getAttribute("href")));
check("every linked card goes to /projects/<slug>", hrefs.every((h) => /^\/projects\/[a-z0-9-]+$/.test(h)));
const notes = await page.$$eval(".tile-note", (e) => e.map((li) => li.querySelector("a") === null));
check("note cards are not links", notes.every(Boolean));

// keyboard: tab reaches chips and they toggle with Enter
await page.focus(".chip");
await page.keyboard.press("Tab"); // -> "Research"
await page.keyboard.press("Enter");
await sleep(200);
check("chips operable by keyboard", (await count()) < total && (await page.$$eval(".chip", (e) => e[1].getAttribute("aria-pressed"))) === "true", `count=${await count()}`);
const pressed = await page.$$eval('.chip[aria-pressed="true"]', (e) => e.length);
check("exactly one chip pressed", pressed === 1, `pressed=${pressed}`);

// mobile layout
await page.setViewport({ width: 390, height: 844 });
await page.goto(BASE + "/projects", { waitUntil: "networkidle2" });
await sleep(600);
check("mobile: no horizontal overflow", await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
check("mobile: filter bar is not sticky", (await page.$eval(".explorer-bar", (e) => getComputedStyle(e).position)) !== "sticky");
check("mobile: chips are one scrollable row", await page.$eval(".chips", (e) => e.scrollWidth > e.clientWidth && e.getBoundingClientRect().height < 60));
check("mobile: first card visible within first screen", await page.$eval(".tile", (e) => e.getBoundingClientRect().top < 844));
await page.screenshot({ path: "qa/x/explorer-mobile.png" });
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/projects", { waitUntil: "networkidle2" });
await sleep(700);
await page.screenshot({ path: "qa/x/explorer-grid.png" });
await page.goto(BASE + "/projects?view=list", { waitUntil: "networkidle2" });
await sleep(700);
await page.screenshot({ path: "qa/x/explorer-list.png" });

check("no console / page errors", errors.length === 0, errors.slice(0, 3).join(" | "));
console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
await browser.close();
process.exit(results.every(Boolean) ? 0 : 1);
