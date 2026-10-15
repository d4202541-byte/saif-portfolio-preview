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
  "Google Analytics 4",
  "Google Tag Manager",
  "Meta Pixel and Conversions API",
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
      ? "إدارة وتحسين حملات Meta وGoogle للشركات والمتاجر. خبرة في السعودية والخليج وتوجّه للتعاون في أوروبا، مع قياس واضح وتحسين مستمر."
      : "Independent Meta Ads and Google Ads specialist. Experience in Saudi Arabia and the GCC, with Europe as the next focus for collaboration.");
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
    "og:image": origin + "brand/og-image.jpg",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": origin + "brand/og-image.jpg",
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
  if (page === "home")
    schema.push(
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Saif Shorfa",
        url: origin,
        inLanguage: ["en", "ar"],
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Saif Shorfa | Meta Ads & Google Ads",
        url: origin + path,
        description,
        image: origin + "brand/og-image.jpg",
        email: person.email,
        telephone: person.telephone,
        founder: { "@type": "Person", name: "Saif Shorfa" },
        areaServed: ["Saudi Arabia", "GCC", "Europe"],
        knowsLanguage: ["en", "ar"],
        serviceType: [
          "Meta Ads management",
          "Google Ads management",
          "Conversion tracking",
        ],
      },
    );
  if (platform)
    schema.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: platform.name,
      description,
      url: origin + path,
      provider: { "@type": "Person", name: "Saif Shorfa", url: origin },
      areaServed: ["Saudi Arabia", "GCC", "Europe"],
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
    : [
        "User-agent: *",
        "Allow: /",
        "",
        "# AI search and answer engines are welcome to read this site.",
        ...[
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ].map((bot) => `User-agent: ${bot}\nAllow: /\n`),
        `Sitemap: ${origin}sitemap.xml`,
        "",
      ].join("\n"),
);
if (preview) fs.rmSync("dist/sitemap.xml", { force: true });
else
  fs.writeFileSync(
    "dist/sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      routes
        .map((r) => {
          const en = origin + r.local;
          const ar = origin + "ar/" + r.local;
          return (
            "<url><loc>" +
            escape(origin + r.path) +
            "</loc><lastmod>" +
            new Date().toISOString().slice(0, 10) +
            "</lastmod>" +
            `<xhtml:link rel="alternate" hreflang="en" href="${escape(en)}"/>` +
            `<xhtml:link rel="alternate" hreflang="ar" href="${escape(ar)}"/>` +
            `<xhtml:link rel="alternate" hreflang="x-default" href="${escape(en)}"/>` +
            "</url>"
          );
        })
        .join("\n") +
      "\n</urlset>\n",
  );
if (!preview) {
  const en = JSON.parse(
    fs.readFileSync("src/editorial/portfolio.en.json", "utf8"),
  );
  const lines = [
    "# Saif Shorfa",
    "",
    `> ${en.positioning} for ${en.markets}, working in Arabic and English. Meta Ads and Google Ads management with reliable conversion tracking (GA4, Google Tag Manager, Meta Pixel and Conversions API).`,
    "",
    "## Pages",
    `- [Home (English)](${origin}): selected work, approach and contact`,
    `- [Home (Arabic)](${origin}ar/): the same site in Arabic`,
    ...platforms.map(
      (p) => `- [${p.name}](${origin}services/${p.slug}/): ${p.en.description}`,
    ),
    "",
    "## Selected results",
    "Each result is shown on the site with a blurred screenshot as proof. Client names are withheld.",
    ...en.work.cases.map(
      (c) =>
        `- ${c.industry}, ${c.category}: ${c.metric} ${c.metricLabel} (${c.secondaryMetric}). ${c.finePrint}`,
    ),
    "",
    "## Contact",
    `- Email: ${en.contacts.email}`,
    `- WhatsApp: https://wa.me/${en.contacts.whatsapp}`,
    "",
  ];
  fs.writeFileSync("dist/llms.txt", lines.join("\n"));
}
console.log(
  `Prerendered ${routes.length} editorial pages. ${preview ? "Preview is noindex." : "Origin: " + origin}`,
);
