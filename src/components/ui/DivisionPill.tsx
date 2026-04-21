// DivisionPill — thin strip at the top of each division page.
// Renders: ← metricline.ca  [●] METRICLINE PROJECTS
// The dot and division name use the division's accent color.
// variant="dark" for dark hero zones, variant="light" for light content zones.

import Link from "next/link";
import type { DivisionConfig } from "@/types";

interface DivisionPillProps {
  division: DivisionConfig;
  variant?: "dark" | "light";
  className?: string;
}

export default function DivisionPill({
  division,
  variant = "dark",
  className = "",
}: DivisionPillProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={[
        "flex items-center gap-4 px-4 py-2 border-b",
        "font-mono text-[11px] tracking-[0.12em] uppercase",
        isDark
          ? "text-[#9A8870]"
          : "bg-white/80 text-group-textMuted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ borderColor: isDark ? division.border : "#DDD7CE" }}
    >
      {/* Back link */}
      <Link
        href="/"
        className={[
          "flex items-center gap-1.5 transition-colors duration-150",
          isDark ? "hover:text-white/70" : "hover:text-group-text",
        ].join(" ")}
      >
        <span>←</span>
        <span>metricline.ca</span>
      </Link>

      {/* Separator */}
      <span className={isDark ? "text-[#9A8870]" : "text-group-textDim"}>|</span>

      {/* Division identity */}
      <span className="flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ backgroundColor: division.accent }}
          aria-hidden="true"
        />
        <span style={{ color: division.accent }}>{division.displayName}</span>
      </span>
    </div>
  );
}
