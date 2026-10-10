import { useCopy } from "../copy";
import { Arrow, Copy, SectionHeading } from "./Shared";
export function Results() {
  const { t } = useCopy();
  return (
    <section className="results" id="results" aria-label={t("workHeading")}>
      <div className="container">
        <div className="metrics-grid">
          {[
            ["814", "conversion"],
            ["5,070", "install"],
            ["9.5×", "roas"],
            ["15+", "sites"],
          ].map(([value, label]) => (
            <div className="metric" key={label}>
              <strong dir="ltr">{value}</strong>
              <Copy id={label} />
            </div>
          ))}
        </div>
        <p className="results-note">
          <span className="status-dot" />
          {t("resultSource")} <a href="#work">{t("keepExploring")} ↗</a>
        </p>
      </div>
    </section>
  );
}
export function Clients() {
  const { t } = useCopy();
  return (
    <section className="clients" aria-label={t("clientsLabel")}>
      <div className="container client-row">
        <div>
          <p className="eyebrow">{t("clientsLabel")}</p>
          <p className="muted">{t("clientsNote")}</p>
        </div>
        <div className="client-placeholders">
          {[1, 2, 3].map((i) => (
            <div key={i} className="logo-placeholder">
              <span aria-hidden="true">◇</span>
              <span>
                {t("logoPlaceholder")} <span className="mono">0{i}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Process() {
  const { t } = useCopy();
  return (
    <section className="section process" id="approach">
      <div className="container">
        <SectionHeading
          label="processLabel"
          heading="processHeading"
          accent="processAccent"
          description="processDescription"
        />
        <div className="process-grid">
          {["One", "Two", "Three", "Four"].map((key, i) => (
            <article key={key} data-reveal>
              <div className="process-track">
                <span className="process-number">0{i + 1}</span>
                <span className="process-line" />
                <Arrow />
              </div>
              <h3>{t("process" + key)}</h3>
              <Copy as="h4" id={"step" + key + "Title"} />
              <Copy as="p" id={"step" + key + "Copy"} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function InsightArt({ type }) {
  return type === "orbit" ? (
    <div className="insight-orbit" aria-hidden="true">
      <i />
      <i />
      <i />
      <span>↗</span>
    </div>
  ) : (
    <div className="insight-bars" aria-hidden="true">
      {[27, 42, 35, 62, 53, 78, 88].map((height, i) => (
        <i key={i} style={{ height: height + "%" }} />
      ))}
      <span>IDEA → ACTION</span>
    </div>
  );
}
export function Insights() {
  const { t } = useCopy();
  return (
    <section className="section insights" id="insights">
      <div className="container">
        <SectionHeading
          label="insightsLabel"
          heading="insightsHeading"
          accent="insightsAccent"
          description="insightsDescription"
        />
        <div className="insights-grid">
          {[
            ["medium", "https://medium.com/@saif.shorfa", "orbit"],
            ["barq", "https://barqoftech.com/author/saif-shorfa/", "bars"],
          ].map(([key, url, type]) => (
            <a
              className="insight-card"
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
            >
              <div className="insight-art">
                <InsightArt type={type} />
                <span className="art-note">{t("illustrative")}</span>
              </div>
              <div className="insight-copy">
                <p className="eyebrow">{t(key + "Type")}</p>
                <h3>{t(key + "Title")}</h3>
                <span className="text-link">
                  {t(key + "Cta")}
                  <Arrow />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
export function About() {
  const { t } = useCopy();
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div className="portrait-placeholder" data-reveal>
          <div className="portrait-frame">
            <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
              <circle cx="100" cy="85" r="36" />
              <path d="M32 206c0-51 25-72 68-72s68 21 68 72" />
              <path d="M0 120h200M100 0v240" className="portrait-guides" />
            </svg>
            <span className="portrait-corner corner-a" />
            <span className="portrait-corner corner-b" />
          </div>
          <div className="portrait-label">
            <span className="eyebrow">{t("portrait")}</span>
            <span>{t("portraitNote")}</span>
          </div>
          <span className="portrait-code mono" aria-hidden="true">
            SAIF / 01
          </span>
        </div>
        <div className="about-copy" data-reveal>
          <p className="eyebrow">{t("aboutLabel")}</p>
          <h2>
            {t("aboutHeading")}
            <br />
            <span className="accent">{t("aboutAccent")}</span>
          </h2>
          <h3>{t("aboutIntro")}</h3>
          <Copy as="p" id="aboutCopy" />
          <div className="about-facts">
            {["One", "Two", "Three"].map((key) => (
              <div key={key}>
                <Copy id={"cred" + key + "Label"} className="muted" />
                <Copy as="strong" id={"cred" + key + "Value"} />
              </div>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/saif-shorfa/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {t("aboutLink")}
            <Arrow />
          </a>
        </div>
      </div>
      <div className="container tools-row">
        <span className="eyebrow">{t("tools")}</span>
        <div>
          {[
            "Google Ads",
            "Meta Ads",
            "GA4",
            "GTM",
            "Firebase",
            "Technical SEO",
            "Zid",
            "Salla",
            "WordPress",
          ].map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
