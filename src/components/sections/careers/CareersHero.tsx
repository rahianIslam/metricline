"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";

// ── Angled stripe texture ─────────────────────────────────────
function StripeTexture() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="careers-stripes"
            x="0" y="0"
            width="80" height="80"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-25)"
          >
            <line x1="0" y1="0" x2="0" y2="80" stroke="#1A1510" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#careers-stripes)" opacity="0.02" />
      </svg>
    </div>
  );
}

export default function CareersHero() {
  return (
    <section className="relative bg-group-bg border-b border-group-border overflow-hidden py-28 md:py-36">
      <StripeTexture />

      {/* Ghost "CAREERS" watermark — vertical, right side */}
      <div
        className="absolute right-8 top-0 bottom-0 flex items-center pointer-events-none select-none"
        aria-hidden="true"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <span
          className="font-extrabold text-group-text leading-none"
          style={{ fontSize: "clamp(80px, 12vw, 160px)", opacity: 0.04, letterSpacing: "0.08em" }}
        >
          CAREERS
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[680px]"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-label uppercase tracking-[0.15em] text-[#9A8870] mb-7"
          >
            Join the Team
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-group-text tracking-tight leading-[1.0] mb-7"
            style={{ fontSize: "clamp(44px, 6.5vw, 88px)", letterSpacing: "-0.03em" }}
          >
            Build something{" "}
            <span
              className="block"
              style={{ color: "rgba(26,21,16,0.30)" }}
            >
              that lasts.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-body-lg text-group-textMuted leading-[1.7] mb-10 max-w-[540px]"
          >
            {/* TODO_CONTENT: Why work at Metricline paragraph */}
            We're a team of engineers, builders, and problem solvers building something real.
            If you want to work on challenging industrial projects with people who take
            accountability seriously, we'd like to hear from you.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <Button href="#open-roles" variant="primary" size="lg">
              View Open Roles
            </Button>
            <Button href={`mailto:${COMPANY.email}`} variant="ghost" size="lg">
              Send Your Resume
            </Button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center gap-8 pt-8 border-t border-group-border"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-1">Team size</p>
              <p className="text-body-sm text-group-text">15 people</p>
            </div>
            <div className="w-px h-8 bg-group-border" aria-hidden="true" />
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-1">Location</p>
              <p className="text-body-sm text-group-text">Calgary, AB</p>
            </div>
            <div className="w-px h-8 bg-group-border" aria-hidden="true" />
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9A8870] mb-1">Sectors</p>
              <p className="text-body-sm text-group-text">Engineering · Construction · Ops</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
