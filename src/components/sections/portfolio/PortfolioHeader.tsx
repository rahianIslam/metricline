"use client";

import { motion } from "framer-motion";
import { CASE_STUDIES, DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

// ── Portfolio Header ──────────────────────────────────────────
// Hero section for /portfolio — ghost watermark, division data
// strip on right, animated rule at bottom.

export default function PortfolioHeader() {
  return (
    <section
      className="relative overflow-hidden bg-group-bg pt-40 pb-0"
      aria-label="Portfolio header"
    >
      {/* Ghost "PORTFOLIO" watermark */}
      <div
        className="absolute inset-x-0 top-8 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="block font-extrabold text-group-text/[0.04] tracking-[-0.04em] leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(100px, 17vw, 200px)" }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* Blueprint grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[25, 55, 80].map((pct) => (
          <div
            key={pct}
            className="absolute left-0 right-0 h-px bg-group-border/40"
            style={{ top: `${pct}%` }}
          />
        ))}
        <div
          className="absolute top-0 bottom-0 w-px bg-group-border/50"
          style={{ left: "62%" }}
        />
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-group-bg to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20 pb-20">
        <div className="flex items-end gap-12">

          {/* Left — main content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-[640px]"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <SectionLabel>All Divisions</SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-extrabold text-group-text tracking-tight leading-[1.0] mb-7"
              style={{ fontSize: "clamp(40px, 5.5vw, 96px)" }}
            >
              Our work,
              <br />
              across all{" "}
              <span className="text-[#9A8870]">divisions.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-body-lg text-group-textMuted max-w-[420px] leading-[1.65]"
            >
              Filterable by division and sector. From oil &amp; gas to energy
              transition — explore the full scope of Metricline&apos;s delivered
              work.
            </motion.p>
          </motion.div>

          {/* Right — division data strip (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-6 pb-3 shrink-0"
            aria-hidden="true"
          >
            {DIVISIONS.map((div) => {
              const count = CASE_STUDIES.filter(
                (s) => s.division === div.slug
              ).length;
              return (
                <div key={div.slug} className="flex items-center gap-4">
                  {/* Accent bar */}
                  <div
                    className="w-0.5 h-9 rounded-full"
                    style={{ backgroundColor: div.accent, opacity: 0.75 }}
                  />
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold"
                      style={{ color: div.accent }}
                    >
                      {div.name.replace("Metricline ", "")}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-group-textDim">
                      {count > 0
                        ? `${count} case stud${count === 1 ? "y" : "ies"}`
                        : "Coming soon"}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Animated horizontal rule */}
        <motion.div
          className="mt-16 h-px bg-group-border"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
