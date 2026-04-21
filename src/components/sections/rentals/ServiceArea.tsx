"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { DIVISIONS, COMPANY } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const division = DIVISIONS[1]; // Rentals

const PROVINCES = [
  {
    code: "AB",
    name: "Alberta",
    description: "Primary service area. Full fleet availability with same-day response.",
  },
  {
    code: "SK",
    name: "Saskatchewan",
    description: "Regular deployment coverage. Coordination from Calgary hub.",
  },
  {
    code: "BC",
    name: "British Columbia",
    description: "Available on request. Subject to equipment availability.",
  },
];

export default function ServiceArea() {
  const { ref, inView } = useInView();

  return (
    <section
      className="py-24 md:py-32 border-t"
      style={{ backgroundColor: division.bg, borderColor: division.border }}
      aria-label="Service area"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <SectionLabel color="rentals" className="mb-4">Service Area</SectionLabel>
            <h2
              className="font-bold text-group-text leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              Western Canada,{" "}
              <span className="text-group-textMuted">covered.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {PROVINCES.map((prov, i) => (
              <motion.div
                key={prov.code}
                variants={fadeUp}
                className="group relative p-7 rounded-sm border overflow-hidden"
                style={{
                  backgroundColor: division.card,
                  borderColor: division.border,
                }}
              >
                {/* Accent wash on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: `${division.accent}08` }}
                />

                {/* Province code — giant ghost */}
                <span
                  className="absolute -bottom-3 -right-2 font-extrabold leading-none select-none pointer-events-none text-group-text/[0.04] group-hover:text-group-text/[0.07] transition-colors duration-300"
                  style={{ fontSize: "80px" }}
                  aria-hidden="true"
                >
                  {prov.code}
                </span>

                <p
                  className="font-mono text-[11px] tracking-[0.2em] uppercase mb-3 relative"
                  style={{ color: `${division.accent}80` }}
                >
                  0{i + 1}
                </p>
                <h3 className="font-display text-heading-sm font-bold text-group-text mb-3 relative">{prov.name}</h3>
                <p className="text-body-sm text-group-textMuted leading-[1.6] relative">{prov.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA band */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-sm border"
            style={{
              borderColor: `${division.accent}30`,
              borderLeftWidth: "4px",
              borderLeftColor: division.accent,
              backgroundColor: division.card,
            }}
          >
            <div>
              <p className="text-heading-sm font-bold text-group-text mb-1">
                Not sure if we cover your site?
              </p>
              <p className="text-body-sm text-group-textMuted">
                Reach out — we'll confirm coverage and mobilization lead time.
              </p>
            </div>
            <a
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[13px] tracking-wide transition-all duration-200"
              style={{ backgroundColor: division.accent, color: "#0F0F0F" }}
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
