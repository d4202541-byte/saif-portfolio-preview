import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { articleHtml } from "./editorial/article-html.js";
export function render(lang, page = "home", serviceSlug = "", base = "/") {
  return renderToString(
    <App
      lang={lang}
      page={page}
      serviceSlug={serviceSlug}
      articleHtml={page === "article" ? articleHtml(serviceSlug, base) : ""}
    />,
  );
}

export { platforms } from "./editorial/copy.js";
export { articles, blog, categories } from "./editorial/articles.meta.js";
export { articleData } from "./editorial/article-html.js";
