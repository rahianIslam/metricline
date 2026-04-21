"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import type { CaseStudy } from "@/types";

const division = DIVISIONS[0];
const ACCENT = division.accent;

// ── Real Case Study Card ──────────────────────────────────────

function RealCaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col rounded-sm border overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: division.card,
        borderColor: division.border,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <PlaceholderImage
          aspectRatio="aspect-[4/3]"
          showLabel
          label="Project Photo Coming"
          className="rounded-none w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Sector badge — overlaid bottom-left of image */}
        <div
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-sm"
          style={{ backgroundColor: `${ACCENT}18`, border: `1px solid ${ACCENT}35` }}
        >
          <span
            className="font-mono text-[11px] tracking-[0.18em] uppercase"
            style={{ color: ACCENT }}
          >
            {study.sector}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title */}
        <h3 className="font-display text-heading-md font-bold text-projects-text leading-snug">
          {study.title}
        </h3>

        {/* Meta — 3 columns: Client, Location, Year */}
        <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-projects-border">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-group-textDim mb-1">Client</p>
            <p className="font-display text-[13px] font-bold text-projects-text">{study.client}</p>
          </div>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-group-textDim mb-1">Location</p>
            <p className="font-display text-[13px] font-bold text-projects-text">{study.location}</p>
          </div>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-group-textDim mb-1">Year</p>
            <p className="font-display text-[13px] font-bold text-projects-text">{study.year}</p>
          </div>
        </div>

        {/* Scope label */}
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9A8870]">
          {study.scope}
        </p>

        {/* Description */}
        <p className="text-body-sm text-projects-textMuted leading-[1.6]">
          {study.description}
        </p>

        {/* Highlight bullets */}
        {study.highlights.length > 0 && (
          <ul className="flex flex-col gap-2 mt-1" aria-label="Project highlights">
            {study.highlights.slice(0, 4).map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <ChevronRight
                  size={11}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: ACCENT }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] text-projects-textMuted leading-[1.5]">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer — divider + CTA */}
        <div
          className="mt-auto pt-4 border-t"
          style={{ borderColor: division.border }}
        >
          <button
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-150 group/link"
            style={{ color: ACCENT }}
            type="button"
            aria-label={`View details for ${study.title}`}
          >
            <span className="group-hover/link:underline underline-offset-2">
              View details
            </span>
            <ChevronRight
              size={11}
              className="transition-transform duration-150 group-hover/link:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ── Placeholder Case Study Card ───────────────────────────────

function PlaceholderCaseStudyCard() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col rounded-sm border overflow-hidden"
      style={{
        backgroundColor: division.card,
        borderColor: division.border,
      }}
      aria-hidden="true"
    >
      {/* Placeholder image — tall */}
      <PlaceholderImage
        aspectRatio="aspect-[4/3]"
        showLabel={false}
        className="rounded-none w-full"
      />

      {/* Content area — minimal, placeholder only */}
      <div className="flex flex-col flex-1 items-start justify-center p-6 gap-3">
        {/* Ghost lines */}
        <div
          className="h-2 rounded-full w-16 opacity-20"
          style={{ backgroundColor: ACCENT }}
        />
        <div className="h-3 rounded-full w-3/4 bg-group-border/50" />
        <div className="h-2.5 rounded-full w-1/2 bg-group-border/30" />

        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9A8870] mt-2">
          More projects coming
        </p>
      </div>
    </motion.div>
  );
}

// ── CaseStudies ───────────────────────────────────────────────

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  const { ref, inView } = useInView();

  // Pad to 4 cards with placeholders
  const placeholderCount = Math.max(0, 4 - caseStudies.length);

  return (
    <section
      id="case-studies"
      className="py-24 md:py-36"
      style={{ backgroundColor: division.surface }}
      aria-label="Case studies"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <SectionLabel color="projects" className="mb-4">
            Case Studies
          </SectionLabel>
          <h2
            className="font-display font-bold text-projects-text tracking-tight leading-tight"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            Projects that{" "}
            <span className="text-projects-textMuted">define us.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {caseStudies.map((study) => (
            <RealCaseStudyCard key={study.id} study={study} />
          ))}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <PlaceholderCaseStudyCard key={`placeholder-${i}`} />
          ))}
        </motion.div>

        {/* TODO note */}
        <p className="mt-8 font-mono text-[11px] tracking-[0.12em] uppercase text-[#9A8870] text-center">
          {/* TODO_CONTENT: Additional case studies — minimum 3 more needed */}
          Additional case studies to be added
        </p>
      </div>
    </section>
  );
}
