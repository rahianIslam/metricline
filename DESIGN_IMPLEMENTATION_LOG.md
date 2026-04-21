# DESIGN_IMPLEMENTATION_LOG.md
## Metricline Website — Design Overhaul

**Authored by:** Senior Design Lead Review (April 2026)  
**Status:** Awaiting implementation  
**Purpose:** Step-by-step implementation guide for Claude Code. Read all phases before starting any. Do not skip phases — each builds on the prior.

---

## WHY THESE CHANGES

The current site uses a near-pure-black palette (#0A0A0A) with white text at heavy opacity reduction
(white/25 through white/55). This combination reads as a tech startup or crypto product — not an
established EPCM firm. The target audience (VP Engineering, Project Directors, Plant Managers at
Operator companies) evaluates credibility through structure, density, and legibility. They scan
quickly, often on bright-lit monitors or tablets. Every design decision below serves that audience.

The single biggest change: swap pure black for deep Prussian blue-steel (#1C2B3A). This alone
moves the emotional register from "digital-native startup" to "engineering authority."

---

## NEW DESIGN TOKENS (reference for all phases)

```
Background base:    #1C2B3A   (was #0A0A0A)
Surface:            #243447   (was #111111)
Card:               #2D4059   (was #161616)
Card hover:         #344A66   (new)
Border:             #3A5270   (was #222222)
Border light:       #4A6280   (new)

Text primary:       #F0EDE8   (was #FFFFFF — warm white, easier on eyes)
Text secondary:     #B8C4CC   (replaces white/50–55 opacity)
Text muted:         #8A9EAD   (replaces white/40 opacity)
Text dim:           #6B8DA8   (replaces white/25–30 opacity — minimum value used)

Accent (orange):    #C8832A   (was #E8742A — deeper, more refined)
Accent hover:       #D99440   (was #F08040)
Accent dim:         rgba(200,131,42,0.12)  (background highlights)

Projects bg:        #16263A   (was #0D1825 — lightened toward steel)
Projects surface:   #1C3050   (was #0E1F35)
Projects card:      #223858   (was #111E30)
Projects border:    #2E4E70   (was #1A2D45)

Rentals bg:         #1A1A1A   (was #0F0F0F — one step lighter)
Rentals surface:    #202020   (was #141414)
Rentals card:       #272727   (was #1A1A1A)
Rentals border:     #333333   (was #252525)

Operations bg:      #0F2219   (was #091712 — one step lighter)
Operations surface: #142C20   (was #0C1E16)
Operations card:    #193526   (was #0E2419)
Operations border:  #1F4330   (was #143020)

Display font:       'Barlow Condensed' (700, 800) — replaces Inter for headings/display
Body font:          'Barlow' (400, 500, 600) — replaces Inter for body
Mono font:          'JetBrains Mono' (400, 500) — unchanged
```

**Rule:** No opacity-based text anywhere in the codebase after Phase 2.
Replace every `text-white/[N]` with its explicit equivalent from the token list above.

---

## PHASE 1 — Palette & Font Migration
**Goal:** Update all global design tokens. No component logic changes.  
**Estimated effort:** 1 session  
**Files touched:** `src/app/globals.css`, `src/app/layout.tsx`

---

### 1.1 — Update globals.css color tokens

**File:** `src/app/globals.css`

Replace the entire `@theme` block (lines 7–82) with the following:

```css
@theme {
  /* ── Fonts ─────────────────────────────────────────────── */
  --font-sans: var(--font-barlow);
  --font-display: var(--font-barlow-condensed);
  --font-mono: var(--font-jetbrains-mono);

  /* ── Group / Neutral Base ───────────────────────────────── */
  --color-group-bg:           #1C2B3A;
  --color-group-surface:      #243447;
  --color-group-card:         #2D4059;
  --color-group-card-hover:   #344A66;
  --color-group-border:       #3A5270;
  --color-group-border-light: #4A6280;
  --color-group-muted:        #8A9EAD;
  --color-group-text:         #F0EDE8;
  --color-group-text-muted:   #8A9EAD;

  /* Explicit text scale — replaces opacity system */
  --color-text-primary:   #F0EDE8;
  --color-text-secondary: #B8C4CC;
  --color-text-muted:     #8A9EAD;
  --color-text-dim:       #6B8DA8;

  /* ── Projects — steel navy + refined orange ─────────────── */
  --color-projects-bg:           #16263A;
  --color-projects-surface:      #1C3050;
  --color-projects-card:         #223858;
  --color-projects-border:       #2E4E70;
  --color-projects-accent:       #C8832A;
  --color-projects-accent-hover: #D99440;
  --color-projects-text:         #F0EDE8;
  --color-projects-text-muted:   #8A9EAD;

  /* ── Rentals — dark + yellow (lightened base) ───────────── */
  --color-rentals-bg:           #1A1A1A;
  --color-rentals-surface:      #202020;
  --color-rentals-card:         #272727;
  --color-rentals-border:       #333333;
  --color-rentals-accent:       #F5C30A;
  --color-rentals-accent-hover: #F7CD30;
  --color-rentals-text:         #F0EDE8;
  --color-rentals-text-muted:   #8A9EAD;

  /* ── Operations — dark green + teal (lightened base) ───── */
  --color-operations-bg:           #0F2219;
  --color-operations-surface:      #142C20;
  --color-operations-card:         #193526;
  --color-operations-border:       #1F4330;
  --color-operations-accent:       #1FC87A;
  --color-operations-accent-hover: #35D48A;
  --color-operations-text:         #F0EDE8;
  --color-operations-text-muted:   #8A9EAD;

  /* ── Type Scale ─────────────────────────────────────────── */
  --text-display-xl:               64px;
  --text-display-xl--line-height:  1.0;

  --text-display-lg:               52px;
  --text-display-lg--line-height:  1.05;

  --text-display-md:               44px;
  --text-display-md--line-height:  1.1;

  --text-heading-lg:               32px;
  --text-heading-lg--line-height:  1.2;

  --text-heading-md:               24px;
  --text-heading-md--line-height:  1.3;

  --text-heading-sm:               18px;
  --text-heading-sm--line-height:  1.4;

  --text-body-lg:                  16px;
  --text-body-lg--line-height:     1.7;

  --text-body-md:                  15px;
  --text-body-md--line-height:     1.6;

  --text-body-sm:                  13px;
  --text-body-sm--line-height:     1.5;

  --text-label:                    11px;
  --text-label--line-height:       1;
  --text-label--letter-spacing:    0.15em;
}
```

Also replace the `html` and `body` base rules and scrollbar colors:

```css
html {
  background: #1C2B3A;
  color: #F0EDE8;
  scroll-behavior: smooth;
}

body {
  background: #1C2B3A;
  color: #F0EDE8;
  font-family: var(--font-barlow), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar-track {
  background: #243447;
}
::-webkit-scrollbar-thumb {
  background: #3A5270;
  border-radius: 3px;
}
```

Add two new utility classes after the scrollbar block:

```css
/* ── Blueprint grid texture — CSS-only, used in hero ──────── */
.blueprint-grid {
  background-image:
    linear-gradient(var(--color-group-border-light) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-group-border-light) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.07;
}

/* ── Credential badge ─────────────────────────────────────── */
.credential-badge {
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-group-border-light);
  padding: 5px 10px;
  background: var(--color-group-surface);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
```

---

### 1.2 — Update font imports in layout.tsx

**File:** `src/app/layout.tsx`

Replace the Google Fonts import block. Remove `Inter`. Add `Barlow` and `Barlow_Condensed`:

```typescript
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

Update the `<body>` className to include all three variables:

```typescript
<body className={`${barlow.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}>
```

Update the `<html>` className references — replace `font-inter` with `font-barlow`.

**Note:** After this change, any component using `font-display` (i.e., the `--font-display` CSS var)
will render in Barlow Condensed. The body uses Barlow. Mono stays as JetBrains Mono.
Apply `font-display` class to all H1, H2, H3, and section number elements in subsequent phases.

---

### 1.3 — Acceptance check for Phase 1

Run `npm run dev`. Verify:
- Background is now blue-steel (#1C2B3A), not pure black
- Text appears in warm white (#F0EDE8), not pure white
- Fonts are loading: Barlow Condensed for display, Barlow for body
- No visual regressions in layout/spacing

---

## PHASE 2 — Opacity Text Purge
**Goal:** Replace every `text-white/[N]` class with the explicit colour token equivalent.  
**This is the highest-impact legibility change.**  
**Estimated effort:** 1 session  
**Files touched:** All component files listed below

---

### Replacement map

Use this table for every substitution across all files:

| Old class              | Replace with                    | Context                        |
|------------------------|---------------------------------|--------------------------------|
| `text-white/25`        | `text-[#6B8DA8]`                | Hero H1 last line, decorative  |
| `text-white/30`        | `text-[#6B8DA8]`                | Section heading second part    |
| `text-white/40`        | `text-[#8A9EAD]`                | Eyebrows, stat labels, muted   |
| `text-white/45`        | `text-[#8A9EAD]`                | Division text-muted            |
| `text-white/50`        | `text-[#B8C4CC]`                | Body copy, descriptions        |
| `text-white/55`        | `text-[#B8C4CC]`                | Hero subheading                |
| `text-white/60`        | `text-[#B8C4CC]`                | Nav links default state        |
| `text-white/20`        | `text-[#6B8DA8]`                | Footer secondary, copyright    |
| `bg-white/5`           | `bg-[#344A66]`                  | Hover background overlays      |
| `bg-white/[0.01]`      | `bg-[#243447]/30`               | Hero right column overlay      |
| `border-white/30`      | `border-[#3A5270]`              | Ghost button border            |
| `border-white/70`      | `border-[#8A9EAD]`              | Ghost button border on hover   |
| `border-white/20`      | `border-[#3A5270]`              | Light borders                  |
| `text-white/[0.25]`    | `text-[#6B8DA8]`                | Hero H1 last line              |
| `opacity-0.04`         | Keep — only on SVG decorative   |                                |

---

### 2.1 — Hero.tsx

**File:** `src/components/sections/home/Hero.tsx`

Line 105: `text-white/40` → `text-[#8A9EAD]`  
Line 113: `text-white` stays (primary text — now #F0EDE8 from body default)  
Line 118: `text-white/[0.25]` → `text-[#6B8DA8]`  
Line 127: `text-white/55` → `text-[#B8C4CC]`  
Line 177: `text-white/20` → `text-[#6B8DA8]`  

Also: remove the scroll indicator block entirely (lines 170–179). Engineers know how to scroll.
The orange bottom rule stays.

---

### 2.2 — StatsBar.tsx / StatCard.tsx

**File:** `src/components/ui/StatCard.tsx`

Line 35: `text-white` stays (primary — inherits #F0EDE8)  
Line 38: `text-white/40` → `text-[#8A9EAD]`  

---

### 2.3 — DivisionsOverview.tsx

**File:** `src/components/sections/home/DivisionsOverview.tsx`

Line 96: `text-white/30` → `text-[#6B8DA8]`  
Line 61: `style={{ color: division.textMuted }}` — this uses the content config value.
Update `DIVISIONS` in `src/lib/content.ts`: change each division's `textMuted` value
from `rgba(255,255,255,0.5)` / `rgba(255,255,255,0.45)` to `#B8C4CC`.

---

### 2.4 — FeaturedProjects.tsx

**File:** `src/components/sections/home/FeaturedProjects.tsx`

Line 54: `text-white/40` → `text-[#8A9EAD]`  
Line 65: `text-white/50` → `text-[#B8C4CC]`  
Line 139: `text-white/30` → `text-[#6B8DA8]`  

---

### 2.5 — Nav.tsx

**File:** `src/components/layout/Nav.tsx`

All `text-white/60` (nav link default) → `text-[#B8C4CC]`  
All `text-white/40` (dropdown tagline) → `text-[#8A9EAD]`  
`bg-group-surface/95` stays — Tailwind handles the alpha on the now-correct surface color.  
`hover:bg-white/5` → `hover:bg-[#344A66]`  

---

### 2.6 — Footer.tsx

**File:** `src/components/layout/Footer.tsx`

All `text-white/40` → `text-[#8A9EAD]`  
All `text-white/30` → `text-[#8A9EAD]`  
All `text-white/20` → `text-[#6B8DA8]`  
All `text-white/25` → `text-[#6B8DA8]`  

---

### 2.7 — Button.tsx

**File:** `src/components/ui/Button.tsx`

Ghost variant (line 34):
```typescript
// Before:
"bg-transparent text-white border border-white/30 hover:border-white/70 hover:bg-white/5"

// After:
"bg-transparent text-[#F0EDE8] border border-[#3A5270] hover:border-[#8A9EAD] hover:bg-[#344A66]"
```

Primary variant (line 32) — change white button to accent orange:
```typescript
// Before:
"bg-white text-black hover:bg-white/90 border border-white/0"

// After:
"bg-[#C8832A] text-white hover:bg-[#D99440] border border-transparent"
```

This is a significant change. The current white primary button reads as a UI component button.
An orange primary button reads as an industrial CTA — it matches the accent system and is more
legible as a call-to-action for an engineering audience. Confirm with user before implementing.

---

### 2.8 — About page components

Apply the same replacement map to every component under:
- `src/components/sections/home/ClientLogos.tsx`
- `src/components/sections/home/CtaBanner.tsx` (if exists)
- `src/app/about/` section components (AboutHero, CompanyStory, MissionQuote, etc.)
- `src/app/projects/` section components

Pattern: grep the entire `src/` directory for `text-white/` and replace each hit using the map.
Command to identify all instances: search for `text-white/` across all `.tsx` files.

---

### 2.9 — Acceptance check for Phase 2

After substitutions:
- No `text-white/[N]` patterns should remain in any `.tsx` file (except SVG opacity attributes)
- Run Lighthouse accessibility audit — contrast scores should pass WCAG AA on all text
- Body copy should be clearly readable on the new steel-blue background
- Muted text should still read as secondary, not invisible

---

## PHASE 3 — Hero Redesign
**Goal:** Restructure the hero section for credibility-first information architecture.  
**Estimated effort:** 1 session  
**Files touched:** `src/components/sections/home/Hero.tsx`, `src/lib/content.ts`

---

### 3.1 — Replace GeometricPattern with blueprint grid

**File:** `src/components/sections/home/Hero.tsx`

Delete the `GeometricPattern` function (lines 11–43). Replace its usage with a simple `<div>`:

```tsx
{/* Blueprint grid texture */}
<div
  className="absolute inset-0 pointer-events-none blueprint-grid"
  aria-hidden="true"
/>
```

The `.blueprint-grid` class is defined in Phase 1.1. This replaces the diagonal-line SVG with
a right-angle grid that reads as an engineering drawing background.

---

### 3.2 — Add credential badges above eyebrow

**File:** `src/components/sections/home/Hero.tsx`

Inside the left motion.div, before the eyebrow `<motion.p>`, insert:

```tsx
{/* Credential badges — trust signals above the fold */}
<motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
  <span className="credential-badge">
    <span style={{ color: "#C8832A" }}>●</span>
    APEGA Registered
  </span>
  <span className="credential-badge">
    <span style={{ color: "#C8832A" }}>●</span>
    APEGS Registered
  </span>
</motion.div>
```

---

### 3.3 — Update hero H1

**File:** `src/components/sections/home/Hero.tsx`

The current H1 has `text-display-xl` (72px). Change to 64px via inline style override or update
the token in Phase 1 (already updated to 64px in the token). Also apply Barlow Condensed:

```tsx
<motion.h1
  variants={fadeUp}
  className="font-display text-display-xl font-extrabold uppercase leading-[1.0] tracking-[-0.02em] text-[#F0EDE8] mb-8"
>
  <span className="block">Engineering,</span>
  <span className="block">Procurement,</span>
  <span className="block">Construction,</span>
  <span className="block text-[#6B8DA8]">& Execution.</span>
</motion.h1>
```

Changes: shorter last line, `text-[#6B8DA8]` instead of `text-white/[0.25]`, added `font-display`
and `uppercase` for Barlow Condensed rendering.

---

### 3.4 — Add orange accent rule between H1 and subheading

```tsx
<motion.div
  variants={fadeUp}
  className="w-12 h-[3px] mb-7"
  style={{ background: "#C8832A" }}
  aria-hidden="true"
/>
```

---

### 3.5 — Replace RightGeometry with CapabilitySummary

**File:** `src/components/sections/home/Hero.tsx`

Delete the `RightGeometry` function (lines 48–80) entirely.

Create a new `CapabilitySummary` component in the same file:

```tsx
const CAPABILITIES = [
  {
    number: "01",
    title: "Full-Scope EPCM",
    detail: "Concept · Pre-FEED · FEED · Detailed Engineering · Procurement · Construction",
  },
  {
    number: "02",
    title: "Industrial Sectors",
    detail: "Oil & Gas · Petrochemical · Energy Transition · Rail & Bulk Handling",
  },
  {
    number: "03",
    title: "Service Regions",
    detail: "Alberta · Saskatchewan · British Columbia",
  },
  {
    number: "04",
    title: "Brownfield & Greenfield",
    detail: "Proven in live facilities — safety, uptime, and site constraints understood",
  },
];

function CapabilitySummary() {
  return (
    <div className="w-full">
      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#6B8DA8] mb-6 pb-4 border-b border-[#3A5270]">
        Core Capabilities
      </p>
      {CAPABILITIES.map((item, i) => (
        <motion.div
          key={item.number}
          className="grid grid-cols-[20px_1fr] gap-4 py-4 border-b border-[#3A5270]"
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-[9px] text-[#C8832A] pt-0.5 font-medium">
            {item.number}
          </span>
          <div>
            <p className="font-display text-[15px] font-bold uppercase tracking-[0.03em] text-[#F0EDE8] mb-1">
              {item.title}
            </p>
            <p className="font-mono text-[10px] text-[#8A9EAD] leading-relaxed tracking-[0.04em]">
              {item.detail}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

Update the right column JSX:

```tsx
{/* Right — Capability Summary */}
<div className="hidden lg:flex items-center justify-center relative border-l border-[#3A5270] px-12">
  <CapabilitySummary />
</div>
```

Remove `bg-white/[0.01]` overlay div — no longer needed.

---

### 3.6 — Add accent-rule animation variant to animations.ts

**File:** `src/lib/animations.ts`

Append this new variant:

```typescript
// ── Clip Reveal ───────────────────────────────────────────────
// Used for capability summary items and section headers.
// Reads as a blueprint drawing being revealed — on-brand for EPCM.

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
```

---

### 3.7 — Acceptance check for Phase 3

- Hero has credential badges above eyebrow, visible above the fold
- Right column shows the 4-item capability summary with clip-reveal animation
- Blueprint grid replaces diagonal lines (right-angle, more structured)
- Scroll indicator is gone
- H1 renders in Barlow Condensed, uppercase, 64px
- Orange accent rule appears between H1 and subheading

---

## PHASE 4 — Stats Bar Enhancement
**Goal:** Add fill-bar animation and improve stat label copy.  
**Estimated effort:** 0.5 session  
**Files touched:** `src/components/ui/StatCard.tsx`, `src/components/sections/home/StatsBar.tsx`

---

### 4.1 — Update StatCard layout and add fill bar

**File:** `src/components/ui/StatCard.tsx`

Replace the component with:

```tsx
"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";
import type { StatItem } from "@/types";

interface StatCardProps {
  stat: StatItem;
  inView: boolean;
  showDivider?: boolean;
  index?: number;
}

export default function StatCard({ stat, inView, showDivider = false, index = 0 }: StatCardProps) {
  const animated = useCountUp(stat.numericValue, { inView, duration: 1800 });

  const display =
    stat.numericValue === -1
      ? stat.value
      : `${stat.prefix ?? ""}${animated}${stat.suffix ?? ""}`;

  return (
    <div
      className={[
        "relative flex flex-col justify-center py-10 px-8 overflow-hidden",
        showDivider ? "border-r border-[#3A5270]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Animated fill bar at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#C8832A]"
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 1.8, delay: 0.5 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <span className="font-display text-display-md font-bold text-[#F0EDE8] leading-none mb-3">
        {display}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A9EAD] leading-snug">
        {stat.label}
      </span>
    </div>
  );
}
```

---

### 4.2 — Pass index to StatCard in StatsBar

**File:** `src/components/sections/home/StatsBar.tsx`

Update the `.map()` call to pass `index`:

```tsx
{HOME_STATS.map((stat, i) => (
  <StatCard
    key={stat.label}
    stat={stat}
    inView={inView}
    showDivider={i < HOME_STATS.length - 1}
    index={i}
  />
))}
```

Also change the section bg:
```tsx
className="bg-group-surface border-t border-b border-group-border"
```
This now resolves to #243447 / #3A5270 from the new tokens — no explicit changes needed here.

---

### 4.3 — Update stat label copy in content.ts

**File:** `src/lib/content.ts`

Make labels full and unambiguous (no abbreviations):

```typescript
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
```

Note: the `\n` newline will require the StatCard label to use `whitespace-pre-line` if two-line
labels are desired. Add `whitespace-pre-line` class to the label `<span>` in StatCard.

---

## PHASE 5 — Service Card Enhancement
**Goal:** Add deliverable type field to each service card. Make hover interaction feel precise.  
**Estimated effort:** 1 session  
**Files touched:** `src/types/index.ts`, `src/lib/content.ts`, `src/components/sections/projects/ServicesList.tsx`

---

### 5.1 — Add deliverable field to Service type

**File:** `src/types/index.ts`

Find the `Service` interface and add:

```typescript
interface Service {
  // ... existing fields ...
  deliverable: string;  // What the client physically receives
}
```

---

### 5.2 — Add deliverable copy to all 9 services in content.ts

**File:** `src/lib/content.ts`

Add `deliverable` to each service entry (find `PROJECTS_SERVICES` or equivalent array):

```typescript
{ title: "Concept Development & Business Case", deliverable: "Option screening report, conceptual cost estimate, project charter" },
{ title: "Pre-FEED", deliverable: "P&IDs (preliminary), basis of design, ±30% cost estimate" },
{ title: "FEED", deliverable: "IFD drawing set, equipment list, ±15% cost estimate" },
{ title: "Detailed Engineering", deliverable: "IFC drawing set, specifications, data sheets" },
{ title: "Procurement Support", deliverable: "Bid tabulation, purchase orders, expediting reports" },
{ title: "Fabrication & Equipment Supply", deliverable: "Fabricated assemblies, equipment packages, MDRs" },
{ title: "Construction Management", deliverable: "Construction progress reports, RFI log, turnover packages" },
{ title: "Commissioning & Start-Up", deliverable: "Commissioning records, as-built drawings, operating procedures" },
{ title: "Brownfield Modifications & Tie-Ins", deliverable: "MOC documentation, tie-in packages, redlined as-builts" },
```

---

### 5.3 — Update ServicesList card component

**File:** `src/components/sections/projects/ServicesList.tsx`

Inside each service card, add a deliverable footer after the description:

```tsx
{/* Deliverable type — answers "what do I get?" */}
<div className="mt-auto pt-4 border-t border-[#2E4E70]">
  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#6B8DA8]">
    <span className="text-[#8A9EAD] mr-1">Deliverable:</span>
    {service.deliverable}
  </p>
</div>
```

Also update the card hover interaction. Replace any left-border-only hover with a top-line draw:

```tsx
{/* Top line draw on hover — engineering precision signal */}
<div
  className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
  style={{ backgroundColor: "#C8832A" }}
  aria-hidden="true"
/>
```

Keep the left border flash as well — they combine cleanly.

Apply `font-display uppercase` to service card titles for Barlow Condensed rendering.

---

## PHASE 6 — Case Study Card Enhancement
**Goal:** Surface project scale and scope duration in case study meta. Improve placeholder.  
**Estimated effort:** 0.5 session  
**Files touched:** `src/types/index.ts`, `src/lib/content.ts`, `src/sanity/schema/caseStudy.ts`, `src/components/sections/home/FeaturedProjects.tsx`, `src/components/sections/projects/CaseStudies.tsx`

---

### 6.1 — Add projectValue and scopeDuration to CaseStudy type

**File:** `src/types/index.ts`

```typescript
interface CaseStudy {
  // ... existing fields ...
  projectValue?: string;    // e.g. "Confidential" or "$2.4M" when permitted
  scopeDuration?: string;   // e.g. "14 months"
}
```

---

### 6.2 — Update Sanity schema

**File:** `src/sanity/schema/caseStudy.ts`

Add two fields:
```typescript
{ name: "projectValue", title: "Project Value", type: "string" },
{ name: "scopeDuration", title: "Scope Duration", type: "string" },
```

---

### 6.3 — Update Remelter case study in content.ts

**File:** `src/lib/content.ts`

Add to the Remelter case study entry:
```typescript
projectValue: "Confidential",   // TODO_CLIENT: confirm if value can be disclosed
scopeDuration: "Ongoing",       // 2025–2026 ongoing
```

---

### 6.4 — Update case study card meta row

**File:** `src/components/sections/home/FeaturedProjects.tsx` (and CaseStudies.tsx)

Replace the current meta row with a 3-column grid:

```tsx
{/* Meta — 3 columns: Client, Location, Year */}
<div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-[#3A5270]">
  <div>
    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#6B8DA8] mb-1">Client</p>
    <p className="font-display text-[13px] font-bold uppercase text-[#F0EDE8]">{study.client}</p>
  </div>
  <div>
    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#6B8DA8] mb-1">Location</p>
    <p className="font-display text-[13px] font-bold uppercase text-[#F0EDE8]">{study.location}</p>
  </div>
  <div>
    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#6B8DA8] mb-1">Year</p>
    <p className="font-display text-[13px] font-bold uppercase text-[#F0EDE8]">{study.year}</p>
  </div>
</div>
```

Remove the MapPin and Calendar icon approach — replaced by this structured meta grid.

Apply `font-display uppercase` to case study card titles.

---

## PHASE 7 — Division Card Layout Adjustment
**Goal:** Give Projects card more visual weight — it is the lead division.  
**Estimated effort:** 0.5 session  
**Files touched:** `src/components/sections/home/DivisionsOverview.tsx`

---

### 7.1 — Update grid layout

**File:** `src/components/sections/home/DivisionsOverview.tsx`

Change the grid from `md:grid-cols-3` to an asymmetric layout:

```tsx
<motion.div
  ref={ref}
  variants={staggerContainer}
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
  className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1.5fr] gap-px bg-[#3A5270] border border-[#3A5270]"
>
```

Change division cards to `rounded-none` (no border-radius) — the seamless grid with 1px bg gaps
reads as a structured engineering layout, not a card gallery.

Remove the `gap-3` gap — replaced by `gap-px bg-[#3A5270]` for seamless borders.

Update individual card classes: remove `rounded-sm border` (border now handled by the grid bg).

---

### 7.2 — Apply font-display to division names

**File:** `src/components/sections/home/DivisionsOverview.tsx`

Line 58 (division name H3): add `font-display uppercase` classes:

```tsx
<h3 className="font-display text-heading-lg font-bold uppercase text-[#F0EDE8] leading-tight mb-3">
  {division.name}
</h3>
```

---

## PHASE 8 — New Home Page Section: "How We Work"
**Goal:** Add a 4-step process section between DivisionsOverview and FeaturedProjects.  
**Estimated effort:** 1 session  
**Files touched:** `src/app/page.tsx`, new file `src/components/sections/home/ProcessSteps.tsx`

---

### 8.1 — Create ProcessSteps component

**File:** `src/components/sections/home/ProcessSteps.tsx` (new file)

```tsx
"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { staggerContainer, clipReveal } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const STEPS = [
  {
    number: "01",
    phase: "Define",
    title: "Concept & Engineering",
    description: "We begin with the problem, not the solution. Concept development, option screening, Pre-FEED, and FEED establish what gets built and why, before capital is committed.",
  },
  {
    number: "02",
    phase: "Engineer",
    title: "Detailed Design",
    description: "Full-discipline detailed engineering — civil, structural, process, piping, electrical, instrumentation — produced to issued-for-construction standard.",
  },
  {
    number: "03",
    phase: "Procure & Fabricate",
    title: "Procurement & Supply",
    description: "Vendor selection, RFQ management, purchase orders, expediting, and fabrication coordination. Equipment arrives on time, to spec, with full documentation.",
  },
  {
    number: "04",
    phase: "Execute",
    title: "Construction & Start-Up",
    description: "Field execution with construction management, QA/QC, and commissioning. We stay accountable through start-up and performance verification.",
  },
];

export default function ProcessSteps() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-group-surface border-t border-group-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <SectionLabel className="mb-4">How We Work</SectionLabel>
          <h2 className="font-display text-display-md font-bold uppercase tracking-tight text-[#F0EDE8]">
            One team.{" "}
            <span className="text-[#6B8DA8]">End to end.</span>
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#3A5270] border border-[#3A5270]"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={clipReveal}
              className="bg-group-card p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#C8832A] font-medium tracking-[0.1em]">
                  {step.number}
                </span>
                <span className="font-mono text-[9px] text-[#6B8DA8] uppercase tracking-[0.16em]">
                  {step.phase}
                </span>
              </div>
              <h3 className="font-display text-[20px] font-bold uppercase tracking-[0.02em] text-[#F0EDE8] leading-tight">
                {step.title}
              </h3>
              <p className="text-[14px] text-[#B8C4CC] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 8.2 — Insert into home page

**File:** `src/app/page.tsx`

Import `ProcessSteps` and place it between `<DivisionsOverview />` and `<FeaturedProjects />`:

```tsx
import ProcessSteps from "@/components/sections/home/ProcessSteps";

// In JSX:
<DivisionsOverview />
<ProcessSteps />
<FeaturedProjects caseStudies={caseStudies} />
```

---

## PHASE 9 — CTA Banner Redesign (Trust-Closer)
**Goal:** Replace the generic CTA banner with a trust-closer: numbers earn the ask.  
**Estimated effort:** 0.5 session  
**Files touched:** `src/components/sections/home/CtaBanner.tsx` (or equivalent)

---

### 9.1 — Locate and update the CTA banner component

Find the existing CTA banner file (check `src/components/sections/home/` for CtaBanner or similar).

Replace the interior content with a two-column layout:

```tsx
<section className="bg-group-surface border-t-4 border-l-0 border-[#C8832A]">
  <div className="max-w-7xl mx-auto px-6 py-20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      {/* Left — trust signal */}
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6B8DA8] mb-6">
          Why Metricline
        </p>
        <div className="space-y-3">
          {[
            "$20M+ total project value delivered",
            "4 years of execution in complex industrial environments",
            "3 provinces — Alberta, Saskatchewan, BC",
            "APEGA and APEGS registered",
          ].map((point) => (
            <div key={point} className="flex items-start gap-3">
              <span className="mt-1.5 w-[4px] h-[4px] flex-shrink-0 bg-[#C8832A]" aria-hidden="true" />
              <p className="text-[15px] text-[#B8C4CC]">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — CTA */}
      <div className="flex flex-col gap-5">
        <h2 className="font-display text-[40px] font-bold uppercase leading-tight text-[#F0EDE8]">
          Ready to discuss<br />your project?
        </h2>
        <p className="text-[15px] text-[#8A9EAD]">
          From early concept to start-up. One team, one point of accountability.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button href="/contact" variant="primary" size="lg">
            Start a conversation
          </Button>
          <Button href="/portfolio" variant="ghost" size="lg" showArrow={false}>
            View our work
          </Button>
        </div>
      </div>

    </div>
  </div>
</section>
```

---

## PHASE 10 — Credential Component (About & Projects pages)
**Goal:** Surface APEGA/APEGS as visible trust signals on key pages, not just footer text.  
**Estimated effort:** 0.5 session  
**Files touched:** New file `src/components/ui/CredentialBadges.tsx`, About hero, Projects hero

---

### 10.1 — Create reusable CredentialBadges component

**File:** `src/components/ui/CredentialBadges.tsx` (new file)

```tsx
export default function CredentialBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {["APEGA Registered", "APEGS Registered"].map((cert) => (
        <span key={cert} className="credential-badge">
          <span className="text-[#C8832A]">●</span>
          {cert}
        </span>
      ))}
    </div>
  );
}
```

---

### 10.2 — Add to About hero section

Find `src/components/sections/about/AboutHero.tsx` (or equivalent).
Add `<CredentialBadges className="mt-8" />` after the About hero subheading.

---

### 10.3 — Add to Projects hero section

Find `src/components/sections/projects/ProjectsHero.tsx`.
Add `<CredentialBadges className="mt-8" />` after the Projects hero subheading.

---

## PHASE 11 — Sectors Surface on Home Page
**Goal:** Industrial sectors should be visible on the home page, not buried on the Projects page.  
**Estimated effort:** 0.5 session  
**Files touched:** New file `src/components/sections/home/SectorsCallout.tsx`, `src/app/page.tsx`

---

### 11.1 — Create SectorsCallout component

**File:** `src/components/sections/home/SectorsCallout.tsx` (new file)

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { INDUSTRIES } from "@/lib/content";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

export default function SectorsCallout() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-group-bg border-t border-group-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <SectionLabel className="mb-3">Industries Served</SectionLabel>
            <h2 className="font-display text-heading-lg font-bold uppercase text-[#F0EDE8]">
              Sectors we operate in
            </h2>
          </div>
          <Link
            href="/projects"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C8832A] hover:text-[#D99440] transition-colors"
          >
            View all capabilities →
          </Link>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap gap-2"
        >
          {INDUSTRIES.map((industry) => (
            <motion.span
              key={industry.name}
              variants={fadeUp}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#B8C4CC] border border-[#3A5270] px-3 py-2 hover:border-[#C8832A] hover:text-[#C8832A] transition-colors duration-200 cursor-default"
            >
              {industry.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 11.2 — Insert into home page

**File:** `src/app/page.tsx`

Add after `<StatsBar />` and before `<DivisionsOverview />`:

```tsx
<SectorsCallout />
```

---

## PHASE 12 — SectionLabel and H2 Font Update (Sitewide)
**Goal:** Apply Barlow Condensed to all section H2 headings and section labels sitewide.  
**Estimated effort:** 0.5 session  
**Files touched:** `src/components/ui/SectionLabel.tsx`, all section files

---

### 12.1 — Update SectionLabel

**File:** `src/components/ui/SectionLabel.tsx`

No structural change needed. Verify font-mono is applied. The label style uses JetBrains Mono
which is correct — do not change to Barlow Condensed for labels. Labels stay mono.

---

### 12.2 — Update all H2 headings sitewide

Grep for `text-display-md font-bold` and `text-heading-lg font-bold` across all section files.
Add `font-display uppercase` to each H2 that is a section heading. Body H3s (card titles, list
items) also get `font-display uppercase`.

This is a mechanical find-and-update. Run after all other phases are stable.

---

## IMPLEMENTATION ORDER SUMMARY

```
Phase  1 — Palette & Font Migration         [FOUNDATION — do first, everything depends on this]
Phase  2 — Opacity Text Purge               [FOUNDATION — do second, highest legibility impact]
Phase  3 — Hero Redesign                    [HIGH IMPACT — first impression]
Phase  4 — Stats Bar Enhancement            [HIGH IMPACT — above the fold]
Phase  5 — Service Card Enhancement         [MEDIUM — Projects page conversion]
Phase  6 — Case Study Card Enhancement      [MEDIUM — portfolio credibility]
Phase  7 — Division Card Layout             [LOW — structural refinement]
Phase  8 — Process Steps Section            [MEDIUM — new section, aids understanding]
Phase  9 — CTA Banner Redesign              [MEDIUM — bottom funnel]
Phase 10 — Credential Component             [LOW — trust signal placement]
Phase 11 — Sectors Callout                  [LOW — home page information density]
Phase 12 — Sitewide H2 Font Update          [LOW — final polish pass]
```

---

## GLOBAL RULES FOR ALL PHASES

1. **No `text-white/[N]` opacity classes** anywhere after Phase 2. Use explicit hex values.
2. **`font-display` class** on all H1, H2, H3 headings. `font-sans` on all body text. `font-mono` on all labels, eyebrows, mono accents.
3. **`uppercase` on all display headings** — Barlow Condensed is designed for uppercase usage.
4. **No `rounded-lg` or `rounded-xl`** — use `rounded-none` or `rounded-sm` only. Industrial aesthetic.
5. **`border-[#3A5270]`** replaces all `border-group-border` references in explicit-colour contexts.
6. **Framer Motion `clipReveal`** for section header text reveals. `fadeUp` for card grids. `scaleIn` removed — replace with `fadeUp` for consistency.
7. **No new external image dependencies** — all visual textures remain CSS/SVG until photography arrives.
8. **Test on mobile (375px) after each phase** before moving to the next.
9. **Run `npm run build`** after Phases 1, 2, 3, and 12 to catch type errors from schema changes.
10. **TODO_CONTENT items** remain exactly as-is — do not fill in placeholder copy during design phases.
