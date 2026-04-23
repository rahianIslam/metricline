"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

// TODO_ASSET: Replace with real client logo files + names
// TODO_CLIENT: Confirm client disclosure permissions before publishing
const CLIENT_SLOTS = [
  { id: "c01", name: "Heartland Sulphur" },
  { id: "c02", name: "Client" },
  { id: "c03", name: "Client" },
  { id: "c04", name: "Client" },
  { id: "c05", name: "Client" },
  { id: "c06", name: "Client" },
  { id: "c07", name: "Client" },
  { id: "c08", name: "Client" },
];

// ── Single logo card ──────────────────────────────────────────
function LogoCard({ slot, index }: { slot: { id: string; name: string }; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isReal = slot.name !== "Client";

  return (
    <motion.div
      variants={scaleIn}
      className="relative flex items-center justify-center border rounded-sm overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: hovered ? "#FFFFFF" : "#F7F4EF",
        borderColor: hovered ? "#DDD7CE" : "#E8E2D9",
        aspectRatio: "3/2",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Hover accent glow — top edge */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ backgroundColor: "#E8742A" }}
        aria-hidden="true"
      />

      {/* TODO_ASSET: Replace this div with next/image once logo provided */}
      <div className="flex flex-col items-center gap-2">
        {isReal ? (
          <>
            <span className="font-semibold text-group-text text-[13px] tracking-wide text-center px-4">
              {slot.name}
            </span>
            <span
              className="font-mono text-[11px] tracking-[0.18em] uppercase"
              style={{ color: "#E8742A80" }}
            >
              client
            </span>
          </>
        ) : (
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870]">
            {/* TODO_ASSET: client logo */}
            Logo
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function ClientLogosGrid() {
  const { ref, inView } = useInView();

  return (
    <section
      className="py-24 md:py-32 bg-group-surface border-b border-group-border"
      aria-label="Client logos"
    >
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="mb-4">Our Clients</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-display-md font-bold text-group-text tracking-tight"
          >
            Who we work with.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8"
        >
          {CLIENT_SLOTS.map((slot, i) => (
            <LogoCard key={slot.id} slot={slot} index={i} />
          ))}
        </motion.div>

        {/* Placeholder notice */}
        <div className="flex items-center gap-3 px-5 py-4 rounded-sm border border-dashed border-group-border">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8742A] flex-shrink-0" />
          <p className="font-mono text-[11px] tracking-[0.08em] italic text-[#9A8870]">
            {/* TODO_ASSET: client logo files — TODO_CLIENT: confirm client disclosure permissions */}
            Client logos pending — client permission confirmation required before publishing.
          </p>
        </div>
      </div>
    </section>
  );
}
