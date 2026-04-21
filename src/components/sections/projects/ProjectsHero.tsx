"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { DivisionButton } from "@/components/ui/Button";
import { DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import CredentialBadges from "@/components/ui/CredentialBadges";

const division = DIVISIONS[0]; // Projects

// ── Concentric Circles — adapted for light theme ──────────────
function ConcentricCircles() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 560 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[560px] max-h-[560px]"
      >
        {/* Concentric circles — dark navy strokes on light bg */}
        <circle cx="280" cy="280" r="240" stroke="#0D1825" strokeWidth="0.6" strokeOpacity="0.08" />
        <circle cx="280" cy="280" r="190" stroke="#0D1825" strokeWidth="0.6" strokeOpacity="0.10" />
        <circle cx="280" cy="280" r="140" stroke="#0D1825" strokeWidth="0.6" strokeOpacity="0.12" />
        <circle cx="280" cy="280" r="92"  stroke="#0D1825" strokeWidth="0.6" strokeOpacity="0.15" />
        <circle cx="280" cy="280" r="48"  stroke="#0D1825" strokeWidth="0.6" strokeOpacity="0.18" />

        {/* Cross-hair lines */}
        <line x1="280" y1="20"  x2="280" y2="540" stroke="#0D1825" strokeWidth="0.5" strokeOpacity="0.06" />
        <line x1="20"  y1="280" x2="540" y2="280" stroke="#0D1825" strokeWidth="0.5" strokeOpacity="0.06" />

        {/* 45° diagonals */}
        <line x1="110" y1="110" x2="450" y2="450" stroke="#0D1825" strokeWidth="0.4" strokeOpacity="0.04" />
        <line x1="450" y1="110" x2="110" y2="450" stroke="#0D1825" strokeWidth="0.4" strokeOpacity="0.04" />

        {/* Tick marks on outermost circle at cardinal points */}
        <line x1="280" y1="36" x2="280" y2="52" stroke="#0D1825" strokeWidth="1" strokeOpacity="0.22" />
        <line x1="280" y1="508" x2="280" y2="524" stroke="#0D1825" strokeWidth="1" strokeOpacity="0.22" />
        <line x1="36"  y1="280" x2="52"  y2="280" stroke="#0D1825" strokeWidth="1" strokeOpacity="0.22" />
        <line x1="508" y1="280" x2="524" y2="280" stroke="#0D1825" strokeWidth="1" strokeOpacity="0.22" />

        {/* Center accent dot */}
        <circle cx="280" cy="280" r="4" fill="#C8832A" fillOpacity="0.6" />
        <circle cx="280" cy="280" r="1.5" fill="#C8832A" fillOpacity="1" />

        {/* Dimension label lines — top arc annotation */}
        <line x1="280" y1="88"  x2="360" y2="72"  stroke="#0D1825" strokeWidth="0.5" strokeOpacity="0.16" strokeDasharray="2 3" />
        <line x1="360" y1="72"  x2="420" y2="72"  stroke="#0D1825" strokeWidth="0.5" strokeOpacity="0.16" />

        {/* Small arc segment highlight — bottom-right quadrant */}
        <path
          d="M 380 340 A 120 120 0 0 1 340 380"
          stroke="#C8832A"
          strokeWidth="1"
          strokeOpacity="0.35"
          fill="none"
        />
      </svg>
    </div>
  );
}

// ── Blueprint grid texture — matches home page ────────────────
function BlueprintGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none blueprint-grid"
      aria-hidden="true"
    />
  );
}

// ── ProjectsHero ──────────────────────────────────────────────

export default function ProjectsHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden pt-16"
      style={{ backgroundColor: division.bg }}
    >
      <BlueprintGrid />

      <div className="relative flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto w-full px-6 flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[calc(100vh-64px)]">

            {/* ── Left — Content ───────────────────────────── */}
            <motion.div
              className="flex flex-col justify-center py-32 lg:py-0 pr-0 lg:pr-20"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Eyebrow */}
              <motion.p
                variants={fadeUp}
                className="font-mono text-label uppercase tracking-[0.15em] mb-8"
                style={{ color: division.accent }}
              >
                EPCM · ENGINEERING · CONSTRUCTION
              </motion.p>

              {/* H1 */}
              <motion.h1
                variants={fadeUp}
                className="font-extrabold leading-[1.0] tracking-[-0.03em] mb-8"
                style={{ color: "#1A1510", fontSize: "clamp(40px, 5.5vw, 68px)" }}
              >
                <span className="block">From concept to</span>
                <span className="block">commissioning.</span>
                <span className="block" style={{ color: "rgba(26,21,16,0.22)" }}>
                  Delivered.
                </span>
              </motion.h1>

              {/* Orange accent rule */}
              <motion.div
                variants={fadeUp}
                className="w-12 h-[3px] mb-7"
                style={{ background: division.accent }}
                aria-hidden="true"
              />

              {/* Subheading */}
              <motion.p
                variants={fadeUp}
                className="text-body-lg max-w-[440px] leading-[1.7] mb-6"
                style={{ color: "#5A6E82" }}
              >
                Full-discipline EPCM for the energy transition, oil &amp; gas,
                petrochemical, and industrial sectors.
              </motion.p>

              {/* CTA row */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                <DivisionButton
                  href="#services"
                  accentColor={division.accent}
                  accentHoverColor={division.accentHover}
                  darkText
                  size="lg"
                >
                  Our Services
                </DivisionButton>
                <Button href="#case-studies" variant="ghost" context="light" size="lg">
                  View Projects
                </Button>
              </motion.div>

              {/* Credential trust signals — below CTAs */}
              <motion.div variants={fadeUp} className="mt-8">
                <CredentialBadges />
              </motion.div>

              {/* Metric strip — subtle inline stats */}
              <motion.div
                variants={fadeUp}
                className="mt-14 flex items-center gap-8 pt-8 border-t"
                style={{ borderColor: division.border }}
              >
                <div>
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-1" style={{ color: "#9A8870" }}>
                    Scope
                  </p>
                  <p className="text-body-sm font-semibold" style={{ color: "#1A1510" }}>9 service lines</p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: division.border }} aria-hidden="true" />
                <div>
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-1" style={{ color: "#9A8870" }}>
                    Sectors
                  </p>
                  <p className="text-body-sm font-semibold" style={{ color: "#1A1510" }}>8 industries</p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: division.border }} aria-hidden="true" />
                <div>
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-1" style={{ color: "#9A8870" }}>
                    Coverage
                  </p>
                  <p className="text-body-sm font-semibold" style={{ color: "#1A1510" }}>AB · SK · BC</p>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right — Geometric visual ─────────────────── */}
            <div
              className="hidden lg:flex items-center justify-center relative border-l"
              style={{ borderColor: division.border }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: `${division.accent}06` }}
              />
              <ConcentricCircles />
            </div>
          </div>
        </div>

        {/* Bottom accent rule */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: division.accent, transformOrigin: "left" }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "#9A8870" }}>
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: `linear-gradient(to bottom, ${division.border}, transparent)` }}
        />
      </motion.div>
    </section>
  );
}
