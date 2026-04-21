"use client";

import { motion } from "framer-motion";
import { MISSION } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

// Highlight the last word "excellence." in orange
function HighlightedMission({ text }: { text: string }) {
  const words = text.split(" ");
  const lastWord = words[words.length - 1];
  const rest = words.slice(0, -1).join(" ");

  return (
    <>
      {rest}{" "}
      <span className="text-[#E8742A]">{lastWord}</span>
    </>
  );
}

export default function MissionQuote() {
  const { ref, inView } = useInView({ margin: "-60px" });

  return (
    <section
      className="relative overflow-hidden py-28 md:py-40 bg-anchor-bg border-t border-b border-anchor-border"
      aria-label="Mission"
    >
      {/* ── Massive decorative quotation mark ─────────────── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-extrabold text-[#E8742A]/[0.06] leading-none"
          style={{ fontSize: "clamp(260px, 38vw, 520px)" }}
        >
          &ldquo;
        </span>
      </div>

      {/* ── Horizontal rules ──────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8742A]/30 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8742A]/30 to-transparent" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-8"
        >
          {/* Label */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-label uppercase tracking-[0.18em] text-[#9A8870]"
          >
            Our Mission
          </motion.p>

          {/* The quote itself */}
          <motion.blockquote
            variants={fadeUp}
            className="font-bold text-anchor-text leading-[1.25] tracking-[-0.02em] text-center"
            style={{ fontSize: "clamp(22px, 3.5vw, 40px)" }}
          >
            <HighlightedMission text={MISSION} />
          </motion.blockquote>

          {/* Attribution mark */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-px bg-anchor-text/20" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A8870]">
              Metricline Group of Industries
            </span>
            <div className="w-10 h-px bg-anchor-text/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
