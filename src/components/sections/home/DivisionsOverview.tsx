"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { DIVISIONS } from "@/lib/content";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import type { DivisionConfig } from "@/types";

// ── Division Card ─────────────────────────────────────────────

function DivisionCard({ division }: { division: DivisionConfig }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/${division.slug}`}
        className="group relative flex flex-col h-full p-8 rounded-none bg-group-bg border border-group-border border-t-4 transition-all duration-300 overflow-hidden hover:shadow-[var(--shadow-card-hover)]"
        style={{ borderTopColor: division.accent }}
      >
        {/* Subtle background wash on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: `${division.accent}06` }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative flex flex-col flex-1 gap-6">
          {/* Accent dot + eyebrow */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: division.accent }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-[11px] tracking-[0.15em] uppercase"
              style={{ color: division.accent }}
            >
              {division.eyebrow}
            </span>
          </div>

          {/* Division name */}
          <div className="flex-1">
            <h3 className="font-display text-heading-lg font-bold text-group-text leading-tight mb-3">
              {division.name}
            </h3>
            <p className="font-sans text-body-md text-group-textMuted leading-relaxed">
              {division.tagline}
            </p>
          </div>

          {/* Footer link */}
          <div
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] uppercase transition-opacity duration-200 opacity-60 group-hover:opacity-100"
            style={{ color: division.accent }}
          >
            <span>metricline.ca/{division.slug}</span>
            <ArrowRight
              size={11}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Divisions Overview ────────────────────────────────────────

export default function DivisionsOverview() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-white py-24 md:py-32" aria-label="Our divisions">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <SectionLabel className="mb-4">Our Divisions</SectionLabel>
          <h2 className="font-display text-display-md font-bold text-group-text tracking-tight">
            Three divisions.{" "}
            <span className="text-group-textMuted">One group.</span>
          </h2>
        </div>

        {/* Cards grid — asymmetric: Projects gets more visual weight */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1.5fr] gap-4"
        >
          {DIVISIONS.map((division) => (
            <DivisionCard key={division.slug} division={division} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
