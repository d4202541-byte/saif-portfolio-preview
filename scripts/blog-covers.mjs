import { chromium } from "playwright";
import fs from "node:fs";
// Renders 1200x630 article covers. Run with `npm run preview` on port 4176,
// then: node scripts/blog-covers.mjs (writes PNGs to /tmp; convert to WebP).
(async () => {
  const meta = await import("../src/editorial/articles.meta.js");
  const faces = fs
    .readFileSync("src/editorial/font-faces.css", "utf8")
    .replaceAll("url(/fonts/", "url(http://127.0.0.1:4176/fonts/");
  const logo = fs
    .readFileSync("public-editorial/brand/logo-integrated.svg")
    .toString("base64");
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto("http://127.0.0.1:4176/");
  for (const a of meta.articles) {
    const cat = meta.categoryBySlug[a.category].name;
    await p.setContent(`<!doctype html><html dir="rtl" lang="ar"><head><style>
${faces}
body{margin:0;width:1200px;height:630px;background:#f7f5f0;font-family:'IBM Plex Sans Arabic',sans-serif;color:#101010;position:relative;overflow:hidden}
.k{position:absolute;top:64px;right:80px;font-size:26px;letter-spacing:.02em;color:#5e5c58;font-weight:600}
h1{position:absolute;right:80px;left:80px;top:150px;font-size:66px;line-height:1.35;font-weight:600;margin:0}
.f{position:absolute;bottom:56px;right:80px;left:80px;display:flex;justify-content:space-between;align-items:center;border-top:2px solid #101010;padding-top:28px;font-size:26px}
.f img{height:44px}
.bar{position:absolute;top:0;left:0;width:22px;height:630px;background:#101010}
</style></head><body><div class="bar"></div><div class="k">مختبر النمو · ${cat}</div><h1>${a.title}</h1><div class="f"><span>بقلم سيف الشرفا</span><img src="data:image/svg+xml;base64,${logo}"></div></body></html>`);
    await p.evaluate(() => document.fonts.ready);
    const h = await p.evaluate(
      () => document.querySelector("h1").getBoundingClientRect().bottom,
    );
    if (h > 470)
      await p.evaluate(
        () => (document.querySelector("h1").style.fontSize = "54px"),
      );
    await p.screenshot({ path: `/tmp/${a.slug}.png` });
  }
  await b.close();
})();
