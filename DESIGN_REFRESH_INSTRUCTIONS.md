# Metricline — Design Refresh Implementation Instructions
## For Claude Code — New Session

---

## CONTEXT

The site has been through a prior design overhaul (documented in `DESIGN_IMPLEMENTATION_LOG.md`) that
moved the base from pure black (`#0A0A0A`) to Prussian blue-steel (`#1C2B3A`). That overhaul is
complete and already in the codebase.

**The remaining problem:** User feedback confirms the site is still too dark and difficult to navigate.
A senior art direction review identified two root causes:

1. **Cold blue-steel backgrounds clash with the warm amber/gold logo** — the logo (`/public/ProjectLogo.png`)
   uses golden yellow → amber → orange-brown bars on a white background. Every dark page background
   is the wrong temperature.
2. **Four text tokens fail WCAG AA contrast ratios** — `#6B8DA8`, `#8A9EAD` (muted/dim labels used
   extensively in Hero, Nav, and all section components) are unreadable on dark backgrounds.

**The fix has two parts:**
- Replace all cold blue-steel tokens with warm charcoal/iron tones
- Introduce alternating light sections (`#F5F0E8` warm linen) on every content page so the site is not
  a continuous wall of darkness

---

## TECH STACK NOTES

- Next.js 14 App Router, Tailwind CSS v4 (token-based via `@theme` in `globals.css`), Framer Motion
- Color tokens live in `src/app/globals.css` inside the `@theme {}` block
- Many components also contain **hardcoded hex values** (not tokens) — Phase C handles these
- TypeScript throughout — no `any`

---

## PHASE A — Global Token Replacement in `globals.css`

**File:** `src/app/globals.css`

Replace the entire color section inside `@theme {}` with the following. Do not change font or type
scale tokens — only colors.

```css
/* ── Group / Dark Base ──────────────────────────────── */
--color-group-bg:              #1A1410;
--color-group-surface:         #231D16;
--color-group-card:            #2C2519;
--color-group-card-hover:      #352D20;
--color-group-border:          #3B3026;
--color-group-border-light:    #4A3D2F;
--color-group-muted:           #9A8870;
--color-group-text:            #F5F0E8;
--color-group-text-muted:      #9A8870;

/* ── Light Surface Tokens (NEW — add these) ─────────── */
--color-light-bg:              #F5F0E8;
--color-light-surface:         #EDE7DC;
--color-light-card:            #FFFFFF;
--color-light-border:          #D4C9B8;

/* ── Explicit text scale ────────────────────────────── */
--color-text-primary:          #F5F0E8;
--color-text-secondary:        #C8B89A;
--color-text-muted:            #9A8870;
--color-text-dim:              #7A6858;

/* ── Text on light backgrounds (NEW — add these) ────── */
--color-text-on-light:         #1A1410;
--color-text-on-light-secondary: #3D3020;
--color-text-on-light-muted:   #6B5A45;

/* ── Projects ─────────────────────────────────────────── */
--color-projects-bg:           #18140E;
--color-projects-surface:      #211A11;
--color-projects-card:         #2A2115;
--color-projects-border:       #3A2E1C;
--color-projects-accent:       #C8832A;
--color-projects-accent-hover: #D99440;
--color-projects-text:         #F5F0E8;
--color-projects-text-muted:   #9A8870;

/* ── Rentals ──────────────────────────────────────────── */
--color-rentals-bg:            #171410;
--color-rentals-surface:       #1E1A13;
--color-rentals-card:          #252018;
--color-rentals-border:        #352C1E;
--color-rentals-accent:        #F0A820;
--color-rentals-accent-hover:  #F7B831;
--color-rentals-text:          #F5F0E8;
--color-rentals-text-muted:    #9A8870;

/* ── Operations ───────────────────────────────────────── */
--color-operations-bg:         #0E1E16;
--color-operations-surface:    #122419;
--color-operations-card:       #172C1E;
--color-operations-border:     #1E3B28;
--color-operations-accent:     #1FC87A;
--color-operations-accent-hover: #35D48A;
--color-operations-text:       #F5F0E8;
--color-operations-text-muted: #9A8870;
```

Also update the two base rules below `@theme {}`:
```css
html { background: #1A1410; color: #F5F0E8; }
body { background: #1A1410; color: #F5F0E8; font-family: var(--font-barlow), system-ui, sans-serif; ... }
```

And the scrollbar:
```css
::-webkit-scrollbar-track  { background: #231D16; }
::-webkit-scrollbar-thumb  { background: #3B3026; }
::-webkit-scrollbar-thumb:hover { background: #4A3D2F; }
```

**Acceptance:** `npm run build` passes. No TypeScript errors introduced.

---

## PHASE B — Typography Minimum Size Fix in `globals.css`

**File:** `src/app/globals.css`

In the `@theme {}` block, update:
```css
--text-label:   12px;    /* was 11px */
--text-body-sm: 14px;    /* was 13px */
```

**Acceptance:** No visual regressions on components using `text-label` or `text-body-sm`.

---

## PHASE C — Hardcoded Cold-Blue Color Purge (All Components)

**Goal:** Find and replace every hardcoded cold blue-steel hex that won't be caught by the token
swap in Phase A.

Read each affected file, understand context (dark surface vs. light surface), then apply the
correct warm replacement. Do not do a blind global find-replace — check each one.

### Replacement map

| Old value | New value | Notes |
|---|---|---|
| `#6B8DA8` | `#9A8870` | Dim text on dark — use `#6B5A45` if on light bg |
| `#8A9EAD` | `#9A8870` | Muted text on dark |
| `#3A5270` | `#3B3026` | Border on dark |
| `#2E4E70` | `#3A2E1C` | Projects border |
| `#1C3050` | `#211A11` | Projects surface |
| `#243447` | `#231D16` | Group surface |
| `#344A66` | `#352D20` | Hover state |
| `#16263A` | `#18140E` | Projects bg |
| `#1C2B3A` | `#1A1410` | Group bg (any stragglers) |
| `text-[9px]` | `text-[11px]` | Min readable mono size |
| `text-[10px]` | `text-[11px]` | Min readable mono size |

### Files known to contain hardcoded values (read each before editing):

- `src/components/sections/home/Hero.tsx`
- `src/components/layout/Nav.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/sections/home/StatsBar.tsx`
- `src/components/sections/home/DivisionsOverview.tsx`
- `src/components/sections/home/ProcessSteps.tsx`
- `src/components/sections/home/CtaBanner.tsx`
- `src/components/sections/home/SectorsCallout.tsx`
- `src/components/sections/home/FeaturedProjects.tsx`
- `src/components/sections/home/ClientLogos.tsx`
- `src/components/sections/about/AboutHero.tsx`
- `src/components/sections/about/CompanyStory.tsx`
- `src/components/sections/about/MissionQuote.tsx`
- `src/components/sections/about/Differentiators.tsx`
- `src/components/sections/about/CoreValues.tsx`
- `src/components/sections/about/HseSection.tsx`
- `src/components/sections/about/LeadershipSection.tsx`
- `src/components/sections/projects/ProjectsHero.tsx`
- `src/components/sections/projects/ServicesList.tsx`
- `src/components/sections/projects/CaseStudies.tsx`
- `src/components/sections/projects/IndustriesTags.tsx`
- `src/components/sections/projects/ProjectsContactCta.tsx`
- `src/components/sections/rentals/RentalsHero.tsx`
- `src/components/sections/rentals/EquipmentCatalog.tsx`
- `src/components/sections/rentals/QuoteForm.tsx`
- `src/components/sections/rentals/ServiceArea.tsx`
- `src/components/sections/operations/OperationsHero.tsx`
- `src/components/sections/operations/OperationsServices.tsx`
- `src/components/sections/operations/HseqSection.tsx`
- `src/components/sections/operations/OperationsCaseStudies.tsx`
- `src/components/sections/divisions/DivisionPanels.tsx`
- `src/components/sections/portfolio/PortfolioHeader.tsx`
- `src/components/sections/portfolio/PortfolioGrid.tsx`
- `src/components/sections/clients/ClientsHeader.tsx`
- `src/components/sections/clients/ClientLogosGrid.tsx`
- `src/components/sections/clients/IndustriesGrid.tsx`
- `src/components/sections/careers/CareersHero.tsx`
- `src/components/sections/careers/OpenRoles.tsx`
- `src/components/sections/contact/ContactHero.tsx`
- `src/components/sections/contact/ContactForm.tsx`
- `src/components/sections/contact/ContactInfo.tsx`

Also check all UI components in `src/components/ui/`.

**Acceptance:** `grep -r "#6B8DA8\|#8A9EAD\|#3A5270\|#243447\|#344A66\|#16263A\|#1C2B3A" src/`
returns zero results.

---

## PHASE D — Introduce Alternating Light Sections (Home Page)

**Goal:** Break the continuous dark background by making specific sections light. Dark cards placed
on a light background create natural contrast and visual rhythm.

Apply the following background changes on the **home page sections only** in Phase D. Other pages
follow in Phase F.

### Section-by-section changes

**`src/components/sections/home/StatsBar.tsx`**
- Section wrapper: change to `bg-light-bg border-y border-light-border`
- Stat numbers: `text-text-on-light`
- Stat labels: `text-text-on-light-muted`
- Divider lines between columns: `border-light-border`

**`src/components/sections/home/DivisionsOverview.tsx`**
- Section wrapper: change to `bg-light-bg`
- Section label eyebrow: `text-text-on-light-muted`
- H2: `text-text-on-light`
- The three division cards keep their own dark division backgrounds — they will pop visually
  against the linen wrapper

**`src/components/sections/home/FeaturedProjects.tsx`**
- Section wrapper: change to `bg-light-bg`
- Section label: `text-text-on-light-muted`
- H2: `text-text-on-light`
- Project cards keep their dark card background — same visual pop principle as above

**`src/components/sections/home/CtaBanner.tsx`**
- Change from dark band to solid amber fill: `bg-[#C8832A]`
- All text: `text-white`
- Buttons: primary button becomes white fill with `text-[#1A1410]`; ghost button becomes
  white border with `text-white hover:bg-white/10`
- Remove any existing border-left accent — the entire section is the accent

**Leave as dark** (keep existing dark backgrounds):
- `Hero.tsx` — always dark
- `SectorsCallout.tsx` — dark
- `ProcessSteps.tsx` — dark
- `ClientLogos.tsx` — dark

The final home page rhythm is:
`Hero(dark) → Stats(light) → Sectors(dark) → Divisions(light) → Process(dark) → Projects(light) → Clients(dark) → CTA(amber)`

**Acceptance:** Scroll the home page — light and dark sections clearly alternate. No text
contrast failures on light sections.

---

## PHASE E — Nav Contrast Fix

**File:** `src/components/layout/Nav.tsx`

1. Scrolled-state background: change to `bg-[#231D16]/96 backdrop-blur-sm border-b border-[#3B3026]`
2. Nav link text (non-active): change to `text-[#C8B89A] hover:text-[#F5F0E8]`
3. Active nav link: `text-[#F5F0E8]`
4. "Get in touch" button: border `border-[#C8832A]` text `text-[#C8832A]` hover `bg-[#C8832A] text-white`
5. Divisions dropdown wrapper background: `bg-[#231D16]/98 border border-[#3B3026]`
6. Dropdown hover state on division cards: `hover:bg-[#352D20]`

**Acceptance:** Nav is readable at all scroll positions. No cold blue tones visible.

---

## PHASE F — Alternating Light Sections (All Other Pages)

Apply the same dark/light alternation logic from Phase D to every content page.

**Rule:**
- Hero sections → always dark (`bg-group-bg` or division bg)
- First content section after hero → light (`bg-light-bg`)
- Alternate dark/light for each subsequent section
- Final CTA/contact band → amber (`bg-[#C8832A]`) or dark

Work through each page file and its imported section components:

### `src/app/about/page.tsx` and About sections
```
AboutHero           → dark  (keep)
CompanyStory        → light (bg-light-bg, text-text-on-light)
MissionQuote        → dark  (keep dark, amber quotation marks)
Differentiators     → light (bg-light-bg)
CoreValues          → dark  (keep)
HseSection          → light (bg-light-bg)
LeadershipSection   → dark  (keep)
```

### `src/app/projects/page.tsx` and Projects sections
```
ProjectsHero        → dark  (projects-bg)
ServicesList        → light (bg-light-bg, cards keep dark surface)
CaseStudies         → dark  (projects-bg or group-bg)
IndustriesTags      → light (bg-light-bg)
ProjectsContactCta  → amber (bg-[#C8832A])
```

### `src/app/rentals/page.tsx` and Rentals sections
```
RentalsHero         → dark  (rentals-bg)
EquipmentCatalog    → light (bg-light-bg)
QuoteForm           → dark  (rentals-bg or group-bg)
ServiceArea         → light (bg-light-bg)
```

### `src/app/operations/page.tsx` and Operations sections
```
OperationsHero      → dark  (operations-bg)
OperationsServices  → light (bg-light-bg)
OperationsCaseStudies → dark
HseqSection         → light (bg-light-bg)
```

### `src/app/portfolio/page.tsx`
```
PortfolioHeader     → light (bg-light-bg, text-text-on-light)
PortfolioGrid       → dark  (bg-group-bg)
```

### `src/app/clients/page.tsx`
```
ClientsHeader       → light (bg-light-bg)
ClientLogosGrid     → dark
IndustriesGrid      → light (bg-light-bg)
```

### `src/app/careers/page.tsx`
```
CareersHero         → dark
OpenRoles           → light (bg-light-bg)
```
(Values section reuse — follow same dark/light as its source)

### `src/app/contact/page.tsx`
```
ContactHero         → dark
ContactForm + ContactInfo two-column → light (bg-light-bg, all form inputs on white cards)
```

### `src/app/divisions/page.tsx`
```
DivisionPanels full-viewport cards → keep their own division bg colors
Page wrapper → dark (bg-group-bg)
```

**When applying light backgrounds to a section**, always update:
- Section wrapper bg → `bg-light-bg`
- Section label / eyebrow text → `text-text-on-light-muted`
- H2 headings → `text-text-on-light`
- Body paragraphs → `text-text-on-light-secondary`
- Any 1px divider lines → `border-light-border`
- Cards within light sections → keep `bg-group-card` (dark cards on linen — intentional contrast)
- Icon colors within light sections → use accent color or `text-text-on-light-muted`

**Acceptance:** Every page has at least one light section visible without scrolling past the hero.

---

## PHASE G — Footer Update

**File:** `src/components/layout/Footer.tsx`

- Footer background: `bg-[#120F0B]` (slightly darker than group-bg for clear page termination)
- Top border: `border-t border-[#3B3026]`
- All text: warm tones, no cold blue-grey
- Link hover color: `#C8832A`
- Copyright text: `text-[#7A6858]`

---

## FINAL CHECKS (run after all phases complete)

1. **Build:** `npm run build` — must pass with zero errors
2. **Contrast audit:** Check these specific combinations visually:
   - Muted text on `#F5F0E8` light bg — must be clearly readable
   - Accent `#C8832A` on dark bg — must be clearly readable
   - White text on amber CTA `#C8832A` — must be clearly readable
3. **Cold tone audit:** Run `grep -r "#6B8DA8\|#8A9EAD\|#3A5270\|#243447\|#1C2B3A\|#344A66" src/` — must return zero results
4. **Mobile check:** Test at 375px viewport width — light sections must not break layout
5. **Logo check:** Open the Nav at desktop width — the logo (`/public/ProjectLogo.png`) with its
   white background should now feel visually consistent with the warm site palette around it

---

## DO NOT CHANGE

- Font families (`Barlow`, `Barlow Condensed`, `JetBrains Mono`) — these are correct
- Framer Motion animation variants in `src/lib/animations.ts`
- All content in `src/lib/content.ts`
- Sanity schema or CMS integration
- Operations division accent `#1FC87A` (teal) — intentionally distinct
- The `TODO_CONTENT` and `TODO_ASSET` placeholder patterns

---

## PRIORITY ORDER

If implementing incrementally, do phases in this order for maximum visible impact per session:

1. **A** — Token swap (unblocks everything, lowest risk)
2. **C** — Hardcoded purge (fixes contrast failures immediately)
3. **B** — Type sizes (quick win, high legibility impact)
4. **E** — Nav fix (visible on every page)
5. **D** — Home page light sections (most visited page)
6. **F** — All other pages
7. **G** — Footer
