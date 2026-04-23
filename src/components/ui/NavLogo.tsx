"use client";

import { motion } from "framer-motion";

// Nav-sized animated logo mark — three staggered bars + wordmark.
// Mirrors AnimatedLogo proportions at ~50 % scale for the 64 px nav bar.

// Colours and offsets match ProjectLogo.svg at ~50% scale.
// All bars same width; offsets: bar1=0, bar2=+25, bar3=+10
const BARS = [
  { color: "#FFB800", width: 60, marginLeft: 0  }, // amber-gold — top
  { color: "#E07A10", width: 60, marginLeft: 25 }, // orange     — furthest right
  { color: "#C04B08", width: 60, marginLeft: 10 }, // dark rust  — mid offset
] as const;

const BAR_HEIGHT = 11; // 22px × 50% scale
const BAR_GAP    = 2;  // 4px × 50% scale
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

      {/* Wordmark — two lines, height matches bar stack (37 px) */}
      <motion.div
        style={{
          display:       "flex",
          flexDirection: "column",
          justifyContent:"space-between",
          height:        37,
        }}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.45,
          delay:    delay + 0.38,
          ease:     [0.22, 1, 0.36, 1],
        }}
      >
        <span style={{
          color:         textColor,
          fontFamily:    "var(--font-syne, sans-serif)",
          fontWeight:    700,
          fontSize:      17,
          letterSpacing: "-0.01em",
          lineHeight:    1,
          whiteSpace:    "nowrap",
        }}>
          Metricline
        </span>
        <span style={{
          color:         textColor,
          fontFamily:    "var(--font-syne, sans-serif)",
          fontWeight:    700,
          fontSize:      17,
          letterSpacing: "-0.01em",
          lineHeight:    1,
          whiteSpace:    "nowrap",
        }}>
          Projects
        </span>
      </motion.div>
    </div>
  );
}
