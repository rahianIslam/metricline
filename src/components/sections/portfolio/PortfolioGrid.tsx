"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { DIVISIONS } from "@/lib/content";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import type { CaseStudy, Division, DivisionConfig } from "@/types";

// ── Sector labels ─────────────────────────────────────────────
// TODO_CLIENT: confirm final sector labels

const SECTORS = [
  "All",
  "Oil & Gas",
  "Energy Transition",
  "Rail & Bulk Handling",
  "Petrochemical",
  "Industrial",
  "Water & Wastewater",
] as const;

type SectorFilter = (typeof SECTORS)[number];

// ── Placeholder case studies ──────────────────────────────────
// Shown when division = "all" | "projects" AND sector = "All".

const PLACEHOLDER_STUDIES: CaseStudy[] = [
  {
    id: "placeholder-1",
    title: "Project Coming Soon",
    client: "—",
    location: "—",
    year: "—",
    scope: "—",
    sector: "",
    division: "projects",
    description:
      "Additional case studies will be added as projects are completed.",
    highlights: [],
    featured: false,
    imagePlaceholder: true,
  },
  {
    id: "placeholder-2",
    title: "Project Coming Soon",
    client: "—",
    location: "—",
    year: "—",
    scope: "—",
    sector: "",
    division: "projects",
    description:
      "Additional case studies will be added as projects are completed.",
    highlights: [],
    featured: false,
    imagePlaceholder: true,
  },
  {
    id: "placeholder-3",
    title: "Project Coming Soon",
    client: "—",
    location: "—",
    year: "—",
    scope: "—",
    sector: "",
    division: "projects",
    description:
      "Additional case studies will be added as projects are completed.",
    highlights: [],
    featured: false,
    imagePlaceholder: true,
  },
];

// ── Helpers ───────────────────────────────────────────────────

function getDivisionConfig(division: Division): DivisionConfig {
  return DIVISIONS.find((d) => d.slug === division) ?? DIVISIONS[0];
}

function getActiveAccent(activeDivision: Division | "all"): string {
  if (activeDivision === "all") return "#E8742A";
  return getDivisionConfig(activeDivision).accent;
}

// ── Card animation variants ───────────────────────────────────

const cardVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.06,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.18 },
  },
};

// ── Case Study Card ───────────────────────────────────────────

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  isPlaceholder?: boolean;
}

function CaseStudyCard({
  study,
  index,
  isPlaceholder = false,
}: CaseStudyCardProps) {
  const divConfig = getDivisionConfig(study.division);
  const accent = divConfig.accent;

  // ── Placeholder variant ──────────────────────────────────
  if (isPlaceholder) {
    return (
      <motion.div
        layout
        layoutId={study.id}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={index}
        className="flex flex-col rounded-sm border overflow-hidden"
        style={{ backgroundColor: divConfig.card, borderColor: divConfig.border }}
        aria-hidden="true"
      >
        <PlaceholderImage
          aspectRatio="aspect-[4/3]"
          showLabel={false}
          className="rounded-none w-full"
        />
        <div className="flex flex-col flex-1 items-start justify-center p-6 gap-3">
          <div
            className="h-2 rounded-full w-16 opacity-20"
            style={{ backgroundColor: accent }}
          />
          <div className="h-3 rounded-full w-3/4 bg-group-border/50" />
          <div className="h-2.5 rounded-full w-1/2 bg-group-border/30" />
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9A8870] mt-2">
            More projects coming
          </p>
        </div>
      </motion.div>
    );
  }

  // ── Real card ────────────────────────────────────────────
  return (
    <motion.article
      layout
      layoutId={study.id}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={index}
      whileHover={{ y: -2 }}
      transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="group relative flex flex-col rounded-sm border overflow-hidden"
      style={{ backgroundColor: divConfig.card, borderColor: divConfig.border }}
    >
      {/* Left accent border — scales up on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-200 ease-out z-10"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />

      {/* Image area */}
      <div className="relative overflow-hidden">
        <PlaceholderImage
          aspectRatio="aspect-[4/3]"
          showLabel
          label="Project Photo Coming"
          className="rounded-none w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Division badge — top right */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-sm"
          style={{
            backgroundColor: `${accent}18`,
            border: `1px solid ${accent}35`,
          }}
        >
          <span
            className="font-mono text-[11px] tracking-[0.18em] uppercase"
            style={{ color: accent }}
          >
            {divConfig.name.replace("Metricline ", "")}
          </span>
        </div>

        {/* Sector badge — bottom left */}
        {study.sector && (
          <div
            className="absolute bottom-3 left-3 px-2.5 py-1 rounded-sm"
            style={{
              backgroundColor: "rgba(247,244,239,0.85)",
              border: "1px solid rgba(26,21,16,0.12)",
            }}
          >
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-group-textMuted">
              {study.sector}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap font-mono text-[11px] tracking-[0.12em] text-group-textDim uppercase">
          <span>{study.client}</span>
          {study.location !== "—" && (
            <>
              <span className="text-group-textDim">·</span>
              <span>{study.location}</span>
            </>
          )}
          {study.year !== "—" && (
            <>
              <span className="text-group-textDim">·</span>
              <span>{study.year}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-heading-md font-bold text-group-text leading-snug">
          {study.title}
        </h3>

        {/* Scope */}
        {study.scope !== "—" && (
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9A8870]">
            {study.scope}
          </p>
        )}

        {/* Description */}
        <p className="text-body-sm text-group-textMuted leading-[1.6]">
          {study.description}
        </p>

        {/* Highlights */}
        {study.highlights.length > 0 && (
          <ul
            className="flex flex-col gap-2 mt-1"
            aria-label="Project highlights"
          >
            {study.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <ChevronRight
                  size={11}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: accent }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] text-group-textMuted leading-[1.5]">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer CTA */}
        <div
          className="mt-auto pt-4 border-t"
          style={{ borderColor: divConfig.border }}
        >
          <button
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] uppercase group/link transition-all duration-150"
            style={{ color: accent }}
            type="button"
            aria-label={`View details for ${study.title}`}
          >
            <span className="group-hover/link:underline underline-offset-2">
              View details
            </span>
            <ChevronRight
              size={11}
              className="transition-transform duration-150 group-hover/link:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ── Portfolio Grid ────────────────────────────────────────────

interface PortfolioGridProps {
  caseStudies: CaseStudy[];
}

export default function PortfolioGrid({ caseStudies }: PortfolioGridProps) {
  const [activeDivision, setActiveDivision] = useState<Division | "all">("all");
  const [activeSector, setActiveSector] = useState<SectorFilter>("All");

  const currentAccent = getActiveAccent(activeDivision);

  // Filter real case studies by both active division and sector
  const filteredReal = caseStudies.filter(
    (study) =>
      (activeDivision === "all" || study.division === activeDivision) &&
      (activeSector === "All" ||
        study.sector.toLowerCase().includes(activeSector.toLowerCase()))
  );

  // Placeholders only show when division includes "projects" AND sector unfiltered
  const showPlaceholders =
    (activeDivision === "all" || activeDivision === "projects") &&
    activeSector === "All";

  const visibleItems: { study: CaseStudy; isPlaceholder: boolean }[] = [
    ...filteredReal.map((study) => ({ study, isPlaceholder: false })),
    ...(showPlaceholders
      ? PLACEHOLDER_STUDIES.map((study) => ({ study, isPlaceholder: true }))
      : []),
  ];

  const hasContent = visibleItems.length > 0;

  return (
    <section className="pb-32 bg-group-bg" aria-label="Portfolio case studies">

      {/* ── Sticky Filter Bar ──────────────────────────────────── */}
      <div
        className="sticky z-30 border-b border-group-border backdrop-blur-md"
        style={{
          top: "64px",
          backgroundColor: "rgba(247,244,239,0.96)",
        }}
      >
        <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20 py-4 flex flex-col gap-3">

          {/* Division row */}
          <div
            className="flex items-center gap-2 flex-wrap"
            role="group"
            aria-label="Filter by division"
          >
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A8870] mr-2 hidden sm:block"
              aria-hidden="true"
            >
              Division
            </span>

            {/* All */}
            <button
              onClick={() => setActiveDivision("all")}
              className={`px-3.5 py-1.5 rounded-sm font-mono text-[11px] tracking-[0.12em] uppercase transition-all duration-150 border ${
                activeDivision === "all"
                  ? ""
                  : "bg-transparent text-group-textMuted border-group-border hover:text-group-text hover:border-group-border"
              }`}
              style={
                activeDivision === "all"
                  ? {
                      backgroundColor: "#1A1510",
                      color: "#F7F4EF",
                      borderColor: "#1A1510",
                    }
                  : undefined
              }
              aria-pressed={activeDivision === "all"}
            >
              All
            </button>

            {DIVISIONS.map((div) => (
              <button
                key={div.slug}
                onClick={() => setActiveDivision(div.slug)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm font-mono text-[11px] tracking-[0.12em] uppercase transition-all duration-150 border ${
                  activeDivision === div.slug
                    ? ""
                    : "bg-transparent text-group-textMuted border-group-border hover:text-group-text hover:border-group-border"
                }`}
                style={
                  activeDivision === div.slug
                    ? {
                        backgroundColor: div.accent,
                        color: "#1A1510",
                        borderColor: div.accent,
                      }
                    : undefined
                }
                aria-pressed={activeDivision === div.slug}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      activeDivision === div.slug ? "#1A1510" : div.accent,
                  }}
                  aria-hidden="true"
                />
                {div.name.replace("Metricline ", "")}
              </button>
            ))}
          </div>

          {/* Sector row */}
          {/* TODO_CLIENT: confirm final sector labels */}
          <div
            className="flex items-center gap-2 flex-wrap"
            role="group"
            aria-label="Filter by sector"
          >
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A8870] mr-2 hidden sm:block"
              aria-hidden="true"
            >
              Sector
            </span>
            {SECTORS.map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className={`px-3 py-1 rounded-sm font-mono text-[11px] tracking-[0.12em] uppercase transition-all duration-150 border ${
                  activeSector === sector
                    ? ""
                    : "bg-transparent text-group-textMuted border-group-border hover:text-group-text hover:border-group-border"
                }`}
                style={
                  activeSector === sector
                    ? {
                        backgroundColor: currentAccent,
                        color: "#1A1510",
                        borderColor: currentAccent,
                      }
                    : undefined
                }
                aria-pressed={activeSector === sector}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Case Study Grid ────────────────────────────────────── */}
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20 pt-16">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {hasContent ? (
              visibleItems.map(({ study, isPlaceholder }, i) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  index={i}
                  isPlaceholder={isPlaceholder}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-24 gap-4"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentAccent }}
                />
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A8870]">
                  No projects in this category yet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* TODO_CONTENT: Additional case studies — minimum 3 more needed */}
        <p className="mt-10 font-mono text-[11px] tracking-[0.12em] uppercase text-[#9A8870] text-center">
          Additional case studies to be added
        </p>
      </div>
    </section>
  );
}
