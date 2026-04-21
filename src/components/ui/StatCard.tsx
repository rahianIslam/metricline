"use client";

// StatCard — one cell of the stats bar on the homepage.
// Phase 4: animated fill bar at bottom, index-staggered delay,
// left-aligned layout, font-display for number.

import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";
import type { StatItem } from "@/types";

interface StatCardProps {
  stat: StatItem;
  inView: boolean;
  /** Show right divider border? */
  showDivider?: boolean;
  /** Position index for staggered fill-bar animation delay */
  index?: number;
}

export default function StatCard({ stat, inView, showDivider = false, index = 0 }: StatCardProps) {
  const animated = useCountUp(stat.numericValue, { inView, duration: 1800 });

  const display =
    stat.numericValue === -1
      ? stat.value
      : `${stat.prefix ?? ""}${animated}${stat.suffix ?? ""}`;

  return (
    <div
      className={[
        "relative flex flex-col justify-center py-10 px-8 overflow-hidden",
        showDivider ? "border-r border-anchor-border" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Animated fill bar at bottom — draws in sync with count-up */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#C8832A]"
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 1.8, delay: 0.5 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <span className="font-display text-display-md font-bold text-anchor-text leading-none mb-3">
        {display}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-anchor-textMuted leading-snug whitespace-pre-line">
        {stat.label}
      </span>
    </div>
  );
}
