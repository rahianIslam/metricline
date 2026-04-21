// ============================================================
// METRICLINE — Shared TypeScript Types
// ============================================================

export type Division = "projects" | "rentals" | "operations";

export interface DivisionConfig {
  name: string;
  slug: Division;
  displayName: string;
  tagline: string;
  eyebrow: string;
  accent: string;
  accentHover: string;
  bg: string;
  surface: string;
  card: string;
  border: string;
  textMuted: string;
  letterMark: string;
}

export interface StatItem {
  /** Display value, e.g. "4", "$20M+", "15" */
  value: string;
  label: string;
  /** Raw number used by the count-up animation. Pass -1 to skip animation. */
  numericValue: number;
  suffix?: string;
  prefix?: string;
}

export interface Service {
  name: string;
  description: string;
  iconLabel?: string;
  deliverable: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  year: string;
  scope: string;
  sector: string;
  division: Division;
  description: string;
  highlights: string[];
  featured: boolean;
  /** e.g. "Confidential" or "$2.4M" when permitted */
  projectValue?: string;
  /** e.g. "14 months" or "Ongoing" */
  scopeDuration?: string;
  /** Populated by Sanity fetch when a photo exists */
  imageUrl?: string;
  /** True when no real photo is available (static fallback state) */
  imagePlaceholder?: true;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  initials: string;
  /** Populated by Sanity fetch when a headshot exists */
  imageUrl?: string;
  /** True when no real headshot is available (static fallback state) */
  photoPlaceholder?: true;
}

export interface Value {
  name: string;
  description: string;
}

export interface Differentiator {
  number: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  /** One-line key specification, e.g. "50T capacity · hydraulic" */
  spec?: string;
  /** Populated by Sanity fetch when a photo exists */
  imageUrl?: string;
  /** True when no real photo is available (static fallback state) */
  imagePlaceholder?: true;
}

export interface OpenRole {
  title: string;
  division: Division;
  location: string;
  description: string;
  applyUrl: string;
}

export interface Industry {
  name: string;
  description: string;
}
