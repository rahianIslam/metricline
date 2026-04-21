# Metricline Group — Project Status Report

**Generated:** April 16, 2026  
**Build status:** 16/16 routes · 0 TypeScript errors · Production-ready

---

## Completed Work

### Phase 1 — Foundation
- `tailwind.config.ts` / `globals.css` — all color tokens and type scale as CSS variables
- `lib/animations.ts` — fadeUp, staggerContainer, scaleIn, divisionFlash, fadeIn, slideInLeft, navDropdown, mobileMenu, pageTransition
- `hooks/useCountUp.ts` — easeOutExpo counter, fires once when element enters viewport
- `hooks/useInView.ts` — generic typed wrapper, once: true, margin: "-80px"
- `lib/content.ts` — all static copy as typed objects (COMPANY, HOME_HERO, HOME_STATS, DIVISIONS, PROJECTS_SERVICES, CASE_STUDIES, INDUSTRIES, CORE_VALUES, DIFFERENTIATORS, LEADERSHIP, MISSION, COMPANY_OVERVIEW, COMPANY_HISTORY, HSE_STATEMENT, NAV_LINKS)
- `types/index.ts` — StatItem, Service, CaseStudy, TeamMember, Value, Differentiator, DivisionConfig, Industry, EquipmentItem, OpenRole, Division
- `components/layout/Nav.tsx` — transparent→solid scroll, divisions mega-dropdown, mobile full-screen overlay
- `components/layout/Footer.tsx` — 3-column layout: brand/tagline/certs, nav links + division links, contact info
- `components/ui/Button.tsx` — primary and ghost variants, DivisionButton for accent-colored CTAs
- `components/ui/SectionLabel.tsx` — JetBrains Mono eyebrow, customColor prop
- `components/ui/DivisionPill.tsx` — thin strip at top of each division page
- `components/ui/StatCard.tsx` — uses useCountUp, triggered by inView prop
- `components/ui/PlaceholderImage.tsx` — diagonal SVG pattern; LogoPlaceholder, ContentPlaceholder variants

### Phase 2 — Home page (`/`)
- `Hero.tsx` — full viewport, 55/45 split, staggered headline, "Delivered End-to-End" at 25% white, animated orange baseline rule, scroll indicator
- `StatsBar.tsx` — 4-col grid, count-up triggered by useInView
- `DivisionsOverview.tsx` — 3 division cards, stagger scaleIn, left border flash + accent wash on hover
- `FeaturedProjects.tsx` — 2×2 grid, 1 real Heartland Sulphur card + 3 skeleton placeholders; accepts `caseStudies` prop from Sanity
- `ClientLogos.tsx` — CSS marquee (animate-marquee keyframe), placeholder logo boxes, pauses on hover
- `CtaBanner.tsx` — orange 4px left border band, staggered content

### Phase 3 — About page (`/about`)
- `AboutHero.tsx` — giant "ABOUT" vertical ghost text, animated full-width rule on mount
- `CompanyStory.tsx` — sticky left rail with timeline year markers, paragraph lead-sentence hierarchy
- `MissionQuote.tsx` — 520px decorative `"` at 6% orange opacity, gradient orange rules, "excellence." in #E8742A
- `Differentiators.tsx` — 80–130px ghost numbers behind each row, scaleY left border on hover
- `CoreValues.tsx` — 5-col cards with initials ghost letter at background opacity
- `HseSection.tsx` — "HSE" ghost text at 3% teal, teal left glow bar, APEGA/APEGS as teal pill badges
- `LeadershipSection.tsx` — orange 4px left border card, initials avatar, bio lead-sentence split; accepts `members` prop from Sanity

### Phase 4 — Projects division (`/projects`)
- `ProjectsHero.tsx` — concentric-circle SVG technical drawing, orange accent, staggered content
- `ServicesList.tsx` — 3×3 grid of 9 EPCM service cards with custom monoline SVG icons
- `CaseStudies.tsx` — case study grid accepting `caseStudies` prop; 1 real card (Heartland Sulphur remelter) + 3 placeholder skeletons
- `IndustriesTags.tsx` — 8 industries as pill-rows with accent hover
- `ProjectsContactCta.tsx` — orange 4px left wall, metadata strip

### Phase 5 — Portfolio page (`/portfolio`)
- `PortfolioHeader.tsx` — ghost "PORTFOLIO" watermark (17vw, 2.2% opacity), blueprint grid overlay
- `PortfolioGrid.tsx` — sticky filter bar (division + sector rows), AnimatePresence mode="popLayout", Framer Motion layout reflow, per-division accent colors, empty state; accepts `caseStudies` prop from Sanity

### Phase 6 — Contact page (`/contact`)
- `ContactHero.tsx` — ghost "CONTACT" watermark, animated signal pulse dot
- `ContactForm.tsx` — bottom-border-only inputs, JetBrains Mono labels, character counter, AnimatePresence form→"TRANSMISSION RECEIVED" success state with animated SVG
- `ContactInfo.tsx` — dark card with orange left border, blueprint grid overlay, placeholder state for pending contact details
- `app/api/contact/route.ts` — Resend integration with lazy instantiation, per-request validation, HTML email template

### Phase 7 — Remaining pages
- `/divisions` — 3 full-height panels with P/R/O lettermarks, stagger hover, per-division line textures
- `/rentals` — RentalsHero (isometric crate SVG, yellow accent) + EquipmentCatalog (client-side filter, AnimatePresence grid) + QuoteForm (2-step React Hook Form, step indicator, success state) + ServiceArea (3-province cards)
- `/operations` — OperationsHero (facility floor-plan schematic SVG, teal accent) + OperationsServices (6-card grid) + OperationsCaseStudies (3 placeholder cards) + HseqSection (giant ghost "HSEQ" watermark, H/S/E/Q pillar cards)
- `/clients` — ClientsHeader (dot-grid, ghost watermark) + ClientLogosGrid (8-slot hover cards) + IndustriesGrid (8 rows, accent-cycle per row, hover reveal)
- `/careers` — CareersHero (ghost "CAREERS" vertical watermark) + OpenRoles (empty state with resume CTA, role card component ready) + CoreValues (reused from /about)

### Phase 8 — Sanity CMS integration
- Installed: `next-sanity`, `sanity`, `@sanity/vision`
- `sanity.config.ts` — Studio config with structureTool (4 content types) + visionTool
- `src/app/studio/layout.tsx` — bare layout stripping Nav/Footer for full-screen studio
- `src/app/studio/[[...tool]]/page.tsx` → `StudioLoader.tsx` → `StudioClient.tsx` — 3-file pattern resolving React 19 / Sanity Studio SSR incompatibility
- `src/sanity/schema/` — caseStudy, teamMember, equipment, openRole schemas
- `lib/sanity.ts` — getCaseStudies(), getTeamMembers(), getEquipment(), getOpenRoles() with static fallback when env vars absent
- `app/page.tsx`, `app/projects/page.tsx`, `app/about/page.tsx`, `app/portfolio/page.tsx` — all async server components fetching live from Sanity

### Phase 9 — SEO & Performance
- All 10 pages have per-page `metadata` exports with title, description, and OpenGraph
- `src/lib/schema.ts` — JSON-LD builders: organizationSchema(), websiteSchema(), projectsServiceSchema(), portfolioSchema()
- `src/components/ui/JsonLd.tsx` — server component rendering `<script type="application/ld+json">`
- Organization + WebSite JSON-LD injected in root `layout.tsx` — present on every page
- ProfessionalService schema (with all 9 EPCM services) on `/projects`
- ItemList schema with CMS-fetched case studies on `/portfolio`
- `src/app/sitemap.ts` — 10 routes with changeFrequency + priority → `/sitemap.xml`
- `src/app/robots.ts` — allows all crawlers, disallows `/studio/` → `/robots.txt`
- `next.config.ts` — Sanity CDN remote image pattern, AVIF/WebP formats, compress: true, poweredByHeader: false

---

## Remaining Tasks

All remaining tasks are blocked on client-provided content, assets, or third-party account setup. No further code changes are required unless content deviates significantly from the current placeholder structure.

---

### A — Client-provided assets (design team action needed)

| # | Asset | Where used | Format needed |
|---|---|---|---|
| A1 | Metricline Group primary logo | Nav, Footer, og:image | SVG preferred |
| A2 | Metricline Projects division logo | `/projects` hero, Nav mega-dropdown | SVG |
| A3 | Metricline Rentals division logo | `/rentals` hero, Nav mega-dropdown | SVG |
| A4 | Metricline Operations division logo | `/operations` hero, Nav mega-dropdown | SVG |
| A5 | Stewart Neuman headshot | `/about` leadership card | JPG/PNG, min 400×400px |
| A6 | Project photography (Heartland Sulphur remelter) | Case study card on `/projects`, `/portfolio` | JPG, min 1200×800px |
| A7 | Additional project photography | Future case study cards | JPG, min 1200×800px |
| A8 | Client logo files | `/clients` logo grid + `/` marquee | SVG preferred, or PNG on transparent bg |

**Instructions for logos:**
- Replace the `LogoPlaceholder` component in `Nav.tsx` and `Footer.tsx` with `<Image>` from `next/image`
- Replace `PlaceholderImage` components in case study cards with `<Image src={study.imageUrl} ...>`
- All image `src` values should come through Sanity CMS once uploaded — the `urlFor()` helper in `lib/sanity.ts` handles URL generation

---

### B — Client-provided contact details

| # | Field | Current placeholder | Location in code |
|---|---|---|---|
| B1 | Primary email | `info@metricline.ca` (assumed) | `lib/content.ts` → `COMPANY.email` |
| B2 | Business phone number | `null` — phone row hidden | `lib/content.ts` → `COMPANY.phone` |
| B3 | Full office address | `"Calgary, Alberta, Canada"` | `lib/content.ts` → `COMPANY.address` |
| B4 | LinkedIn company page URL | `null` — LinkedIn icon hidden | `lib/content.ts` → `COMPANY.linkedin` |
| B5 | Careers email | Not set — resume CTA links to contact form | `components/sections/careers/OpenRoles.tsx` |

**Instructions:**
- All contact fields are in one place: `src/lib/content.ts` lines 29–38
- Set `COMPANY.phone` to the phone number string — the `ContactInfo.tsx` component will automatically show the phone row
- Set `COMPANY.linkedin` to the full URL — the Footer and ContactInfo components will automatically show the LinkedIn icon

---

### C — Division content (Rentals + Operations)

All Rentals and Operations content is placeholder. Once the client provides copy, update `lib/content.ts` and the respective section components.

#### C1 — Metricline Rentals (`/rentals`)
- [ ] Division tagline (used in `RentalsHero.tsx`)
- [ ] Division overview paragraph (2–3 sentences)
- [ ] Equipment categories (drives the filter bar in `EquipmentCatalog.tsx`)
- [ ] Equipment catalog items (name, category, specifications)
  - Once provided, add to Sanity CMS using the `equipment` schema
  - `getEquipment()` in `lib/sanity.ts` is already wired up

#### C2 — Metricline Operations (`/operations`)
- [ ] Division tagline (used in `OperationsHero.tsx`)
- [ ] Division overview paragraph
- [ ] Services list (currently 6 placeholder services)
- [ ] HSEQ commitment statement
- [ ] Safety certifications held

---

### D — Additional case studies

The site currently has **1 real case study** (Heartland Sulphur remelter). CLAUDE.md specifies a minimum of 4 for the portfolio to feel credible.

**Instructions:**
1. For each new case study, collect: title, client, location, year, scope type, sector, division (projects/rentals/operations), description (2–3 sentences), bullet highlights (2–4), photo
2. Enter directly into the Sanity Studio at `/studio` once deployed — no code changes needed
3. Case studies automatically appear on `/projects`, `/portfolio`, and the home featured grid

---

### E — Client disclosure permissions

Before publishing logos and client names:
- [ ] Confirm with each client that they approve being listed on the website
- [ ] Confirm sector labels are correct for each client
- [ ] Confirm which clients approve logo usage (for the `/clients` logo grid)

---

### F — Deployment (one-time setup)

#### F1 — Sanity project setup
1. Create a free Sanity account at sanity.io
2. Create a new project named `metricline`
3. Copy the **Project ID** from the Sanity dashboard
4. Add the following to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
5. Visit `/studio` in the local dev server to access the CMS and enter content

#### F2 — Resend setup (contact form email delivery)
1. Create a Resend account at resend.com
2. Verify your sending domain (`metricline.ca`)
3. Generate an API key
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=info@metricline.ca
   FROM_EMAIL=noreply@metricline.ca
   ```

#### F3 — Vercel deployment
1. Push the repository to GitHub
2. Create a new Vercel project and connect the GitHub repo
3. In Vercel project settings → Environment Variables, add all vars from F1 and F2
4. Set the custom domain to `metricline.ca` in Vercel → Domains
5. In Sanity project settings → API → CORS origins, add `https://metricline.ca` and `https://www.metricline.ca`
6. In Sanity project settings → API → CORS origins, also add the Vercel preview URL (e.g. `https://metricline.vercel.app`)

#### F4 — Post-deployment checks
- [ ] Submit `https://metricline.ca/sitemap.xml` to Google Search Console
- [ ] Verify JSON-LD output using Google's Rich Results Test
- [ ] Run Lighthouse audit — target 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] Test contact form end-to-end (submit → confirm email received)
- [ ] Test Sanity Studio at `/studio` — confirm content appears on the site after publishing
- [ ] Verify `robots.txt` is live at `https://metricline.ca/robots.txt`

---

### G — Optional enhancements (post-launch)

These are not in scope for the initial build but are natural next steps:

| # | Enhancement | Effort |
|---|---|---|
| G1 | Individual case study detail pages (`/portfolio/[slug]`) | Medium — Sanity slug field + dynamic route already schema-ready |
| G2 | Individual team member pages | Low — add slug to teamMember schema |
| G3 | Blog / insights section | Medium — new Sanity schema + page |
| G4 | Equipment inquiry form per item | Low — pre-fill QuoteForm with equipment name |
| G5 | og:image per page (custom share images) | Low — Next.js ImageResponse in app/opengraph-image.tsx |
| G6 | Google Analytics / Plausible | Low — add script tag in layout.tsx |
| G7 | Vercel Analytics | Low — `@vercel/analytics` package |

---

## Environment Variables Reference

| Variable | Required for | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | CMS content loading | Sanity project dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | CMS content loading | Default: `production` |
| `RESEND_API_KEY` | Contact form email delivery | resend.com → API Keys |
| `CONTACT_EMAIL` | Where form submissions are sent | Client-confirmed email address |
| `FROM_EMAIL` | Sending address for form emails | Verified Resend domain address |

The site **builds and runs without any of these set** — all Sanity fetches fall back to static content in `lib/content.ts`, and the contact form API route handles missing credentials gracefully.

---

## File Map — Key locations

```
src/
├── lib/
│   ├── content.ts          ← All static copy + TODO placeholders
│   ├── schema.ts           ← JSON-LD builders (Phase 9)
│   └── sanity.ts           ← CMS client + fetch functions + fallbacks
├── sanity/schema/          ← CMS content type definitions
│   ├── caseStudy.ts
│   ├── teamMember.ts
│   ├── equipment.ts
│   └── openRole.ts
├── app/
│   ├── sitemap.ts          ← /sitemap.xml
│   ├── robots.ts           ← /robots.txt
│   ├── studio/[[...tool]]/ ← Sanity Studio at /studio
│   └── api/contact/        ← Resend email API route
└── components/
    └── ui/
        └── JsonLd.tsx      ← JSON-LD script renderer
```
