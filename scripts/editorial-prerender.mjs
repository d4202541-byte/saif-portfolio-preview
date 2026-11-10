import fs from "node:fs";
import {
  render,
  platforms,
  articles,
  blog,
  categories,
  articleData,
} from "../.ssr/entry-server.js";
const base = process.env.VITE_BASE_PATH || "/";
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
    { lang, page: "about", path: prefix + "about/", local: "about/" },
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
for (const category of categories)
  routes.push({
    lang: "ar",
    page: "category",
    slug: category.slug,
    path: "blog/category/" + category.slug + "/",
    arOnly: true,
    category,
  });
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
    about: [
      "عن سيف الشرفا: متخصص إعلانات Meta وGoogle Ads | سيف الشرفا",
      "سيف الشرفا متخصص مستقل في إدارة إعلانات Meta وGoogle وقياس التحويلات للشركات والمتاجر والعيادات في السعودية والخليج، بنتائج موثقة بلقطات.",
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
    about: [
      "About Saif Shorfa: Meta Ads & Google Ads Specialist",
      "Saif Shorfa is an independent Meta Ads and Google Ads specialist working with stores, clinics and businesses in Saudi Arabia and the GCC, with documented results.",
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
  const { lang, page, path, local = "", platform, article, category } = route;
  const data = article ? articleData(article.slug) : null;
  const ar = lang === "ar";
  const title = article
    ? `${article.seoTitle} | سيف الشرفا`
    : category
      ? `${category.title} | ${blog.name}`
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
    : category
      ? category.intro
      : page === "blog"
        ? blog.description
        : platform?.[lang].description ||
          (seo[lang][page] || seo[lang].home)[1];
  let html = template
    .replace("<!--app-->", render(lang, page, route.slug || "", base))
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
    "og:image": origin + (article ? article.cover.src : "brand/og-image.jpg"),
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image":
      origin + (article ? article.cover.src : "brand/og-image.jpg"),
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
        `<meta property="article:published_time" content="${article.published}T09:00:00+03:00" />\n<meta property="article:modified_time" content="${article.updated || article.published}T09:00:00+03:00" />\n<meta property="og:image:alt" content="${escape(article.cover.alt)}" />\n</head>`,
      );
  // One @graph per page. The same Person @id appears on every page so the
  // whole site reads as one person with a defined expertise.
  const personId = origin + "#saif";
  const websiteId = origin + "#website";
  const graph = [
    {
      ...person,
      "@context": undefined,
      "@id": personId,
      url: origin + "about/",
      image: origin + "brand/saif-portrait-current.webp",
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "Saif Shorfa",
      url: origin,
      inLanguage: ["ar", "en"],
      publisher: { "@id": personId },
    },
  ];
  if (page === "home")
    graph.push({
      "@type": "ProfessionalService",
      name: "Saif Shorfa | Meta Ads & Google Ads",
      url: origin + path,
      description,
      image: origin + "brand/og-image.jpg",
      email: person.email,
      telephone: person.telephone,
      founder: { "@id": personId },
      areaServed: ["Saudi Arabia", "GCC", "Europe"],
      knowsLanguage: ["ar", "en"],
      serviceType: [
        "Meta Ads management",
        "Google Ads management",
        "Conversion tracking",
      ],
    });
  if (page === "about")
    graph.push({
      "@type": "ProfilePage",
      url: origin + path,
      mainEntity: { "@id": personId },
      inLanguage: lang,
    });
  if (platform)
    graph.push({
      "@type": "Service",
      "@id": origin + "services/" + platform.slug + "/#service",
      name: platform.name + (ar ? " إدارة" : " management"),
      description,
      url: origin + path,
      provider: { "@id": personId },
      areaServed: ["Saudi Arabia", "GCC", "Europe"],
    });
  if (page === "blog" || category || article) {
    const crumbs = [
      ["الرئيسية", origin],
      [blog.name, origin + "blog/"],
    ];
    const cat =
      category || categories.find((c) => c.slug === article?.category);
    if (cat)
      crumbs.push([cat.name, origin + "blog/category/" + cat.slug + "/"]);
    if (article) crumbs.push([article.title, origin + path]);
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map(([name, item], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item,
      })),
    });
  }
  if (article) {
    const service = platforms.find((p) => p.slug === article.service);
    graph.push({
      "@type": "BlogPosting",
      "@id": origin + path + "#article",
      headline: article.title,
      description: article.description,
      image: {
        "@type": "ImageObject",
        url: origin + article.cover.src,
        width: article.cover.width,
        height: article.cover.height,
      },
      datePublished: article.published + "T09:00:00+03:00",
      dateModified: (article.updated || article.published) + "T09:00:00+03:00",
      inLanguage: "ar",
      articleSection: categories.find((c) => c.slug === article.category).name,
      keywords: [article.targetKeyword, ...article.secondaryKeywords].join(
        ", ",
      ),
      wordCount: data.wordCount,
      author: { "@id": personId },
      publisher: { "@id": personId },
      isPartOf: { "@id": websiteId },
      mainEntityOfPage: origin + path,
      about: { "@id": origin + "services/" + service.slug + "/#service" },
    });
    if (data.faq.length)
      graph.push({
        "@type": "FAQPage",
        mainEntity: data.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
  }
  const schema = {
    "@context": "https://schema.org",
    "@graph": JSON.parse(JSON.stringify(graph)),
  };
  html = html.replace(
    "<!--person-->",
    '<script type="application/ld+json">' +
      JSON.stringify(schema).replaceAll("<", "\\u003c") +
      "</script>",
  );
  html = html.replace(
    "</head>",
    preview || page === "notfound"
      ? '<meta name="robots" content="noindex, nofollow" /></head>'
      : '<meta name="robots" content="index, follow, max-image-preview:large" /></head>',
  );
  if (page === "blog" || category || article)
    html = html.replace(
      "</head>",
      `<link rel="alternate" type="application/rss+xml" title="${escape(blog.name)}" href="${origin}blog/rss.xml" /></head>`,
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
  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escape(blog.name)} | سيف الشرفا</title>`,
    `<link>${origin}blog/</link>`,
    `<description>${escape(blog.description)}</description>`,
    "<language>ar</language>",
    `<atom:link href="${origin}blog/rss.xml" rel="self" type="application/rss+xml" />`,
    ...articles.map(
      (a) =>
        `<item><title>${escape(a.title)}</title><link>${origin}blog/${a.slug}/</link><guid>${origin}blog/${a.slug}/</guid><pubDate>${new Date(a.published + "T09:00:00+03:00").toUTCString()}</pubDate><description>${escape(a.description)}</description></item>`,
    ),
    "</channel>",
    "</rss>",
    "",
  ].join("\n");
  fs.writeFileSync("dist/blog/rss.xml", rss);
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
    `- [About Saif Shorfa](${origin}en/about/): who writes the articles and runs the campaigns`,
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
