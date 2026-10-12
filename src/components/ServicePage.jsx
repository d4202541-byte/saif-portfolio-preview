import { useCopy } from "../copy";
import { getService, services, serviceLabels } from "../services";
import { routePath } from "../paths";
import Services from "./Services";
import { Arrow, Button } from "./Shared";
import { Icon } from "./Icons";

export default function ServicePage({ slug }) {
  const { lang, t } = useCopy();
  const labels = serviceLabels[lang];
  const service = getService(slug);
  const data = service?.[lang];
  const related = service
    ? services.filter((item) => item.slug !== slug).slice(0, 3)
    : services;
  return (
    <>
      <section className="service-hero" id="top">
        <div className="container">
          <nav className="breadcrumbs" aria-label={labels.breadcrumb}>
            <a href={routePath(lang)}>{t("home")}</a>
            <span aria-hidden="true">/</span>
            {service ? (
              <>
                <a href={routePath(lang, "services")}>{labels.directory}</a>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{data.title}</span>
              </>
            ) : (
              <span aria-current="page">{labels.directory}</span>
            )}
          </nav>
          <div className="service-hero-grid">
            <div>
              <p className="eyebrow">
                {service ? data.title : labels.directory}
              </p>
              <h1>{service ? data.lead : labels.directoryLead}</h1>
              <p className="service-intro">
                {service ? data.intro : labels.directoryIntro}
              </p>
              <div className="hero-actions">
                <Button href={service ? "#project-form" : "#services"}>
                  {service ? labels.discuss : labels.all}
                </Button>
                {service && (
                  <a href="#service-scope" className="text-link">
                    {labels.scope}
                    <Arrow />
                  </a>
                )}
              </div>
            </div>
            <aside
              className="service-brief"
              aria-label={service ? labels.preparation : labels.directory}
            >
              <span className="service-brief-icon">
                <Icon name={service?.icon || "tracking"} size={38} />
              </span>
              <p className="eyebrow">
                {service ? labels.preparation : t("independent")}
              </p>
              <p>{service ? data.preparation : labels.scopeNote}</p>
              {service && (
                <div className="chips">
                  {service.tags.map((tag) => (
                    <span key={tag} dir="auto">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
      {service ? (
        <>
          <section className="section service-audience">
            <div className="container detail-layout">
              <div>
                <p className="eyebrow">01 / {labels.audience}</p>
                <h2>{labels.audience}</h2>
              </div>
              <ul className="audience-list">
                {data.audience.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="section service-scope" id="service-scope">
            <div className="container">
              <div className="detail-section-heading">
                <p className="eyebrow">02 / {labels.scope}</p>
                <h2>{labels.scope}</h2>
                <p>{labels.scopeNote}</p>
              </div>
              <div className="deliverables-grid">
                {data.deliverables.map(([title, description], index) => (
                  <article key={title} data-reveal>
                    <span className="deliverable-number">0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="section service-faq">
            <div className="container detail-layout">
              <div>
                <p className="eyebrow">03 / {labels.faq}</p>
                <h2>{labels.faq}</h2>
              </div>
              <div className="faq-list">
                {data.faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary>
                      {question}
                      <Icon name="plus" size={20} />
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
          <section className="section related-services">
            <div className="container">
              <div className="related-heading">
                <h2>{labels.related}</h2>
                <a className="text-link" href={routePath(lang, "services")}>
                  {labels.all}
                  <Arrow />
                </a>
              </div>
              <div className="related-grid">
                {related.map((item) => (
                  <a
                    key={item.slug}
                    href={routePath(lang, "service", item.slug)}
                  >
                    <Icon name={item.icon} />
                    <h3>{item[lang].title}</h3>
                    <Arrow />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <Services directory />
      )}
    </>
  );
}

export function NotFound() {
  const { lang, t } = useCopy();
  return (
    <section className="section not-found" id="top">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>{lang === "ar" ? "الصفحة غير موجودة." : "Page not found."}</h1>
        <Button href={routePath(lang)}>{t("home")}</Button>
      </div>
    </section>
  );
}
