"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { DIFFERENTIATORS } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

export default function Differentiators() {
  const { ref, inView } = useInView<HTMLOListElement>();

  return (
    <section className="bg-group-bg py-24 md:py-36 overflow-hidden" aria-label="What sets us apart">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 max-w-xl">
          <SectionLabel className="mb-4">What Sets Us Apart</SectionLabel>
          <h2 className="font-display text-display-md font-bold text-group-text tracking-tight leading-tight">
            Five reasons our clients{" "}
            <span className="text-group-textMuted">come back.</span>
          </h2>
        </div>

        {/* Differentiator list */}
        <motion.ol
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="divide-y divide-group-border/60"
          role="list"
        >
          {DIFFERENTIATORS.map((item) => (
            <motion.li
              key={item.number}
              variants={fadeUp}
              className="group relative py-10 pl-6 transition-colors duration-300 hover:bg-group-surface cursor-default"
            >
              {/* Left orange border — appears on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#E8742A] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" aria-hidden="true" />

              {/* Giant ghost number — sits behind the content */}
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 font-extrabold text-group-text/[0.05] select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(80px, 10vw, 130px)" }}
                aria-hidden="true"
              >
                {item.number}
              </span>

              {/* Row: number label + title + description */}
              <div className="relative grid grid-cols-1 md:grid-cols-[64px_1fr_2fr] gap-y-3 gap-x-10 items-start">
                {/* Visible number */}
                <span className="font-mono text-[11px] tracking-[0.18em] text-[#E8742A] pt-0.5">
                  {item.number}
                </span>

                {/* Title */}
                <h3 className="font-display text-heading-sm font-bold text-group-text leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-body-md text-group-textMuted leading-[1.7]">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
