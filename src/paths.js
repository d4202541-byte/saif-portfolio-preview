export function sitePath(path = "") {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, "");
}

export function routePath(lang = "en", page = "home", slug = "") {
  const prefix = lang === "ar" ? "ar/" : "";
  return sitePath(
    prefix + (page === "home" ? "" : "services/" + (slug ? slug + "/" : "")),
  );
}

export function resolveRoute(pathname) {
  const relative = pathname.startsWith(import.meta.env.BASE_URL)
    ? pathname.slice(import.meta.env.BASE_URL.length)
    : pathname.replace(/^\/+/, "");
  const segments = relative.split("/").filter(Boolean);
  const lang = segments[0] === "ar" ? "ar" : "en";
  if (lang === "ar") segments.shift();
  if (!segments.length) return { lang, page: "home", serviceSlug: "" };
  if (segments[0] === "services" && segments.length <= 2)
    return {
      lang,
      page: segments[1] ? "service" : "services",
      serviceSlug: segments[1] || "",
    };
  return { lang, page: "notfound", serviceSlug: "" };
}
