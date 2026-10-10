import fs from "node:fs";
import { render } from "../.ssr/entry-server.js";
const base = fs.readFileSync("dist/index.html", "utf8");
const person = fs.readFileSync("src/person.json", "utf8");
for (const lang of ["en", "ar"]) {
  let page = base
    .replace("<!--app-->", render(lang))
    .replace(
      "<!--person-->",
      '<script type="application/ld+json">' + person + "</script>",
    );
  if (lang === "ar") {
    page = page
      .replace('lang="en" dir="ltr"', 'lang="ar" dir="rtl"')
      .replace(
        "<title>Saif Shorfa | Performance & Growth Marketing</title>",
        "<title>سيف الشرفا | تسويق الأداء والنمو</title>",
      )
      .replace(
        'content="Independent performance marketing and measurement specialist for Saudi Arabia and the GCC. Google Ads, Meta, GA4, GTM, app marketing and technical SEO."',
        'content="سيف الشرفا: متخصص تسويق أداء للسوق السعودي والخليجي. إدارة Google Ads وMeta وتسويق التطبيقات، مع GA4 وGTM وبنية تتبع دقيقة تربط الإنفاق بالنتائج."',
      )
      .replace(
        'rel="canonical" href="https://saif-shorfa.netlify.app/"',
        'rel="canonical" href="https://saif-shorfa.netlify.app/ar/"',
      )
      .replace('content="en_US"', 'content="ar_SA"')
      .replace(
        'property="og:title" content="Saif Shorfa | Performance & Growth Marketing"',
        'property="og:title" content="سيف الشرفا | تسويق الأداء والنمو"',
      )
      .replace(
        'property="og:description" content="Smarter spend. Measurable impact. Independent paid growth and measurement for KSA & GCC."',
        'property="og:description" content="إنفاق أذكى. أثر قابل للقياس. تسويق الأداء والقياس للسعودية والخليج."',
      )
      .replace(
        'property="og:url" content="https://saif-shorfa.netlify.app/"',
        'property="og:url" content="https://saif-shorfa.netlify.app/ar/"',
      );
    fs.mkdirSync("dist/ar", { recursive: true });
  }
  if (process.env.VITE_PREVIEW_MODE === "true") {
    const previewUrl = process.env.VITE_PREVIEW_URL;
    if (!previewUrl)
      throw new Error("VITE_PREVIEW_URL is required for preview builds.");
    page = page
      .replace(
        "</head>",
        '<meta name="robots" content="noindex, nofollow" />\n</head>',
      )
      .replaceAll("https://saif-shorfa.netlify.app/", previewUrl);
  }
  fs.writeFileSync(
    lang === "en" ? "dist/index.html" : "dist/ar/index.html",
    page,
  );
}
if (process.env.VITE_PREVIEW_MODE === "true") {
  fs.writeFileSync("dist/robots.txt", "User-agent: *\nDisallow: /\n");
  fs.rmSync("dist/sitemap.xml", { force: true });
}
console.log(
  "Prerendered English and Arabic HTML with semantic content and Person schema.",
);
