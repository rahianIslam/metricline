"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { INDUSTRIES } from "@/lib/content";

export default function ClientsHeader() {
  return (
    <section className="relative overflow-hidden bg-group-bg border-b border-group-border py-24 md:py-32">
      {/* Blueprint dot-grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="clients-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill="#1A1510" fillOpacity="0.06" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#clients-dots)" />
        </svg>
      </div>

      {/* Ghost "CLIENTS" watermark */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-extrabold text-group-text leading-none"
          style={{ fontSize: "clamp(80px, 14vw, 200px)", opacity: 0.04, letterSpacing: "-0.03em" }}
        >
          CLIENTS
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-label uppercase tracking-[0.15em] text-[#9A8870] mb-6"
          >
            Trusted By
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-group-text tracking-tight leading-[1.0] mb-6"
            style={{ fontSize: "clamp(44px, 6vw, 80px)", letterSpacing: "-0.03em" }}
          >
            The companies
            <span className="text-[#9A8870]"> that trust us.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-body-lg text-group-textMuted max-w-[520px] leading-[1.7]"
          >
            We work across {INDUSTRIES.length} industrial sectors in Alberta, Saskatchewan, and BC.
            Our clients are operators, owners, and developers who need
            projects delivered right.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
