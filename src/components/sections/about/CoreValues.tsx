"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { CORE_VALUES } from "@/lib/content";
import { staggerContainer, scaleIn } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

// First letter of each value for the large decorative letter
const VALUE_LETTERS: Record<string, string> = {
  Safety: "S",
  Quality: "Q",
  Integrity: "I",
  Accountability: "A",
  Teamwork: "T",
};

export default function CoreValues() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-group-surface border-t border-group-border py-24 md:py-32" aria-label="Our values">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel className="mb-4">Our Values</SectionLabel>
            <h2 className="font-display text-display-md font-bold text-group-text tracking-tight">
              What we stand{" "}
              <span className="text-group-textMuted">for.</span>
            </h2>
          </div>
          <p className="text-body-md text-group-textMuted max-w-xs md:text-right leading-relaxed">
            Five principles that govern every project decision and every client relationship.
          </p>
        </div>

        {/* Values grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        >
          {CORE_VALUES.map((value, i) => {
            const letter = VALUE_LETTERS[value.name] ?? value.name[0];

            return (
              <motion.div
                key={value.name}
                variants={scaleIn}
                className="group relative flex flex-col overflow-hidden bg-group-card border border-group-border rounded-sm p-7 hover:border-[#3B3026] transition-colors duration-300"
              >
                {/* Ghost letter — full bleed behind content */}
                <span
                  className="absolute -bottom-4 -right-2 font-extrabold text-group-text/[0.05] leading-none select-none pointer-events-none group-hover:text-group-text/[0.08] transition-colors duration-300"
                  style={{ fontSize: "clamp(80px, 10vw, 110px)" }}
                  aria-hidden="true"
                >
                  {letter}
                </span>

                {/* Index dot */}
                <span className="font-mono text-[11px] tracking-[0.18em] text-group-textDim mb-6">
                  0{i + 1}
                </span>

                {/* Value name */}
                <h3 className="font-display text-heading-sm font-bold text-group-text mb-4 relative">
                  {value.name}
                </h3>

                {/* Description */}
                <p className="text-body-sm text-group-textMuted leading-[1.6] relative">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
