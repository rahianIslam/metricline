# Metricline — Scroll Animation Implementation Plan
## Instructions for Claude Code

Read this file fully before writing any code. Implement one step at a time.
After each step, stop and confirm what changed before moving to the next.

---

## Context

The current homepage (`src/app/page.tsx`) renders these sections in order:
`Hero → StatsBar → SectorsCallout → DivisionsOverview → ProcessSteps → FeaturedProjects → ClientLogos → CtaBanner`

The `Hero` right panel currently shows a `CapabilitySummary` component defined inline in
`src/components/sections/home/Hero.tsx`. This must be relocated and replaced with an animated image stack.

All animation work uses **Framer Motion** (already installed). All new image containers use
`PlaceholderImage` from `src/components/ui/PlaceholderImage.tsx` — do not add any external image
dependencies. Real photos will be slotted in later by the client.

---

## Step 0 — Relocate Core Capabilities out of the Hero

**Read first:** `src/components/sections/home/Hero.tsx`, `src/app/page.tsx`

1. Extract the `CAPABILITIES` array and `CapabilitySummary` component out of `Hero.tsx`.

2. Create a new file: `src/components/sections/home/CapabilitiesStrip.tsx`

   The new component renders a full-width section with `bg-white` background.
   Layout: left label column ("CORE CAPABILITIES" in `SectionLabel`) + right 2×2 grid of the
   four capability items.

   Each item keeps the same numbered style (orange `01`–`04` monospace number, bold title, mono
   detail text) but is now a card with:
   - Thin left border in `#C8832A`
   - Subtle `bg-group-surface/30` background
   - `fadeUp` + `staggerContainer` scroll animations via `useInView` (same pattern as `FeaturedProjects.tsx`)

3. In `src/app/page.tsx`: import `CapabilitiesStrip` and insert it between `<StatsBar />` and
   `<SectorsCallout />`.

4. Back in `Hero.tsx`: delete the `CapabilitySummary` function, the `CAPABILITIES` array, and the
   entire right panel `div` (the `hidden lg:flex` column). The grid stays as
   `grid-cols-1 lg:grid-cols-[55%_45%]` — the right slot will be filled in Step 1.

**Stop here. Confirm the Capabilities section appears below StatsBar and the Hero right panel is empty.**

---

## Step 1 — Hero Right Panel: Animated Image Stack

**Read first:** `src/components/sections/home/Hero.tsx` (after Step 0 changes)

Add a new inline component called `HeroImageStack` inside `Hero.tsx`.

### Panel wrapper
Replace the deleted right panel with:
```tsx
<div className="hidden lg:flex items-center justify-center relative border-l border-group-border px-8 overflow-hidden">
  <HeroImageStack largeImageY={largeImageY} smallImageY={smallImageY} />
</div>
```
(The `largeImageY` and `smallImageY` props are placeholders for now — pass `undefined` and skip
the `style` prop until Step 4. Just render the images statically for now.)

### HeroImageStack layout
Inside a `div` with `className="relative w-full h-full flex items-center"`:

**Image 1 — large, primary:**
```tsx
<motion.div className="absolute left-0 top-[10%] w-[72%] shadow-xl">
  <div className="overflow-hidden border-l-[3px] border-[#C8832A]">
    <PlaceholderImage aspectRatio="aspect-[4/5]" showLabel label="Site photo coming" className="rounded-none" />
  </div>
</motion.div>
```
Mount animation: `initial={{ opacity: 0, scale: 1.04 }}` → `animate={{ opacity: 1, scale: 1 }}`
`duration: 0.9`, `delay: 0.4`, `ease: [0.22, 1, 0.36, 1]`

**Image 2 — small, offset:**
```tsx
<motion.div className="absolute right-0 bottom-[12%] w-[52%] shadow-lg">
  <div className="overflow-hidden border border-group-border">
    <PlaceholderImage aspectRatio="aspect-[3/2]" showLabel label="Project photo coming" className="rounded-none" />
  </div>
</motion.div>
```
Mount animation: same as Image 1 but `delay: 0.65`

**Decorative vertical line:**
```tsx
<motion.div
  className="absolute top-8 right-6 w-[2px] h-20 bg-[#C8832A] opacity-40 origin-top"
  initial={{ scaleY: 0 }}
  animate={{ scaleY: 1 }}
  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
/>
```

**Stop here. Confirm two placeholder images appear in the Hero right panel with entry animations.**

---

## Step 2 — Create RevealImage Component

**Create new file:** `src/components/ui/RevealImage.tsx`

This is a reusable wrapper that applies clip-path reveal + counter-scale to any child content.
It accepts: `children`, optional `className`, optional `direction` (`"left" | "bottom"`, default `"left"`),
optional `delay` (number, default `0`).

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface RevealImageProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "bottom";
  delay?: number;
}

export default function RevealImage({
  children,
  className = "",
  direction = "left",
  delay = 0,
}: RevealImageProps) {
  const { ref, inView } = useInView({ margin: "-60px" });

  const clipHidden =
    direction === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
  const clipVisible = "inset(0 0% 0 0)";

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: clipHidden }}
      animate={inView ? { clipPath: clipVisible } : { clipPath: clipHidden }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        animate={inView ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
```

Also append these two exports to `src/lib/animations.ts` (do not modify any existing variants):

```typescript
// ── Image Reveal (Clip Left-to-Right) ─────────────────────────
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", scale: 1.08 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Image Reveal (Clip Bottom-to-Top) ─────────────────────────
export const imageRevealBottom: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
```

**Stop here. No visual change yet — this is infrastructure. Confirm the file was created and animations.ts was updated.**

---

## Step 3 — Sticky Split Project Viewer (replaces FeaturedProjects grid)

**Read first:** `src/components/sections/home/FeaturedProjects.tsx`, `src/types/index.ts`

Completely replace the 2×2 grid layout in `FeaturedProjects.tsx` with a sticky split-screen layout.
Keep all existing TypeScript interfaces, imports, and Sanity data props unchanged.

### State
```tsx
const [activeIndex, setActiveIndex] = useState(0);
```
Import `useState` and `useEffect` from React. Import `useRef` from React.

### allItems array
Construct `allItems` from `caseStudies` padded to 4 total with placeholder objects:
```tsx
const PLACEHOLDERS = Array.from({ length: Math.max(0, 4 - caseStudies.length) }, (_, i) => ({
  id: `placeholder-${i}`,
  title: "Case Study Coming Soon",
  client: "—",
  location: "—",
  year: "—",
  sector: "TBA",
  description: "Additional case studies will be published as projects are completed.",
  imageLabel: "Project photo coming",
  division: "projects" as const,
  featured: false,
  highlights: [],
  slug: "",
}));
const allItems = [...caseStudies, ...PLACEHOLDERS];
const totalItems = allItems.length;
```

### IntersectionObserver for active tracking
Create an array of refs for each list item:
```tsx
const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
```

Use a `useEffect` to set up an `IntersectionObserver` with `rootMargin: "-40% 0px -40% 0px"`.
When an item intersects, call `setActiveIndex(i)` for that item's index.
Clean up the observer on unmount.

### Section structure

```tsx
<section className="bg-white" aria-label="Featured projects">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header — same SectionLabel + H2 as before, with py-16 */}
    <div className="py-16 pb-0">
      <SectionLabel className="mb-4">Featured Work</SectionLabel>
      <h2 className="font-display text-display-md font-bold text-group-text tracking-tight">
        Projects that <span className="text-group-textMuted">define us</span>
      </h2>
    </div>

    {/* Split container */}
    <div className="flex gap-0 mt-12">

      {/* LEFT: scrollable project list — 52% width */}
      <div className="w-full lg:w-[52%] lg:pr-12">
        {allItems.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`group pl-6 py-12 border-b border-group-border border-l-2 transition-colors duration-300 cursor-pointer ${
              activeIndex === i ? "border-l-[#C8832A]" : "border-l-transparent"
            }`}
          >
            {/* Mobile only: image above content */}
            <div className="lg:hidden mb-4 overflow-hidden">
              <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <PlaceholderImage
                  aspectRatio="aspect-[16/9]"
                  showLabel
                  label={"imageLabel" in item ? item.imageLabel : "Project photo coming"}
                  className="rounded-none"
                />
              </div>
            </div>

            {/* Number */}
            <p
              className={`font-mono text-[11px] tracking-[0.15em] uppercase mb-3 transition-opacity duration-300 ${
                activeIndex === i ? "opacity-100 text-[#C8832A]" : "opacity-40 text-group-textMuted"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </p>

            {/* Title */}
            <h3
              className={`font-display text-heading-md font-bold leading-snug mb-3 transition-colors duration-300 ${
                activeIndex === i ? "text-group-text" : "text-group-textMuted"
              }`}
            >
              {item.title}
            </h3>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-body-sm text-group-textMuted mb-4">
              <span>{item.client}</span>
              <span className="opacity-30">·</span>
              <span>{item.location}</span>
              <span className="opacity-30">·</span>
              <span>{item.year}</span>
            </div>

            {/* Description */}
            <p className="text-body-sm text-group-textMuted leading-relaxed line-clamp-2 mb-4">
              {item.description}
            </p>

            {/* CTA link */}
            <span
              className={`inline-flex items-center gap-1.5 text-[13px] font-medium text-[#C8832A] transition-opacity duration-200 ${
                activeIndex === i ? "opacity-100" : "opacity-0"
              }`}
            >
              View project <ArrowRight size={13} />
            </span>
          </div>
        ))}
      </div>

      {/* RIGHT: sticky image panel — hidden on mobile */}
      <div className="hidden lg:block w-[48%] pl-8">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="relative w-full h-[75%]">

            {/* Progress bar */}
            <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-group-border">
              <motion.div
                className="w-full bg-[#C8832A] origin-top"
                animate={{ scaleY: (activeIndex + 1) / totalItems }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Crossfading images */}
            {allItems.map((item, i) => (
              <motion.div
                key={item.id}
                className="absolute inset-0"
                animate={{ opacity: activeIndex === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <RevealImage direction="bottom" delay={0}>
                  <PlaceholderImage
                    aspectRatio="aspect-[3/4]"
                    showLabel
                    label={"imageLabel" in item ? item.imageLabel : "Project photo coming"}
                    className="rounded-none h-full w-full"
                  />
                </RevealImage>
              </motion.div>
            ))}

            {/* Active project meta — bottom strip */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-group-border">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#C8832A]"
              >
                {allItems[activeIndex]?.sector ?? "Coming soon"}
              </motion.p>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

Import `RevealImage` from `@/components/ui/RevealImage`.
Import `PlaceholderImage` from `@/components/ui/PlaceholderImage`.
Import `ArrowRight` from `lucide-react`.
Import `motion` from `framer-motion`.
Remove `staggerContainer` and `scaleIn` imports if no longer used.

**Stop here. Confirm the sticky split layout works: scroll through the project list and the right image panel should crossfade and the progress bar should fill.**

---

## Step 4 — Parallax Scroll on Hero Images

**Read first:** `src/components/sections/home/Hero.tsx` (after Step 1 changes)

Add scroll-driven parallax to the two images in `HeroImageStack`.

1. At the top of the `Hero` function body (before the return), add:

```tsx
const heroRef = useRef<HTMLElement>(null);
const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end start"],
});
const largeImageY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
const smallImageY = useTransform(scrollYProgress, [0, 1], ["0px", "-130px"]);
```

2. Add these imports at the top of the file:
```tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
```
(Replace the existing `motion` import if it's already imported from `framer-motion`.)

3. Attach `ref={heroRef}` to the outermost `<section>` element.

4. Pass `largeImageY` and `smallImageY` down into `HeroImageStack` as props.
   Update the `HeroImageStack` component signature to accept these props and apply them as
   `style={{ y: largeImageY }}` and `style={{ y: smallImageY }}` on the respective `motion.div`
   wrappers around each image.

The large image moves `80px` upward as the hero scrolls out. The small image moves `130px`.
This creates a depth effect where the two images separate slightly as the user scrolls.

**Stop here. Confirm the parallax works: scroll slowly past the hero and both images should drift upward at different rates.**

---

## Step 5 — Hover Zoom on Project Cards

**Read first:** `src/components/sections/home/FeaturedProjects.tsx` (after Step 3 changes)

The left-column mobile image in each project list item (added in Step 3) already has hover zoom.
No additional work needed there.

For completeness, confirm that the mobile image wrapper in the left column list item has:
- Parent `div` with `className` including `group`
- Image wrapper `div` with `className="overflow-hidden"`
- Inner `div` with `className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"`

If any of these are missing from Step 3's output, add them now.

**Stop here. Confirm hover zoom works on mobile-view project images.**

---

## Final Checklist

After all steps are complete, verify:

- [ ] `CapabilitiesStrip` renders between StatsBar and SectorsCallout with scroll-triggered animation
- [ ] Hero right panel shows two stacked placeholder images with entry animations
- [ ] Decorative orange vertical line appears in Hero right panel
- [ ] `RevealImage.tsx` exists in `src/components/ui/`
- [ ] `imageReveal` and `imageRevealBottom` are appended to `src/lib/animations.ts`
- [ ] FeaturedProjects is a sticky split layout with crossfading right panel and progress bar
- [ ] Active project list item has orange left border and visible CTA link
- [ ] Progress bar fills as you scroll through projects
- [ ] Hero images drift upward at different speeds when scrolling past the hero
- [ ] Hover zoom works on project card images (mobile view)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No console errors in the browser
- [ ] Mobile layout (375px viewport) looks correct — sticky panel hidden, list stacks vertically

---

## Do Not Change

- `PlaceholderImage.tsx` — used as-is, wrapped not modified
- `useInView.ts` — used as-is
- Any Sanity data fetching, schema, or types
- Any page file other than `src/app/page.tsx`
- `StatsBar`, `SectorsCallout`, `DivisionsOverview`, `ProcessSteps`, `ClientLogos`, `CtaBanner`
- Any division pages (`/projects`, `/rentals`, `/operations`)
