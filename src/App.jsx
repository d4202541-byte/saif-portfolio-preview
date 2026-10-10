import { useEffect, useRef } from "react";
import { CopyContext } from "./copy";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Work from "./components/Work";
import {
  Results,
  Clients,
  Process,
  Insights,
  About,
} from "./components/Sections";
import Contact, { Footer } from "./components/Contact";
function useMotion(scope) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup,
      cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const context = gsap.context(() => {
            gsap.utils.toArray("[data-reveal]").forEach((el) =>
              gsap.from(el, {
                y: 24,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
              }),
            );
            gsap.from(".hero-copy > *", {
              y: 18,
              opacity: 0,
              duration: 0.8,
              stagger: 0.09,
              ease: "power2.out",
            });
          }, scope);
          return () => context.revert();
        });
        cleanup = () => media.revert();
      })
      .catch(() => {
        /* Optional motion failure leaves content visible. */
      });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [scope]);
}
function Analytics() {
  useEffect(() => {
    const id = import.meta.env.VITE_CLARITY_ID || "y16aiq5j58";
    if (
      !import.meta.env.PROD ||
      import.meta.env.VITE_PREVIEW_MODE === "true" ||
      ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname) ||
      window.clarity
    )
      return;
    window.clarity = function (...args) {
      (window.clarity.q = window.clarity.q || []).push(args);
    };
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.clarity.ms/tag/" + encodeURIComponent(id);
    document.head.appendChild(script);
  }, []);
  return null;
}
export default function App({ lang = "en" }) {
  const scope = useRef(null);
  useMotion(scope);
  return (
    <CopyContext.Provider value={lang}>
      <div
        ref={scope}
        className="site-shell"
        dir={lang === "ar" ? "rtl" : "ltr"}
        lang={lang}
      >
        <a className="skip-link" href="#main-content">
          {lang === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Results />
          <Clients />
          <Services />
          <Work />
          <Process />
          <Insights />
          <About />
          <Contact />
        </main>
        <Footer />
        <a
          className="floating-whatsapp"
          href="https://wa.me/970597200690"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.5 8.5 0 0 1-12 8L3 21l1.5-5.5A8.5 8.5 0 1 1 21 11.5Z" />
            <path d="M8 8c1 4 3 6 7 7" />
          </svg>
        </a>
        <Analytics />
      </div>
    </CopyContext.Provider>
  );
}
