// ============================================================
// METRICLINE — Sanity Client & Data Fetching
//
// Env vars required (add to .env.local):
//   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
//   NEXT_PUBLIC_SANITY_DATASET=production
//
// All fetch functions fall back to static content from
// lib/content.ts when env vars are absent — meaning the site
// builds and runs correctly without Sanity credentials.
// ============================================================

import { createClient } from "@sanity/client";
import { createImageUrlBuilder as imageUrlBuilder } from "@sanity/image-url";
// SanityImageSource is not exported from @sanity/image-url v2 root —
// use a local alias that covers all valid inputs the builder accepts.
type SanityImageSource =
  | string
  | { _ref: string }
  | { asset: { _ref: string } | { url: string } }
  | { url: string };
import {
  CASE_STUDIES,
  LEADERSHIP,
} from "./content";
import type { CaseStudy, TeamMember, EquipmentItem, OpenRole, Division } from "@/types";

// ── Client ────────────────────────────────────────────────────

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

// ── Image URL builder ─────────────────────────────────────────

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource): string {
  return builder.image(source).auto("format").url();
}

export function urlForSize(
  source: SanityImageSource,
  width: number,
  height?: number
): string {
  const b = builder.image(source).auto("format").width(width);
  return height ? b.height(height).url() : b.url();
}

// ── Sanity connected? ─────────────────────────────────────────

function isSanityConfigured(): boolean {
  return Boolean(
    projectId &&
      projectId !== "placeholder" &&
      projectId.length > 0
  );
}

// ── GROQ Queries ──────────────────────────────────────────────

/** All active case studies, featured first */
const CASE_STUDIES_QUERY = `
  *[_type == "caseStudy"] | order(featured desc, _createdAt desc) {
    "id": _id,
    title,
    client,
    location,
    year,
    "scope": scopeType,
    sector,
    "division": division,
    description,
    highlights,
    featured,
    "imageUrl": photos[0].asset->url
  }
`;

/** All active team members, ordered by display order */
const TEAM_MEMBERS_QUERY = `
  *[_type == "teamMember" && active == true] | order(order asc) {
    "name": name,
    title,
    bio,
    "initials": upper(array::join(string::split(name, " ")[0..1][].upper()[0], "")),
    "imageUrl": photo.asset->url
  }
`;

/** All available equipment */
const EQUIPMENT_QUERY = `
  *[_type == "equipment" && available == true] | order(category asc, name asc) {
    "id": _id,
    name,
    category,
    spec,
    "imageUrl": photos[0].asset->url
  }
`;

/** All active open roles */
const OPEN_ROLES_QUERY = `
  *[_type == "openRole" && active == true] | order(_createdAt desc) {
    title,
    "division": division,
    location,
    description,
    applyUrl
  }
`;

// ── Fetch helpers ─────────────────────────────────────────────

async function safeFetch<T>(query: string): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query);
  } catch (err) {
    console.warn("[Sanity] Fetch failed, using static fallback:", err);
    return null;
  }
}

// ── Public fetch functions ────────────────────────────────────

/** Returns case studies from Sanity, or static fallback if not configured. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isSanityConfigured()) return CASE_STUDIES;

  const data = await safeFetch<CaseStudy[]>(CASE_STUDIES_QUERY);
  if (!data || data.length === 0) return CASE_STUDIES;

  // Validate division field is a known value
  return data
    .filter((s) =>
      ["projects", "rentals", "operations"].includes(s.division)
    )
    .map((s) => ({
      ...s,
      division: s.division as Division,
      imagePlaceholder: !s.imageUrl ? (true as const) : undefined,
    }));
}

/** Returns team members from Sanity, or static fallback if not configured. */
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!isSanityConfigured()) return LEADERSHIP;

  const data = await safeFetch<TeamMember[]>(TEAM_MEMBERS_QUERY);
  if (!data || data.length === 0) return LEADERSHIP;

  return data.map((m) => ({
    ...m,
    photoPlaceholder: !m.imageUrl ? (true as const) : undefined,
  }));
}

/** Returns equipment from Sanity, or an empty array if not configured. */
export async function getEquipment(): Promise<EquipmentItem[]> {
  if (!isSanityConfigured()) return [];

  const data = await safeFetch<EquipmentItem[]>(EQUIPMENT_QUERY);
  return data ?? [];
}

/** Returns open roles from Sanity, or an empty array if not configured. */
export async function getOpenRoles(): Promise<OpenRole[]> {
  if (!isSanityConfigured()) return [];

  const data = await safeFetch<OpenRole[]>(OPEN_ROLES_QUERY);
  return data ?? [];
}
