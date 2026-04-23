// PlaceholderImage — CSS diagonal line pattern placeholder.
// No external dependencies. Used wherever real photos are pending.
// TODO_ASSET: Replace with next/image once real photos are provided.

interface PlaceholderImageProps {
  /** Aspect ratio expressed as a Tailwind class, e.g. "aspect-video" */
  aspectRatio?: string;
  showLabel?: boolean;
  label?: string;
  className?: string;
  /** "light" for cream/white sections (default), "dark" for dark-bg sections */
  variant?: "light" | "dark";
}

export default function PlaceholderImage({
  aspectRatio = "aspect-video",
  showLabel = true,
  label = "PHOTO COMING",
  className = "",
  variant = "light",
}: PlaceholderImageProps) {
  const isDark = variant === "dark";

  const bg      = isDark ? "#1A1A1A"              : "#D9D2C8";
  const border  = isDark ? "#2A2A2A"              : "#B0A898";
  const stroke  = isDark ? "#383838"              : "#8A7E72";
  const labelColor = isDark ? "rgba(255,255,255,0.28)" : "#6B6257";
  const crossColor = isDark ? "#484848"           : "#8A7E72";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-sm",
        aspectRatio,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundColor: bg, border: `1px solid ${border}` }}
      aria-hidden="true"
    >
      {/* Diagonal line pattern — pure CSS, no image needed */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.55]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`diag-lines-${variant}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="20"
              stroke={stroke}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#diag-lines-${variant})`} />
      </svg>

      {/* Corner cross — top-left decoration */}
      <div className="absolute top-3 left-3 w-6 h-6 opacity-40">
        <div className="absolute top-0 left-2.5 w-px h-full" style={{ backgroundColor: crossColor }} />
        <div className="absolute top-2.5 left-0 h-px w-full" style={{ backgroundColor: crossColor }} />
      </div>

      {/* Label */}
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase"
            style={{ color: labelColor }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

// ── Logo Placeholder ──────────────────────────────────────────
// Used in the client logos section while real logos are pending.

interface LogoPlaceholderProps {
  name?: string;
  className?: string;
}

export function LogoPlaceholder({ name = "CLIENT", className = "" }: LogoPlaceholderProps) {
  return (
    <div
      className={[
        "flex items-center justify-center border border-group-border bg-white rounded px-8 py-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "#6B6257" }}>
        {name}
      </span>
    </div>
  );
}

// ── Content Placeholder ───────────────────────────────────────
// Wraps placeholder copy with a subtle dashed border and indicator.

interface ContentPlaceholderProps {
  label: string;
  className?: string;
}

export function ContentPlaceholder({ label, className = "" }: ContentPlaceholderProps) {
  return (
    <div
      className={[
        "border border-dashed border-group-border rounded px-4 py-3 opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C8832A] mr-2 align-middle" />
      <span className="font-mono text-[11px] text-group-textMuted italic">{label}</span>
    </div>
  );
}
