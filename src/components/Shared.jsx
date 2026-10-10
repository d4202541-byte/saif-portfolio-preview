import { useCopy } from "../copy";
export function Copy({ id, as: Tag = "span", ...props }) {
  const { t } = useCopy();
  return <Tag {...props} dangerouslySetInnerHTML={{ __html: t(id) }} />;
}
export function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}
export function Button({
  children,
  href = "#contact",
  secondary = false,
  ...props
}) {
  return (
    <a
      href={href}
      className={
        "button " + (secondary ? "button-secondary" : "button-primary")
      }
      {...props}
    >
      {children}
      <Arrow />
    </a>
  );
}
export function SectionHeading({
  label,
  heading,
  accent,
  description,
  children,
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <Copy as="p" id={label} className="eyebrow" />
        <h2>
          <Copy id={heading} />
          <br />
          <Copy id={accent} className="accent" />
        </h2>
        {description && (
          <Copy as="p" id={description} className="section-description" />
        )}
      </div>
      {children}
    </div>
  );
}
export function Mark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path d="M27 7H15L7 20h17l-8 13h12l8-15H19z" fill="currentColor" />
    </svg>
  );
}
