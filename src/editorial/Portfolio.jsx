import { useEffect, useRef, useState } from "react";
import { content, labels, platforms } from "./copy";
import { routePath, sitePath } from "../paths";

function Arrow({ diagonal = false }) {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function WhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.8 9.8 0 0 0-8.45 14.76L2.2 22l5.37-1.4A9.8 9.8 0 1 0 12.04 2Zm0 17.9a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.18.83.85-3.1-.2-.32a8.1 8.1 0 1 1 6.96 3.9Zm4.46-6.06c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49l.36-.42.24-.4c.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.58.25 1.03.4 1.38.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
function track(name, source) {
  window.dispatchEvent(
    new CustomEvent("portfolio:event", { detail: { name, source } }),
  );
}
function Wordmark({ light = false }) {
  return (
    <img
      className={"wordmark" + (light ? " wordmark-light" : "")}
      src={sitePath("brand/logo-integrated.svg")}
      width="223"
      height="40"
      alt="Saif Shorfa"
    />
  );
}
function Button({ children, href, secondary = false, ...props }) {
  return (
    <a className={secondary ? "text-link" : "button"} href={href} {...props}>
      {children}
      <Arrow diagonal={secondary} />
    </a>
  );
}
function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  );
}

function Header({ lang, page, serviceSlug, l }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const toggle = useRef(null);
  const section = (id) =>
    page === "home" ? "#" + id : routePath(lang) + "#" + id;
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header className="site-header" ref={ref}>
      <div className="header-inner">
        <a
          className="brand-link"
          href={routePath(lang)}
          aria-label={
            lang === "ar" ? "سيف الشرفا, الرئيسية" : "Saif Shorfa, home"
          }
        >
          <Wordmark />
        </a>
        <nav
          id="navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label={lang === "ar" ? "القائمة الرئيسية" : "Main navigation"}
        >
          {[
            ["work", l.work],
            ["approach", l.approach],
            ["about", l.about],
          ].map(([id, text]) => (
            <a key={id} href={section(id)} onClick={() => setOpen(false)}>
              {text}
            </a>
          ))}
          <a
            className="mobile-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            {l.talk}
          </a>
        </nav>
        <div className="header-actions">
          <a
            className="language-link"
            href={routePath(
              lang === "en" ? "ar" : "en",
              page === "notfound" ? "home" : page,
              serviceSlug,
            )}
            lang={lang === "en" ? "ar" : "en"}
            onClick={() => track("language_switch", "header")}
          >
            {lang === "en" ? "عربي" : "EN"}
          </a>
          <a className="header-cta" href="#contact">
            {l.talk}
            <Arrow diagonal />
          </a>
          <button
            className="menu-toggle"
            ref={toggle}
            aria-label={open ? l.close : l.menu}
            aria-expanded={open}
            aria-controls="navigation"
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
function FloatingGrid() {
  return (
    <div className="floating-grid" aria-hidden="true">
      <div className="grid-lines" />
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <i key={n} className={"square square-" + n} />
      ))}
    </div>
  );
}
function Hero({ c, l, lang }) {
  const hero = useRef(null);
  useEffect(() => {
    const el = hero.current;
    const media = window.matchMedia(
      "(pointer:fine) and (prefers-reduced-motion:no-preference) and (min-width:900px)",
    );
    let frame = 0,
      targetX = 0,
      targetY = 0,
      x = 0,
      y = 0;
    const animate = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      el.style.setProperty("--pointer-x", x + "px");
      el.style.setProperty("--pointer-y", y + "px");
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.05)
        frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const move = (e) => {
      if (!media.matches) return;
      const bounds = el.getBoundingClientRect();
      targetX = ((e.clientX - bounds.left) / bounds.width - 0.5) * 20;
      targetY = ((e.clientY - bounds.top) / bounds.height - 0.5) * 16;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const reset = () => {
      targetX = targetY = 0;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    media.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      media.removeEventListener("change", reset);
    };
  }, []);
  return (
    <section
      className="hero container"
      ref={hero}
      aria-labelledby="hero-heading"
    >
      <FloatingGrid />
      <div className="hero-copy">
        <p className="eyebrow">{c.hero.eyebrow}</p>
        <h1 id="hero-heading">
          {lang === "en" ? (
            <>
              Meet <em>Saif</em>
            </>
          ) : (
            <>
              تعرّف على <em>سيف</em>
            </>
          )}
        </h1>
        <p className="hero-role">
          <span dir="ltr">Meta Ads</span>
          <span className="role-dot">·</span>
          <span dir="ltr">Google Ads</span>
          <span className="role-extra">
            <span className="role-dot">·</span>
            {lang === "ar" ? "تسويق الأداء" : "Performance Marketing"}
          </span>
        </p>
        <p className="hero-description">{l.hero}</p>
        <div className="hero-buttons">
          <Button href="#work">{c.hero.primaryCta}</Button>
          <Button href="#contact" secondary>
            {c.hero.secondaryCta}
          </Button>
        </div>
        <p className="hero-location">
          <span className="status-dot" />
          {l.location}
        </p>
      </div>
      <div className="hero-portrait">
        <img
          src={sitePath("brand/saif-portrait-current.webp")}
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
          width="1122"
          height="1402"
          fetchPriority="high"
          alt={
            lang === "ar"
              ? "سيف الشرفا جالسًا على كرسي، يرتدي الأسود"
              : "Saif Shorfa seated in a chair, wearing black"
          }
        />
      </div>
    </section>
  );
}
function ProofStrip({ c }) {
  return (
    <div className="proof-section container">
      <div className="proof-strip">
        {c.trustStrip.map((item) => (
          <div className="proof-item" key={item.metric}>
            <strong dir="ltr">{item.metric}</strong>
            <div>
              <span>{item.label}</span>
              <small>{item.scope}</small>
            </div>
          </div>
        ))}
      </div>
      <p className="fine-print">{c.trustDisclaimer}</p>
    </div>
  );
}
function ProofFigure({ proof, l }) {
  return (
    <figure className="proof-figure">
      <a href={sitePath(proof.src)} target="_blank" rel="noreferrer">
        <img
          src={sitePath(proof.src)}
          width={proof.width}
          height={proof.height}
          loading="lazy"
          alt={proof.caption}
        />
        <span className="proof-open">
          {l.openProof}
          <Arrow diagonal />
        </span>
      </a>
      <figcaption>{proof.caption}</figcaption>
    </figure>
  );
}
function Measurement({ c, l }) {
  const m = c.measurement;
  return (
    <section
      id="measurement"
      className="measurement-section section container"
      aria-labelledby="measurement-heading"
    >
      <SectionLabel>{l.measurement}</SectionLabel>
      <div className="section-heading">
        <h2 id="measurement-heading">{m.heading}</h2>
        <p>{m.intro}</p>
      </div>
      <div className="measurement-grid">
        {m.items.map((entry) => (
          <article className="measurement-item" key={entry.title} data-reveal>
            <ProofFigure proof={entry.proof} l={l} />
            <h3>{entry.title}</h3>
            <p>{entry.body}</p>
          </article>
        ))}
      </div>
      <p className="fine-print">{l.evidence}</p>
    </section>
  );
}
function Work({ c, l }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const close = () => {
    dialog.current?.close();
    setSelected(null);
    opener.current?.focus();
  };
  const choose = (event, index) => {
    opener.current = event.currentTarget;
    setSelected(index);
    track("view_case_study", c.work.cases[index].id);
  };
  useEffect(() => {
    if (selected !== null) dialog.current?.showModal();
  }, [selected]);
  const item = selected === null ? null : c.work.cases[selected];
  return (
    <section id="work" className="work-section section container">
      <SectionLabel>{l.work}</SectionLabel>
      <div className="section-heading">
        <h2>{c.work.heading}</h2>
        <p>{l.workIntro}</p>
      </div>
      <div className="case-grid">
        {c.work.cases.map((project, i) => (
          <article className="case-card" key={project.id} data-reveal>
            <div className="case-visual">
              <div className={"case-art art-" + i} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <strong dir="ltr">{project.metric}</strong>
              <span className="metric-caption">{project.metricLabel}</span>
              <span className="case-category">{project.category}</span>
            </div>
            <div className="case-body">
              <p className="eyebrow">{project.industry}</p>
              <h3>{project.title || project.headline}</h3>
              <p>{project.summary}</p>
              <p>{project.secondaryMetric}</p>
              <p className="case-fine">
                {project.disclaimer || project.finePrint}
              </p>
              <button
                className="text-link"
                onClick={(event) => choose(event, i)}
              >
                {l.caseDetail}
                <Arrow diagonal />
              </button>
            </div>
          </article>
        ))}
      </div>
      <dialog
        className="case-dialog"
        ref={dialog}
        aria-labelledby="case-title"
        onCancel={close}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        <div className="dialog-content">
          <button className="dialog-close" aria-label={l.close} onClick={close}>
            ×
          </button>
          {item && (
            <>
              <p className="eyebrow">{item.category}</p>
              <h2 id="case-title">{item.title || item.headline}</h2>
              <div className="dialog-result">
                <strong dir="ltr">{item.metric}</strong>
                <p>
                  {item.metricLabel}
                  <br />
                  {item.secondaryMetric}
                </p>
              </div>
              <h3>{l.challengeTitle}</h3>
              <p>{item.challenge}</p>
              <h3>{l.contribution}</h3>
              <p>{item.solution}</p>
              <h3>{l.context}</h3>
              <p>{item.context}</p>
              {item.proofs?.length > 0 && (
                <>
                  <h3>{l.proofTitle}</h3>
                  <div className="proof-gallery">
                    {item.proofs.map((proof) => (
                      <ProofFigure key={proof.src} proof={proof} l={l} />
                    ))}
                  </div>
                </>
              )}
              <p className="fine-print">{l.evidence}</p>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
function PlatformIcon({ slug }) {
  return (
    <span className={"platform-icon platform-icon-" + slug} aria-hidden="true">
      <img
        src={sitePath(
          "brand/" + (slug === "meta-ads" ? "meta.svg" : "google-ads.webp"),
        )}
        width="64"
        height="64"
        alt=""
        loading="lazy"
      />
    </span>
  );
}
function Services({ c, l, lang, directory = false }) {
  const Heading = directory ? "h1" : "h2";
  return (
    <section id="services" className="services-section section container">
      <SectionLabel>{l.services}</SectionLabel>
      <div className="section-heading">
        <Heading>{c.services.heading}</Heading>
      </div>
      <div className="platform-grid">
        {platforms.map((p) => (
          <a
            className="platform-card"
            href={routePath(lang, "service", p.slug)}
            key={p.slug}
            data-reveal
          >
            <div className="platform-top">
              <span className="eyebrow">{p.tag}</span>
              <PlatformIcon slug={p.slug} />
            </div>
            <h3 dir="ltr">
              {p.name}
              <Arrow diagonal />
            </h3>
            <p>{p[lang].description}</p>
            <span className="text-link">
              {l.serviceLink}
              <Arrow />
            </span>
          </a>
        ))}
      </div>
      <div className="capability-ribbon">
        <span>{l.capability}</span>
        <p dir="ltr">{l.capabilityBody}</p>
      </div>
      {directory && <Button href="#contact">{l.serviceCTA}</Button>}
    </section>
  );
}
function Process({ c, l }) {
  return (
    <section id="approach" className="process-section section">
      <div className="container">
        <SectionLabel>{l.approach}</SectionLabel>
        <div className="section-heading">
          <h2>{c.approach.heading}</h2>
          <p>{l.processNote}</p>
        </div>
        <div className="process-grid">
          {c.approach.steps.map((step) => (
            <article className="process-step" key={step.title} data-reveal>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function About({ c, l, lang }) {
  return (
    <section id="about" className="about-section section container">
      <div className="about-image" data-reveal>
        <div className="about-photo">
          <img
            src={sitePath("brand/saif-portrait-current.webp")}
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            width="1122"
            height="1402"
            loading="lazy"
            alt={lang === "ar" ? "سيف الشرفا" : "Saif Shorfa"}
          />
        </div>
        <span className="photo-caption">
          SAIF SHORFA /{" "}
          {lang === "ar"
            ? "متخصص إعلانات ممولة"
            : "INDEPENDENT PAID MEDIA SPECIALIST"}
        </span>
      </div>
      <div className="about-copy">
        <SectionLabel>{l.about}</SectionLabel>
        <h2>{c.about.heading}</h2>
        <p>{l.aboutText}</p>
        <ul className="about-tags">
          {l.aboutTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
function Contact({ c, l, lang, serviceSlug }) {
  const [ready, setReady] = useState(false);
  const [messageURL, setMessageURL] = useState("");
  useEffect(() => setReady(true), []);
  const submit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const challenge = String(data.get("challenge") || "").trim();
    if (!name || !challenge) {
      const field = !name ? form.elements.name : form.elements.challenge;
      field.setCustomValidity(
        lang === "ar" ? "يرجى كتابة نص واضح." : "Please enter a value.",
      );
      field.reportValidity();
      return;
    }
    const body = [
      lang === "ar"
        ? "مرحبًا سيف، أود مناقشة حملاتي الإعلانية."
        : "Hi Saif, I’d like to discuss my paid campaigns.",
      `${l.name}: ${name}`,
      `${l.business}: ${String(data.get("business") || "").trim() || l.notProvided}`,
      `${l.platform}: ${data.get("platform")}`,
      `${l.budget}: ${data.get("budget")}`,
      `${l.challenge}: ${challenge}`,
    ].join("\n");
    const url =
      "https://wa.me/" +
      c.contacts.whatsapp +
      "?text=" +
      encodeURIComponent(body);
    setMessageURL(url);
    track("contact_form_submit", "contact");
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-grid">
        <div className="contact-copy">
          <SectionLabel>{c.nav[3]}</SectionLabel>
          <h2>{c.contact.heading}</h2>
          <p>{l.contactIntro}</p>
          <div className="contact-direct">
            <p>{l.direct}</p>
            <a
              href={"mailto:" + c.contacts.email}
              onClick={() => track("click_email", "contact")}
            >
              {c.contacts.email}
              <Arrow diagonal />
            </a>
            <a
              href={"https://wa.me/" + c.contacts.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("click_whatsapp_cta", "contact")}
            >
              <WhatsApp />
              {l.whatsapp}
              <Arrow diagonal />
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <fieldset disabled={!ready}>
            <div className="form-row">
              <label>
                {l.name}
                <span aria-hidden="true"> *</span>
                <input
                  name="name"
                  required
                  maxLength="100"
                  autoComplete="name"
                  onInput={(event) => event.currentTarget.setCustomValidity("")}
                />
              </label>
              <label>
                {l.business}
                <span className="optional"> ({l.optional})</span>
                <input
                  name="business"
                  maxLength="250"
                  autoComplete="organization"
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                {l.platform}
                <span aria-hidden="true"> *</span>
                <select
                  name="platform"
                  required
                  defaultValue={
                    serviceSlug
                      ? l.platforms[serviceSlug === "meta-ads" ? 0 : 1]
                      : ""
                  }
                >
                  <option value="" disabled>
                    {l.choose}
                  </option>
                  {l.platforms.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                {l.budget}
                <select name="budget" defaultValue={l.budgets[0]}>
                  {l.budgets.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              {l.challenge}
              <span aria-hidden="true"> *</span>
              <textarea
                name="challenge"
                required
                maxLength="2000"
                rows="4"
                onInput={(event) => event.currentTarget.setCustomValidity("")}
              />
            </label>
            <button className="button button-light" type="submit">
              {l.send}
              <Arrow diagonal />
            </button>
            <p className="form-privacy">{l.privacy}</p>
            <div role="status">
              {messageURL && (
                <p className="form-status">
                  {l.formReady}{" "}
                  <a href={messageURL} target="_blank" rel="noreferrer">
                    {l.continue}
                    <Arrow diagonal />
                  </a>
                </p>
              )}
            </div>
          </fieldset>
          <noscript>
            <p>
              {l.noscript}{" "}
              <a href={"https://wa.me/" + c.contacts.whatsapp}>{l.whatsapp}</a>
            </p>
          </noscript>
        </form>
      </div>
    </section>
  );
}
function Footer({ l, lang }) {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <a href={routePath(lang)}>
          <Wordmark />
        </a>
        <p>{l.footerNote}</p>
        <a className="text-link" href="#top">
          {l.top}
          <span aria-hidden="true">↑</span>
        </a>
      </div>
      <div className="footer-bottom">
        <span>{l.rights}</span>
        <span dir="ltr">Meta Ads · Google Ads · Growth</span>
        <div>
          <a href={routePath(lang, "service", "meta-ads")}>Meta Ads</a>
          <a href={routePath(lang, "service", "google-ads")}>Google Ads</a>
        </div>
      </div>
    </footer>
  );
}
function ServiceDetail({ platform: p, lang, l }) {
  return (
    <>
      <section className="service-hero container">
        <a className="text-link breadcrumb" href={routePath(lang)}>
          {l.home}
          <Arrow />
        </a>
        <div className="service-brand">
          <PlatformIcon slug={p.slug} />
          <p className="eyebrow">
            {p.name} · {l.serviceEyebrow}
          </p>
        </div>
        <h1>{p[lang].headline}</h1>
        <div className="service-lead">
          <p>{p[lang].description}</p>
          <Button href="#contact">{l.serviceCTA}</Button>
        </div>
        <span className="service-watermark" aria-hidden="true">
          {p.name}
        </span>
      </section>
      <section className="service-scope section container">
        <div>
          <SectionLabel>{p.name}</SectionLabel>
          <h2>{l.deliverables}</h2>
        </div>
        <ol>
          {p[lang].items.map((item) => (
            <li key={item}>
              {item}
              <Arrow diagonal />
            </li>
          ))}
        </ol>
      </section>
      <section className="service-fit container section">
        <h2>{l.fit}</h2>
        <p>{p[lang].fit}</p>
      </section>
      <section className="related-service container">
        <p className="eyebrow">{l.related}</p>
        {platforms
          .filter((item) => item.slug !== p.slug)
          .map((item) => (
            <a key={item.slug} href={routePath(lang, "service", item.slug)}>
              {item.name}
              <Arrow diagonal />
            </a>
          ))}
      </section>
    </>
  );
}
export default function Portfolio({
  lang = "en",
  page = "home",
  serviceSlug = "",
}) {
  const c = content[lang],
    l = labels[lang];
  const platform = platforms.find((item) => item.slug === serviceSlug);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal-ready");
        observer.observe(el);
      }
    });
    return () => {
      observer.disconnect();
      document
        .querySelectorAll(".reveal-ready")
        .forEach((el) => el.classList.remove("reveal-ready"));
    };
  }, []);
  const missing = page === "notfound" || (page === "service" && !platform);
  return (
    <div
      className="editorial-site"
      id="top"
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <a className="skip-link" href="#main-content">
        {l.skip}
      </a>
      <Header {...{ lang, page, serviceSlug, l }} />
      <main id="main-content" tabIndex="-1">
        {page === "home" ? (
          <>
            <Hero {...{ c, l, lang }} />
            <ProofStrip c={c} />
            <Work {...{ c, l }} />
            <Measurement {...{ c, l }} />
            <Services {...{ c, l, lang }} />
            <Process {...{ c, l }} />
            <About {...{ c, l, lang }} />
          </>
        ) : page === "services" ? (
          <Services {...{ c, l, lang }} directory />
        ) : !missing ? (
          <ServiceDetail {...{ platform, lang, l }} />
        ) : (
          <section className="container section notfound">
            <h1>{l.notfound}</h1>
            <Button href={routePath(lang)}>{l.home}</Button>
          </section>
        )}
        <Contact {...{ c, l, lang, serviceSlug }} />
      </main>
      <Footer {...{ l, lang }} />
      <a
        className="floating-whatsapp"
        href={"https://wa.me/" + c.contacts.whatsapp}
        aria-label={l.whatsapp}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("click_whatsapp_cta", "floating")}
      >
        <WhatsApp />
      </a>
    </div>
  );
}
