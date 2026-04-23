"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { ContentPlaceholder } from "@/components/ui/PlaceholderImage";
import { DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const division = DIVISIONS[2]; // Operations

// TODO_CONTENT: Operations case studies — none yet, all placeholder
export default function OperationsCaseStudies() {
  const { ref, inView } = useInView();

  return (
    <section
      className="py-24 md:py-32 border-t"
      style={{ backgroundColor: division.surface, borderColor: division.border }}
      aria-label="Case studies"
    >
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel color="operations" className="mb-4">Case Studies</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-bold text-group-text leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Projects that define us.
          </motion.h2>
        </motion.div>

        {/* Placeholder grid — 3 cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="rounded-sm border overflow-hidden"
              style={{ backgroundColor: division.card, borderColor: division.border }}
            >
              <PlaceholderImage aspectRatio="aspect-video" showLabel={false} />
              <div className="p-6">
                <span
                  className="inline-block font-mono text-[11px] tracking-[0.18em] uppercase px-2 py-1 rounded-sm mb-4"
                  style={{
                    backgroundColor: `${division.accent}15`,
                    color: division.accent,
                    border: `1px solid ${division.accent}25`,
                  }}
                >
                  Operations
                </span>
                <ContentPlaceholder label="Case study coming — project details to be provided" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
