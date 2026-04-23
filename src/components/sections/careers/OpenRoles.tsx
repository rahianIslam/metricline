"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import { Inbox } from "lucide-react";
import type { OpenRole } from "@/types";

// TODO_CONTENT: Replace with real open roles when available
const OPEN_ROLES: OpenRole[] = [
  // intentionally empty — placeholder state
];

// Division badge styling
const DIVISION_COLORS: Record<string, string> = {
  projects: "#E8742A",
  rentals: "#F5C30A",
  operations: "#1FC87A",
};

function RoleCard({ role }: { role: OpenRole }) {
  const accentColor = DIVISION_COLORS[role.division] ?? "#E8742A";
  return (
    <div
      className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-7 rounded-sm border hover:border-[#3B3026] transition-all duration-200"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#DDD7CE" }}
    >
      {/* Left border flash on hover */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-heading-sm font-bold text-group-text">{role.title}</h3>
          <span
            className="font-mono text-[11px] tracking-[0.18em] uppercase px-2 py-1 rounded-sm"
            style={{
              backgroundColor: `${accentColor}18`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
            }}
          >
            {role.division}
          </span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#9A8870]">{role.location}</p>
        <p className="text-body-sm text-[#9A8870] leading-[1.6] max-w-[480px]">{role.description}</p>
      </div>
      <div className="flex-shrink-0">
        <Button href={role.applyUrl} variant="ghost" size="md">
          Apply
        </Button>
      </div>
    </div>
  );
}

// ── Empty state — designed, not broken ───────────────────────
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center py-20 px-8 rounded-sm border border-dashed border-group-border"
      style={{ backgroundColor: "#F7F4EF" }}
    >
      {/* Icon */}
      <div
        className="mb-6 p-4 rounded-full border border-group-border"
        style={{ backgroundColor: "#EFEBE4" }}
      >
        <Inbox size={28} strokeWidth={1.5} className="text-[#9A8870]" />
      </div>

      <h3 className="font-display text-heading-sm font-bold text-group-text mb-3">
        No current openings
      </h3>
      <p className="text-body-sm text-[#9A8870] leading-[1.6] max-w-[360px] mb-8">
        We don't have any listed roles right now, but we're always interested
        in meeting strong engineers, project managers, and field professionals.
      </p>

      {/* Resume CTA */}
      <div
        className="w-full max-w-md flex flex-col sm:flex-row items-center gap-4 p-6 rounded-sm border"
        style={{ backgroundColor: "#EFEBE4", borderColor: "#DDD7CE" }}
      >
        <div className="flex-1 text-left">
          <p className="text-body-sm font-semibold text-group-text mb-1">Send your resume</p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-[#9A8870]">
            {/* TODO_CLIENT: careers email address */}
            {COMPANY.email}
          </p>
        </div>
        <a
          href={`mailto:${COMPANY.email}?subject=Resume%20—%20Metricline%20Group`}
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-[13px] tracking-wide bg-group-text text-anchor-text hover:bg-group-text/90 transition-colors duration-200"
        >
          Get in Touch
        </a>
      </div>
    </motion.div>
  );
}

export default function OpenRoles() {
  const { ref, inView } = useInView();

  return (
    <section
      id="open-roles"
      className="py-24 md:py-32 bg-group-bg border-t border-group-border"
      aria-label="Open roles"
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
            <SectionLabel className="mb-4">Open Roles</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-bold text-group-text leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              Current opportunities.
            </h2>
            <p className="text-body-sm max-w-xs md:text-right leading-relaxed text-[#9A8870]">
              We hire for attitude and grow capability. If you're driven, accountable,
              and curious — there's a place for you here.
            </p>
          </motion.div>
        </motion.div>

        {OPEN_ROLES.length > 0 ? (
          <div className="space-y-3">
            {OPEN_ROLES.map((role) => (
              <RoleCard key={`${role.title}-${role.division}`} role={role} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
