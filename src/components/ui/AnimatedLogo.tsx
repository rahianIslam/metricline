"use client";

import { motion } from "framer-motion";

// Recreates the Metricline Projects logo mark with entrance animation.
//
// Bar colours and stagger positions match the ProjectLogo.png exactly:
//   top  — amber-gold  #FAB500  (shortest, leftmost)
//   mid  — orange      #E07228  (slightly wider, offset right)
//   btm  — dark rust   #8B3A12  (similar width, offset right again)
//
// Animation sequence:
//   1. Three bars slide in from the left, 120 ms stagger
//   2. "Metricline Projects" drops down from above
//   3. Accent rule fades in between wordmark and tagline
//   4. Tagline fades up below the rule

interface AnimatedLogoProps {
  showTagline?: boolean;
  delay?: number;
  theme?: "light" | "dark";
}

// Values produce a visual match to the PNG at hero scale.
// Bar height and gap kept proportional to the original mark.
// Horizontal extents (marginLeft + width):
//   top    0 → 110   (leftmost, shortest)
//   bottom 12 → 122  (starts/ends slightly after top, stops before middle)
//   middle 22 → 152  (furthest right, longest)
const BARS = [
  { color: "#FAB500", width: 110, marginLeft: 0  }, // amber-gold — top
  { color: "#E07228", width: 130, marginLeft: 22 }, // orange     — middle (longest, furthest right)
  { color: "#8B3A12", width: 110, marginLeft: 12 }, // dark rust  — bottom (between top and middle)
] as const;

const BAR_HEIGHT = 17;
const BAR_GAP    = 8;
const RADIUS     = 2;

export default function AnimatedLogo({
  showTagline = false,
  delay = 0,
  theme = "light",
}: AnimatedLogoProps) {
  const textColor  = theme === "light" ? "#1A1510"              : "#FFFFFF";
  const mutedColor = theme === "light" ? "rgba(26,21,16,0.5)"   : "rgba(255,255,255,0.45)";
  const ruleColor  = "#C8832A";

  return (
    <div>
      {/* ── Mark — three staggered bars ──────────────────────── */}
      <div aria-hidden="true">
        {BARS.map((bar, i) => (
          <motion.div
            key={i}
            style={{
              width:        bar.width,
              height:       BAR_HEIGHT,
              marginLeft:   bar.marginLeft,
              marginBottom: i < BARS.length - 1 ? BAR_GAP : 0,
              background:   bar.color,
              borderRadius: RADIUS,
            }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0,    opacity: 1 }}
            transition={{
              duration: 0.6,
              delay:    delay + i * 0.12,
              ease:     [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      {/* ── Wordmark — drops from above ───────────────────────── */}
      <motion.p
        style={{
          color:         textColor,
          fontFamily:    "var(--font-dm-sans, sans-serif)",
          fontWeight:    700,
          fontSize:      28,
          letterSpacing: "-0.01em",
          lineHeight:    1,
          marginTop:     16,
        }}
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{
          duration: 0.55,
          delay:    delay + 0.46,
          ease:     [0.22, 1, 0.36, 1],
        }}
      >
        Metricline Projects
      </motion.p>

      {/* ── Accent rule — between wordmark and tagline ────────── */}
      {showTagline && (
        <motion.div
          style={{
            width:           48,
            height:          3,
            background:      ruleColor,
            borderRadius:    2,
            marginTop:       12,
            marginBottom:    12,
            transformOrigin: "left",
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            duration: 0.4,
            delay:    delay + 0.68,
            ease:     [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Tagline ───────────────────────────────────────────── */}
      {showTagline && (
        <motion.p
          style={{
            color:         mutedColor,
            fontFamily:    "var(--font-mono, monospace)",
            fontSize:      12,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            lineHeight:    1,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay:    delay + 0.80,
            ease:     [0.22, 1, 0.36, 1],
          }}
        >
          Engineering · Procurement · Construction · Execution
        </motion.p>
      )}
    </div>
  );
}
