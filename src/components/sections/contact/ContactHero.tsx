"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-group-bg pt-32 pb-20 min-h-[480px] flex items-end">

      {/* ── Ghost "CONTACT" watermark ──────────────────────── */}
      <div
        className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-extrabold text-group-text/[0.04] tracking-[-0.05em] whitespace-nowrap"
          style={{
            fontSize: "clamp(110px, 17vw, 220px)",
            lineHeight: 1,
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          CONTACT
        </span>
      </div>

      {/* ── Blueprint grid lines ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[22, 48, 74].map((pct) => (
          <div
            key={pct}
            className="absolute left-0 right-0 h-px bg-group-border/40"
            style={{ top: `${pct}%` }}
          />
        ))}
        {/* Vertical column guide */}
        <div className="absolute left-[60%] top-0 bottom-0 w-px bg-group-border/50" />
        {/* Orange signal dot */}
        <motion.div
          className="absolute top-[22%] left-[60%] w-1.5 h-1.5 rounded-full bg-projects-accent"
          style={{ transform: "translate(-50%, -50%)" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Bottom fade ────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-group-bg to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[680px]"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-label uppercase tracking-[0.15em] text-[#9A8870] mb-7"
          >
            Initiate Contact
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-group-text mb-7 leading-[1.03] tracking-[-0.03em]"
            style={{ fontSize: "clamp(36px, 5vw, 88px)" }}
          >
            Tell us about{" "}
            <span className="text-group-textMuted">your project.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-body-lg text-group-textMuted leading-[1.7] max-w-[500px]"
          >
            From early concept to full execution, we want to hear what
            you&apos;re working on. We respond within one business day.
          </motion.p>
        </motion.div>

        {/* Animated bottom rule */}
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
