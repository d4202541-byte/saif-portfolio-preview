import { articleSlugs, categories } from "./editorial/articles.meta.js";

// Arabic is the default language and lives at the site root.
// English lives under /en/. The blog (مختبر النمو) is Arabic only.
export function sitePath(path = "") {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, "");
}

export function localPath(page = "home", slug = "") {
  if (page === "home") return "";
  if (page === "blog") return "blog/";
  if (page === "about") return "about/";
  if (page === "category") return "blog/category/" + slug + "/";
  if (page === "article") return "blog/" + slug + "/";
  return "services/" + (slug ? slug + "/" : "");
}

export function routePath(lang = "ar", page = "home", slug = "") {
  return sitePath((lang === "en" ? "en/" : "") + localPath(page, slug));
}

export function resolveRoute(pathname) {
  const relative = pathname.startsWith(import.meta.env.BASE_URL)
    ? pathname.slice(import.meta.env.BASE_URL.length)
    : pathname.replace(/^\/+/, "");
  const segments = relative
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "index.html");
  const lang = segments[0] === "en" ? "en" : "ar";
  if (lang === "en") segments.shift();
  if (!segments.length) return { lang, page: "home", serviceSlug: "" };
  if (
    segments[0] === "services" &&
    segments.length <= 2 &&
    (!segments[1] || ["meta-ads", "google-ads"].includes(segments[1]))
  )
    return {
      lang,
      page: segments[1] ? "service" : "services",
      serviceSlug: segments[1] || "",
    };
  if (segments[0] === "about" && segments.length === 1)
    return { lang, page: "about", serviceSlug: "" };
  if (
    lang === "ar" &&
    segments[0] === "blog" &&
    segments[1] === "category" &&
    segments.length === 3 &&
    categories.some((c) => c.slug === segments[2])
  )
    return { lang, page: "category", serviceSlug: segments[2] };
  if (lang === "ar" && segments[0] === "blog" && segments.length <= 2) {
    if (!segments[1]) return { lang, page: "blog", serviceSlug: "" };
    if (articleSlugs.includes(segments[1]))
      return { lang, page: "article", serviceSlug: segments[1] };
  }
  return { lang, page: "notfound", serviceSlug: "" };
}
