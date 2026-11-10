// Server-only: builds the inner HTML of an article page from its metadata
// (articles.meta.js) and content (articles.body.js), in the order the
// article spec defines. Used by entry-server.jsx and the prerender script.
import { content } from "./articles.body.js";
import { blog, articles } from "./articles.meta.js";
import { platforms } from "./copy.js";

const WHATSAPP = "970597200690";

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const stripTags = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function withHeadingIds(body) {
  const toc = [];
  let i = 0;
  const html = body.replace(/<h2>(.*?)<\/h2>/g, (_, inner) => {
    i += 1;
    const id = "section-" + i;
    toc.push({ id, text: stripTags(inner) });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, toc };
}

export function articleData(slug) {
  const article = articles.find((a) => a.slug === slug);
  const c = content[slug];
  if (!article || !c) return null;
  const { html: body, toc } = withHeadingIds(c.body);
  const faq = (c.faq || []).map(([q, a]) => ({ q, a }));
  const text = [
    c.summary,
    ...c.takeaways,
    stripTags(body),
    ...faq.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  return {
    article,
    summary: c.summary,
    takeaways: c.takeaways,
    body,
    toc,
    faq,
    sources: (c.sources || []).map(([title, url]) => ({ title, url })),
    hasExperience: body.includes('class="experience"'),
    wordCount: text.split(/\s+/).filter(Boolean).length,
  };
}

export function articleHtml(slug, base = "/") {
  const d = articleData(slug);
  if (!d) return "";
  const { article } = d;
  const service = platforms.find((p) => p.slug === article.service);
  const servicePath = base + "services/" + service.slug + "/";
  const cta = `
<aside class="article-cta">
  <p class="eyebrow">${esc(service.name)}</p>
  <p class="article-cta-title">تريد أن أراجع هذا في حسابك؟</p>
  <p>أدير حملات ${esc(service.name)} للمتاجر والشركات في السعودية والخليج، وأبدأ دائمًا بالتأكد من أن القياس صحيح.</p>
  <a class="article-cta-link" href="${servicePath}">تعرّف على خدمة إدارة ${esc(service.name)}</a>
</aside>`;
  const message = `مرحبًا سيف، قرأت مقال «${article.title}» وأريد مناقشة حسابي.`;
  const waURL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  const body = d.body
    .replace("<!--cta-->", cta)
    .replaceAll('href="/', `href="${base}`);
  return `
<div class="article-summary">
  <p class="eyebrow">الخلاصة السريعة</p>
  <p>${esc(d.summary)}</p>
</div>
<figure class="article-cover">
  <img src="${base + article.cover.src}" width="${article.cover.width}" height="${article.cover.height}" alt="${esc(article.cover.alt)}" fetchpriority="high" />
</figure>
<section class="article-takeaways" aria-labelledby="takeaways-title">
  <h2 id="takeaways-title">أهم النقاط</h2>
  <ul>${d.takeaways.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
</section>
<details class="article-toc" open>
  <summary>محتويات المقال</summary>
  <ol>${d.toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join("")}${d.faq.length ? '<li><a href="#faq">الأسئلة الشائعة</a></li>' : ""}</ol>
</details>
<div class="article-body">${body}</div>
${
  d.faq.length
    ? `<section class="article-faq" aria-labelledby="faq">
  <h2 id="faq">الأسئلة الشائعة</h2>
  ${d.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("\n  ")}
</section>`
    : ""
}
${
  d.sources.length
    ? `<section class="article-sources" aria-labelledby="sources-title">
  <h2 id="sources-title">المصادر</h2>
  <ul>${d.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.title)}</a></li>`).join("")}</ul>
</section>`
    : ""
}
<aside class="article-author">
  <img src="${base}brand/saif-portrait-current.webp" width="96" height="120" alt="سيف الشرفا" loading="lazy" />
  <div>
    <p class="article-author-name"><a href="${base}about/">${esc(blog.author)}</a></p>
    <p>${esc(blog.authorRole)} مستقل. أدير حملات المتاجر والعيادات والشركات وأتحقق من قياسها، في السعودية والخليج، وأتجه للتعاون في أوروبا.</p>
    <a class="text-link" href="${base}about/">المزيد عن سيف</a>
  </div>
</aside>
<div class="article-final-cta">
  <p>عندك سؤال عن هذا الموضوع في حسابك؟</p>
  <a class="button" href="${esc(waURL)}" target="_blank" rel="noreferrer" data-track="click_whatsapp_cta">اسألني على واتساب</a>
</div>`;
}
