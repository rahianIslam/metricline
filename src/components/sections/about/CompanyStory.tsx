"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { COMPANY_HISTORY } from "@/lib/content";
import { fadeUp, slideInLeft, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

// Parse paragraphs from the multi-line content string
const HISTORY_PARAGRAPHS = COMPANY_HISTORY.split("\n\n").filter(Boolean);

// Milestone years pulled alongside each paragraph
const MILESTONES = ["2022", "2022–23", "2023–24", "Today"];

export default function CompanyStory() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-white py-24 md:py-36 2xl:py-44 overflow-hidden" aria-label="Company story">
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">
        {/* Two-column grid: 30% label rail / 70% content */}
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 lg:gap-0">

          {/* ── Left rail ─────────────────────────────────── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:pr-12 lg:pt-1"
          >
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <SectionLabel className="mb-2">How We Started</SectionLabel>
              <h2 className="font-display text-heading-lg font-bold text-group-text leading-snug">
                A frustration{" "}
                <span className="text-group-textMuted">became a company.</span>
              </h2>

              {/* Vertical timeline line */}
              <div className="hidden lg:block mt-8 relative pl-4">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-group-border" />
                {MILESTONES.map((yr) => (
                  <div key={yr} className="relative mb-8 flex items-center gap-3">
                    <div className="absolute -left-[17px] w-2 h-2 rounded-full bg-group-border ring-2 ring-white" />
                    <span className="font-mono text-[11px] tracking-[0.12em] text-[#9A8870] ml-1">
                      {yr}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right content ─────────────────────────────── */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:pl-14 lg:border-l lg:border-group-border flex flex-col gap-0"
          >
            {HISTORY_PARAGRAPHS.map((para, i) => {
              // First sentence gets larger treatment
              const sentenceBreak = para.indexOf(". ");
              const firstSentence =
                sentenceBreak > -1 ? para.slice(0, sentenceBreak + 1) : para;
              const rest =
                sentenceBreak > -1 ? para.slice(sentenceBreak + 2) : "";

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={[
                    "py-10",
                    i < HISTORY_PARAGRAPHS.length - 1
                      ? "border-b border-group-border/60"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* Paragraph number */}
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-group-textDim mb-4 block">
                    0{i + 1}
                  </span>

                  {/* First sentence — bold, slightly larger */}
                  <p className="text-[17px] font-semibold text-group-text leading-[1.6] mb-3">
                    {firstSentence}
                  </p>

                  {/* Rest of paragraph */}
                  {rest && (
                    <p className="text-body-md text-group-textMuted leading-[1.7]">
                      {rest}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
