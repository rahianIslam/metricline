"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { DIVISIONS } from "@/lib/content";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";

const division = DIVISIONS[1]; // Rentals

// ── TODO_CONTENT: Equipment categories and items ──────────────
// These are placeholder categories. Replace with real data when provided.

const CATEGORIES = [
  "All",
  "Lifting & Rigging",    // TODO_CONTENT: confirm category names
  "Material Handling",
  "Power Generation",
  "Compressors",
  "Site Support",
] as const;

type Category = (typeof CATEGORIES)[number];

interface EquipmentCard {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  spec: string; // key spec line
}

// TODO_CONTENT: Replace with real equipment catalog
const EQUIPMENT: EquipmentCard[] = [
  { id: "eq-01", name: "Mobile Crane", category: "Lifting & Rigging", spec: "50T capacity · hydraulic" },
  { id: "eq-02", name: "Aerial Work Platform", category: "Lifting & Rigging", spec: "40ft reach · articulating boom" },
  { id: "eq-03", name: "Forklift — Industrial", category: "Material Handling", spec: "5T capacity · all-terrain" },
  { id: "eq-04", name: "Telehandler", category: "Material Handling", spec: "3T · 10m reach" },
  { id: "eq-05", name: "Diesel Generator", category: "Power Generation", spec: "250 kVA · soundproofed" },
  { id: "eq-06", name: "Light Tower", category: "Power Generation", spec: "4 × 1000W · 360° coverage" },
  { id: "eq-07", name: "Reciprocating Compressor", category: "Compressors", spec: "200 CFM · skid-mounted" },
  { id: "eq-08", name: "Portable Air Compressor", category: "Compressors", spec: "185 CFM · diesel" },
  { id: "eq-09", name: "Temporary Accommodation", category: "Site Support", spec: "20-person sleeper unit" },
  { id: "eq-10", name: "Site Office Trailer", category: "Site Support", spec: "24ft · furnished" },
  { id: "eq-11", name: "Rigging Skid", category: "Lifting & Rigging", spec: "Custom load spreader beams" },
  { id: "eq-12", name: "Personnel Carrier", category: "Site Support", spec: "4×4 · 8-seat crew cab" },
];

// ── Equipment card ────────────────────────────────────────────
function EquipCard({ item, index }: { item: EquipmentCard; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-sm border"
      style={{
        backgroundColor: division.card,
        borderColor: hovered ? `${division.accent}50` : division.border,
        transition: "border-color 0.25s ease",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Left border flash */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-[2px] origin-bottom"
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: division.accent }}
        aria-hidden="true"
      />

      {/* Image area */}
      <div className="relative">
        <PlaceholderImage
          aspectRatio="aspect-[4/3]"
          showLabel={false}
          className="rounded-none"
        />
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 font-mono text-[11px] tracking-[0.18em] uppercase px-2 py-1 rounded-sm"
          style={{
            backgroundColor: `${division.accent}18`,
            color: division.accent,
            border: `1px solid ${division.accent}30`,
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        {/* Equipment name */}
        <h3
          className="font-semibold text-group-text text-heading-sm mb-2 leading-[1.3]"
        >
          {item.name}
        </h3>

        {/* Key spec */}
        <p
          className="font-mono text-[11px] tracking-[0.08em] mb-4"
          style={{ color: `${division.accent}80` }}
        >
          {item.spec}
        </p>

        {/* TODO_CONTENT: Equipment description */}
        <p className="text-body-sm text-group-textMuted leading-[1.5] flex-1 mb-5">
          Industrial-grade equipment maintained to manufacturer specifications.
          Available for short and long-term rental with optional operator support.
        </p>

        {/* Request quote CTA */}
        <a
          href="#quote"
          className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wide transition-colors duration-200"
          style={{ color: division.accent }}
        >
          <span>Request Quote</span>
          <ArrowRight size={12} strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2 rounded-sm transition-all duration-200 border"
            style={{
              backgroundColor: isActive ? division.accent : "transparent",
              color: isActive ? "#1A1510" : "#6B6257",
              borderColor: isActive ? division.accent : "#DDD7CE",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────
export default function EquipmentCatalog() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { ref, inView } = useInView();

  const filtered =
    activeCategory === "All"
      ? EQUIPMENT
      : EQUIPMENT.filter((e) => e.category === activeCategory);

  return (
    <section
      id="catalog"
      className="py-24 md:py-32 border-t"
      style={{ backgroundColor: division.bg, borderColor: division.border }}
      aria-label="Equipment catalog"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel color="rentals" className="mb-4">Equipment Catalog</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2
                className="font-bold text-group-text leading-[1.1] tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                The right equipment,{" "}
                <span className="text-[#9A8870]">on site.</span>
              </h2>
            </div>
            <p className="text-body-sm max-w-xs md:text-right leading-relaxed" style={{ color: division.textMuted }}>
              {/* TODO_CONTENT: Equipment catalog description */}
              All units maintained to OEM standards. Delivery and operator
              support available across Western Canada.
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div variants={fadeUp}>
            <FilterBar active={activeCategory} onChange={setActiveCategory} />
          </motion.div>
        </motion.div>

        {/* Equipment grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((item, i) => (
              <EquipCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* TODO_CONTENT: note about catalog completeness */}
        <div
          className="mt-10 flex items-center gap-3 px-5 py-4 rounded-sm border border-dashed"
          style={{ borderColor: `${division.accent}30` }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: division.accent }}
          />
          <p className="font-mono text-[11px] tracking-[0.08em] italic" style={{ color: `${division.accent}70` }}>
            Full catalog in development — contact us for specific equipment availability and specifications.
          </p>
        </div>
      </div>
    </section>
  );
}
