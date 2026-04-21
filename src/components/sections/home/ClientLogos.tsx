"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

// ── TODO_ASSET: client logos ──────────────────────────────────
// Placeholder client names until real logos are provided.
// Replace with next/image <Image> components when assets arrive.

const CLIENT_PLACEHOLDERS = [
  "Heartland Sulphur",
  "Client Name",
  "Client Name",
  "Client Name",
  "Client Name",
  "Client Name",
  "Client Name",
  "Client Name",
];

// ── Logo strip ────────────────────────────────────────────────

function LogoStrip({ items }: { items: string[] }) {
  // Duplicate array for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="flex items-center gap-6 animate-marquee">
      {doubled.map((name, i) => (
        <div
          key={`${name}-${i}`}
          className="flex-shrink-0 flex items-center justify-center border border-group-border bg-white rounded-sm px-9 py-5 min-w-[160px]"
          aria-hidden={i >= items.length}
        >
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-group-textDim whitespace-nowrap">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Client Logos ──────────────────────────────────────────────

export default function ClientLogos() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-group-surface border-t border-b border-group-border py-16" aria-label="Trusted by">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex items-center gap-6"
        >
          <SectionLabel>Trusted By</SectionLabel>
          {/* TODO_ASSET: client logo files — logos are greyscale by default, full color on hover */}
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-group-textDim border border-dashed border-group-border px-2.5 py-1 rounded">
            Client logos coming
          </span>
        </motion.div>
      </div>

      {/* Marquee container — overflow hidden, pause on hover */}
      <div className="overflow-hidden [--duration:40s] group">
        <div className="flex gap-6 hover:[animation-play-state:paused]">
          <LogoStrip items={CLIENT_PLACEHOLDERS} />
        </div>
      </div>
    </section>
  );
}
