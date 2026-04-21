"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { HOME_HERO } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";

// ── Hero Image Stack (right panel) ───────────────────────────

function HeroImageStack() {
  return (
    <div className="relative w-full h-full flex items-center">
      {/* Image 1 — large, primary */}
      <motion.div
        className="absolute left-0 top-[10%] w-[72%] shadow-xl"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="overflow-hidden border-l-[3px] border-[#C8832A]">
          <PlaceholderImage
            aspectRatio="aspect-[4/5]"
            showLabel
            label="Site photo coming"
            className="rounded-none"
          />
        </div>
      </motion.div>

      {/* Image 2 — small, offset */}
      <motion.div
        className="absolute right-0 bottom-[12%] w-[52%] shadow-lg"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="overflow-hidden border border-group-border">
          <PlaceholderImage
            aspectRatio="aspect-[3/2]"
            showLabel
            label="Project photo coming"
            className="rounded-none"
          />
        </div>
      </motion.div>

      {/* Decorative vertical orange line */}
      <motion.div
        className="absolute top-8 right-6 w-[2px] h-20 bg-[#C8832A] opacity-40 origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-group-bg pt-16">
      {/* Blueprint grid texture — right-angle grid, reads as engineering drawing */}
      <div
        className="absolute inset-0 pointer-events-none blueprint-grid"
        aria-hidden="true"
      />

      {/* Main content grid */}
      <div className="relative flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto w-full px-6 flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-screen">

            {/* ── Left — Content ─────────────────────────────── */}
            <motion.div
              className="flex flex-col justify-center py-32 lg:py-0 pr-0 lg:pr-16"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Logo mark + wordmark + accent rule + tagline — self-animated */}
              <div className="mb-10">
                <AnimatedLogo showTagline theme="light" delay={0.1} />
              </div>

              {/* Subheading */}
              <motion.p
                variants={fadeUp}
                className="text-body-lg text-group-textMuted max-w-[440px] leading-[1.7] mb-10"
              >
                {HOME_HERO.subheading}
              </motion.p>

              {/* CTA row */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                <Button href={HOME_HERO.ctaPrimary.href} variant="primary" size="lg">
                  {HOME_HERO.ctaPrimary.label}
                </Button>
                <Button href={HOME_HERO.ctaSecondary.href} variant="ghost" context="light" size="lg">
                  {HOME_HERO.ctaSecondary.label}
                </Button>
              </motion.div>

              {/* Credential badges — below CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-8">
                <span className="credential-badge">
                  <span style={{ color: "#C8832A" }}>●</span>
                  APEGA Registered
                </span>
                <span className="credential-badge">
                  <span style={{ color: "#C8832A" }}>●</span>
                  APEGS Registered
                </span>
              </motion.div>
            </motion.div>

            {/* ── Right — image stack ────────────────────────── */}
            <div className="hidden lg:flex items-center justify-center relative border-l border-group-border px-8 overflow-hidden">
              <HeroImageStack />
            </div>
          </div>
        </div>

        {/* ── Bottom orange rule ──────────────────────────── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: "#C8832A", transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
