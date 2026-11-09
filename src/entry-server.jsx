import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { bodies } from "./editorial/articles.body.js";
export function render(lang, page = "home", serviceSlug = "") {
  return renderToString(
    <App
      lang={lang}
      page={page}
      serviceSlug={serviceSlug}
      articleHtml={page === "article" ? bodies[serviceSlug] || "" : ""}
    />,
  );
}

export { platforms } from "./editorial/copy.js";
export { articles, blog } from "./editorial/articles.meta.js";
