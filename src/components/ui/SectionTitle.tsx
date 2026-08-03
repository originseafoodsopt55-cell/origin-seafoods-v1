interface SectionTitleProps {
  eyebrow: string;
  title: string;
  center?: boolean;
  labelClassName?: string;
  id?: string;
}

export function SectionTitle({ eyebrow, title, center = false, labelClassName, id }: SectionTitleProps) {
  return (
    <div className={center ? "section-title center" : "section-title"}>
      <p className={["section-label", labelClassName].filter(Boolean).join(" ")}>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
