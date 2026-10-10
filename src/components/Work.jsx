import { useRef, useState } from "react";
import { useCopy } from "../copy";
import { sitePath } from "../paths";
import { Arrow, Copy, SectionHeading } from "./Shared";
const cases = [
  {
    id: "clinic",
    index: "01",
    tags: "GOOGLE ADS / HEALTHCARE",
    value: "814",
    metric: "conversion",
    copy: "caseOneCopy",
    details: "clinicDetail",
    image: "majesty-campaigns.png",
    caption: "Google Ads · Healthcare campaigns · July 2026",
    secondary: "SAR 7.26 / CPA",
    detail: "1–25 JUL 2026",
  },
  {
    id: "app",
    index: "02",
    tags: "GOOGLE UAC / FIREBASE",
    value: "5,070",
    metric: "install",
    copy: "caseTwoCopy",
    details: "appDetail",
    image: "app-uac-year.jpeg",
    caption: "Google Ads · App acquisition performance",
    secondary: "SAR 0.43 / CPI",
    detail: "APP ACQUISITION",
  },
  {
    id: "store",
    index: "03",
    tags: "SEARCH / E-COMMERCE",
    value: "9.5×",
    metric: "roas",
    copy: "caseThreeCopy",
    details: "storeDetail",
    secondary: "SAR 105K / REVENUE",
    detail: "225 ORDERS",
  },
];
const proofs = [
  // Retain the original gallery's visibility; other source assets stay archived.
  ["firebase-retention.jpeg", "Firebase · Retention"],
  ["play-growth.jpeg", "Play Console · Store growth"],
  ["app-uac-year.jpeg", "Google Ads · App acquisition"],
  ["majesty-june.png", "Google Ads · Healthcare · June"],
  ["majesty-campaigns.png", "Google Ads · Healthcare campaigns"],
];
export default function Work() {
  const { t } = useCopy();
  const dialog = useRef(null);
  const [evidence, setEvidence] = useState(proofs[0]);
  function show(file, caption) {
    setEvidence([file, caption]);
    dialog.current.showModal();
  }
  return (
    <section className="section work" id="work">
      <div className="container">
        <SectionHeading
          label="workLabel"
          heading="workHeading"
          accent="workAccent"
          description="workDescription"
        >
          <a href="#proof" className="text-link">
            {t("workAll")}
            <Arrow />
          </a>
        </SectionHeading>
        <div className="work-grid">
          {cases.map((item) => (
            <article
              className={"case-card case-" + item.id}
              key={item.id}
              data-reveal
            >
              <div className="case-visual">
                <span className="case-index mono">
                  {item.index} / {t(item.id)}
                </span>
                <div className="case-number" dir="ltr">
                  {item.value}
                </div>
                <Copy id={item.metric} className="case-metric" />
                <div className="case-visual-bottom mono">
                  <span dir="ltr">{item.secondary}</span>
                  <span dir="ltr">{item.detail}</span>
                </div>
              </div>
              <div className="case-body">
                <p className="eyebrow case-category">{item.tags}</p>
                <Copy as="h3" id={item.id + "Title"} />
                <Copy as="p" id={item.copy} />
                <details className="case-details">
                  <summary>
                    {t("details")}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <Copy as="div" id={item.details} />
                </details>
                {item.image ? (
                  <button
                    className="text-link evidence-link"
                    onClick={() => show(item.image, item.caption)}
                  >
                    {t("evidence")}
                    <Arrow />
                  </button>
                ) : (
                  <p className="source-note">
                    {t("reported")} · {t("source")}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
        <details className="evidence-library" id="proof">
          <summary>
            <span>
              <span className="status-dot" />
              <Copy id="proofKicker" />{" "}
              <span className="muted">/ {proofs.length}</span>
            </span>
            <span aria-hidden="true">+</span>
          </summary>
          <Copy as="p" id="proofIntro" className="section-description" />
          <div className="proof-grid">
            {proofs.map(([file, caption]) => (
              <button
                key={file}
                className="proof-item"
                onClick={() => show(file, caption)}
              >
                <div className="proof-thumbnail">
                  <img
                    src={sitePath("assets/" + file)}
                    alt={caption + " account screenshot"}
                    loading="lazy"
                    width="400"
                    height="240"
                  />
                  <span className="watermark" aria-hidden="true">
                    © SAIF SHORFA
                  </span>
                </div>
                <span>
                  {caption}
                  <Arrow />
                </span>
              </button>
            ))}
          </div>
        </details>
        <dialog
          ref={dialog}
          className="evidence-dialog"
          aria-labelledby="evidence-caption"
          onClick={(e) => {
            if (e.target === dialog.current) dialog.current.close();
          }}
        >
          <div className="dialog-bar">
            <p id="evidence-caption">{evidence[1]}</p>
            <button
              onClick={() => dialog.current.close()}
              aria-label={t("close")}
            >
              ×
            </button>
          </div>
          <div className="dialog-image">
            <img
              src={sitePath("assets/" + evidence[0])}
              alt={evidence[1] + " account screenshot"}
              draggable="false"
            />
            <span className="watermark" aria-hidden="true">
              © SAIF SHORFA
            </span>
          </div>
        </dialog>
      </div>
    </section>
  );
}
