"use client";

import { motion } from "framer-motion";
import { MISSION } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import CredentialBadges from "@/components/ui/CredentialBadges";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-group-bg pt-32 pb-20 min-h-[520px] flex items-end">

      {/* ── Ghost "ABOUT" running vertically, right edge ──── */}
      <div
        className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-extrabold text-group-text/[0.04] tracking-[-0.05em] whitespace-nowrap"
          style={{
            fontSize: "clamp(120px, 18vw, 240px)",
            lineHeight: 1,
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          ABOUT
        </span>
      </div>

      {/* ── Horizontal grid lines, faint ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[20, 45, 70].map((pct) => (
          <div
            key={pct}
            className="absolute left-0 right-0 h-px bg-group-border/40"
            style={{ top: `${pct}%` }}
          />
        ))}
        {/* Vertical accent line, left side */}
        <div className="absolute left-[calc(30%+24px)] top-0 bottom-0 w-px bg-group-border/60" />
      </div>

      {/* ── Bottom fade ────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-group-bg to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[720px]"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-label uppercase tracking-[0.15em] text-[#9A8870] mb-7"
          >
            About Metricline
          </motion.p>

          {/* H1 — broken for dramatic effect */}
          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-group-text mb-8 leading-[1.0] tracking-[-0.03em]"
            style={{ fontSize: "clamp(38px, 5.5vw, 92px)" }}
          >
            Built to close the gap
            <br />
            between engineering{" "}
            <span className="text-group-textMuted">and execution.</span>
          </motion.h1>

          {/* Mission first sentence as subtext */}
          <motion.p
            variants={fadeUp}
            className="text-body-lg text-group-textMuted leading-[1.7] max-w-[540px] 2xl:max-w-[620px]"
          >
            {MISSION}
          </motion.p>

          {/* Credential trust signals */}
          <motion.div variants={fadeUp}>
            <CredentialBadges className="mt-8" />
          </motion.div>
        </motion.div>

        {/* Animated horizontal rule at bottom of content */}
        <motion.div
          className="mt-14 h-px bg-group-border"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
