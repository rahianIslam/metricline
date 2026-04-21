"use client";

import { motion } from "framer-motion";

// Nav-sized animated logo mark — three staggered bars + wordmark.
// Mirrors AnimatedLogo proportions at ~50 % scale for the 64 px nav bar.

const BARS = [
  { color: "#FAB500", width: 54, marginLeft: 0  },
  { color: "#E07228", width: 64, marginLeft: 11 },
  { color: "#8B3A12", width: 54, marginLeft: 6  },
] as const;

const BAR_HEIGHT = 8;
const BAR_GAP    = 3;
const RADIUS     = 2;

interface NavLogoProps {
  /** Controls text colour — "light" for transparent nav, "dark" for scrolled/light bg */
  theme?: "light" | "dark";
  delay?: number;
}

export default function NavLogo({ theme = "light", delay = 0 }: NavLogoProps) {
  const textColor = theme === "light" ? "#1A1510" : "#FFFFFF";

  return (
    <div className="flex items-center gap-2.5">
      {/* Mark — three small bars slide in from left */}
      <div
        aria-hidden="true"
        className="flex flex-col"
        style={{ gap: BAR_GAP }}
      >
        {BARS.map((bar, i) => (
          <motion.div
            key={i}
            style={{
              width:        bar.width,
              height:       BAR_HEIGHT,
              marginLeft:   bar.marginLeft,
              background:   bar.color,
              borderRadius: RADIUS,
            }}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0,   opacity: 1 }}
            transition={{
              duration: 0.5,
              delay:    delay + i * 0.1,
              ease:     [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      {/* Wordmark — fades in after bars */}
      <motion.span
        style={{
          color:         textColor,
          fontFamily:    "var(--font-syne, sans-serif)",
          fontWeight:    700,
          fontSize:      15,
          letterSpacing: "-0.01em",
          lineHeight:    1,
          whiteSpace:    "nowrap",
        }}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.45,
          delay:    delay + 0.38,
          ease:     [0.22, 1, 0.36, 1],
        }}
      >
        Metricline Projects
      </motion.span>
    </div>
  );
}
