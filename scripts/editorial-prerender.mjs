import fs from "node:fs";
import { render, platforms } from "../.ssr/entry-server.js";
const template = fs.readFileSync("dist/index.html", "utf8");
const preview = process.env.VITE_PREVIEW_MODE === "true";
if (preview && !process.env.VITE_PREVIEW_URL)
  throw new Error("VITE_PREVIEW_URL is required for previews.");
const origin = (
  preview
    ? process.env.VITE_PREVIEW_URL
    : process.env.VITE_SITE_URL || "https://saif-growth.com/"
).replace(/\/?$/, "/");
if (!/^https?:\/\//.test(origin)) throw new Error("Invalid site origin.");
const person = JSON.parse(fs.readFileSync("src/person.json", "utf8"));
person.url = origin;
person.jobTitle = "Independent Meta Ads & Google Ads Specialist";
person.knowsAbout = [
  "Meta Ads",
  "Google Ads",
  "Paid acquisition",
  "Conversion tracking",
];
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const routes = [];
for (const lang of ["en", "ar"]) {
  const prefix = lang === "ar" ? "ar/" : "";
  routes.push(
    { lang, page: "home", path: prefix, local: "" },
    { lang, page: "services", path: prefix + "services/", local: "services/" },
  );
  for (const platform of platforms)
    routes.push({
      lang,
      page: "service",
      slug: platform.slug,
      path: prefix + "services/" + platform.slug + "/",
      local: "services/" + platform.slug + "/",
      platform,
    });
}
function htmlFor(route) {
  const { lang, page, path, local = "", platform } = route;
  const ar = lang === "ar";
  const title = platform
    ? `${platform.name} ${ar ? "| سيف الشرفا" : "| Saif Shorfa"}`
    : page === "notfound"
      ? ar
        ? "الصفحة غير موجودة | سيف الشرفا"
        : "Page not found | Saif Shorfa"
      : ar
        ? "سيف الشرفا | متخصص إعلانات Meta وGoogle Ads"
        : "Saif Shorfa | Meta Ads & Google Ads Specialist";
  const description =
    platform?.[lang].description ||
    (ar
      ? "إدارة وتحسين حملات Meta وGoogle للشركات والمتاجر في السعودية والخليج، مع قياس واضح وقرارات مبنية على النتائج."
      : "Independent Meta Ads and Google Ads specialist for businesses in Saudi Arabia and the GCC. Paid acquisition, reliable measurement and continuous optimization.");
  let html = template
    .replace("<!--app-->", render(lang, page, route.slug || ""))
    .replace(
      'lang="en" dir="ltr"',
      `lang="${lang}" dir="${ar ? "rtl" : "ltr"}"`,
    )
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`);
  const metas = {
    description,
    "og:title": title,
    "og:description": description,
    "og:url": origin + path,
    "og:locale": ar ? "ar_SA" : "en_US",
    "og:image": origin + "brand/saif-portrait-current.webp",
  };
  for (const [name, value] of Object.entries(metas)) {
    const type = name.startsWith("og:") ? "property" : "name";
    html = html.replace(
      new RegExp(`<meta ${type}="${name}"[^>]*>`),
      `<meta ${type}="${name}" content="${escape(value)}" />`,
    );
  }
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${origin + path}" />`,
  );
  for (const locale of ["en", "ar", "x-default"])
    html = html.replace(
      new RegExp(`<link rel="alternate" hreflang="${locale}"[^>]*>`),
      `<link rel="alternate" hreflang="${locale}" href="${origin + (locale === "ar" ? "ar/" : "") + local}" />`,
    );
  const schema = [person];
  if (platform)
    schema.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: platform.name,
      description,
      url: origin + path,
      provider: { "@type": "Person", name: "Saif Shorfa", url: origin },
      areaServed: ["Saudi Arabia", "GCC"],
    });
  html = html.replace(
    "<!--person-->",
    '<script type="application/ld+json">' +
      JSON.stringify(schema).replaceAll("<", "\\u003c") +
      "</script>",
  );
  if (preview || page === "notfound")
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex, nofollow" /></head>',
    );
  return html;
}
for (const route of routes) {
  fs.mkdirSync("dist/" + route.path, { recursive: true });
  fs.writeFileSync("dist/" + route.path + "index.html", htmlFor(route));
}
fs.writeFileSync(
  "dist/404.html",
  htmlFor({ lang: "en", page: "notfound", path: "404.html" }),
);
fs.writeFileSync(
  "dist/robots.txt",
  preview
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\nSitemap: ${origin}sitemap.xml\n`,
);
if (preview) fs.rmSync("dist/sitemap.xml", { force: true });
else
  fs.writeFileSync(
    "dist/sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      routes
        .map((r) => "<url><loc>" + escape(origin + r.path) + "</loc></url>")
        .join("") +
      "</urlset>",
  );
console.log(
  `Prerendered ${routes.length} editorial pages. ${preview ? "Preview is noindex." : "Origin: " + origin}`,
);
