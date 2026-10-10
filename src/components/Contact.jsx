import { useRef, useState } from "react";
import { useCopy } from "../copy";
import { Arrow, Copy, Mark } from "./Shared";
export default function Contact() {
  const { t, lang } = useCopy();
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");
  const form = useRef(null);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name").trim(),
      problem = data.get("problem").trim();
    if (!name || !problem) {
      setStatus(t("formError"));
      setUrl("");
      return;
    }
    const message =
      lang === "ar"
        ? "مرحبًا سيف، لدي استفسار عن مشروع جديد.\n\nالاسم: " +
          name +
          "\nالشركة/الموقع: " +
          (data.get("business").trim() || "غير مذكور") +
          "\nالخدمة: " +
          data.get("service") +
          "\nالميزانية الشهرية: " +
          data.get("budget") +
          "\nالمشكلة الحالية: " +
          problem +
          "\n\nوصلت من موقعك الشخصي."
        : "Hi Saif, I have a new project enquiry.\n\nName: " +
          name +
          "\nCompany/website: " +
          (data.get("business").trim() || "Not provided") +
          "\nService: " +
          data.get("service") +
          "\nMonthly budget: " +
          data.get("budget") +
          "\nCurrent problem: " +
          problem +
          "\n\nSent from your portfolio website.";
    const next =
      "https://wa.me/970597200690?text=" + encodeURIComponent(message);
    setUrl(next);
    setStatus(t("formReady"));
    window.open(next, "_blank", "noopener,noreferrer");
  }
  return (
    <>
      <section className="section contact" id="contact">
        <div className="container">
          <div className="cta-heading" data-reveal>
            <p className="eyebrow">
              <span className="status-dot" />
              {t("ctaLabel")}
            </p>
            <h2>
              {t("ctaHeading")}
              <br />
              <span className="accent">{t("ctaAccent")}</span>
            </h2>
            <p>{t("ctaNote")}</p>
            <a
              className="button button-primary"
              href="#project-form"
              onClick={() =>
                setTimeout(
                  () => form.current?.querySelector("input")?.focus(),
                  100,
                )
              }
            >
              {t("ctaButton")}
              <Arrow />
            </a>
            <a href="mailto:saif.shorfa@gmail.com" className="cta-email">
              saif.shorfa@gmail.com <Arrow />
            </a>
          </div>
          <div className="contact-grid" id="project-form">
            <div className="contact-copy">
              <h3>{t("contactForm")}</h3>
              <Copy as="p" id="contactCopy" />
              <div className="direct-links">
                <a href="mailto:saif.shorfa@gmail.com">
                  <span>{t("email")}</span>
                  <span>
                    saif.shorfa@gmail.com
                    <Arrow />
                  </span>
                </a>
                <a
                  href="https://wa.me/970597200690"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t("phone")}</span>
                  <span dir="ltr">
                    +970 59 720 0690
                    <Arrow />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/saif-shorfa/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>LinkedIn</span>
                  <span>
                    saif-shorfa
                    <Arrow />
                  </span>
                </a>
              </div>
            </div>
            <form ref={form} onSubmit={submit} className="contact-form">
              <div className="form-row">
                <label>
                  <Copy id="formName" />
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength="120"
                  />
                </label>
                <label>
                  <Copy id="formBusiness" />
                  <input
                    name="business"
                    autoComplete="organization"
                    maxLength="250"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  <Copy id="formService" />
                  <select name="service">
                    {["One", "Two", "Three", "Four", "Five"].map((key) => (
                      <option key={key}>{t("serviceOption" + key)}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <Copy id="formBudget" />
                  <select name="budget">
                    {["One", "Two", "Three", "Four"].map((key) => (
                      <option key={key}>{t("budget" + key)}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <Copy id="formProblem" />
                <textarea
                  name="problem"
                  required
                  rows="3"
                  maxLength="2000"
                  placeholder={t("formPlaceholder")}
                />
              </label>
              <button className="button button-primary" type="submit">
                {t("formSubmit")}
                <Arrow />
              </button>
              <p className="form-note">{t("privacy")}</p>
              <div className="form-status" aria-live="polite">
                {status}
                {url && (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {t("continue")} ↗
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export function Footer() {
  const { t } = useCopy();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a href="#top" className="brand">
              <Mark />
              <span>
                SAIF SHORFA<span className="brand-dot">.</span>
              </span>
            </a>
            <p>{t("footer")}</p>
          </div>
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/in/saif-shorfa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <Arrow />
            </a>
            <a
              href="https://medium.com/@saif.shorfa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Medium
              <Arrow />
            </a>
            <a href="mailto:saif.shorfa@gmail.com">
              Email
              <Arrow />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t("footerCopy")}</p>
          <span>{t("location")}</span>
          <a href="#top">{t("backTop")} ↑</a>
        </div>
      </div>
    </footer>
  );
}
