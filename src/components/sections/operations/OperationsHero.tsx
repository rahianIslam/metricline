"use client";

import { motion } from "framer-motion";
import { DivisionButton } from "@/components/ui/Button";
import Button from "@/components/ui/Button";
import { DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer, divisionFlash } from "@/lib/animations";

const division = DIVISIONS[2]; // Operations

// ── Facility schematic — floor plan aesthetic ─────────────────
function FacilitySchematic() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[500px] max-h-[500px]"
      >
        {/* Outer facility boundary */}
        <rect x="60" y="60" width="380" height="380" stroke="#1FC87A" strokeWidth="0.7" strokeOpacity="0.15" fill="none" />

        {/* Inner rooms / process areas */}
        <rect x="60" y="60" width="180" height="160" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.1" fill="#1FC87A" fillOpacity="0.015" />
        <rect x="240" y="60" width="200" height="160" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.1" fill="#1FC87A" fillOpacity="0.01" />
        <rect x="60" y="220" width="150" height="220" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.1" fill="none" />
        <rect x="210" y="220" width="230" height="100" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.1" fill="none" />
        <rect x="210" y="320" width="110" height="120" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.1" fill="#1FC87A" fillOpacity="0.012" />
        <rect x="320" y="320" width="120" height="120" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.1" fill="none" />

        {/* Equipment symbols — circles for vessels, squares for pumps */}
        <circle cx="150" cy="140" r="20" stroke="#1FC87A" strokeWidth="0.6" strokeOpacity="0.2" fill="none" />
        <circle cx="150" cy="140" r="8" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.15" fill="#1FC87A" fillOpacity="0.06" />
        <circle cx="330" cy="140" r="28" stroke="#1FC87A" strokeWidth="0.6" strokeOpacity="0.18" fill="none" />
        <rect x="118" y="218" width="16" height="16" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
        <rect x="148" y="218" width="16" height="16" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />

        {/* Process flow lines */}
        <line x1="150" y1="160" x2="150" y2="218" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3 4" />
        <line x1="150" y1="120" x2="240" y2="120" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="3 4" />
        <line x1="302" y1="140" x2="240" y2="140" stroke="#1FC87A" strokeWidth="0.5" strokeOpacity="0.12" />
        <line x1="210" y1="270" x2="440" y2="270" stroke="#1FC87A" strokeWidth="0.4" strokeOpacity="0.1" strokeDasharray="2 5" />

        {/* Dimension annotation lines */}
        <line x1="60" y1="50" x2="440" y2="50" stroke="#1FC87A" strokeWidth="0.4" strokeOpacity="0.12" />
        <line x1="60" y1="46" x2="60" y2="54" stroke="#1FC87A" strokeWidth="0.6" strokeOpacity="0.2" />
        <line x1="440" y1="46" x2="440" y2="54" stroke="#1FC87A" strokeWidth="0.6" strokeOpacity="0.2" />
        <line x1="50" y1="60" x2="50" y2="440" stroke="#1FC87A" strokeWidth="0.4" strokeOpacity="0.12" />

        {/* Center datum point */}
        <circle cx="250" cy="250" r="3" fill="#1FC87A" fillOpacity="0.5" />
        <circle cx="250" cy="250" r="1.2" fill="#1FC87A" fillOpacity="0.9" />

        {/* North arrow */}
        <line x1="455" y1="80" x2="455" y2="55" stroke="#1FC87A" strokeWidth="0.8" strokeOpacity="0.25" />
        <polygon points="455,50 451,62 459,62" fill="#1FC87A" fillOpacity="0.25" />
        <text x="451" y="75" fill="#1FC87A" fillOpacity="0.3" fontSize="8" fontFamily="monospace">N</text>
      </svg>
    </div>
  );
}

// ── Background grid texture ───────────────────────────────────
function FieldGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ops-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1FC87A" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ops-grid)" opacity="0.04" />
      </svg>
    </div>
  );
}

export default function OperationsHero() {
  return (
    <div className="bg-operations-heroBg">
      {/* Flash overlay — teal burst */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        variants={divisionFlash}
        initial="initial"
        animate="animate"
        style={{ backgroundColor: division.accent }}
        aria-hidden="true"
      />

      <section className="relative min-h-screen flex flex-col overflow-hidden pt-16">
        <FieldGrid />

        <div className="relative flex-1 flex flex-col">
          <div className="max-w-7xl mx-auto w-full px-6 flex-1 flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[calc(100vh-44px)]">

              {/* ── Left — Content ─────────────────────────── */}
              <motion.div
                className="flex flex-col justify-center py-32 lg:py-0 pr-0 lg:pr-20"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.p
                  variants={fadeUp}
                  className="font-mono text-label uppercase tracking-[0.15em] mb-8"
                  style={{ color: division.accent }}
                >
                  OPERATIONS · MAINTENANCE · HSEQ
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="font-extrabold leading-[1.0] tracking-[-0.03em] text-white mb-8"
                  style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
                >
                  {/* TODO_CONTENT: Operations hero headline */}
                  <span className="block">Facilities running.</span>
                  <span className="block">People protected.</span>
                  <span className="block" style={{ color: "rgba(255,255,255,0.22)" }}>
                    Always.
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-body-lg leading-[1.7] mb-10 max-w-[440px]"
                  style={{ color: division.textMuted }}
                >
                  {/* TODO_CONTENT: Operations division overview */}
                  Metricline Operations delivers reliable operations support, maintenance
                  management, and HSEQ programs for industrial facilities across Western Canada.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                  <DivisionButton
                    href="#services"
                    accentColor={division.accent}
                    accentHoverColor={division.accentHover}
                    size="lg"
                  >
                    Our Services
                  </DivisionButton>
                  <Button href="/contact" variant="ghost" size="lg">
                    Discuss Your Facility
                  </Button>
                </motion.div>

                {/* Metric strip */}
                <motion.div
                  variants={fadeUp}
                  className="mt-14 flex items-center gap-8 pt-8 border-t"
                  style={{ borderColor: division.border }}
                >
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-1">Standards</p>
                    <p className="text-body-sm text-[#B8C4CC]">APEGA · APEGS</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-1">Focus</p>
                    <p className="text-body-sm text-[#B8C4CC]">H · S · E · Q</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-1">Coverage</p>
                    <p className="text-body-sm text-[#B8C4CC]">AB · SK · BC</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Right — Facility schematic ────────────── */}
              <div className="hidden lg:flex items-center justify-center relative">
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: `${division.accent}04` }}
                />
                <FacilitySchematic />
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

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          aria-hidden="true"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A8870]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>
    </div>
  );
}
