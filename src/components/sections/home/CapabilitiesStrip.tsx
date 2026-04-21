"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const CAPABILITIES = [
  {
    number: "01",
    title: "Full-Scope EPCM",
    detail: "Concept · Pre-FEED · FEED · Detailed Engineering · Procurement · Construction",
  },
  {
    number: "02",
    title: "Industrial Sectors",
    detail: "Oil & Gas · Petrochemical · Energy Transition · Rail & Bulk Handling",
  },
  {
    number: "03",
    title: "Service Regions",
    detail: "Alberta · Saskatchewan · British Columbia",
  },
  {
    number: "04",
    title: "Brownfield & Greenfield",
    detail: "Proven in live facilities — safety, uptime, and site constraints understood",
  },
];

export default function CapabilitiesStrip() {
  const { ref, inView } = useInView({ margin: "-80px" });

  return (
    <section className="bg-white py-16 border-b border-group-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">

          {/* Left label column */}
          <div className="pt-1">
            <SectionLabel customColor="#C8832A">Core Capabilities</SectionLabel>
          </div>

          {/* Right 2×2 grid */}
          <motion.div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {CAPABILITIES.map((item) => (
              <motion.div
                key={item.number}
                variants={fadeUp}
                className="border-l-[3px] border-[#C8832A] bg-group-surface/30 px-5 py-4"
              >
                <span className="font-mono text-[11px] text-[#C8832A] font-medium block mb-2">
                  {item.number}
                </span>
                <p className="font-display text-[15px] font-semibold text-group-text mb-1">
                  {item.title}
                </p>
                <p className="font-mono text-[11px] text-group-textMuted leading-relaxed tracking-[0.04em]">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
