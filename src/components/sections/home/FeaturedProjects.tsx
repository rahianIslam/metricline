"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import type { CaseStudy } from "@/types";

// ── Division accent map ───────────────────────────────────────

const DIVISION_ACCENT: Record<string, string> = {
  projects: "#C8832A",
  rentals: "#F5C30A",
  operations: "#1FC87A",
};

// ── Real case study card ──────────────────────────────────────

function RealProjectCard({ study }: { study: CaseStudy }) {
  const accent = DIVISION_ACCENT[study.division] ?? "#C8832A";

  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col bg-white border border-group-border rounded-sm overflow-hidden shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* Image area */}
      <PlaceholderImage
        aspectRatio="aspect-[16/9]"
        showLabel
        label="Project photo coming"
        className="rounded-none"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 p-7 gap-4">
        {/* Category eyebrow */}
        <span
          className="font-mono text-[11px] tracking-[0.15em] uppercase"
          style={{ color: accent }}
        >
          {study.sector}
        </span>

        {/* Title */}
        <h3 className="font-display text-heading-md font-bold text-group-text leading-snug">
          {study.title}
        </h3>

        {/* Meta — 3 columns: Client, Location, Year */}
        <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-group-border">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-group-textDim mb-1">Client</p>
            <p className="font-display text-[13px] font-bold text-group-text">{study.client}</p>
          </div>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-group-textDim mb-1">Location</p>
            <p className="font-display text-[13px] font-bold text-group-text">{study.location}</p>
          </div>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-group-textDim mb-1">Year</p>
            <p className="font-display text-[13px] font-bold text-group-text">{study.year}</p>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-body-sm text-group-textMuted leading-relaxed line-clamp-3">
          {study.description}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <span
            className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity duration-200 opacity-60 group-hover:opacity-100"
            style={{ color: accent }}
          >
            View project
            <ArrowRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ── Placeholder project card ──────────────────────────────────

function PlaceholderProjectCard({ index }: { index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative flex flex-col bg-white border border-group-border rounded-sm overflow-hidden opacity-40"
      aria-hidden="true"
    >
      {/* Image area */}
      <div className="aspect-[16/9] bg-group-surface" />

      {/* Content */}
      <div className="flex flex-col gap-3 p-7">
        <div className="h-2 w-24 bg-group-border rounded-full" />
        <div className="h-4 w-3/4 bg-group-border rounded-full" />
        <div className="h-3 w-1/2 bg-group-surface rounded-full" />
        <div className="space-y-1.5 pt-1">
          <div className="h-2.5 w-full bg-group-surface rounded-full" />
          <div className="h-2.5 w-5/6 bg-group-surface rounded-full" />
        </div>
        <div className="pt-2 flex items-center gap-1.5">
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-group-textDim">
            Case study {index + 2} coming soon
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Featured Projects ─────────────────────────────────────────

interface FeaturedProjectsProps {
  caseStudies: CaseStudy[];
}

export default function FeaturedProjects({ caseStudies }: FeaturedProjectsProps) {
  const { ref, inView } = useInView();

  // Fill to 4 cards total
  const placeholderCount = Math.max(0, 4 - caseStudies.length);

  return (
    <section className="bg-white py-24 md:py-32" aria-label="Featured projects">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <SectionLabel className="mb-4">Featured Work</SectionLabel>
          <h2 className="font-display text-display-md font-bold text-group-text tracking-tight">
            Projects that{" "}
            <span className="text-group-textMuted">define us</span>
          </h2>
        </div>

        {/* 2×2 grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {caseStudies.map((study) => (
            <RealProjectCard key={study.id} study={study} />
          ))}
          {Array.from({ length: placeholderCount }, (_, i) => (
            <PlaceholderProjectCard key={`placeholder-${i}`} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
