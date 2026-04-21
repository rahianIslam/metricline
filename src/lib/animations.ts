// ============================================================
// METRICLINE — Framer Motion Animation Variants
// All animations use triggerOnce: true. Nothing loops on the
// main site except the client logo marquee.
// ============================================================

import type { Variants } from "framer-motion";

// ── Fade Up ───────────────────────────────────────────────────
// Used on all section entries.

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Stagger Container ─────────────────────────────────────────
// Wraps grids and lists; children animate with stagger.

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// ── Scale In ─────────────────────────────────────────────────
// For cards.

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Division Flash ────────────────────────────────────────────
// Full-screen color flash on division page entry. Applied to
// an absolutely-positioned overlay that fades out after mount.

export const divisionFlash: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 0,
    transition: { duration: 0.5, delay: 0.1 },
  },
};

// ── Fade In ───────────────────────────────────────────────────
// Simple opacity fade, no translation.

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ── Slide In Left ─────────────────────────────────────────────
// Useful for side-panel content.

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Nav Dropdown ──────────────────────────────────────────────
// Mega-dropdown open/close.

export const navDropdown: Variants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    scaleY: 0.96,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

// ── Mobile Menu ───────────────────────────────────────────────
// Full-screen mobile overlay.

export const mobileMenu: Variants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

// ── Clip Reveal ───────────────────────────────────────────────
// Used for capability summary items and section header reveals.
// Reads as a blueprint drawing being revealed — on-brand for EPCM.

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Page Transition ───────────────────────────────────────────

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
