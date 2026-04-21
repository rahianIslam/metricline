"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { INDUSTRIES } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

// ── Accent colors per industry row (cycles through divisions) ─
const ACCENT_CYCLE = [
  "#E8742A", // projects orange
  "#E8742A",
  "#F5C30A", // rentals yellow
  "#F5C30A",
  "#1FC87A", // operations teal
  "#1FC87A",
  "#E8742A",
  "#F5C30A",
];

export default function IndustriesGrid() {
  const { ref, inView } = useInView();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="py-24 md:py-32 bg-group-bg"
      aria-label="Industries served"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="mb-4">Industries Served</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-bold text-group-text leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              Eight sectors.{" "}
              <span className="text-[#9A8870]">One team.</span>
            </h2>
            <p className="text-body-sm max-w-xs md:text-right leading-relaxed text-[#9A8870]">
              We bring the same execution-driven approach to every industrial sector we serve.
            </p>
          </motion.div>
        </motion.div>

        {/* Industry list — full width rows with hover treatment */}
        <div className="divide-y divide-group-border">
          {INDUSTRIES.map((industry, i) => {
            const accent = ACCENT_CYCLE[i] ?? "#E8742A";
            const isHovered = hoveredIndex === i;
            const num = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-7 px-4 -mx-4 cursor-default transition-colors duration-200 rounded-sm"
                style={{
                  backgroundColor: isHovered ? "#EFEBE4" : "transparent",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left border flash */}
                <motion.div
                  className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-sm"
                  animate={{ scaleY: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundColor: accent, transformOrigin: "bottom" }}
                  aria-hidden="true"
                />

                {/* Number */}
                <span
                  className="font-mono text-[12px] tracking-[0.15em] flex-shrink-0 transition-colors duration-200"
                  style={{ color: isHovered ? accent : "#9A8870" }}
                >
                  {num}
                </span>

                {/* Industry name */}
                <h3
                  className="font-semibold text-heading-sm leading-[1.2] md:w-[340px] md:flex-shrink-0 transition-colors duration-200"
                  style={{ color: isHovered ? "#1A1510" : "#3B3026" }}
                >
                  {industry.name}
                </h3>

                {/* Thin rule — desktop only */}
                <div
                  className="hidden md:block flex-1 h-px transition-colors duration-200"
                  style={{ backgroundColor: isHovered ? `${accent}30` : "rgba(26,21,16,0.08)" }}
                  aria-hidden="true"
                />

                {/* Description */}
                <p
                  className="text-body-sm leading-[1.6] md:w-[360px] md:text-right transition-colors duration-200"
                  style={{ color: isHovered ? "#1A1510" : "#8A7E72" }}
                >
                  {industry.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
