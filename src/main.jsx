import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import "./fonts.css";
import "./service-pages.css";
import { resolveRoute } from "./paths";
import { getService } from "./services";
const route = resolveRoute(window.location.pathname);
const { lang } = route;
document.documentElement.lang = lang;
document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
const root = document.getElementById("root");
const missing =
  route.page === "notfound" ||
  (route.page === "service" && !getService(route.serviceSlug));
if (root.childElementCount && !missing) hydrateRoot(root, <App {...route} />);
else createRoot(root).render(<App {...route} />);
