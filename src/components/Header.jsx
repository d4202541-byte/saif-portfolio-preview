import { useEffect, useRef, useState } from "react";
import { useCopy } from "../copy";
import { routePath } from "../paths";
import { Arrow, Mark } from "./Shared";
export default function Header({ page = "home", serviceSlug = "" }) {
  const { t, lang } = useCopy();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const button = useRef(null);
  const header = useRef(null);
  const home = routePath(lang);
  const sectionPath = (id) =>
    page === "home"
      ? "#" + id
      : id === "services"
        ? routePath(lang, "services")
        : home + "#" + id;
  useEffect(() => {
    const escape = (e) => {
      if (
        e.key === "Escape" &&
        button.current?.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
        button.current.focus();
      }
    };
    const outside = (e) => {
      if (!header.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => observer.observe(el));
    const media = window.matchMedia("(min-width: 900px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", resize);
    };
  }, []);
  return (
    <header
      className="site-header"
      ref={header}
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget))
          setOpen(false);
      }}
    >
      <div className="container nav-row">
        <a
          className="brand"
          href={page === "home" ? "#top" : home}
          aria-label={"Saif Shorfa — " + t("home")}
        >
          <Mark />
          <span>
            SAIF SHORFA<span className="brand-dot">.</span>
          </span>
        </a>
        <nav
          id="primary-navigation"
          className={"nav-links " + (open ? "is-open" : "")}
          aria-label={lang === "ar" ? "التنقل الرئيسي" : "Primary navigation"}
        >
          {[
            ["services", "navServices"],
            ["work", "navWork"],
            ["approach", "navMethod"],
            ["insights", "navInsights"],
            ["about", "navAbout"],
          ].map(([id, key]) => (
            <a
              key={id}
              href={sectionPath(id)}
              aria-current={
                active === id || (page !== "home" && id === "services")
                  ? "location"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {t(key)}
            </a>
          ))}
          <a
            className="mobile-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            {t("start")}
            <Arrow />
          </a>
        </nav>
        <div className="nav-actions">
          <a
            className="language-link"
            href={routePath(
              lang === "en" ? "ar" : "en",
              page === "notfound" ? "home" : page,
              serviceSlug,
            )}
            lang={lang === "en" ? "ar" : "en"}
            aria-label={
              lang === "en" ? "عرض الموقع بالعربية" : "View site in English"
            }
          >
            {lang === "en" ? "عربي" : "EN"}
          </a>
          <a className="nav-cta" href="#contact">
            {t("start")}
            <Arrow />
          </a>
          <button
            ref={button}
            className="menu-toggle"
            aria-controls="primary-navigation"
            aria-expanded={open}
            aria-label={t(open ? "closeMenu" : "menu")}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
