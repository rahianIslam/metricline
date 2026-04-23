"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { INDUSTRIES, DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const division = DIVISIONS[0];
const ACCENT = division.accent;

// ── IndustriesTags ────────────────────────────────────────────

export default function IndustriesTags() {
  const { ref, inView } = useInView();

  return (
    <section
      className="py-24 md:py-36"
      style={{ backgroundColor: division.bg }}
      aria-label="Industries served"
    >
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <SectionLabel color="projects" className="mb-4">
            Industries Served
          </SectionLabel>
          <h2
            className="font-bold text-projects-text tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            The sectors we work in.
          </h2>
          <p className="text-body-md text-projects-textMuted leading-[1.7]">
            Deep experience across the full spectrum of industrial and energy sectors in Western Canada.
          </p>
        </div>

        {/* Industry rows — name + description, with hover state */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="divide-y"
          style={{ borderColor: division.border }}
          role="list"
        >
          {INDUSTRIES.map((industry) => (
            <motion.div
              key={industry.name}
              variants={fadeUp}
              className="group relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-y-2 gap-x-12 py-6 pl-4 transition-colors duration-200 cursor-default"
              style={{ borderColor: division.border }}
              role="listitem"
            >
              {/* Left accent border flash */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top"
                style={{ backgroundColor: ACCENT }}
                aria-hidden="true"
              />

              {/* Hover background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ backgroundColor: `${division.surface}80` }}
                aria-hidden="true"
              />

              {/* Industry name — pill tag style */}
              <div className="relative flex items-center">
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border transition-colors duration-200"
                  style={{
                    borderColor: division.border,
                  }}
                >
                  {/* Accent dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: ACCENT }}
                    aria-hidden="true"
                  />
                  <span className="text-body-sm font-semibold text-projects-text group-hover:text-projects-text transition-colors duration-200">
                    {industry.name}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="relative text-body-sm text-projects-textMuted leading-[1.6] self-center pl-1 transition-colors duration-200">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pill cloud — compact visual summary at bottom */}
        <div className="mt-16 pt-12 border-t" style={{ borderColor: division.border }}>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-6">
            Sector Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => (
              <span
                key={`pill-${industry.name}`}
                className="inline-flex items-center px-4 py-1.5 rounded-full border text-body-sm text-projects-textMuted transition-all duration-150 hover:text-projects-text hover:border-projects-accent cursor-default"
                style={{ borderColor: division.border }}
              >
                {industry.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
