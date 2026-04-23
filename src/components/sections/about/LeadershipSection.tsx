"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import type { TeamMember } from "@/types";

interface LeadershipSectionProps {
  members: TeamMember[];
}
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

export default function LeadershipSection({ members }: LeadershipSectionProps) {
  const { ref, inView } = useInView();

  return (
    <section
      className="bg-group-surface border-t border-group-border py-24 md:py-32"
      aria-label="Leadership"
    >
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">
        {/* Header */}
        <div className="mb-14">
          <SectionLabel className="mb-4">Leadership</SectionLabel>
          <h2 className="font-display text-display-md font-bold text-group-text tracking-tight">
            The people{" "}
            <span className="text-group-textMuted">behind the work.</span>
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-4"
        >
          {members.map((person) => (
            <motion.article
              key={person.name}
              variants={fadeUp}
              className="group relative overflow-hidden border-l-4 border-[#E8742A] bg-group-card border-t border-r border-b border-group-border rounded-r-sm"
            >
              {/* Subtle orange background wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(232,116,42,0.04) 0%, transparent 40%)",
                }}
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-0">

                {/* ── Left: Initials avatar ────────────────── */}
                <div className="md:w-48 flex items-stretch">
                  <div className="w-full flex flex-col items-center justify-center p-10 border-r border-group-border bg-group-bg">
                    {/* TODO_ASSET: headshot — using initials avatar */}
                    <div className="relative w-20 h-20 rounded-sm bg-group-bg border border-group-border flex items-center justify-center mb-4">
                      {/* Ghost initial behind */}
                      <span
                        className="absolute font-extrabold text-[#E8742A]/10 leading-none select-none"
                        style={{ fontSize: "72px" }}
                        aria-hidden="true"
                      >
                        {person.initials[0]}
                      </span>
                      {/* Initials */}
                      <span className="relative font-mono text-[18px] font-bold tracking-[0.1em] text-group-text">
                        {person.initials}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A8870] text-center">
                      Photo coming
                    </span>
                  </div>
                </div>

                {/* ── Right: Bio ──────────────────────────── */}
                <div className="p-10 flex flex-col gap-5">
                  {/* Name + title */}
                  <div className="flex flex-col gap-1.5 pb-5 border-b border-group-border">
                    <h3 className="font-display text-heading-md font-bold text-group-text">
                      {person.name}
                    </h3>
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#E8742A]/80">
                      {person.title}
                    </p>
                  </div>

                  {/* Bio — first sentence pulled out */}
                  {(() => {
                    const breakAt = person.bio.indexOf(". ");
                    const lead =
                      breakAt > -1
                        ? person.bio.slice(0, breakAt + 1)
                        : person.bio;
                    const rest =
                      breakAt > -1 ? person.bio.slice(breakAt + 2) : "";
                    return (
                      <div className="flex flex-col gap-3">
                        <p className="text-[16px] font-medium text-group-text leading-[1.65]">
                          {lead}
                        </p>
                        {rest && (
                          <p className="text-body-md text-group-textMuted leading-[1.7]">
                            {rest}
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </motion.article>
          ))}

          {/* More coming placeholder */}
          <motion.div
            variants={fadeUp}
            className="border border-dashed border-group-border rounded-sm px-8 py-6 flex items-center gap-3 opacity-40"
            aria-hidden="true"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8742A]" />
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#9A8870] italic">
              Additional team members to be added
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
