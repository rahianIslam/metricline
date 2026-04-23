"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { PROJECTS_SERVICES, DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import type { Service } from "@/types";

const division = DIVISIONS[0];
const ACCENT = division.accent; // #E8742A

// ── Service Icons ─────────────────────────────────────────────
// Each icon is a unique monoline SVG. Industrial, precise, minimal.

const SERVICE_ICONS: React.FC<{ color: string }>[] = [
  // 1. Concept Development — diamond with radiating lines
  ({ color }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="10" y="10" width="12" height="12" transform="rotate(45 16 16)" stroke={color} strokeWidth="1.2" />
      <line x1="16" y1="2"  x2="16" y2="7"  stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="25" x2="16" y2="30" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2"  y1="16" x2="7"  y2="16" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="25" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  // 2. Pre-FEED — funnel / narrowing trapezoid
  ({ color }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 6 L28 6 L20 16 L20 28 L12 28 L12 16 Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="12" y1="20" x2="20" y2="20" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  ),
  // 3. FEED — stacked horizontal layers
  ({ color }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4"  y="6"  width="24" height="5" rx="1" stroke={color} strokeWidth="1.2" />
      <rect x="4"  y="14" width="24" height="5" rx="1" stroke={color} strokeWidth="1.2" />
      <rect x="4"  y="22" width="24" height="5" rx="1" stroke={color} strokeWidth="1.2" />
      <line x1="9"  y1="8.5"  x2="23" y2="8.5"  stroke={color} strokeWidth="0.7" strokeOpacity="0.4" />
    </svg>
  ),
  // 4. Detailed Engineering — crosshair with square border
  ({ color }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="1" stroke={color} strokeWidth="1.2" />
      <line x1="16" y1="4"  x2="16" y2="28" stroke={color} strokeWidth="1" />
      <line x1="4"  y1="16" x2="28" y2="16" stroke={color} strokeWidth="1" />
      <circle cx="16" cy="16" r="3.5" stroke={color} strokeWidth="1.2" />
    </svg>
  ),
  // 5. Procurement Support — hexagon
  ({ color }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon points="16,3 27,9 27,23 16,29 5,23 5,9" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="16" y1="3"  x2="16" y2="10" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="16" y1="22" x2="16" y2="29" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
      <circle cx="16" cy="16" r="2" fill={color} />
    </svg>
  ),
  // 6. Fabrication & Equipment — L-bracket / angle iron
  ({ color }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 6 L6 26 L26 26" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11 L14 11" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M6 16 L14 16" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M6 21 L14 21" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M19 26 L19 18" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M23 26 L23 18" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  ),
  // 7. Construction Management — hard hat / triangular roof + base
  ({ color }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 20 Q6 10 16 8 Q26 10 26 20 Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="4" y="20" width="24" height="4" rx="1" stroke={color} strokeWidth="1.2" />
      <line x1="16" y1="8" x2="16" y2="4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="4" x2="18" y2="4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  // 8. Commissioning & Start-Up — circle with spark / forward arrow
  ({ color }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="1.2" />
      <path d="M13 11 L21 16 L13 21 Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M16 5 L16 3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M25.5 8.5 L27 7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M27 16 L29 16" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  // 9. Brownfield Modifications — two overlapping circles with link
  ({ color }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="11" cy="16" r="8" stroke={color} strokeWidth="1.2" />
      <circle cx="21" cy="16" r="8" stroke={color} strokeWidth="1.2" />
      <line x1="11" y1="16" x2="21" y2="16" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11" cy="16" r="2" fill={color} fillOpacity="0.4" />
      <circle cx="21" cy="16" r="2" fill={color} fillOpacity="0.4" />
    </svg>
  ),
];

// ── Service Card ──────────────────────────────────────────────

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = SERVICE_ICONS[index] ?? SERVICE_ICONS[0];

  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col p-6 rounded-sm border transition-colors duration-200 overflow-hidden"
      style={{
        backgroundColor: division.card,
        borderColor: division.border,
      }}
    >
      {/* Top line draw on hover — engineering precision signal */}
      <div
        className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ backgroundColor: ACCENT }}
        aria-hidden="true"
      />

      {/* Left accent border — appears on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundColor: ACCENT }}
        aria-hidden="true"
      />

      {/* Background lift on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundColor: division.surface }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative flex flex-col flex-1 gap-4">
        {/* Icon */}
        <div className="w-8 h-8 flex-shrink-0">
          <Icon color={ACCENT} />
        </div>

        {/* Service name */}
        <h3 className="font-display text-heading-sm font-bold text-projects-text leading-snug">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-body-sm text-projects-textMuted leading-[1.6]">
          {service.description}
        </p>

        {/* Deliverable footer — answers "what do I get?" */}
        <div className="mt-auto pt-4 border-t border-projects-border">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#9A8870]">
            <span className="text-[#9A8870] mr-1">Deliverable:</span>
            {service.deliverable}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── ServicesList ──────────────────────────────────────────────

export default function ServicesList() {
  const { ref, inView } = useInView();

  return (
    <section
      id="services"
      className="py-24 md:py-36"
      style={{ backgroundColor: division.bg }}
      aria-label="Our services"
    >
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <SectionLabel color="projects" className="mb-4">
            Our Services
          </SectionLabel>
          <h2
            className="font-bold text-projects-text tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            Full-scope project delivery
          </h2>
          <p className="text-body-lg text-projects-textMuted leading-[1.7]">
            From pre-FEED through start-up —{" "}
            <span className="text-projects-text">we own the scope.</span>
          </p>
        </div>

        {/* Services grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {PROJECTS_SERVICES.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
