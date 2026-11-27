import { routePath } from "../paths";
import { automation } from "./automation.js";
import { content } from "./copy";
import "./automation.css";

function track(name, source) {
  (window.dataLayer = window.dataLayer || []).push({
    event: name,
    event_source: source,
  });
}
const wa = (lang, text) =>
  "https://wa.me/" +
  content[lang].contacts.whatsapp +
  "?text=" +
  encodeURIComponent(text);

function Spark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ai-spark">
      <path
        d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z"
        fill="currentColor"
      />
    </svg>
  );
}
function Play() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" />
      <path d="M26 20l18 12-18 12z" fill="currentColor" />
    </svg>
  );
}

export function AutomationPage({ lang }) {
  const t = automation[lang];
  const pricingHref = "#pricing";
  return (
    <div className="ai-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="ai-hero">
        <div className="ai-glow" aria-hidden="true" />
        <div className="ai-wrap">
          <p className="ai-eyebrow">
            <Spark />
            {t.eyebrow}
          </p>
          <h1>{t.title}</h1>
          <p className="ai-lead">{t.lead}</p>
          <div className="ai-actions">
            <a
              className="ai-btn ai-btn-hot"
              href={wa(lang, t.whatsappText)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("click_whatsapp_cta", "ai-hero")}
            >
              {t.ctaPrimary}
            </a>
            <a className="ai-btn ai-btn-ghost" href={pricingHref}>
              {t.ctaSecondary}
            </a>
          </div>
          <ul className="ai-stats">
            {t.stats.map(([n, label]) => (
              <li key={label}>
                <strong dir="ltr">{n}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ai-wrap ai-video-section">
        <div
          className="ai-video"
          role="img"
          aria-label={t.videoLabel}
          data-video-slot="ai-intro"
        >
          <Play />
          <span>{t.videoNote}</span>
        </div>
      </section>

      <section className="ai-wrap ai-qa" id={t.sections[0].id}>
        <h2>{t.sections[0].q}</h2>
        <p className="ai-answer">{t.sections[0].a}</p>
        <ol className="ai-layers">
          {t.layers.map(([name, sub], i) => (
            <li key={name} className={i === 5 ? "is-key" : undefined}>
              <span className="ai-num" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong>{name}</strong>
              <span>{sub}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="ai-wrap ai-branches">
        <h2>{t.branchesTitle}</h2>
        <div className="ai-branch-grid">
          {t.branches.map(([name, text], i) => (
            <article key={name} className={"ai-branch tone-" + i}>
              <span className="ai-num" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {t.sections.slice(1).map((s) => (
        <section className="ai-wrap ai-qa ai-qa-row" id={s.id} key={s.id}>
          <h2>{s.q}</h2>
          <p className="ai-answer">{s.a}</p>
        </section>
      ))}

      <section className="ai-wrap ai-work">
        <h2>{t.workTitle}</h2>
        <div className="ai-work-grid">
          {t.work.map(([name, text, cta], i) => {
            const live = i === 2;
            const Tag = live ? "a" : "article";
            return (
              <Tag
                key={name}
                className={"ai-work-card" + (live ? " is-live" : "")}
                href={live ? routePath("ar", "blog") : undefined}
              >
                <h3>{name}</h3>
                <p>{text}</p>
                <span className="ai-tag">{cta}</span>
              </Tag>
            );
          })}
        </div>
      </section>

      <section className="ai-wrap ai-pricing" id="pricing">
        <h2>{t.pricingQ}</h2>
        <p className="ai-answer">{t.pricingA}</p>
        <div className="ai-plan-grid">
          {t.plans.map((p) => (
            <article
              key={p.name}
              className={"ai-plan" + (p.popular ? " is-popular" : "")}
            >
              {p.popular && <span className="ai-badge">{t.popular}</span>}
              <h3>{p.name}</h3>
              <p className="ai-plan-for">{p.for}</p>
              <p className="ai-price">
                <small>{t.from}</small>
                <strong dir="ltr">{p.price}</strong>
                <small>{t.perMonth}</small>
              </p>
              <p className="ai-setup">
                <span dir="ltr">{p.setup}</span> {t.sar} · {t.setup}
              </p>
              <ul>
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="ai-offer">{t.launchOffer}</p>
      </section>

      <section className="ai-wrap ai-steps">
        <h2>{t.stepsQ}</h2>
        <ol>
          {t.steps.map(([name, text], i) => (
            <li key={name}>
              <span className="ai-num" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong>{name}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ai-wrap ai-faq">
        <h2>{t.faqTitle}</h2>
        {t.faqs.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      <section className="ai-final">
        <div className="ai-wrap">
          <h2>{t.finalTitle}</h2>
          <p>{t.finalBody}</p>
          <div className="ai-actions">
            <a
              className="ai-btn ai-btn-hot"
              href={wa(lang, t.whatsappText)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("click_whatsapp_cta", "ai-final")}
            >
              {t.ctaPrimary}
            </a>
            <a
              className="ai-btn ai-btn-ghost"
              href={wa(lang, t.magnetText)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("click_lead_magnet", "ai-final")}
            >
              {t.magnet}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

