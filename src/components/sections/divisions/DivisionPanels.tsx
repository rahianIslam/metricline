"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DIVISIONS } from "@/lib/content";
import type { DivisionConfig } from "@/types";

// ── Capability bullets per division ──────────────────────────
const CAPABILITIES: Record<string, string[]> = {
  projects: [
    "Concept Development & FEED",
    "Detailed Engineering",
    "Procurement & Fabrication",
    "Construction Management",
    "Commissioning & Start-Up",
  ],
  rentals: [
    // TODO_CONTENT: Rentals capabilities
    "Industrial Equipment Rental",
    "Fleet Management",
    "Operator Support",
    "On-Site Delivery & Pickup",
    "Alberta · Saskatchewan · BC",
  ],
  operations: [
    // TODO_CONTENT: Operations capabilities
    "Facility Operations Support",
    "Maintenance Management",
    "HSEQ Programs",
    "Shutdown & Turnaround",
    "Regulatory Compliance",
  ],
};

// ── Background texture per panel ─────────────────────────────
function PanelTexture({ accent, patternId }: { accent: string; patternId: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          x="0" y="0"
          width="48" height="48"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(15)"
        >
          <line x1="0" y1="0" x2="0" y2="48" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity="0.018" />
    </svg>
  );
}

// ── Single division panel ─────────────────────────────────────
function DivisionPanel({
  division,
  index,
}: {
  division: DivisionConfig;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const caps = CAPABILITIES[division.slug] ?? [];

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden border-r last:border-r-0"
      style={{
        backgroundColor: division.bg,
        borderColor: division.border,
        minHeight: "100svh",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Line texture */}
      <PanelTexture accent={division.accent} patternId={`tex-${division.slug}`} />

      {/* Accent flood on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ backgroundColor: `${division.accent}0D` }}
        aria-hidden="true"
      />

      {/* Left accent bar — scales in on hover */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-[3px] origin-bottom"
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: division.accent }}
        aria-hidden="true"
      />

      {/* Giant ghost lettermark */}
      <div
        className="absolute inset-0 flex items-end justify-end pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-extrabold leading-none select-none"
          style={{
            fontSize: "clamp(220px, 22vw, 340px)",
            color: division.accent,
            opacity: hovered ? 0.07 : 0.035,
            transition: "opacity 0.35s ease",
            marginRight: "-0.05em",
            marginBottom: "-0.1em",
          }}
        >
          {division.letterMark}
        </span>
      </div>

      {/* Content */}
      <div className="relative flex flex-col h-full px-8 pt-10 pb-12" style={{ minHeight: "100svh" }}>

        {/* Top strip — division identifier */}
        <div className="flex items-center gap-3 mb-auto">
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: division.accent }}
          />
          <span
            className="font-mono text-[11px] tracking-[0.18em] uppercase"
            style={{ color: division.accent }}
          >
            {division.eyebrow}
          </span>
        </div>

        {/* Main content — vertically centered */}
        <div className="flex flex-col justify-center flex-1 py-16">

          {/* Index number */}
          <p
            className="font-mono text-[11px] tracking-[0.2em] uppercase mb-8"
            style={{ color: `${division.accent}60` }}
          >
            0{index + 1} / 03
          </p>

          {/* Division name */}
          <h2
            className="font-extrabold text-group-text tracking-tight leading-[1.0] mb-5"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)", letterSpacing: "-0.025em" }}
          >
            {division.name.replace("Metricline ", "")}
          </h2>

          {/* Tagline */}
          <p
            className="text-body-md leading-[1.6] mb-10 max-w-[260px]"
            style={{ color: division.textMuted }}
          >
            {division.tagline}
          </p>

          {/* Thin rule */}
          <div
            className="w-10 h-px mb-10"
            style={{ backgroundColor: division.accent }}
          />

          {/* Capabilities list */}
          <ul className="space-y-3 mb-12">
            {caps.map((cap) => (
              <li
                key={cap}
                className="flex items-start gap-3 text-body-sm"
                style={{ color: division.textMuted }}
              >
                <span
                  className="flex-shrink-0 mt-[5px] w-1 h-1 rounded-full"
                  style={{ backgroundColor: `${division.accent}80` }}
                />
                {cap}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={`/${division.slug}`}
            className="group inline-flex items-center gap-2 font-semibold text-[13px] tracking-wide transition-all duration-200"
            style={{ color: division.accent }}
          >
            <span>Explore {division.name.replace("Metricline ", "")}</span>
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Bottom — domain URL */}
        <div className="mt-auto">
          <p
            className="font-mono text-[11px] tracking-[0.12em] uppercase"
            style={{ color: `${division.accent}40` }}
          >
            metricline.ca/{division.slug}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Divisions page header ─────────────────────────────────────
function DivisionsHeader() {
  return (
    <div className="relative bg-group-bg border-b border-group-border overflow-hidden">
      {/* Blueprint grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="div-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1A1510" strokeWidth="0.4" strokeOpacity="0.06" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#div-grid)" />
      </svg>

      <motion.div
        className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-28"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-label uppercase tracking-[0.15em] text-[#9A8870] mb-6">
          Metricline Group of Industries
        </p>
        <h1
          className="font-extrabold text-group-text tracking-tight leading-[1.0] mb-6"
          style={{ fontSize: "clamp(44px, 6vw, 80px)", letterSpacing: "-0.03em" }}
        >
          Three divisions.
          <span className="text-group-textMuted"> One group.</span>
        </h1>
        <p className="text-body-lg text-group-textMuted max-w-[520px] leading-[1.7]">
          Engineering, equipment, and operations — each division purpose-built for its market,
          all sharing the same commitment to execution.
        </p>
      </motion.div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function DivisionPanels() {
  return (
    <>
      <DivisionsHeader />
      {/* Three panels — desktop: side by side. Mobile: stacked. */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {DIVISIONS.map((div, i) => (
          <DivisionPanel key={div.slug} division={div} index={i} />
        ))}
      </div>
    </>
  );
}
