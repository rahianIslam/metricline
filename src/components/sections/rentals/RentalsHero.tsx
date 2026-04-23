"use client";

import { motion } from "framer-motion";
import { DivisionButton } from "@/components/ui/Button";
import Button from "@/components/ui/Button";
import { DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer, divisionFlash } from "@/lib/animations";

const division = DIVISIONS[1]; // Rentals

// ── Scan-line grid background ─────────────────────────────────
function ScanGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="rentals-scan"
            x="0" y="0"
            width="60" height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-20)"
          >
            <line x1="0" y1="0" x2="0" y2="60" stroke="#F5C30A" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rentals-scan)" opacity="0.022" />
      </svg>
      {/* Horizontal scan lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="rentals-horiz"
            x="0" y="0"
            width="100%" height="4"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rentals-horiz)" opacity="0.015" />
      </svg>
    </div>
  );
}

// ── Isometric crate geometry — decorative right panel ─────────
function IsoCrate() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[400px] max-h-[400px]"
      >
        {/* Outer box top face */}
        <polygon
          points="200,60 340,140 200,220 60,140"
          stroke="#F5C30A"
          strokeWidth="0.8"
          strokeOpacity="0.18"
          fill="#F5C30A"
          fillOpacity="0.02"
        />
        {/* Left face */}
        <polygon
          points="60,140 60,300 200,380 200,220"
          stroke="#F5C30A"
          strokeWidth="0.8"
          strokeOpacity="0.12"
          fill="#F5C30A"
          fillOpacity="0.015"
        />
        {/* Right face */}
        <polygon
          points="340,140 340,300 200,380 200,220"
          stroke="#F5C30A"
          strokeWidth="0.8"
          strokeOpacity="0.08"
          fill="white"
          fillOpacity="0.008"
        />
        {/* Vertical edges */}
        <line x1="60" y1="140" x2="60" y2="300" stroke="#F5C30A" strokeWidth="0.6" strokeOpacity="0.15" />
        <line x1="340" y1="140" x2="340" y2="300" stroke="#F5C30A" strokeWidth="0.6" strokeOpacity="0.1" />
        <line x1="200" y1="220" x2="200" y2="380" stroke="#F5C30A" strokeWidth="0.6" strokeOpacity="0.1" />
        {/* Cross bracing on top face */}
        <line x1="200" y1="60" x2="200" y2="220" stroke="#F5C30A" strokeWidth="0.4" strokeOpacity="0.08" strokeDasharray="4 6" />
        <line x1="60" y1="140" x2="340" y2="140" stroke="#F5C30A" strokeWidth="0.4" strokeOpacity="0.08" strokeDasharray="4 6" />
        {/* Center accent dot */}
        <circle cx="200" cy="140" r="4" fill="#F5C30A" fillOpacity="0.6" />
        <circle cx="200" cy="140" r="1.5" fill="#F5C30A" fillOpacity="0.95" />
        {/* Dimension tick marks */}
        <line x1="50" y1="135" x2="50" y2="145" stroke="#F5C30A" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="350" y1="135" x2="350" y2="145" stroke="#F5C30A" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="50" y1="140" x2="65" y2="140" stroke="#F5C30A" strokeWidth="0.4" strokeOpacity="0.2" />
        <line x1="335" y1="140" x2="350" y2="140" stroke="#F5C30A" strokeWidth="0.4" strokeOpacity="0.2" />
      </svg>
    </div>
  );
}

export default function RentalsHero() {
  return (
    <div className="bg-rentals-heroBg">
      {/* Flash overlay — yellow burst on page entry */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        variants={divisionFlash}
        initial="initial"
        animate="animate"
        style={{ backgroundColor: division.accent }}
        aria-hidden="true"
      />

      <section className="relative min-h-screen flex flex-col overflow-hidden pt-16">
        <ScanGrid />

        <div className="relative flex-1 flex flex-col">
          <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto w-full px-6 2xl:px-20 flex-1 flex items-center">
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
                  EQUIPMENT · FLEET · WESTERN CANADA
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="font-extrabold leading-[1.0] tracking-[-0.03em] text-white mb-8"
                  style={{ fontSize: "clamp(40px, 5.5vw, 96px)" }}
                >
                  {/* TODO_CONTENT: Rentals hero headline */}
                  <span className="block">Industrial equipment.</span>
                  <span className="block">When you need it.</span>
                  <span className="block" style={{ color: "rgba(255,255,255,0.22)" }}>
                    Delivered.
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-body-lg leading-[1.7] mb-10 max-w-[440px] 2xl:max-w-[520px]"
                  style={{ color: division.textMuted }}
                >
                  {/* TODO_CONTENT: Rentals division overview */}
                  Metricline Rentals provides industrial equipment across Alberta, Saskatchewan,
                  and BC — with operator support and on-site delivery.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                  <DivisionButton
                    href="#catalog"
                    accentColor={division.accent}
                    accentHoverColor={division.accentHover}
                    darkText
                    size="lg"
                  >
                    View Catalog
                  </DivisionButton>
                  <Button href="#quote" variant="ghost" size="lg">
                    Request a Quote
                  </Button>
                </motion.div>

                {/* Metric strip */}
                <motion.div
                  variants={fadeUp}
                  className="mt-14 flex items-center gap-8 pt-8 border-t"
                  style={{ borderColor: division.border }}
                >
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-1">Coverage</p>
                    <p className="text-body-sm text-[#B8C4CC]">AB · SK · BC</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-1">Delivery</p>
                    <p className="text-body-sm text-[#B8C4CC]">On-site available</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-1">Support</p>
                    <p className="text-body-sm text-[#B8C4CC]">Operator + maintenance</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Right — Isometric geometry ────────────── */}
              <div className="hidden lg:flex items-center justify-center relative">
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: `${division.accent}05` }}
                />
                <IsoCrate />
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
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A8870]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>
    </div>
  );
}
