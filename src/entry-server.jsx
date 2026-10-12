import { renderToString } from "react-dom/server";
import App from "./App.jsx";
export function render(lang, page = "home", serviceSlug = "") {
  return renderToString(
    <App lang={lang} page={page} serviceSlug={serviceSlug} />,
  );
}
