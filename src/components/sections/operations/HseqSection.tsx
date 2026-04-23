"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { DIVISIONS, COMPANY } from "@/lib/content";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const division = DIVISIONS[2]; // Operations

// ── HSEQ pillars ──────────────────────────────────────────────
const HSEQ = [
  {
    letter: "H",
    title: "Health",
    // TODO_CONTENT: HSEQ health statement
    description:
      "Occupational health programs that protect our people through hazard identification, exposure monitoring, and health-focused work practices.",
  },
  {
    letter: "S",
    title: "Safety",
    // TODO_CONTENT: HSEQ safety statement
    description:
      "Rigorous safety management from pre-job planning through execution — field-level hazard assessment, incident reporting, and continuous improvement.",
  },
  {
    letter: "E",
    title: "Environment",
    // TODO_CONTENT: HSEQ environment statement
    description:
      "Environmental stewardship integrated into every scope — spill prevention, waste management, and regulatory compliance for all operating areas.",
  },
  {
    letter: "Q",
    title: "Quality",
    // TODO_CONTENT: HSEQ quality statement
    description:
      "Quality management systems that ensure every deliverable meets or exceeds specifications — inspection, documentation, and non-conformance management.",
  },
];

// ── Certifications ────────────────────────────────────────────
const CERTIFICATIONS = [
  { code: "APEGA", name: "Association of Professional Engineers & Geoscientists of Alberta" },
  { code: "APEGS", name: "Association of Professional Engineers & Geoscientists of Saskatchewan" },
  // TODO_CONTENT: Additional safety certifications
];

export default function HseqSection() {
  const { ref, inView } = useInView();
  const { ref: certsRef, inView: certsInView } = useInView();

  return (
    <section
      className="py-24 md:py-32 border-t overflow-hidden"
      style={{ backgroundColor: division.bg, borderColor: division.border }}
      aria-label="HSEQ commitment"
    >
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">

        {/* Ghost "HSEQ" watermark */}
        <div
          className="absolute left-0 right-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <span
            className="font-extrabold text-group-text leading-none"
            style={{ fontSize: "clamp(120px, 18vw, 260px)", opacity: 0.04, letterSpacing: "0.05em" }}
          >
            HSEQ
          </span>
        </div>

        {/* Section header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel color="operations" className="mb-4">HSEQ Commitment</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-3">
            <h2
              className="font-bold text-group-text leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              Safety is not{" "}
              <span className="text-operations-textMuted">a checkbox.</span>
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-body-lg leading-[1.7] max-w-[600px]"
            style={{ color: division.textMuted }}
          >
            {/* TODO_CONTENT: Full HSEQ commitment statement */}
            Safety is embedded in how we plan, design, and execute every project.
            Our approach prioritizes hazard identification early, clear communication in the field,
            and accountability across all teams.
          </motion.p>
        </motion.div>

        {/* 4-column HSEQ grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {HSEQ.map((pillar) => (
            <motion.div
              key={pillar.letter}
              variants={scaleIn}
              className="group relative p-8 rounded-sm border overflow-hidden"
              style={{
                backgroundColor: division.card,
                borderColor: division.border,
              }}
            >
              {/* Giant ghost letter */}
              <span
                className="absolute -bottom-3 -right-2 font-extrabold leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  fontSize: "120px",
                  color: division.accent,
                  opacity: 0.06,
                }}
                aria-hidden="true"
              >
                {pillar.letter}
              </span>

              {/* Teal left glow on hover */}
              <div
                className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: division.accent }}
                aria-hidden="true"
              />

              {/* Pillar letter — headline */}
              <div
                className="font-extrabold leading-none mb-5 relative"
                style={{
                  fontSize: "clamp(40px, 4vw, 56px)",
                  color: division.accent,
                  letterSpacing: "-0.02em",
                }}
              >
                {pillar.letter}
              </div>

              <h3 className="font-display text-heading-sm font-bold text-group-text mb-3 relative">
                {pillar.title}
              </h3>
              <p
                className="text-body-sm leading-[1.6] relative"
                style={{ color: division.textMuted }}
              >
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          ref={certsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={certsInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] tracking-[0.18em] uppercase mb-5"
            style={{ color: `${division.accent}60` }}
          >
            Certifications &amp; Affiliations
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.code}
                className="flex items-center gap-3 px-5 py-3 rounded-sm border"
                style={{
                  backgroundColor: division.card,
                  borderColor: `${division.accent}30`,
                }}
                title={cert.name}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: division.accent }}
                />
                <span
                  className="font-mono text-[12px] font-semibold tracking-[0.1em] uppercase"
                  style={{ color: division.accent }}
                >
                  {cert.code}
                </span>
                <span className="text-body-sm text-[#9A8870] hidden sm:block">
                  {cert.name}
                </span>
              </div>
            ))}
            {/* TODO_CONTENT: additional safety certifications */}
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-sm border border-dashed"
              style={{ borderColor: `${division.accent}25` }}
            >
              <span className="font-mono text-[11px] italic tracking-[0.08em]" style={{ color: `${division.accent}50` }}>
                Additional certifications — coming soon
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA band */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 border"
          style={{
            borderColor: `${division.accent}30`,
            borderLeftWidth: "4px",
            borderLeftColor: division.accent,
            backgroundColor: division.card,
          }}
        >
          <div>
            <p className="text-heading-sm font-bold text-group-text mb-1">
              Ready to discuss your operations needs?
            </p>
            <p className="text-body-sm text-[#9A8870]">
              From day-to-day support to full shutdown management — let's talk.
            </p>
          </div>
          <a
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[13px] tracking-wide transition-all duration-200"
            style={{ backgroundColor: division.accent, color: "#1A1510" }}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
