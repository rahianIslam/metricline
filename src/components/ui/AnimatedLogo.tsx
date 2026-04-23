"use client";

import { motion } from "framer-motion";

// Recreates the Metricline Projects logo mark with entrance animation.
//
// Bar colours and stagger positions match ProjectLogo.svg exactly:
//   bar1 — amber-gold  #FFB800  (leftmost, x=75 in SVG)
//   bar2 — orange      #E07A10  (furthest right, x=125 in SVG)
//   bar3 — dark rust   #C04B08  (middle offset, x=95 in SVG)
//
// All bars same width (120 units in SVG); offsets relative to bar1:
//   bar1: +0, bar2: +50, bar3: +20
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

// At hero scale bar width is 120 px. Offsets scaled from SVG ratios.
const BARS = [
  { color: "#FFB800", width: 120, marginLeft: 0  }, // amber-gold — top
  { color: "#E07A10", width: 120, marginLeft: 50 }, // orange     — furthest right
  { color: "#C04B08", width: 120, marginLeft: 20 }, // dark rust  — mid offset
] as const;

const BAR_HEIGHT = 22; // matches SVG height="22"
const BAR_GAP    = 4;  // matches SVG y-gap (41-15-22=4, 67-41-22=4)
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
          Engineering · Procurement · Construction · Management
        </motion.p>
      )}
    </div>
  );
}
