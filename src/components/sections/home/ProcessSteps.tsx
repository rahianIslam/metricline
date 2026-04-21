"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { staggerContainer, clipReveal } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const STEPS = [
  {
    number: "01",
    phase: "Define",
    title: "Concept & Engineering",
    description:
      "We begin with the problem, not the solution. Concept development, option screening, Pre-FEED, and FEED establish what gets built and why, before capital is committed.",
  },
  {
    number: "02",
    phase: "Engineer",
    title: "Detailed Design",
    description:
      "Full-discipline detailed engineering — civil, structural, process, piping, electrical, instrumentation — produced to issued-for-construction standard.",
  },
  {
    number: "03",
    phase: "Procure & Fabricate",
    title: "Procurement & Supply",
    description:
      "Vendor selection, RFQ management, purchase orders, expediting, and fabrication coordination. Equipment arrives on time, to spec, with full documentation.",
  },
  {
    number: "04",
    phase: "Execute",
    title: "Construction & Start-Up",
    description:
      "Field execution with construction management, QA/QC, and commissioning. We stay accountable through start-up and performance verification.",
  },
];

export default function ProcessSteps() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-group-surface border-t border-group-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <SectionLabel className="mb-4">How We Work</SectionLabel>
          <h2 className="font-display text-display-md font-bold tracking-tight text-group-text">
            One team.{" "}
            <span className="text-group-textMuted">End to end.</span>
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={clipReveal}
              className="bg-white shadow-[var(--shadow-card)] border border-group-border p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#C8832A] font-medium tracking-[0.1em]">
                  {step.number}
                </span>
                <span className="font-mono text-[11px] text-group-textDim uppercase tracking-[0.16em]">
                  {step.phase}
                </span>
              </div>
              <h3 className="font-display text-[20px] font-semibold text-group-text leading-tight">
                {step.title}
              </h3>
              <p className="font-sans text-[14px] text-group-textMuted leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
