// ============================================================
// METRICLINE — JSON-LD Schema Builders
//
// All schema.org structured data for the site.
// Functions return plain objects; JsonLd component serializes.
// ============================================================

import { COMPANY } from "./content";
import type { CaseStudy } from "@/types";

export const BASE_URL = "https://metricline.ca";

// ── Organization (site-wide, used in root layout) ─────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: COMPANY.displayName,
    legalName: COMPANY.legalName,
    url: BASE_URL,
    foundingDate: COMPANY.founded,
    description:
      "Integrated EPCM engineering and construction services for the energy transition, oil & gas, petrochemical, and industrial sectors across Alberta, Saskatchewan, and BC.",
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "Alberta",
      addressCountry: "CA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: COMPANY.email,
      contactType: "customer service",
      areaServed: ["CA-AB", "CA-SK", "CA-BC"],
      availableLanguage: "English",
    },
    areaServed: [
      { "@type": "State", name: "Alberta" },
      { "@type": "State", name: "Saskatchewan" },
      { "@type": "State", name: "British Columbia" },
    ],
    knowsAbout: [
      "EPCM",
      "Engineering",
      "Procurement",
      "Construction Management",
      "Commissioning",
      "Industrial Engineering",
      "Oil and Gas Engineering",
      "Energy Transition",
      "Petrochemical Engineering",
      "Brownfield Modifications",
    ],
    hasCredential: COMPANY.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Engineering Credential",
      name: cert,
    })),
  };
}

// ── WebSite (site-wide, used in root layout) ──────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: COMPANY.displayName,
    description: COMPANY.tagline,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}

// ── Projects division — ProfessionalService ───────────────────

export function projectsServiceSchema(serviceNames: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/projects#service`,
    name: "Metricline Projects",
    url: `${BASE_URL}/projects`,
    description:
      "Full-scope EPCM engineering and construction from concept through commissioning. Serving the energy transition, oil & gas, petrochemical, and industrial sectors.",
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    areaServed: [
      { "@type": "State", name: "Alberta" },
      { "@type": "State", name: "Saskatchewan" },
      { "@type": "State", name: "British Columbia" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "EPCM Services",
      itemListElement: serviceNames.map((name, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${BASE_URL}/#organization` },
        },
      })),
    },
  };
}

// ── Portfolio — ItemList of case studies ──────────────────────

export function portfolioSchema(caseStudies: CaseStudy[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Metricline Project Portfolio",
    description:
      "Engineering, construction, and operations case studies across industrial sectors in Western Canada.",
    url: `${BASE_URL}/portfolio`,
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((study, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: study.title,
        description: study.description,
        dateCreated: String(study.year),
        creator: { "@id": `${BASE_URL}/#organization` },
        about: {
          "@type": "Organization",
          name: study.client,
        },
        locationCreated: {
          "@type": "Place",
          name: study.location,
        },
        keywords: [study.sector, study.division].filter(Boolean).join(", "),
      },
    })),
  };
}
