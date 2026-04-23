"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { HSE_STATEMENT, COMPANY } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

export default function HseSection() {
  const { ref, inView } = useInView({ margin: "-60px" });

  return (
    <section
      className="relative overflow-hidden bg-group-bg py-24 md:py-32 border-t border-group-border"
      aria-label="Health, Safety and Environment"
    >
      {/* ── Background "HSE" ghost text ───────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-extrabold text-[#1FC87A]/[0.03] leading-none tracking-[-0.05em]"
          style={{ fontSize: "clamp(180px, 30vw, 400px)" }}
        >
          HSE
        </span>
      </div>

      {/* ── Teal left-edge glow ──────────────────────────────── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-[#1FC87A]"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(31,200,122,0.06) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <SectionLabel customColor="#1FC87A">Safety First</SectionLabel>
            <ShieldCheck size={14} className="text-[#1FC87A] opacity-60" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-display-md font-bold text-group-text tracking-tight mb-8 leading-tight"
          >
            Safety is not{" "}
            <span className="text-group-textMuted">a checkbox.</span>
          </motion.h2>

          {/* Statement */}
          <motion.p
            variants={fadeUp}
            className="text-body-lg text-group-textMuted leading-[1.8] mb-12 max-w-2xl"
          >
            {HSE_STATEMENT}
          </motion.p>

          {/* Certification badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#9A8870] mr-2">
              Certified
            </span>
            {COMPANY.certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 border border-[#1FC87A]/30 bg-[#1FC87A]/[0.04] text-[#1FC87A] font-mono text-[11px] tracking-[0.12em] uppercase rounded-sm px-4 py-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FC87A] opacity-70" />
                {cert}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
