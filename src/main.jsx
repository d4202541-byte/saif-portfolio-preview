import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
const relativePath = window.location.pathname.slice(
  import.meta.env.BASE_URL.length,
);
const lang = /^ar(?:\/|$)/.test(relativePath) ? "ar" : "en";
document.documentElement.lang = lang;
document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
const root = document.getElementById("root");
if (root.childElementCount) hydrateRoot(root, <App lang={lang} />);
else createRoot(root).render(<App lang={lang} />);
