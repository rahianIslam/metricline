"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { DivisionButton } from "@/components/ui/Button";
import { DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const division = DIVISIONS[0];
const ACCENT = division.accent;

export default function ProjectsContactCta() {
  const { ref, inView } = useInView();

  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden bg-anchor-bg"
      aria-label="Contact CTA"
    >
      {/* 4px left border accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: ACCENT }}
        aria-hidden="true"
      />

      {/* Subtle right-side glow */}
      <div
        className="absolute right-0 top-0 bottom-0 w-px"
        style={{ backgroundColor: division.border }}
        aria-hidden="true"
      />

      {/* Background tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `${ACCENT}05` }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative max-w-7xl 2xl:max-w-[1760px] mx-auto px-10 md:px-16"
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-label uppercase tracking-[0.15em] mb-6"
            style={{ color: ACCENT }}
          >
            Get In Touch
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-bold text-anchor-text tracking-tight leading-tight mb-5"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
          >
            Ready to discuss{" "}
            <span className="text-anchor-textMuted">a project?</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-body-lg text-[#9A8870] leading-[1.7] mb-10"
          >
            From early concept to start-up, we deliver. Tell us about your project
            and we&apos;ll get back to you within one business day.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <DivisionButton
              href="/contact"
              accentColor={ACCENT}
              accentHoverColor={division.accentHover}
              darkText
              size="lg"
            >
              Start a Conversation
            </DivisionButton>
            <Button href="/portfolio" variant="ghost" context="dark" size="lg">
              View Our Work
            </Button>
          </motion.div>

          {/* Bottom metadata row */}
          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center gap-6 pt-10 border-t border-anchor-border"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9A8870]">
                Calgary, Alberta, Canada
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9A8870]">
                AB · SK · BC
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9A8870]">
                APEGA · APEGS
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
