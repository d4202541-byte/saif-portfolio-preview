import { useCopy } from "../copy";
import { Arrow, Copy, SectionHeading } from "./Shared";
const services = [
  ["One", "↗", ["Google Ads", "Meta Ads", "PMax", "Shopping"]],
  ["Two", "⌘", ["GA4", "GTM", "Data Layer", "CAPI"]],
  ["Three", "▯", ["UAC", "Firebase", "Play Console", "ASO"]],
  ["Four", "⌕", ["Technical SEO", "Content", "GSC", "Ahrefs"]],
  ["Five", "⇄", ["Landing Pages", "Funnels", "Forms", "A/B Tests"]],
  ["Six", "◇", ["Google Ads", "Merchant Center", "Policy", "Appeals"]],
];
export default function Services() {
  const { t } = useCopy();
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHeading
          label="servicesLabel"
          heading="servicesHeading"
          accent="servicesAccent"
          description="servicesDescription"
        />
        <div className="services-grid">
          {services.map(([key, icon, tags], i) => (
            <article className="service-card" key={key} data-reveal>
              <div className="service-top">
                <span className="service-icon" aria-hidden="true">
                  {icon}
                </span>
                <span className="mono muted">0{i + 1}</span>
              </div>
              <Copy as="h3" id={"service" + key + "Title"} />
              <Copy as="p" id={"service" + key + "Copy"} />
              <div className="chips">
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a
                className="service-link"
                href="#contact"
                aria-label={t("service" + key + "Title") + " — " + t("start")}
              >
                <Arrow />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
