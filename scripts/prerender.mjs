import fs from "node:fs";
import { render } from "../.ssr/entry-server.js";
import { services, serviceLabels } from "../src/services.js";

const template = fs.readFileSync("dist/index.html", "utf8");
const person = JSON.parse(fs.readFileSync("src/person.json", "utf8"));
const preview = process.env.VITE_PREVIEW_MODE === "true";
if (preview && !process.env.VITE_PREVIEW_URL)
  throw new Error("VITE_PREVIEW_URL is required for preview builds.");
const origin = (
  preview
    ? process.env.VITE_PREVIEW_URL
    : process.env.VITE_SITE_URL || "https://saif-growth.com/"
).replace(/\/?$/, "/");
if (!/^https?:\/\//.test(origin))
  throw new Error("Site URL must use http or https.");
person.url = origin;
const routes = [];
for (const lang of ["en", "ar"]) {
  const prefix = lang === "ar" ? "ar/" : "";
  routes.push({ lang, page: "home", path: prefix, local: "" });
  routes.push({
    lang,
    page: "services",
    path: prefix + "services/",
    local: "services/",
  });
  for (const service of services)
    routes.push({
      lang,
      page: "service",
      slug: service.slug,
      path: prefix + "services/" + service.slug + "/",
      local: "services/" + service.slug + "/",
      service,
    });
}
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
function pageHtml(route) {
  const { lang, page, path, local = "", service } = route;
  const ar = lang === "ar";
  const data = service?.[lang];
  const title = data
    ? data.title + (ar ? " | سيف الشرفا" : " | Saif Shorfa")
    : page === "services"
      ? ar
        ? "خدمات التسويق والقياس | سيف الشرفا"
        : "Marketing & Measurement Services | Saif Shorfa"
      : page === "notfound"
        ? ar
          ? "الصفحة غير موجودة | سيف الشرفا"
          : "Page not found | Saif Shorfa"
        : ar
          ? "سيف الشرفا | إدارة الإعلانات والقياس"
          : "Saif Shorfa | Performance & Growth Marketing";
  const description =
    data?.intro ||
    (page === "services"
      ? serviceLabels[lang].directoryIntro
      : ar
        ? "سيف الشرفا، متخصص مستقل في إدارة الإعلانات والقياس للسعودية والخليج. حملات Google وMeta، إعداد GA4 وGTM، تسويق التطبيقات وتحسين المواقع."
        : "Independent performance marketing and measurement specialist for Saudi Arabia and the GCC. Google Ads, Meta, GA4, GTM, app marketing and technical SEO.");
  const canonical = origin + path;
  let html = template
    .replace("<!--app-->", render(lang, page, route.slug || ""))
    .replace(
      'lang="en" dir="ltr"',
      `lang="${lang}" dir="${ar ? "rtl" : "ltr"}"`,
    )
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escape(description)}" />`,
    )
    .replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${escape(canonical)}" />`,
    )
    .replace(
      /<link rel="alternate" hreflang="en"[^>]*>/,
      `<link rel="alternate" hreflang="en" href="${origin + local}" />`,
    )
    .replace(
      /<link rel="alternate" hreflang="ar"[^>]*>/,
      `<link rel="alternate" hreflang="ar" href="${origin + "ar/" + local}" />`,
    )
    .replace(
      /<link rel="alternate" hreflang="x-default"[^>]*>/,
      `<link rel="alternate" hreflang="x-default" href="${origin + local}" />`,
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${escape(title)}" />`,
    )
    .replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${escape(description)}" />`,
    )
    .replace(
      /<meta property="og:locale"[^>]*>/,
      `<meta property="og:locale" content="${ar ? "ar_SA" : "en_US"}" />`,
    )
    .replace(
      /<meta property="og:url"[^>]*>/,
      `<meta property="og:url" content="${escape(canonical)}" />`,
    )
    .replace(
      /<meta property="og:image"[^>]*>/,
      `<meta property="og:image" content="${origin}social.png" />`,
    );
  const schema = [person];
  if (service)
    schema.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: data.title,
      description,
      serviceType: data.title,
      url: canonical,
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
      '<meta name="robots" content="noindex, nofollow" />\n</head>',
    );
  return html;
}
for (const route of routes) {
  const directory = "dist/" + route.path;
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(directory + "index.html", pageHtml(route));
}
fs.writeFileSync(
  "dist/404.html",
  pageHtml({ lang: "en", page: "notfound", path: "404.html" }),
);
if (preview) {
  fs.writeFileSync("dist/robots.txt", "User-agent: *\nDisallow: /\n");
  fs.rmSync("dist/sitemap.xml", { force: true });
} else {
  fs.writeFileSync(
    "dist/robots.txt",
    "User-agent: *\nAllow: /\nSitemap: " + origin + "sitemap.xml\n",
  );
  fs.writeFileSync(
    "dist/sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      routes
        .map(
          (route) =>
            "<url><loc>" + escape(origin + route.path) + "</loc></url>",
        )
        .join("") +
      "</urlset>\n",
  );
}
console.log(
  `Prerendered ${routes.length} bilingual pages, plus a 404 page. ${preview ? "Preview indexing and analytics disabled." : "Site origin: " + origin}`,
);
