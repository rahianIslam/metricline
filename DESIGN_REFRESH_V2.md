# DESIGN_REFRESH_V2.md
## Metricline Website — "Precision Paper" Light Theme Overhaul
### Implementation Guide for Claude Code

---

## OVERVIEW

This document specifies a full visual overhaul from the current dark warm-brown theme to a **light "Precision Paper" theme**. The direction: warm architectural cream backgrounds, near-black warm text, full-strength accent colors, with 3 intentionally dark "anchor" sections that create visual rhythm and prevent flatness.

**Do not improvise on color values or font choices. Follow this spec exactly.**

Read every phase before starting. Complete phases in order. Do not skip ahead.

---

## QUICK REFERENCE — WHAT CHANGES vs WHAT STAYS

### CHANGES
- Background colors (dark → light cream)
- Text colors (light cream → near-black warm)
- Card surfaces (dark → white with box-shadow)
- Display/body fonts (Barlow/Barlow Condensed → Syne/DM Sans)
- Section headings H2/H3 casing (ALL CAPS → mixed case, Syne)
- Placeholder image style (dark rectangle → light warm rectangle)
- Nav scrolled state (dark → white/cream)
- Ghost button appearance (white ghost → dark ghost on light, white on dark)

### STAYS EXACTLY THE SAME
- Orange accent `#C8832A`, Gold `#F0A820`, Teal `#1FC87A`
- JetBrains Mono for all eyebrows and labels (letter-spacing, sizing, ALL CAPS)
- Blueprint grid texture (adapt colors only)
- Orange bottom rule in hero
- All Framer Motion animation variants and timing
- Layout proportions (hero split, grids, container widths)
- ALL CAPS treatment for Hero H1 only
- Content structure and copy
- 3 dark anchor sections: StatsBar, CTA Banner, Footer
- Division page heroes (stay dark)

---

## PHASE 1 — COLOR TOKEN OVERHAUL

**Files:** `tailwind.config.ts`, `src/app/globals.css`

### 1A. tailwind.config.ts — Update color tokens

Replace the entire `colors` section in `theme.extend.colors` with:

```typescript
colors: {
  // Group / neutral base — LIGHT THEME
  group: {
    bg: '#F7F4EF',           // Warm architectural cream — page base
    surface: '#EFEBE4',       // Slightly deeper cream for alternating sections
    card: '#FFFFFF',          // Pure white — contrast against cream
    border: '#DDD7CE',        // Warm gray borders
    'border-light': '#E8E2D9', // Subtle dividers
    muted: '#8A7E72',         // Warm muted gray
    text: '#1A1510',          // Near-black warm — main text
    textMuted: '#6B6257',     // Warm muted dark
    textDim: '#9A8870',       // Very muted labels
  },
  // Dark anchors — Used for StatsBar, CtaBanner, Footer
  anchor: {
    bg: '#1C1510',            // Warm near-black for dark sections
    surface: '#231D16',       // Slightly lighter dark surface
    border: '#3B3026',        // Dark warm border
    text: '#F5F0E8',          // Warm off-white text on dark
    textMuted: '#9A8870',     // Muted on dark
  },
  // Projects division — content sections (light)
  projects: {
    bg: '#F4F7FA',            // Light warm blue-gray — blueprint reference
    surface: '#EBF0F5',       // Slightly deeper
    card: '#FFFFFF',
    border: '#D4DDE8',
    // Heroes stay dark:
    heroBg: '#0D1825',
    heroSurface: '#0E1F35',
    // Accent stays identical:
    accent: '#C8832A',
    accentHover: '#D99440',
    text: '#1A1510',          // Dark text for light content
    textMuted: '#5A6E82',     // Blue-gray muted
    // Hero text (for dark hero sections):
    heroText: '#FFFFFF',
    heroTextMuted: 'rgba(255,255,255,0.55)',
  },
  // Rentals division — content sections (light)
  rentals: {
    bg: '#FAFAF5',            // Near-white warm
    surface: '#F3F1E8',
    card: '#FFFFFF',
    border: '#E5E0D2',
    heroBg: '#0F0F0F',
    heroSurface: '#141414',
    accent: '#F0A820',
    accentHover: '#F7B831',
    text: '#1A1510',
    textMuted: '#6B6257',
    heroText: '#FFFFFF',
    heroTextMuted: 'rgba(255,255,255,0.50)',
  },
  // Operations division — content sections (light)
  operations: {
    bg: '#F2FAF6',            // Light teal-cream
    surface: '#E8F5EE',
    card: '#FFFFFF',
    border: '#C8E8D4',
    heroBg: '#091712',
    heroSurface: '#0C1E16',
    accent: '#1FC87A',
    accentHover: '#35D48A',
    text: '#1A1510',
    textMuted: '#2D6B4E',     // Teal-tinted muted
    heroText: '#FFFFFF',
    heroTextMuted: 'rgba(255,255,255,0.50)',
  },
}
```

### 1B. globals.css — Update CSS custom properties

In the `@theme {}` block, update ALL color variables to match the new tokens:

```css
/* Group base — light theme */
--color-group-bg: #F7F4EF;
--color-group-surface: #EFEBE4;
--color-group-card: #FFFFFF;
--color-group-border: #DDD7CE;
--color-group-border-light: #E8E2D9;
--color-group-muted: #8A7E72;
--color-group-text: #1A1510;
--color-group-text-muted: #6B6257;
--color-group-text-dim: #9A8870;

/* Dark anchor sections */
--color-anchor-bg: #1C1510;
--color-anchor-surface: #231D16;
--color-anchor-border: #3B3026;
--color-anchor-text: #F5F0E8;
--color-anchor-text-muted: #9A8870;
```

Also add the new shadow system to globals.css (outside `@theme`, in the base layer or as CSS custom properties):

```css
:root {
  --shadow-card: 0 1px 4px rgba(26, 21, 16, 0.06), 0 4px 16px rgba(26, 21, 16, 0.05);
  --shadow-card-hover: 0 4px 12px rgba(26, 21, 16, 0.10), 0 8px 32px rgba(26, 21, 16, 0.07);
  --shadow-nav: 0 1px 0 rgba(26, 21, 16, 0.08), 0 4px 24px rgba(26, 21, 16, 0.06);
  --shadow-button-primary: 0 2px 8px rgba(200, 131, 42, 0.30);
}
```

Also update the HTML/body base styles:

```css
html {
  background-color: #F7F4EF;  /* was #1A1410 */
  color: #1A1510;              /* was #F5F0E8 */
}
```

Update the custom scrollbar:

```css
::-webkit-scrollbar-track { background: #EFEBE4; }   /* was #231D16 */
::-webkit-scrollbar-thumb { background: #C4B8A8; }   /* was #3B3026 */
::-webkit-scrollbar-thumb:hover { background: #A89A8A; }
```

Update `.blueprint-grid` — adapt line color for light background:

```css
.blueprint-grid {
  background-image:
    linear-gradient(rgba(100, 84, 65, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 84, 65, 0.07) 1px, transparent 1px);
  /* rest of properties unchanged */
}
```

Update `.credential-badge`:

```css
.credential-badge {
  color: #6B6257;            /* was --color-text-secondary */
  border-color: #DDD7CE;     /* was --color-group-border-light */
  background: #FFFFFF;       /* was --color-group-surface */
}
```

---

## PHASE 2 — TYPOGRAPHY UPGRADE

**Files:** `src/app/layout.tsx`, `src/app/globals.css`

### 2A. layout.tsx — Replace font imports

Remove the current Google Fonts imports for `Barlow` and `Barlow_Condensed`. Replace with:

```typescript
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
```

Update the `<html>` className to use the new font variables:

```tsx
<html className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
```

### 2B. globals.css — Update font family references

In the `@theme {}` block, update:

```css
--font-sans: var(--font-dm-sans), 'DM Sans', system-ui, sans-serif;
--font-display: var(--font-syne), 'Syne', system-ui, sans-serif;
--font-mono: var(--font-mono), 'JetBrains Mono', monospace;
```

### 2C. Typography behavior for headings

In globals.css, add these explicit rules:

```css
/* Hero H1 — Syne, ALL CAPS, heavy weight (replaces Barlow Condensed) */
.text-display-xl,
.text-display-lg {
  font-family: var(--font-display);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

/* Section headings H2 — Syne, mixed case, no uppercase transform */
h2,
.heading-section {
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: none;   /* Remove ALL CAPS from H2 and below */
  letter-spacing: -0.02em;
}

/* Card headings H3 — Syne, mixed case */
h3 {
  font-family: var(--font-display);
  font-weight: 600;
  text-transform: none;
  letter-spacing: -0.01em;
}

/* Body — DM Sans */
body, p, .text-body-lg, .text-body-md, .text-body-sm {
  font-family: var(--font-sans);
}
```

**IMPORTANT:** After this change, go through every component that has hardcoded `font-display uppercase` on H2/H3 tags and remove the `uppercase` class from those elements. Only Hero H1 and StatsBar numbers remain uppercase. See Phase 4 for specifics.

---

## PHASE 3 — GLOBAL COMPONENTS

### 3A. src/components/layout/Nav.tsx

**Goal:** Light nav on light pages, scrolled state becomes white with shadow.

Changes:
1. **Transparent state (top of page):** No change needed — transparent works on both light and dark hero
2. **Scrolled state:** Change from `bg-group-surface/95` to `bg-white/95`:
   ```tsx
   // Change:
   scrolled ? 'bg-group-surface/95 backdrop-blur-sm border-b border-group-border' : 'bg-transparent'
   // To:
   scrolled ? 'bg-white/95 backdrop-blur-sm shadow-[var(--shadow-nav)]' : 'bg-transparent'
   ```
3. **Nav link text:** Change from `text-group-text-muted hover:text-group-text` to `text-group-textMuted hover:text-group-text` — these now resolve to dark values automatically via the new tokens
4. **"Get in touch" button:** On scrolled light nav, the primary button should be `bg-projects-accent text-white` (stays correct)
5. **Mobile menu overlay:** Change `bg-group-bg` to `bg-anchor-bg` to keep mobile menu dark (it should stay dark as a full-screen overlay — dramatic and correct)
6. **Divisions mega-dropdown:** Change `bg-group-card border-group-border` to `bg-white border-[#DDD7CE] shadow-[var(--shadow-nav)]`
7. **Flag in code:** Add comment `// TODO_ASSET: dark logo variant needed for scrolled light nav`

### 3B. src/components/layout/Footer.tsx

**Goal:** Footer stays dark (intentional brand anchor).

Changes:
1. Swap `bg-group-surface` → `bg-anchor-bg`
2. Swap `border-t-group-border` → `border-t-anchor-border`
3. All text uses `text-anchor-text` / `text-anchor-text-muted`
4. Orange accent links stay unchanged

### 3C. src/components/ui/Button.tsx

Add a `context` prop (`"light" | "dark"`, default `"light"`):

```tsx
// Ghost variant on light background:
// border-group-text/25 text-group-text hover:border-group-text/50 hover:bg-group-text/5
// Ghost variant on dark background:
// border-white/30 text-white hover:border-white/60 hover:bg-white/5

// Primary variant (same on both):
// bg-projects-accent text-white shadow-[var(--shadow-button-primary)] hover:bg-projects-accentHover
```

Pass `context="dark"` wherever the button appears inside dark anchor sections (CtaBanner, Division heroes, Footer).

### 3D. src/components/ui/SectionLabel.tsx

No structural change needed. The orange accent color `#C8832A` reads identically well on cream backgrounds — possibly even better.

Verify: remove any `opacity-60` or dim overrides that were compensating for the dark background.

### 3E. src/components/ui/PlaceholderImage.tsx

Invert the placeholder style:

```tsx
// Old: dark warm rectangle with lines
// bg-group-card border border-group-border

// New: light warm rectangle with lines
// bg-[#EDEAE4] border border-[#D4CEC5]

// Diagonal line pattern SVG color: change from dark to warm gray
// stroke: #C4BAB0 (was dark warm)

// Label text: text-group-textDim (warm muted, readable on light)
```

### 3F. src/components/ui/DivisionPill.tsx

The pill appears at the top of division pages. On light pages:
- `bg-group-surface text-group-textMuted` → `bg-white/80 border border-group-border text-group-textMuted`
- On dark hero sections: unchanged (or use `bg-anchor-surface`)

---

## PHASE 4 — HOMEPAGE SECTIONS

For each section: (a) update background colors, (b) update text colors, (c) remove `uppercase` from H2/H3, (d) update card styles to white+shadow, (e) update hover states.

### 4A. src/components/sections/home/Hero.tsx

1. **Section background:** `bg-group-bg` (now resolves to `#F7F4EF` cream)
2. **H1 text:** `text-group-text` (now `#1A1510`) — keep `uppercase` on H1 only
3. **Faded final line effect:** Change `text-white/25` or `text-group-text/25` → `text-group-text/20`
4. **Subheading:** `text-group-textMuted`
5. **Orange bottom rule:** unchanged
6. **Credential badges:** use `.credential-badge` class (Phase 1C updated this)
7. **Right "Core Capabilities" panel:** This is the highest-priority UI change:
   ```tsx
   // Panel wrapper: bg-white shadow-[var(--shadow-card)] (remove any dark bg)
   // Panel header eyebrow: text-group-textDim (JetBrains Mono — keep mono class)
   // Each capability item wrapper: border-b border-group-border last:border-b-0 py-5
   // Add left orange accent rule per item: border-l-2 border-projects-accent pl-4
   // Capability title: font-display font-semibold text-group-text (Syne 600, mixed case)
   //   → REMOVE uppercase class from capability titles
   // Capability description: font-sans text-group-textMuted text-sm
   ```

### 4B. src/components/sections/home/StatsBar.tsx

**KEEP DARK — this is an anchor section.**

1. Change `bg-group-surface` → `bg-anchor-bg`
2. Change `border-group-border` → `border-anchor-border`
3. Text: `text-anchor-text` for numbers, `text-anchor-text-muted` for labels
4. Orange animated fill bar: unchanged — `bg-projects-accent`
5. Dividers between stats: `border-anchor-border`

### 4C. src/components/sections/home/SectorsCallout.tsx

1. Section: `bg-group-surface` (slightly deeper cream)
2. Pills: `bg-white border-group-border text-group-textMuted` base state
3. Hover: `bg-projects-accent/10 border-projects-accent text-projects-accent`
4. Section heading H2: `text-group-text` + **remove `uppercase`**
5. "View all capabilities" link: `text-projects-accent`

### 4D. src/components/sections/home/DivisionsOverview.tsx

1. Section: `bg-white`
2. Section heading H2: `text-group-text` + **remove `uppercase`** — "Three divisions. One group." in sentence case is more refined
3. Each division card:
   ```tsx
   // Wrapper: bg-[#F7F4EF] border border-group-border relative
   // Add: border-t-4 border-t-[accentColor] (4px top border in division accent)
   // On hover: shadow-[var(--shadow-card-hover)] transition-shadow
   // Remove: dark bg colors (projects-bg etc.)
   
   // Division name: font-display font-bold text-group-text text-heading-lg
   //   → remove uppercase
   // Tagline: font-sans text-group-textMuted
   // Eyebrow: keep JetBrains Mono with uppercase (this stays)
   // Footer link: text-[accentColor] font-mono text-label (unchanged)
   // Accent dot: bg-[accentColor] (unchanged)
   ```

### 4E. src/components/sections/home/ProcessSteps.tsx

1. Section: `bg-group-surface` (`#EFEBE4`)
2. Each step card: `bg-white shadow-[var(--shadow-card)]` + `border border-group-border`
3. Borders between cards: `border-group-border`
4. Step number: `text-projects-accent font-mono` (unchanged, just now on white)
5. Step title H3: `text-group-text font-display font-semibold` — **remove `uppercase`**
6. Step description: `text-group-textMuted font-sans`
7. Clip-reveal animation: unchanged — now reveals white cards emerging from cream

### 4F. src/components/sections/home/FeaturedProjects.tsx

1. Section: `bg-white`
2. Section heading H2: `text-group-text` + **remove `uppercase`**
3. Each project card:
   ```tsx
   // Card wrapper: bg-white border border-group-border shadow-[var(--shadow-card)]
   //   hover: shadow-[var(--shadow-card-hover)] transition-shadow
   // Remove dark bg colors
   
   // Category eyebrow: text-projects-accent (or division accent) — unchanged
   // Project title H3: font-display font-bold text-group-text — remove uppercase
   // Meta labels: font-mono text-group-textDim uppercase — keep
   // Meta values: font-sans font-semibold text-group-text
   // Description: font-sans text-group-textMuted
   // "View project" link: text-projects-accent hover:text-projects-accentHover
   ```
4. PlaceholderImage inside cards: uses updated component from Phase 3E

### 4G. src/components/sections/home/ClientLogos.tsx

1. Section: `bg-group-surface`
2. Logo placeholder boxes: `bg-white border border-group-border`
3. Logo placeholder text: `text-group-textDim font-mono`
4. "Trusted By" label: `text-group-textDim font-mono` (unchanged style)
5. Marquee animation: unchanged

### 4H. src/components/sections/home/CtaBanner.tsx

**KEEP DARK — this is an anchor section.**

1. Change `bg-group-*` → `bg-anchor-bg`
2. Top orange border (4px): unchanged
3. All text: `text-anchor-text` / `text-anchor-text-muted`
4. Buttons: primary unchanged, ghost uses `context="dark"` variant
5. H2: `text-anchor-text font-display font-bold` — **remove `uppercase`**
6. Bullet points: `text-anchor-text-muted`
7. Orange dot bullets: unchanged

---

## PHASE 5 — ABOUT PAGE

**File:** `src/app/about/page.tsx` and all section components in `src/components/sections/about/`

### About Hero Section
1. `bg-group-bg` (cream)
2. H1: `text-group-text font-display font-bold` — **remove `uppercase`** — "Built to close the gap between engineering and execution." is powerful in mixed case
3. Subtext: `text-group-textMuted font-sans`

### Company Story Section
1. `bg-white`
2. Left label column: section labels in `text-projects-accent font-mono` (unchanged)
3. Right body column: `text-group-text` headings, `text-group-textMuted font-sans` body

### Mission Pull-Quote Section
**KEEP DARK.** This should remain the dark dramatic band.
1. `bg-anchor-bg` (dark warm)
2. Quotation marks: `text-projects-accent` (unchanged orange)
3. Quote text: `text-anchor-text font-display`

### Differentiators List (Why Choose Us)
1. `bg-group-surface`
2. Each item: `border-b border-group-border`
3. Number: `text-projects-accent font-mono` (unchanged)
4. Title: `text-group-text font-display font-semibold` — remove uppercase
5. Description: `text-group-textMuted font-sans`
6. Hover: `bg-white` bg, `border-l-2 border-projects-accent` left border appears

### Core Values Grid
1. `bg-white`
2. Each value card: `bg-group-bg border border-group-border shadow-[var(--shadow-card)]`
3. Value name: `text-group-text font-display font-bold` — remove uppercase
4. Description: `text-group-textMuted font-sans text-sm`
5. Hover: `shadow-[var(--shadow-card-hover)]`

### HSE Section
1. `bg-group-surface` with `border-l-4 border-operations-accent` on the section header
2. H2: `text-group-text font-display` — remove uppercase
3. Body: `text-group-textMuted`
4. Certifications: `.credential-badge` class (updated in Phase 1C)

### Leadership Section
1. `bg-white`
2. Leader card: `bg-group-bg border border-group-border border-l-4 border-l-projects-accent shadow-[var(--shadow-card)]`
3. Name: `text-group-text font-display font-bold`
4. Title: `text-group-textMuted font-mono text-label`
5. Bio: `text-group-textMuted font-sans`
6. Avatar placeholder (SN initials): `bg-group-surface text-group-text` circle

---

## PHASE 6 — DIVISION PAGES

Each division page has **two zones**:
- **Hero zone** (top, full-screen): Stays dark, uses original dark division colors
- **Content zone** (below hero): Switches to light division colors

### 6A. Projects page (src/app/projects/page.tsx + components)

**Hero zone** — Keep:
- `bg-projects-heroBg` (`#0D1825`)
- All hero text uses `text-projects-heroText` (white) or `text-projects-heroTextMuted`
- Orange eyebrow, CTA buttons — unchanged
- DivisionPill: dark variant
- Blueprint-style geometric: unchanged

**Content zone (Services, Case Studies, Industries, CTA):**
1. Services section:
   - `bg-projects-bg` (`#F4F7FA`)
   - Section label: `text-projects-accent font-mono`
   - H2: `text-projects-text font-display` — remove uppercase
   - Service cards: `bg-white border border-projects-border shadow-[var(--shadow-card)]`
   - Service icon placeholder: `bg-projects-bg` square with orange geometric
   - Service name: `text-projects-text font-display font-semibold` — remove uppercase
   - Description: `text-projects-textMuted font-sans`
   - Hover: `border-l-4 border-projects-accent shadow-[var(--shadow-card-hover)]`

2. Case Studies section:
   - `bg-white`
   - Cards: white with shadow (same treatment as homepage Featured Projects)
   - Orange eyebrows: unchanged

3. Industries section:
   - `bg-projects-surface`
   - Pills: `bg-white border-projects-border text-projects-text`
   - Hover: orange accent

4. Contact CTA:
   - `bg-anchor-bg` (dark — intentional anchor)
   - Left orange border: unchanged

### 6B. Rentals page

Same pattern as Projects but using rentals color tokens:
- Hero: stays dark (`bg-rentals-heroBg`)
- Content: `bg-rentals-bg` (`#FAFAF5`)
- Cards: white with shadow
- Gold accent `#F0A820` throughout content
- Category filter pills: white with gold hover

### 6C. Operations page

Same pattern:
- Hero: stays dark (`bg-operations-heroBg`)
- Content: `bg-operations-bg` (`#F2FAF6`)
- Cards: white with shadow
- Teal accent `#1FC87A` throughout content
- HSEQ section: each H/S/E/Q column gets white card with teal top border

---

## PHASE 7 — SUPPORTING PAGES + POLISH

### 7A. Portfolio page (src/app/portfolio/page.tsx)

1. `bg-group-bg` (cream)
2. Filter bar: `bg-white border-b border-group-border` sticky
3. Active filter pill: division accent bg
4. Case study cards: white with shadow (same as FeaturedProjects)
5. "No results" empty state: light gray with warm text

### 7B. Contact page (src/app/contact/page.tsx)

1. `bg-group-bg` (cream)
2. Form column: `bg-white shadow-[var(--shadow-card)] p-8`
3. Form inputs: `bg-group-bg border border-group-border focus:border-projects-accent`
4. Input labels: `font-mono text-label text-group-textDim uppercase` (keep mono)
5. Submit button: primary variant
6. Info panel: `bg-group-surface` with warm text, `text-group-textMuted`
7. Contact detail rows: `border-b border-group-border`

### 7C. Clients page (src/app/clients/page.tsx)

1. `bg-group-bg` (cream)
2. Logo grid: white logo boxes with border and shadow
3. Industry cards: `bg-white border border-group-border shadow-[var(--shadow-card)]`

### 7D. Careers page (src/app/careers/page.tsx)

1. `bg-group-bg` (cream)
2. Role cards: `bg-white border border-group-border shadow-[var(--shadow-card)]`
3. Division badge: appropriate accent color on `bg-[accent]/10`
4. "No openings" placeholder: `bg-group-surface` with warm text

### 7E. Divisions overview page (src/app/divisions/page.tsx)

This page has full-height division columns. Two options:

**Option A (Recommended):** Light versions
- Each column: light division bg (`#F4F7FA`, `#FAFAF5`, `#F2FAF6`)
- Division letter mark: accent color at 8% opacity — now very subtle on light
- Division name: `text-group-text font-display font-bold`
- CTA button: filled with division accent

**Option B:** Keep dark for this page only (it's purely navigational)
- Acceptable if Option A feels too soft

### 7F. Final Polish Pass

After all phases complete:

1. **Scan for remaining `uppercase` classes on H2/H3** — remove from all section headings and card titles. Only H1, StatsBar numbers, and JetBrains Mono labels should be uppercase.

2. **Verify shadow consistency** — all white cards on cream/surface backgrounds must have `shadow-[var(--shadow-card)]`. Cards on white backgrounds need `border border-group-border` instead of shadow (more refined).

3. **Hover state audit** — ensure all hover states have `transition-all duration-200` or `transition-shadow duration-200` as appropriate.

4. **Orange accent contrast** — spot-check that `#C8832A` orange maintains accessible contrast on both cream (`#F7F4EF`) and white (`#FFFFFF`) backgrounds. It should — but verify visually.

5. **Animation colors** — The `divisionFlash` full-screen color overlay on division pages still uses division accent at full opacity. This appears before the dark hero, so no change needed.

6. **Mobile check** — Verify 375px viewport renders correctly for every changed section. Key risk areas: Nav (hamburger menu overlay stays dark ✓), Hero (right panel collapses correctly), Cards (shadows visible on mobile).

7. **Dark section continuity** — Confirm the three dark anchors (StatsBar, CtaBanner, Footer) create visual rhythm when scrolling. On homepage: light hero → dark stats → light content → dark CTA → dark footer. This rhythm should feel intentional, not jarring.

---

## NEW COLOR VALUES CHEAT SHEET

| Context | Background | Text | Border |
|---|---|---|---|
| Page base | `#F7F4EF` | `#1A1510` | `#DDD7CE` |
| Section surface | `#EFEBE4` | `#1A1510` | `#DDD7CE` |
| Cards | `#FFFFFF` | `#1A1510` | `#E8E2D9` |
| Dark anchors | `#1C1510` | `#F5F0E8` | `#3B3026` |
| Projects content | `#F4F7FA` | `#1A1510` | `#D4DDE8` |
| Rentals content | `#FAFAF5` | `#1A1510` | `#E5E0D2` |
| Operations content | `#F2FAF6` | `#1A1510` | `#C8E8D4` |
| Muted text (light) | — | `#6B6257` | — |
| Dim text (light) | — | `#9A8870` | — |

## FONT SUMMARY

| Role | Font | Weight | Case |
|---|---|---|---|
| Hero H1 | Syne | 800 | ALL CAPS |
| Section headings H2 | Syne | 700 | Mixed case |
| Card headings H3 | Syne | 600 | Mixed case |
| Body copy | DM Sans | 400/500 | Normal |
| Eyebrows/labels | JetBrains Mono | 400/500 | ALL CAPS |
| Stat numbers | Syne | 800 | — |
| Button text | DM Sans | 600 | Mixed case |

---

## WHAT TO VERIFY BEFORE MARKING EACH PHASE DONE

- [ ] Phase 1: `bg-group-bg` shows cream (`#F7F4EF`), not dark. Body text is dark.
- [ ] Phase 2: Syne loads in browser for headings. DM Sans loads for body. JetBrains Mono loads for labels.
- [ ] Phase 3: Nav scrolled state shows white bar with shadow. Footer is dark. Buttons have correct ghost variant per context.
- [ ] Phase 4: Homepage shows cream→dark(stats)→cream→cream→dark(cta)→dark(footer) rhythm. All H2/H3 mixed case. Cards have shadow.
- [ ] Phase 5: About page cream throughout except dark mission band. Leadership card has orange left border.
- [ ] Phase 6: Division page heroes are dark. Scrolling below hero reveals light content sections. Accents remain correct per division.
- [ ] Phase 7: No remaining uppercase on section headings. All cards consistent. Mobile renders correctly.

---

*End of DESIGN_REFRESH_V2.md*
*Generated by Senior Design Review — April 17, 2026*
