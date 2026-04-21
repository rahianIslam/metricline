// SectionLabel — eyebrow label above headings.
// Renders in JetBrains Mono, uppercase, with division or default accent color.

type LabelColor = "projects" | "rentals" | "operations" | "default";

interface SectionLabelProps {
  children: React.ReactNode;
  color?: LabelColor;
  className?: string;
  /** Custom CSS color — overrides the color prop */
  customColor?: string;
}

const colorMap: Record<LabelColor, string> = {
  projects: "text-projects-accent",
  rentals: "text-rentals-accent",
  operations: "text-operations-accent",
  default: "text-[#9A8870]",
};

export default function SectionLabel({
  children,
  color = "default",
  className = "",
  customColor,
}: SectionLabelProps) {
  const style = customColor ? { color: customColor } : undefined;

  return (
    <p
      className={[
        "font-mono text-label font-semibold uppercase tracking-[0.15em]",
        customColor ? "" : colorMap[color],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </p>
  );
}
