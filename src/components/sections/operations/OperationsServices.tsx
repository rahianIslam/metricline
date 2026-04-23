"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const division = DIVISIONS[2]; // Operations

// TODO_CONTENT: Replace with real Operations services list
const OPS_SERVICES = [
  {
    name: "Facility Operations Support",
    description:
      "Embedded operations personnel providing day-to-day support for process facilities — shift coverage, process monitoring, and issue resolution.",
  },
  {
    name: "Maintenance Management",
    description:
      "Preventive and corrective maintenance programs, work order management, and asset integrity tracking for industrial equipment and systems.",
  },
  {
    name: "HSEQ Programs",
    description:
      "Health, safety, environment, and quality management systems tailored to facility requirements and regulatory obligations.",
  },
  {
    name: "Shutdown & Turnaround",
    description:
      "Planning, execution, and close-out of scheduled facility shutdowns — scope development, resource management, and schedule adherence.",
  },
  {
    name: "Regulatory Compliance",
    description:
      "Regulatory reporting, inspection management, and compliance documentation for provincial and federal requirements.",
  },
  {
    name: "Technical Advisory",
    description:
      "On-call engineering and operations expertise for troubleshooting, process optimization, and capital project support.",
  },
];

export default function OperationsServices() {
  const { ref, inView } = useInView();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-24 md:py-32 border-t"
      style={{ backgroundColor: division.surface, borderColor: division.border }}
      aria-label="Our services"
    >
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">

        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel color="operations" className="mb-4">Our Services</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-bold text-group-text leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              Operations support,{" "}
              <span className="text-operations-textMuted">end to end.</span>
            </h2>
            <p
              className="text-body-sm max-w-xs md:text-right leading-relaxed"
              style={{ color: division.textMuted }}
            >
              {/* TODO_CONTENT: Operations services section subhead */}
              From daily operations through turnarounds — we support the full facility lifecycle.
            </p>
          </motion.div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {OPS_SERVICES.map((service, i) => (
            <motion.div
              key={service.name}
              variants={scaleIn}
              className="group relative p-7 rounded-sm border overflow-hidden"
              style={{
                backgroundColor: hoveredIndex === i ? `${division.card}` : "transparent",
                borderColor: hoveredIndex === i ? `${division.accent}40` : division.border,
                transition: "background-color 0.25s ease, border-color 0.25s ease",
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Left border flash */}
              <motion.div
                className="absolute top-0 left-0 bottom-0 w-[2px] origin-bottom"
                animate={{ scaleY: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: division.accent }}
                aria-hidden="true"
              />

              {/* Index */}
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase block mb-5"
                style={{ color: `${division.accent}60` }}
              >
                0{i + 1}
              </span>

              {/* Service name */}
              <h3 className="font-display text-heading-sm font-bold text-group-text mb-3 leading-[1.3]">
                {service.name}
              </h3>

              {/* Description */}
              <p
                className="text-body-sm leading-[1.6]"
                style={{ color: division.textMuted }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
