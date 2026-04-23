// ============================================================
// METRICLINE — Static Site Content
// All copy lives here. Components import from this file only.
// TODO_CONTENT items are clearly marked.
// ============================================================

import type {
  StatItem,
  Service,
  CaseStudy,
  TeamMember,
  Value,
  Differentiator,
  DivisionConfig,
  Industry,
} from "@/types";

// ── Company ──────────────────────────────────────────────────

export const COMPANY = {
  legalName: "Metricline Projects Ltd.",
  displayName: "Metricline Group of Industries",
  shortName: "Metricline",
  tagline: "Where engineering meets execution, and projects get delivered right.",
  founded: "2022",
  hq: "Calgary, AB, Canada",
  regions: ["Alberta", "Saskatchewan", "BC"],
  certifications: ["APEGA", "APEGS"],
  // TODO_CLIENT: Primary email — using assumed address until confirmed
  email: "info@metricline.ca",
  // TODO_CLIENT: Business phone number
  phone: null as string | null,
  // TODO_CLIENT: Full office address — city known
  address: "Calgary, Alberta, Canada",
  // TODO_CLIENT: LinkedIn company page URL
  linkedin: null as string | null,
  // TODO_CLIENT: Domain confirmed as metricline.ca
  domain: "metricline.ca",
} as const;

// ── Hero ─────────────────────────────────────────────────────

export const HOME_HERO = {
  eyebrow: "METRICLINE GROUP OF INDUSTRIES",
  headline: "Engineering, Procurement, Construction, and Management — Delivered End-to-End",
  subheading:
    "Metricline Group delivers integrated engineering and construction services across industrial sectors. We take projects from early concept through execution and start-up with a focus on practical, fit-for-purpose solutions.",
  ctaPrimary: { label: "Explore Our Divisions", href: "/divisions" },
  ctaSecondary: { label: "Get in Touch", href: "/contact" },
} as const;

// ── Stats ─────────────────────────────────────────────────────

export const HOME_STATS: StatItem[] = [
  {
    value: "4",
    label: "Years in\noperation",
    numericValue: 4,
  },
  {
    value: "$20M+",
    label: "Total project value\ndelivered",
    numericValue: 20,
    prefix: "$",
    suffix: "M+",
  },
  {
    value: "15",
    label: "Team members across\nall disciplines",
    numericValue: 15,
  },
  {
    value: "3",
    label: "Provinces: AB\u00b7SK\u00b7BC",
    numericValue: 3,
  },
];

// ── Divisions ─────────────────────────────────────────────────

export const DIVISIONS: DivisionConfig[] = [
  {
    name: "Metricline Projects",
    slug: "projects",
    displayName: "METRICLINE PROJECTS",
    eyebrow: "ENGINEERING & CONSTRUCTION",
    tagline: "Full-scope EPCM from concept through commissioning.",
    accent: "#C8832A",
    accentHover: "#D99440",
    bg: "#F4F7FA",
    surface: "#EBF0F5",
    card: "#FFFFFF",
    border: "#D4DDE8",
    textMuted: "#5A6E82",
    letterMark: "P",
  },
  {
    name: "Metricline Rentals",
    slug: "rentals",
    displayName: "METRICLINE RENTALS",
    // TODO_CONTENT: Rentals division tagline
    eyebrow: "EQUIPMENT & FLEET",
    tagline: "Industrial equipment rental across Western Canada.",
    accent: "#F0A820",
    accentHover: "#F7B831",
    bg: "#FAFAF5",
    surface: "#F3F1E8",
    card: "#FFFFFF",
    border: "#E5E0D2",
    textMuted: "#6B6257",
    letterMark: "R",
  },
  {
    name: "Metricline Operations",
    slug: "operations",
    displayName: "METRICLINE OPERATIONS",
    // TODO_CONTENT: Operations division tagline
    eyebrow: "OPERATIONS & MAINTENANCE",
    tagline: "Reliable operations support for industrial facilities.",
    accent: "#1FC87A",
    accentHover: "#35D48A",
    bg: "#F2FAF6",
    surface: "#E8F5EE",
    card: "#FFFFFF",
    border: "#C8E8D4",
    textMuted: "#2D6B4E",
    letterMark: "O",
  },
];

// ── Projects Division Services ────────────────────────────────

export const PROJECTS_SERVICES: Service[] = [
  {
    name: "Concept Development & Business Case",
    description:
      "Early-stage feasibility, scope definition, and business case development to de-risk investment decisions before committing to detailed engineering.",
    deliverable: "Option screening report, conceptual cost estimate, project charter",
  },
  {
    name: "Pre-FEED (Preliminary Engineering)",
    description:
      "Preliminary engineering studies that define project scope, execution strategy, and budget class estimates to support project sanctioning.",
    deliverable: "P&IDs (preliminary), basis of design, ±30% cost estimate",
  },
  {
    name: "FEED (Front-End Engineering Design)",
    description:
      "Detailed definition of project scope, specifications, and cost basis — providing the foundation for accurate procurement and construction planning.",
    deliverable: "IFD drawing set, equipment list, ±15% cost estimate",
  },
  {
    name: "Detailed Engineering",
    description:
      "Full multi-discipline engineering deliverables including process, mechanical, civil, structural, electrical, and instrumentation design packages.",
    deliverable: "IFC drawing set, specifications, data sheets",
  },
  {
    name: "Procurement Support",
    description:
      "Vendor pre-qualification, technical bid packages, bid evaluation, purchase order management, and expediting through delivery.",
    deliverable: "Bid tabulation, purchase orders, expediting reports",
  },
  {
    name: "Fabrication & Equipment Supply",
    description:
      "In-house fabrication capability and equipment supply for skids, pressure vessels, piping assemblies, and specialized industrial equipment.",
    deliverable: "Fabricated assemblies, equipment packages, MDRs",
  },
  {
    name: "Construction Management",
    description:
      "On-site construction management, contractor oversight, schedule tracking, and quality assurance through mechanical completion.",
    deliverable: "Construction progress reports, RFI log, turnover packages",
  },
  {
    name: "Commissioning & Start-Up",
    description:
      "Systematic pre-commissioning, commissioning, and start-up support ensuring safe and reliable handover to operations.",
    deliverable: "Commissioning records, as-built drawings, operating procedures",
  },
  {
    name: "Brownfield Modifications & Tie-Ins",
    description:
      "Modifications and tie-ins within live facilities, with a focus on safety, operational continuity, and minimal downtime.",
    deliverable: "MOC documentation, tie-in packages, redlined as-builts",
  },
];

// ── Case Studies ──────────────────────────────────────────────

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "remelter-heartland",
    title: "Remelter Detailed Design",
    client: "Heartland Sulphur",
    location: "Fort Saskatchewan, AB",
    year: "2025–2026",
    scope: "Detailed Engineering & Procurement, Construction Support",
    sector: "Oil & Gas / Sulphur Processing",
    division: "projects",
    description:
      "The project involved redesigning the remelting system after the original FEED was found to be undersized and operationally constrained. Metricline developed a new 1,000 MTPD remelter integrated with the existing 500 MTPD unit, while also planning for future expansion.",
    highlights: [
      "Increased total installed remelting capacity to 1,500 MTPD",
      "Designed for future expansion to 2,500 MTPD total capacity",
      "Developed coordinated 3D model supporting all disciplines",
      "Design focused on reliability, maintainability, and winter operability",
    ],
    featured: true,
    imagePlaceholder: true,
    projectValue: "Confidential", // TODO_CLIENT: confirm if value can be disclosed
    scopeDuration: "Ongoing",     // 2025–2026 ongoing
  },
  // TODO_CONTENT: Additional case studies (minimum 3 more needed)
];

// ── Industries Served ─────────────────────────────────────────

export const INDUSTRIES: Industry[] = [
  {
    name: "Oil & Gas and Energy Infrastructure",
    description:
      "Upstream, midstream, and downstream facilities — pipelines, processing plants, and gathering systems.",
  },
  {
    name: "Renewable Energy and Energy Transition",
    description:
      "Solar, wind, and hybrid projects supporting industrial decarbonization and energy transition goals.",
  },
  {
    name: "Petrochemical and Chemical Processing",
    description:
      "Process facilities, upgraders, and chemical plants requiring disciplined engineering and safety management.",
  },
  {
    name: "Industrial and Manufacturing Facilities",
    description:
      "Greenfield and brownfield industrial buildings, production facilities, and support infrastructure.",
  },
  {
    name: "Water and Wastewater Systems",
    description:
      "Treatment plants, distribution systems, and industrial water management infrastructure.",
  },
  {
    name: "Rail and Bulk Material Handling",
    description:
      "Loading/unloading terminals, conveyor systems, and bulk material handling facilities.",
  },
  {
    name: "Infrastructure and Construction (EPC/EPCM)",
    description:
      "Full EPC and EPCM delivery across industrial infrastructure at various project scales.",
  },
  {
    name: "Environmental and Regulatory Support",
    description:
      "Environmental assessments, regulatory submissions, and compliance-driven engineering for industrial projects.",
  },
];

// ── Core Values ───────────────────────────────────────────────

export const CORE_VALUES: Value[] = [
  {
    name: "Safety",
    description:
      "Every decision we make is evaluated through the lens of safety first. Our people and partners go home safe, every day.",
  },
  {
    name: "Quality",
    description:
      "Only work that meets the highest standard is submitted. Our QMS is enforced at every deliverable.",
  },
  {
    name: "Integrity",
    description:
      "We say what we mean and do what we say. No surprises, no excuses.",
  },
  {
    name: "Accountability",
    description:
      "We own our scope from start to finish. If something goes wrong, we fix it.",
  },
  {
    name: "Teamwork",
    description:
      "Engineering and construction under one roof. One team, one outcome.",
  },
];

// ── Differentiators ───────────────────────────────────────────

export const DIFFERENTIATORS: Differentiator[] = [
  {
    number: "01",
    title: "Execution-Driven from Day One",
    description:
      "Every decision is made with construction, operability, and commissioning in mind, not just design completion.",
  },
  {
    number: "02",
    title: "Fit-for-Purpose Engineering",
    description:
      "Solutions are right-sized to the problem. No overdesign, no unnecessary cost, just what works in the field.",
  },
  {
    number: "03",
    title: "End-to-End Accountability",
    description:
      "Metricline stays involved from concept through start-up, reducing handoff risks and ensuring continuity.",
  },
  {
    number: "04",
    title: "Integrated Team Approach",
    description:
      "Engineering and construction are aligned under one delivery model, improving coordination and speed.",
  },
  {
    number: "05",
    title: "Proven in Brownfield and Complex Environments",
    description:
      "Strong track record working within live facilities where safety, uptime, and constraints matter most.",
  },
];

// ── Leadership ────────────────────────────────────────────────

export const LEADERSHIP: TeamMember[] = [
  {
    name: "Stewart Neuman, P.Eng.",
    title: "Chief Executive Officer",
    initials: "SN",
    bio: "Stewart Neuman founded Metricline Projects in 2022 with a focus on bridging the gap between engineering design and real-world execution. A graduate of the University of Calgary in Manufacturing Engineering, he brings a strong background in industrial design-build, equipment supply, and business development. His experience as an entrepreneur and investor spans real estate, property management, and multiple start-ups. At Metricline, Stewart leads overall strategy and ensures projects are delivered with a focus on practicality, efficiency, and long-term performance.",
    photoPlaceholder: true,
  },
];

// ── Mission & About ───────────────────────────────────────────

export const MISSION =
  "To invest in our clients' growth through fit-for-purpose engineering, precision-built construction, and raising the bar of excellence.";

export const COMPANY_OVERVIEW = `Energy is changing fast. From crude-by-rail to solar operating around the clock, industries are being reshaped in real time. Metricline Projects sits right in that transition, guiding our partners through emerging markets and evolving technologies with confidence and clarity.

We don't just adapt, we apply what we've learned. Years of execution in complex industrial environments have shaped how we approach every project today. The result is practical, fit-for-purpose engineering, disciplined construction, and solutions that work in the field, not just on paper.

Here's what sets us apart. We think differently when it matters. We challenge assumptions, simplify complexity, and solve problems directly. No overengineering, no unnecessary layers. Just clear decisions, strong execution, and a consistent focus on delivering a better experience from start to finish.

Our integrated team supports projects end to end. From early concept and business case development through Pre-FEED, FEED, detailed engineering, procurement, fabrication, construction, commissioning, and start-up. We stay accountable the whole way through.

At the core of it, we measure success the same way you do. When your project performs, delivers, and grows your operation, that's a win. And that's exactly what we're built to do.`;

export const COMPANY_HISTORY = `Metricline Projects was founded in 2022 with a clear frustration in mind. Too many industrial projects were being designed in isolation — strong on paper, but difficult to build, operate, or maintain. The gap between engineering and execution was costing time, money, and reliability. Metricline was built to close that gap.

From the beginning, the focus was straightforward: design with the end in mind and carry that mindset through every stage of a project. With roots in industrial design-build and equipment supply, the team focused on delivering practical solutions that worked in real operating conditions, not just in theory. Early success came from repeat partners who valued clarity, accountability, and results in the field.

As projects became more complex, Metricline expanded its capabilities to support full lifecycle delivery. What started as a focused execution-driven team grew into an integrated partner covering concept development, engineering, procurement, and construction.

Today, Metricline supports projects across multiple industrial sectors, known for delivering work that performs reliably long after start-up. The approach hasn't changed — stay practical, stay accountable, and build solutions that last.`;

export const HSE_STATEMENT =
  "Safety is embedded in how we plan, design, and execute every project. Our approach prioritizes hazard identification early in design, clear communication in the field, and accountability across all teams. We focus on building systems and processes that support safe execution, ensuring our people and partners go home safe every day.";

// ── Nav ───────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Divisions", href: "/divisions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Clients", href: "/clients" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;
