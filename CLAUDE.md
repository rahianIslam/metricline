# CLAUDE.md — Metricline Group of Industries Website
## Master Build Specification

---

## 0. HOW TO USE THIS FILE

This is the single source of truth for building the Metricline website.
Read every section before writing any code. When in doubt, come back here.
Do not improvise on brand, layout, or content decisions — everything is specified.

---

## 1. PROJECT OVERVIEW

**Client:** Metricline Group of Industries (parent brand)
**Legal entity:** Metricline Projects Ltd.
**Founded:** 2022
**HQ:** Calgary, AB, Canada
**Regions served:** Alberta, Saskatchewan, BC

**What we are building:**
A 10-page multi-division marketing and portfolio website. Dark industrial aesthetic. Three divisions under one unified brand. Scroll-triggered animations throughout. CMS-driven content for case studies and team members.

**Primary goals:**
1. Establish Metricline Group as a credible EPCM firm to industrial project owners
2. Present three divisions (Projects, Rentals, Operations) with distinct identity
3. Drive contact and inquiry through clear CTAs
4. Showcase project work through a filterable portfolio

---

## 2. TECH STACK

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | Use `app/` directory. No Pages Router. |
| Styling | Tailwind CSS v3 | Config file defines all brand tokens |
| Animations | Framer Motion | All scroll animations, counters, page transitions |
| CMS | Sanity.io (free tier) | For case studies, team members, equipment |
| Forms | React Hook Form + Resend | Contact and quote request forms |
| Hosting | Vercel (free tier) | Auto-deploy from main branch |
| SEO | Next.js Metadata API | Per-page metadata + JSON-LD schema |
| Images | next/image | All images through Next Image for optimization |
| Icons | Lucide React | Consistent icon set throughout |

**Install command:**
```bash
npx create-next-app@latest metricline --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd metricline
npm install framer-motion @sanity/client @sanity/image-url react-hook-form lucide-react resend
```

---

## 3. DESIGN SYSTEM

### 3.1 Color Tokens

Define all of these in `tailwind.config.ts` under `theme.extend.colors`:

```typescript
colors: {
  // Group / neutral base
  group: {
    bg: '#0A0A0A',
    surface: '#111111',
    card: '#161616',
    border: '#222222',
    muted: '#888888',
    text: '#FFFFFF',
    textMuted: '#999999',
  },
  // Projects division — navy + orange
  projects: {
    bg: '#0D1825',
    surface: '#0E1F35',
    card: '#111E30',
    border: '#1A2D45',
    accent: '#E8742A',
    accentHover: '#F08040',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.5)',
  },
  // Rentals division — near-black + yellow
  rentals: {
    bg: '#0F0F0F',
    surface: '#141414',
    card: '#1A1A1A',
    border: '#252525',
    accent: '#F5C30A',
    accentHover: '#F7CD30',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.45)',
  },
  // Operations division — dark green + teal
  operations: {
    bg: '#091712',
    surface: '#0C1E16',
    card: '#0E2419',
    border: '#143020',
    accent: '#1FC87A',
    accentHover: '#35D48A',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.45)',
  },
}
```

### 3.2 Typography

Use Google Fonts. Add to `app/layout.tsx`:
- **Display / Hero:** `Inter` — weight 700, 800
- **Body:** `Inter` — weight 400, 500
- **Monospace / Labels:** `JetBrains Mono` — weight 400, used for eyebrow labels, URLs, code

```typescript
// Type scale — add to Tailwind config
fontSize: {
  'display-xl': ['72px', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '800' }],
  'display-lg': ['56px', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' }],
  'display-md': ['44px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
  'heading-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
  'heading-md': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
  'heading-sm': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
  'body-lg': ['17px', { lineHeight: '1.7', fontWeight: '400' }],
  'body-md': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
  'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
  'label': ['11px', { lineHeight: '1', letterSpacing: '0.15em', fontWeight: '600', textTransform: 'uppercase' }],
}
```

### 3.3 Animation System

All animations use Framer Motion. Create a reusable `lib/animations.ts`:

```typescript
// Fade up — used on all section entries
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

// Stagger container — wraps grids and lists
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

// Scale in — for cards
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

// Division color flash — full screen flash on division page entry
export const divisionFlash = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.5, delay: 0.1 } }
}

// Counter animation — handled by useCountUp hook (see below)
```

Create `hooks/useCountUp.ts`:
```typescript
// Counts from 0 to target when element enters viewport
// Usage: const count = useCountUp(target, { duration: 2000, inView: true })
```

Create `hooks/useInView.ts`:
```typescript
// Wrapper around Framer Motion useInView
// All sections use: triggerOnce: true, margin: "-80px"
```

### 3.4 Global Components

**`components/ui/SectionLabel.tsx`**
Eyebrow label above headings. Monospace font, accent color, letter-spacing.
```tsx
// <SectionLabel color="projects">Our Services</SectionLabel>
// Renders: "OUR SERVICES" in JetBrains Mono, accent colored
```

**`components/ui/Button.tsx`**
Two variants: `primary` (filled accent) and `ghost` (transparent, white border).
Both have hover states with slight scale and color shift. Arrow icon appended.

**`components/ui/DivisionPill.tsx`**
The thin strip at top of each division page:
```tsx
// ← metricline.ca  [●] METRICLINE PROJECTS
// Color dot and text use division accent color
```

**`components/layout/Nav.tsx`**
- Transparent over heroes, transitions to `bg-group-surface/95 backdrop-blur-sm` on scroll
- `M` logomark + `METRICLINE` wordmark
- Nav links: About / Divisions / Portfolio / Clients / Careers / Contact
- `Get in touch` CTA button (primary variant)
- `Divisions` link opens a mega dropdown showing all three division cards with accent colors
- Mobile: hamburger → full-screen overlay

**`components/layout/Footer.tsx`**
Dark, minimal. Three columns: logo + tagline, site links, contact info. LinkedIn icon.

---

## 4. FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx              # Root layout, Nav, Footer, fonts
│   ├── page.tsx                # Home (group level)
│   ├── about/
│   │   └── page.tsx
│   ├── divisions/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── rentals/
│   │   └── page.tsx
│   ├── operations/
│   │   └── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   ├── clients/
│   │   └── page.tsx
│   ├── careers/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionLabel.tsx
│   │   ├── DivisionPill.tsx
│   │   ├── StatCard.tsx
│   │   └── PlaceholderImage.tsx
│   ├── sections/
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── DivisionsOverview.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   └── ClientLogos.tsx
│   │   ├── projects/
│   │   │   ├── ProjectsHero.tsx
│   │   │   ├── ServicesList.tsx
│   │   │   └── CaseStudies.tsx
│   │   ├── rentals/
│   │   │   ├── RentalsHero.tsx
│   │   │   ├── EquipmentCatalog.tsx
│   │   │   └── QuoteForm.tsx
│   │   └── operations/
│   │       ├── OperationsHero.tsx
│   │       ├── ServicesList.tsx
│   │       └── HseqSection.tsx
├── lib/
│   ├── animations.ts
│   ├── sanity.ts
│   └── content.ts              # All static content as typed objects
├── hooks/
│   ├── useCountUp.ts
│   └── useInView.ts
├── types/
│   └── index.ts
└── sanity/
    └── schema/
        ├── caseStudy.ts
        ├── teamMember.ts
        └── equipment.ts
```

---

## 5. CONTENT — WHAT IS REAL VS PLACEHOLDER

### 5.1 REAL CONTENT (use exactly as written)

**Company name:** Metricline Projects Ltd. (legal) / Metricline Group of Industries (display)
**Tagline:** "Where engineering meets execution, and projects get delivered right."
**Founded:** 2022
**HQ:** Calgary, AB, Canada
**Regions:** Alberta, Saskatchewan, BC
**Certifications:** APEGA, APEGS

**Stats (homepage count-up):**
- `4` — Years in operation
- `$20M+` — Total project value delivered
- `15` — Team members
- `3` — Provinces served *(derived from Alberta, Saskatchewan, BC)*

**Hero headline:** "Engineering, Procurement, Construction, and Execution — Delivered End-to-End"
**Hero subheading:** "Metricline Group delivers integrated engineering and construction services across industrial sectors. We take projects from early concept through execution and start-up with a focus on practical, fit-for-purpose solutions."
**CTAs:** Primary: "Explore Our Divisions" / Secondary: "Get in Touch"

**Industries served:**
1. Oil & Gas and Energy Infrastructure
2. Renewable Energy and Energy Transition
3. Petrochemical and Chemical Processing
4. Industrial and Manufacturing Facilities
5. Water and Wastewater Systems
6. Rail and Bulk Material Handling
7. Infrastructure and Construction (EPC/EPCM)
8. Environmental and Regulatory Support

**Mission:** "To invest in our clients' growth through fit-for-purpose engineering, precision-built construction, and raising the bar of excellence."

**Core values:** Safety / Quality / Integrity / Accountability / Teamwork
*(Descriptions not provided — use these placeholders:)*
- Safety: "Every decision we make is evaluated through the lens of safety first. Our people and partners go home safe, every day."
- Quality: "Only work that meets the highest standard is submitted. Our QMS is enforced at every deliverable."
- Integrity: "We say what we mean and do what we say. No surprises, no excuses."
- Accountability: "We own our scope from start to finish. If something goes wrong, we fix it."
- Teamwork: "Engineering and construction under one roof. One team, one outcome."

**Company overview (full, use verbatim):**
"Energy is changing fast. From crude-by-rail to solar operating around the clock, industries are being reshaped in real time. Metricline Projects sits right in that transition, guiding our partners through emerging markets and evolving technologies with confidence and clarity.

We don't just adapt, we apply what we've learned. Years of execution in complex industrial environments have shaped how we approach every project today. The result is practical, fit-for-purpose engineering, disciplined construction, and solutions that work in the field, not just on paper.

Here's what sets us apart. We think differently when it matters. We challenge assumptions, simplify complexity, and solve problems directly. No overengineering, no unnecessary layers. Just clear decisions, strong execution, and a consistent focus on delivering a better experience from start to finish.

Our integrated team supports projects end to end. From early concept and business case development through Pre-FEED, FEED, detailed engineering, procurement, fabrication, construction, commissioning, and start-up. We stay accountable the whole way through.

At the core of it, we measure success the same way you do. When your project performs, delivers, and grows your operation, that's a win. And that's exactly what we're built to do."

**Company history (full, use verbatim for About page):**
"Metricline Projects was founded in 2022 with a clear frustration in mind. Too many industrial projects were being designed in isolation — strong on paper, but difficult to build, operate, or maintain. The gap between engineering and execution was costing time, money, and reliability. Metricline was built to close that gap.

From the beginning, the focus was straightforward: design with the end in mind and carry that mindset through every stage of a project. With roots in industrial design-build and equipment supply, the team focused on delivering practical solutions that worked in real operating conditions, not just in theory. Early success came from repeat partners who valued clarity, accountability, and results in the field.

As projects became more complex, Metricline expanded its capabilities to support full lifecycle delivery. What started as a focused execution-driven team grew into an integrated partner covering concept development, engineering, procurement, and construction.

Today, Metricline supports projects across multiple industrial sectors, known for delivering work that performs reliably long after start-up. The approach hasn't changed — stay practical, stay accountable, and build solutions that last."

**What makes us different (5 differentiators):**
1. Execution-Driven from Day One — Every decision is made with construction, operability, and commissioning in mind, not just design completion.
2. Fit-for-Purpose Engineering — Solutions are right-sized to the problem. No overdesign, no unnecessary cost, just what works in the field.
3. End-to-End Accountability — Metricline stays involved from concept through start-up, reducing handoff risks and ensuring continuity.
4. Integrated Team Approach — Engineering and construction are aligned under one delivery model, improving coordination and speed.
5. Proven in Brownfield and Complex Environments — Strong track record working within live facilities where safety, uptime, and constraints matter most.

**HSE Statement:**
"Safety is embedded in how we plan, design, and execute every project. Our approach prioritizes hazard identification early in design, clear communication in the field, and accountability across all teams. We focus on building systems and processes that support safe execution, ensuring our people and partners go home safe every day."

**Leadership — Stewart Neuman:**
- Name: Stewart Neuman, P.Eng.
- Title: Chief Executive Officer
- Bio: "Stewart Neuman founded Metricline Projects in 2022 with a focus on bridging the gap between engineering design and real-world execution. A graduate of the University of Calgary in Manufacturing Engineering, he brings a strong background in industrial design-build, equipment supply, and business development. His experience as an entrepreneur and investor spans real estate, property management, and multiple start-ups. At Metricline, Stewart leads overall strategy and ensures projects are delivered with a focus on practicality, efficiency, and long-term performance."
- Photo: **[PLACEHOLDER — awaiting headshot]**

**Projects Division — 9 Services (full descriptions in Section 5 of form — use verbatim):**
1. Concept Development & Business Case
2. Pre-FEED (Preliminary Engineering)
3. FEED (Front-End Engineering Design)
4. Detailed Engineering
5. Procurement Support
6. Fabrication & Equipment Supply
7. Construction Management
8. Commissioning & Start-Up
9. Brownfield Modifications & Tie-Ins

**Case Study 1 — Remelter Detailed Design:**
- Client: Heartland Sulphur
- Location: Fort Saskatchewan, AB
- Year: 2025–2026 (ongoing)
- Scope: Detailed Engineering & Procurement, Construction Support
- Sector: Oil & Gas / Sulphur Processing
- Description: "The project involved redesigning the remelting system after the original FEED was found to be undersized and operationally constrained. Metricline developed a new 1,000 MTPD remelter integrated with the existing 500 MTPD unit, while also planning for future expansion. The design focused on reliability, maintainability, and winter operability under extreme conditions. Work included full 3D modeling, detailed engineering, and coordination with existing site infrastructure."
- Highlights:
  - Increased total installed remelting capacity to 1,500 MTPD
  - Designed for future expansion to 2,500 MTPD total capacity
  - Developed coordinated 3D model supporting all disciplines
- Photo: **[PLACEHOLDER — awaiting project photos]**

### 5.2 PLACEHOLDERS (mark clearly in code with TODO comments)

```typescript
// Consistent placeholder pattern throughout codebase:
// TODO_CONTENT: [description of what goes here]
// TODO_ASSET: [description of asset needed]
// TODO_CLIENT: [specific client question needed]
```

**Brand assets — all pending:**
- `TODO_ASSET: Primary Metricline Group logo (SVG preferred)`
- `TODO_ASSET: Metricline Projects division logo`
- `TODO_ASSET: Metricline Rentals division logo`
- `TODO_ASSET: Metricline Operations division logo`
- `TODO_ASSET: Brand color hex codes — using design system defaults until confirmed`
- `TODO_ASSET: All project photography (hero images, case study photos)`
- `TODO_ASSET: Stewart Neuman headshot`

**Contact details — all pending:**
- `TODO_CLIENT: Primary email (info@metricline.ca assumed — confirm)`
- `TODO_CLIENT: Business phone number`
- `TODO_CLIENT: Full office address (Calgary, AB known)`
- `TODO_CLIENT: LinkedIn company page URL`

**Division content — Rentals and Operations entirely blank:**
- `TODO_CONTENT: Rentals division tagline`
- `TODO_CONTENT: Rentals division overview (2–3 sentences)`
- `TODO_CONTENT: Equipment categories`
- `TODO_CONTENT: Equipment catalog items`
- `TODO_CONTENT: Operations division tagline`
- `TODO_CONTENT: Operations division overview`
- `TODO_CONTENT: Operations services list`
- `TODO_CONTENT: HSEQ commitment statement`
- `TODO_CONTENT: Safety certifications`

**Projects division:**
- `TODO_CONTENT: Projects division tagline (not provided — using "Full-scope EPCM from concept through commissioning." as default)`
- `TODO_CONTENT: Additional case studies (minimum 3 more needed)`

**Clients page:**
- `TODO_ASSET: Client logo files (image was embedded in form, cannot extract — request again)`
- `TODO_CLIENT: Client disclosure permissions list`

**Careers, Portfolio filters, Domain — all blank.**

---

## 6. PAGE-BY-PAGE DESIGN SPECIFICATION

### PAGE 1: Home (`/`)

**Background:** `#0A0A0A` group dark
**Nav:** Transparent over hero → solid on scroll

**Section 1 — Hero**
- Full viewport height
- Split layout: left 55% content, right 45% geometric pattern (CSS-drawn, no image dependency)
- Geometric pattern: thin white lines at 15° angle, opacity 4% — acts as texture
- Eyebrow: "METRICLINE GROUP OF INDUSTRIES" in label font, white 40% opacity
- H1: "Engineering, Procurement, Construction, and Execution — Delivered End-to-End"
  - First three words on line 1 at full display-xl
  - "Delivered End-to-End" on final line, color `rgba(255,255,255,0.25)` — creates the fade effect
- Subheading: client-provided text, body-lg, white 55% opacity, max-width 440px
- CTA row: "Explore Our Divisions" (primary, white fill dark text) + "Get in Touch" (ghost)
- Bottom edge: thin 1px orange rule fades in on load
- Animation: hero content fades up on mount, 0.8s ease-out

**Section 2 — Stats Bar**
- Dark surface `#111111`, 1px top border `#222`
- 4-column grid, 1px dividers between columns
- Stats (count up when in viewport):
  - `4` — Years in operation
  - `$20M+` — Project value delivered
  - `15` — Team members
  - `3` — Provinces
- Each stat: large number in display-md, label below in label font, white 40% opacity
- Counter animation: 0 → target over 1.8s, easeOutExpo curve

**Section 3 — Divisions Overview**
- Section label: "OUR DIVISIONS"
- H2: "Three divisions. One group."
- 3-column card grid, each card full height
- Card 1 — Projects: bg `#0D1825`, accent `#E8742A`
  - Accent dot (7px circle)
  - Eyebrow: "ENGINEERING & CONSTRUCTION"
  - Division name: "Metricline Projects" — large, white
  - Description: "Full-scope EPCM for the energy transition, oil & gas, petrochemical, and industrial sectors."
  - Link: "metricline.ca/projects →" in accent color
  - On hover: left border flash in accent color, subtle lift
- Card 2 — Rentals: bg `#0F0F0F`, accent `#F5C30A`
  - Same structure, yellow accent
  - Description: "[PLACEHOLDER — awaiting Rentals division overview]"
- Card 3 — Operations: bg `#091712`, accent `#1FC87A`
  - Same structure, teal accent
  - Description: "[PLACEHOLDER — awaiting Operations division overview]"
- Animation: cards stagger in from below, 80ms between each

**Section 4 — Featured Projects**
- Section label: "FEATURED WORK"
- H2: "Projects that define us"
- 2x2 grid of case study cards
- Card structure: dark bg, category eyebrow in accent, project name, client, one-line description, "View project →"
- Currently shows 1 real card (Remelter) + 3 placeholder cards
- Placeholder card: same design, greyed out with text "More projects coming"
- Animation: stagger in on scroll

**Section 5 — Client Logos**
- Section label: "TRUSTED BY"
- `TODO_ASSET: client logos` — build logo grid component with placeholder boxes showing "CLIENT LOGO" text in a minimal bordered box
- Slow horizontal auto-scroll on loop (CSS marquee, pause on hover)

**Section 6 — CTA Banner**
- Full-width dark section with orange left border (4px)
- H2: "Ready to discuss your project?"
- Subtext: "From early concept to start-up, we deliver."
- Two buttons: "Start a conversation" (primary) and "View our work" (ghost)

---

### PAGE 2: About (`/about`)

**Background:** `#0A0A0A`

**Section 1 — About Hero**
- No full-viewport height. 420px tall.
- Eyebrow: "ABOUT METRICLINE"
- H1: "Built to close the gap between engineering and execution."
- Subtext: first sentence of mission statement

**Section 2 — Company Story**
- Two-column: left column narrow (30%) for section labels, right column wide (70%) for content
- H2: "How we started"
- Body: full company history text (4 paragraphs, use verbatim)
- Right side: one geometric accent shape (CSS), no image dependency

**Section 3 — Mission**
- Full-width dark band, centered
- Large pull-quote style:
  `" To invest in our clients' growth through fit-for-purpose engineering, precision-built construction, and raising the bar of excellence. "`
- Orange quotation marks, white text display-md

**Section 4 — Why Choose Us**
- Section label: "WHAT SETS US APART"
- H2: "Five reasons our clients come back"
- 5-item list, each item:
  - Orange number (01–05) in label font
  - Bold title
  - Description text
  - Full-width 1px border between items
  - Hover: item background transitions to `#111`, left orange border appears

**Section 5 — Core Values**
- Section label: "OUR VALUES"
- 5-column grid (Safety / Quality / Integrity / Accountability / Teamwork)
- Each card: dark bg, value name large, description small below
- Use placeholder descriptions from Section 5.1 until client provides specifics

**Section 6 — HSE**
- Dark band with teal-ish left accent (safety signal)
- H2: "Safety is not a checkbox"
- Body: full HSE statement text
- APEGA + APEGS certification badges (text-based, no logo dependency)

**Section 7 — Leadership**
- Section label: "LEADERSHIP"
- Single card for Stewart Neuman (more to be added):
  - Photo area: `TODO_ASSET headshot` — use initials avatar "SN" as placeholder
  - Name: Stewart Neuman, P.Eng.
  - Title: Chief Executive Officer
  - Full bio text
- Card style: dark surface, orange left border

---

### PAGE 3: Divisions (`/divisions`)

**Purpose:** One page showing all three divisions side by side as cards with links.

**Layout:**
- Full-viewport cards stacked on mobile, 3-column on desktop
- Each division card takes 1/3 width and full viewport height
- On hover: card floods with division accent color at 8% opacity

**Card structure per division:**
- Division pill at top (same as sub-site pill)
- Division letter mark large (P / R / O) in accent color, faded — decorative only
- Division name H1 size
- Tagline
- 3-4 bullet capability points
- Primary CTA button in division accent color
- Footer of card: "→ metricline.ca/[division]"

**Placeholders:**
- Rentals card: `TODO_CONTENT tagline and capabilities`
- Operations card: `TODO_CONTENT tagline and capabilities`

---

### PAGE 4: Projects Division (`/projects`)

**Palette:** bg `#0D1825`, accent `#E8742A`
**Division pill at top:** `← metricline.ca  [●] METRICLINE PROJECTS`

**Section 1 — Hero**
- Same split layout as home hero
- Eyebrow: "EPCM · ENGINEERING · CONSTRUCTION" in orange
- H1: "From concept to commissioning. Delivered."
  - "Delivered." in faded white
- Subheading: "Full-discipline EPCM for the energy transition, oil & gas, petrochemical, and industrial sectors."
- CTAs: "Our services" (orange fill) + "View projects" (ghost)
- Background geometric: concentric circles, very faint, right side — no image needed

**Section 2 — Services**
- Section label: "OUR SERVICES" in orange
- H2: "Full-scope project delivery"
- Subhead: "From pre-FEED through start-up — we own the scope."
- 3-column grid of service cards (3+3+3 = 9 cards)
- Each card: navy surface `#111827`, orange icon placeholder (geometric), service name bold, description body-sm
- Hover: orange left border, card background lightens slightly

**Service cards (9 total — all content from form):**
1. Concept Development & Business Case
2. Pre-FEED
3. FEED
4. Detailed Engineering
5. Procurement Support
6. Fabrication & Equipment Supply
7. Construction Management
8. Commissioning & Start-Up
9. Brownfield Modifications & Tie-Ins

**Section 3 — Case Studies**
- Section label: "CASE STUDIES" in orange
- H2: "Projects that define us"
- Grid of cards:
  - Card 1 (REAL): Remelter Detailed Design — full content
  - Cards 2–4: `TODO_CONTENT placeholder` — styled with "Project coming soon" or greyed out
- Each real case study card:
  - Category eyebrow in orange
  - Project name H3
  - Client + Location + Year row
  - 2-sentence description
  - Highlight bullets
  - "View details →" link (links to expanded modal or sub-page — implement as modal for now)
  - Image area: `TODO_ASSET project photo` — placeholder is dark rectangle with diagonal line pattern

**Section 4 — Industries**
- Compact section listing all 8 industries as pills/tags
- Orange accent on hover

**Section 5 — Contact CTA**
- Orange left-bordered band
- "Ready to discuss a project?" + contact button

---

### PAGE 5: Rentals (`/rentals`)

**Palette:** bg `#0F0F0F`, accent `#F5C30A`
**Status: PLACEHOLDER STATE — all content pending**

**Division pill at top:** `← metricline.ca  [●] METRICLINE RENTALS`

**Build all sections with proper structure but placeholder content:**

**Section 1 — Hero**
- `TODO_CONTENT: Division tagline`
- `TODO_CONTENT: Hero subheading`
- CTA: "View catalog" (yellow fill, dark text) + "Request a quote"
- Background: subtle diagonal line pattern, yellow tint

**Section 2 — Category Filter Bar**
- `TODO_CONTENT: Equipment categories`
- Build filter bar component — filters equipment grid client-side
- Active filter: yellow bg, dark text. Inactive: transparent, grey text

**Section 3 — Equipment Catalog Grid**
- `TODO_CONTENT: Equipment items`
- Build the grid component ready to accept data
- 3-column responsive grid
- Each card: image area (placeholder), equipment name, category badge, "Request quote →" CTA in yellow

**Section 4 — Quote Request Form**
- Multi-step form component (Step 1: equipment + dates, Step 2: contact details)
- Yellow accent throughout
- Submit via Resend to `TODO_CLIENT: business email`

**Section 5 — Service Area**
- `TODO_CONTENT: provinces/regions`

---

### PAGE 6: Operations (`/operations`)

**Palette:** bg `#091712`, accent `#1FC87A`
**Status: PLACEHOLDER STATE — all content pending**

**Division pill at top:** `← metricline.ca  [●] METRICLINE OPERATIONS`

**Section 1 — Hero**
- `TODO_CONTENT: Division tagline`
- `TODO_CONTENT: Hero subheading`

**Section 2 — Services Grid**
- `TODO_CONTENT: services list`
- Same card structure as Projects services

**Section 3 — Case Studies**
- `TODO_CONTENT: case studies`

**Section 4 — HSEQ**
- 4-column H/S/E/Q breakdown
- Large letter (H, S, E, Q) in teal
- Title + description per column
- `TODO_CONTENT: full HSEQ statement and certifications`
- Styled correctly — content to be dropped in when provided

---

### PAGE 7: Portfolio (`/portfolio`)

**Background:** `#0A0A0A`

**Section 1 — Header**
- H1: "Our work, across all divisions."
- Subtext: "Filterable by division and sector."

**Section 2 — Filter Bar**
- Division filters: All / Projects / Rentals / Operations (use division accent colors)
- Sector filters: All / Oil & Gas / Energy Transition / Rail & Bulk Handling / Petrochemical / Industrial / Water & Wastewater
- `TODO_CLIENT: confirm final sector labels`
- Active filter styling: filled bg in that division's accent color
- Filter logic: client-side, smooth layout animation using Framer Motion `layout` prop

**Section 3 — Case Study Grid**
- Same cards as Projects case studies section
- Currently only 1 real card — build with 1 real + 3 placeholders
- Grid animates reflow on filter change

---

### PAGE 8: Clients (`/clients`)

**Background:** `#0A0A0A`

**Section 1 — Header**
- H1: "The companies that trust us."
- Subtext: industries served list

**Section 2 — Logo Grid**
- `TODO_ASSET: client logo files`
- Responsive grid, logos greyscale by default, full color on hover
- Placeholder: grid of bordered boxes with "CLIENT" text

**Section 3 — Industries**
- 8-item grid of industry cards
- Each: category name + short description of work in that sector

---

### PAGE 9: Careers (`/careers`)

**Background:** `#0A0A0A`

**Section 1 — Header**
- H1: "Build something that lasts."
- `TODO_CONTENT: Why work at Metricline paragraph`

**Section 2 — Open Roles**
- `TODO_CONTENT: open roles`
- Build role card component: role title, division badge, location, description, "Apply" button
- If blank: display "No current openings — send your resume to `TODO_CLIENT: careers email`"

**Section 3 — Values reminder**
- Pull in the 5 values from About page — reuse component

---

### PAGE 10: Contact (`/contact`)

**Background:** `#0A0A0A`

**Layout:** Two-column. Left: form. Right: contact info.

**Contact form fields (default — confirm with client):**
- Name (required)
- Company (required)
- Email (required)
- Phone (optional)
- Enquiry type: New project / Rental enquiry / Careers / General (dropdown)
- Message (required)
- Submit → Resend → `TODO_CLIENT: business email`

**Info panel (right column):**
- `TODO_CLIENT: email address`
- `TODO_CLIENT: phone number`
- `TODO_CLIENT: full office address`
- `TODO_CLIENT: LinkedIn URL`
- Address shown as: "Calgary, Alberta, Canada" until full address provided

---

## 7. SANITY CMS SCHEMA

### `caseStudy.ts`
Fields: title, client (string), location, year, scopeType, sector, division (reference: projects|rentals|operations), description (text), highlights (array of strings), photos (array of images), featured (boolean), slug

### `teamMember.ts`
Fields: name, title, bio (text), photo (image), order (number), active (boolean)

### `equipment.ts`
Fields: name, category, brand, model, specifications (array of {key, value}), photos (array of images), available (boolean), featured (boolean)

### `openRole.ts`
Fields: title, division, location, description, applyUrl, active (boolean)

---

## 8. BUILD ORDER

Build in this exact sequence. Do not skip ahead.

```
Phase 1 — Foundation
  [x] Init Next.js project with Tailwind
  [x] Configure tailwind.config.ts with all color tokens and type scale
  [x] Create lib/animations.ts with all Framer Motion variants
  [x] Create hooks/useCountUp.ts and hooks/useInView.ts
  [x] Build Nav component (transparent/solid scroll behavior)
  [x] Build Footer component
  [x] Build shared UI: Button, SectionLabel, DivisionPill, StatCard

Phase 2 — Home page
  [x] Hero section (no image dependency)
  [x] Stats bar with count-up animation
  [x] Divisions overview cards (3 cards, Rentals/Operations in placeholder state)
  [x] Featured projects grid (1 real + 3 placeholder)
  [x] Client logos section (placeholder state)
  [x] CTA banner

Phase 3 — About page
  [x] About hero
  [x] Company story section
  [x] Mission pull-quote
  [x] Differentiators list
  [x] Core values grid
  [x] HSE statement
  [x] Leadership card (placeholder headshot)

Phase 4 — Projects division page
  [x] Projects hero
  [x] Services grid (9 cards, all content real)
  [x] Case studies grid (1 real + 3 placeholder)
  [x] Industries tags
  [x] Contact CTA

Phase 5 — Portfolio page
  [x] Filter bar with layout animation
  [x] Case study grid

Phase 6 — Contact page
  [x] Contact form with Resend integration (TODO email)
  [x] Info panel with placeholders

Phase 7 — Rentals, Operations, Clients, Careers, Divisions
  [x] All built with proper structure, placeholder content clearly marked

Phase 8 — CMS integration
  [x] Sanity schema setup
  [x] Connect case studies to CMS
  [x] Connect team members to CMS

Phase 9 — SEO & Performance
  [x] Per-page metadata
  [x] JSON-LD schema for Organization and CaseStudy
  [x] Sitemap.xml
  [x] next/image for all images
  [x] Lighthouse audit target: 90+ on all metrics
```

---

## 9. PLACEHOLDER STRATEGY

Every placeholder must be visually polished, not broken. Use these patterns:

**Image placeholder:**
```tsx
// components/ui/PlaceholderImage.tsx
// Dark rectangle with diagonal line pattern (CSS, no external dependency)
// Shows "PHOTO COMING" label if showLabel prop is true
```

**Content placeholder:**
```tsx
// Wrap in a subtle dashed border with opacity 50%
// Add orange dot indicator and small italic text: "Content to be provided"
// In production build, these should still look designed — not broken
```

**Logo placeholder:**
```tsx
// Bordered rectangle, aspect ratio preserved, background #1a1a1a
// Client name in label font, center aligned, opacity 40%
```

---

## 10. ANIMATIONS CHECKLIST

Every animation must use `triggerOnce: true`. Nothing loops on the main site except the logo marquee.

| Element | Animation | Trigger |
|---|---|---|
| Nav | opacity + blur transition | scroll position |
| Hero content | fade up, stagger children | on mount |
| Stats bar | count from 0 to value | in viewport |
| Division cards | stagger scale-in | in viewport |
| Case study cards | stagger fade-up | in viewport |
| Service cards | stagger fade-up | in viewport |
| Values cards | stagger fade-up | in viewport |
| Client logos | horizontal marquee loop | always |
| Portfolio filter | Framer Motion layout | on filter change |
| Division page entry | full-screen color flash | page mount, once |
| Section labels | fade-up | in viewport |
| Page transition | fade out/in | route change |

---

## 11. NOTES FOR CLAUDE CODE

- Always use TypeScript. No `any` types.
- All client-provided copy is in `lib/content.ts` as typed objects — do not hardcode copy in components.
- All TODO items are tracked in `lib/content.ts` with consistent format.
- Tailwind only — no inline styles, no styled-components.
- Framer Motion `motion.div` wraps any element that animates — never CSS transitions for entrance animations.
- All forms use React Hook Form — no uncontrolled inputs.
- Test on mobile viewport (375px) before marking any page done.
- Image optimization: all images use `next/image` with explicit `width` and `height` or `fill` with `sizes` prop.
- The site must score 90+ on Lighthouse Performance even before real photos are added.
