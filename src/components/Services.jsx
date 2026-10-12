import { useCopy } from "../copy";
import { Arrow, Copy, SectionHeading } from "./Shared";
import { Icon } from "./Icons";
import { services, serviceLabels } from "../services";
import { routePath } from "../paths";
export default function Services({ directory = false }) {
  const { lang } = useCopy();
  return (
    <section className="section services" id="services">
      <div className="container">
        {!directory && (
          <SectionHeading
            label="servicesLabel"
            heading="servicesHeading"
            accent="servicesAccent"
            description="servicesDescription"
          >
            <a href={routePath(lang, "services")} className="text-link">
              {serviceLabels[lang].all}
              <Arrow />
            </a>
          </SectionHeading>
        )}
        {directory && (
          <h2 className="directory-heading">{serviceLabels[lang].directory}</h2>
        )}
        <div className="services-grid">
          {services.map(({ key, slug, icon, tags, [lang]: data }, i) => (
            <article className="service-card" key={key} data-reveal>
              <div className="service-top">
                <span className="service-icon" aria-hidden="true">
                  <Icon name={icon} />
                </span>
                <span className="mono muted">0{i + 1}</span>
              </div>
              <h3>
                <a href={routePath(lang, "service", slug)}>{data.title}</a>
              </h3>
              <Copy as="p" id={"service" + key + "Copy"} />
              <div className="chips">
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a
                className="service-link"
                href={routePath(lang, "service", slug)}
                aria-label={serviceLabels[lang].details + " — " + data.title}
              >
                <span>{serviceLabels[lang].details}</span>
                <Arrow />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
