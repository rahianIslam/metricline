"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";
import { HOME_STATS } from "@/lib/content";
import { useInView } from "@/hooks/useInView";
import { fadeIn } from "@/lib/animations";

export default function StatsBar() {
  const { ref, inView } = useInView({ margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-anchor-bg border-t border-b border-anchor-border"
      aria-label="Company statistics"
    >
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {HOME_STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              inView={inView}
              showDivider={i < HOME_STATS.length - 1}
              index={i}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
