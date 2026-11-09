import fs from "node:fs";
import { render, platforms, articles, blog } from "../.ssr/entry-server.js";
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
// Arabic is the default language at the site root; English lives under /en/.
const prefixFor = (lang) => (lang === "en" ? "en/" : "");
const routes = [];
for (const lang of ["ar", "en"]) {
  const prefix = prefixFor(lang);
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
routes.push({ lang: "ar", page: "blog", path: "blog/", arOnly: true });
for (const article of articles)
  routes.push({
    lang: "ar",
    page: "article",
    slug: article.slug,
    path: "blog/" + article.slug + "/",
    arOnly: true,
    article,
  });
const seo = {
  ar: {
    home: [
      "إدارة إعلانات Google وMeta في السعودية والخليج | سيف الشرفا",
      "متخصص مستقل في إدارة إعلانات Google وMeta (فيسبوك وإنستغرام) للشركات والمتاجر في السعودية والخليج، مع قياس تحويلات موثوق ونتائج موثقة بلقطات.",
    ],
    services: [
      "خدمات إعلانات Google وMeta للشركات والمتاجر | سيف الشرفا",
      "إدارة حملات Google Ads وMeta Ads وتدقيق تتبع التحويلات للمتاجر والعيادات والشركات في السعودية والخليج.",
    ],
    "meta-ads":
      "إدارة إعلانات فيسبوك وإنستغرام في السعودية والخليج | سيف الشرفا",
    "google-ads":
      "إدارة إعلانات Google للمتاجر والشركات في السعودية | سيف الشرفا",
  },
  en: {
    home: [
      "Saif Shorfa | Meta Ads & Google Ads Specialist for Saudi Arabia & GCC",
      "Independent Meta Ads and Google Ads specialist for businesses and online stores in Saudi Arabia and the GCC, with reliable conversion tracking and documented results.",
    ],
    services: [
      "Meta Ads & Google Ads Services | Saif Shorfa",
      "Google Ads and Meta Ads management plus conversion tracking audits for stores, clinics and businesses in Saudi Arabia, the GCC and Europe.",
    ],
    "meta-ads": "Meta Ads Management for Saudi & GCC Businesses | Saif Shorfa",
    "google-ads":
      "Google Ads Management for Saudi & GCC Businesses | Saif Shorfa",
  },
};
function htmlFor(route) {
  const { lang, page, path, local = "", platform, article } = route;
  const ar = lang === "ar";
  const title = article
    ? `${article.seoTitle} | سيف الشرفا`
    : page === "blog"
      ? `${blog.name}: أدلة إعلانات Google وMeta والقياس | سيف الشرفا`
      : platform
        ? seo[lang][platform.slug]
        : page === "notfound"
          ? ar
            ? "الصفحة غير موجودة | سيف الشرفا"
            : "Page not found | Saif Shorfa"
          : seo[lang][page][0];
  const description = article
    ? article.description
    : page === "blog"
      ? blog.description
      : platform?.[lang].description || (seo[lang][page] || seo[lang].home)[1];
  let html = template
    .replace("<!--app-->", render(lang, page, route.slug || ""))
    .replace(
      'lang="ar" dir="rtl"',
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
  for (const locale of ["en", "ar", "x-default"]) {
    const pattern = new RegExp(
      `<link rel="alternate" hreflang="${locale}"[^>]*>\\n?`,
    );
    html =
      route.arOnly || page === "notfound"
        ? html.replace(pattern, "")
        : html.replace(
            pattern,
            `<link rel="alternate" hreflang="${locale}" href="${origin + (locale === "en" ? "en/" : "") + local}" />\n`,
          );
  }
  if (article)
    html = html
      .replace(
        '<meta property="og:type" content="website" />',
        '<meta property="og:type" content="article" />',
      )
      .replace(
        "</head>",
        `<meta property="article:published_time" content="${article.published}" />\n</head>`,
      );
  const schema = [person];
  if (page === "home")
    schema.push(
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Saif Shorfa",
        url: origin,
        inLanguage: ["ar", "en"],
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
  if (page === "blog" || article) {
    const crumbs = [
      ["الرئيسية", origin],
      [blog.name, origin + "blog/"],
    ];
    if (article) crumbs.push([article.title, origin + path]);
    schema.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map(([name, item], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item,
      })),
    });
  }
  if (article)
    schema.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.published,
      dateModified: article.updated || article.published,
      inLanguage: "ar",
      url: origin + path,
      mainEntityOfPage: origin + path,
      image: origin + "brand/og-image.jpg",
      author: { "@type": "Person", name: "Saif Shorfa", url: origin },
      publisher: { "@type": "Person", name: "Saif Shorfa", url: origin },
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
  htmlFor({ lang: "ar", page: "notfound", path: "404.html" }),
);
// The Arabic site used to live under /ar/. Keep those URLs working with an
// instant redirect (treated by Google as permanent) to the new root URLs.
const legacy = [
  "",
  "services/",
  ...platforms.map((p) => "services/" + p.slug + "/"),
];
for (const local of legacy) {
  const target = origin + local;
  fs.mkdirSync("dist/ar/" + local, { recursive: true });
  fs.writeFileSync(
    "dist/ar/" + local + "index.html",
    `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8" /><title>تم نقل الصفحة</title><link rel="canonical" href="${target}" /><meta http-equiv="refresh" content="0; url=${target}" /><script>location.replace(${JSON.stringify(target)} + location.hash)</script></head><body><p>تم نقل هذه الصفحة إلى <a href="${target}">${target}</a>.</p></body></html>\n`,
  );
}
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
          const en = origin + "en/" + (r.local || "");
          const ar = origin + (r.local || "");
          const alternates = r.arOnly
            ? ""
            : `<xhtml:link rel="alternate" hreflang="ar" href="${escape(ar)}"/>` +
              `<xhtml:link rel="alternate" hreflang="en" href="${escape(en)}"/>` +
              `<xhtml:link rel="alternate" hreflang="x-default" href="${escape(ar)}"/>`;
          return (
            "<url><loc>" +
            escape(origin + r.path) +
            "</loc><lastmod>" +
            (r.article?.updated ||
              r.article?.published ||
              new Date().toISOString().slice(0, 10)) +
            "</lastmod>" +
            alternates +
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
    `- [Home (Arabic, default)](${origin}): selected work, approach and contact`,
    `- [Home (English)](${origin}en/): the same site in English`,
    ...platforms.map(
      (p) =>
        `- [${p.name}](${origin}en/services/${p.slug}/): ${p.en.description}`,
    ),
    "",
    "## Growth Lab articles (Arabic)",
    `- [${blog.name}](${origin}blog/): ${blog.description}`,
    ...articles.map(
      (a) => `- [${a.title}](${origin}blog/${a.slug}/): ${a.description}`,
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
