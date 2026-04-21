"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { INDUSTRIES } from "@/lib/content";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

export default function SectorsCallout() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-group-surface border-t border-group-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <SectionLabel className="mb-3">Industries Served</SectionLabel>
            <h2 className="font-display text-heading-lg font-bold text-group-text">
              Sectors we operate in
            </h2>
          </div>
          <Link
            href="/projects"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#C8832A] hover:text-[#D99440] transition-colors"
          >
            View all capabilities →
          </Link>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap gap-2"
        >
          {INDUSTRIES.map((industry) => (
            <motion.span
              key={industry.name}
              variants={fadeUp}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-group-textMuted bg-white border border-group-border px-3 py-2 hover:border-[#C8832A] hover:text-[#C8832A] hover:bg-[#C8832A]/5 transition-colors duration-200 cursor-default"
            >
              {industry.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
