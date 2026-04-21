"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLogo from "@/components/ui/NavLogo";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { NAV_LINKS, DIVISIONS } from "@/lib/content";
import { navDropdown, mobileMenu } from "@/lib/animations";

// ── Divisions Mega-Dropdown ───────────────────────────────────

function DivisionsDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="divisions-dropdown"
      variants={navDropdown}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] rounded-lg border border-[#DDD7CE] bg-white backdrop-blur-md shadow-[var(--shadow-nav)] overflow-hidden"
    >
      <div className="p-2 grid grid-cols-3 gap-1">
        {DIVISIONS.map((div) => (
          <Link
            key={div.slug}
            href={`/${div.slug}`}
            onClick={onClose}
            className="group relative flex flex-col gap-3 rounded-md p-4 transition-colors duration-150 hover:bg-group-surface"
          >
            {/* Accent dot */}
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: div.accent }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-[11px] tracking-[0.15em] uppercase"
                style={{ color: div.accent }}
              >
                {div.eyebrow}
              </span>
            </div>

            {/* Name */}
            <div>
              <p className="text-[15px] font-semibold text-group-text leading-tight mb-1">
                {div.name}
              </p>
              <p className="text-[12px] text-group-textMuted leading-relaxed">{div.tagline}</p>
            </div>

            {/* Footer link */}
            <span
              className="flex items-center gap-1 font-mono text-[11px] tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ color: div.accent }}
            >
              <span>metricline.ca/{div.slug}</span>
              <ArrowRight size={10} />
            </span>

            {/* Left border flash on hover */}
            <div
              className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ backgroundColor: div.accent }}
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-group-border flex items-center justify-between">
        <span className="text-[12px] text-group-textMuted">
          Metricline Group of Industries
        </span>
        <Link
          href="/divisions"
          onClick={onClose}
          className="flex items-center gap-1 text-[12px] text-group-textMuted hover:text-group-text transition-colors duration-150"
        >
          View all divisions <ArrowRight size={11} className="ml-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

// ── Mobile Overlay ─────────────────────────────────────────────

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          variants={mobileMenu}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 bg-anchor-bg flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-anchor-border">
            <NavLogo theme="dark" />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 text-anchor-textMuted hover:text-anchor-text transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-4 border-b border-anchor-border text-[22px] font-semibold text-anchor-textMuted hover:text-anchor-text transition-colors duration-150 group"
              >
                <span>{link.label}</span>
                <ArrowRight
                  size={18}
                  className="opacity-30 group-hover:opacity-70 transition-opacity"
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="px-8 pb-10 pt-4">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#C8832A] text-white rounded-full font-semibold text-[15px] hover:bg-[#D99440] transition-colors"
            >
              Get in touch <ArrowRight size={15} />
            </Link>

            {/* Divisions strip */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {DIVISIONS.map((div) => (
                <Link
                  key={div.slug}
                  href={`/${div.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-md border border-anchor-border text-[11px] font-mono tracking-wide text-anchor-textMuted hover:text-anchor-text transition-colors"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: div.accent }}
                  />
                  {div.letterMark}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Nav ────────────────────────────────────────────────────────

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setDivisionsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* TODO_ASSET: dark logo variant needed for scrolled light nav */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-[var(--shadow-nav)]"
            : "bg-transparent",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="max-w-[1360px] mx-auto px-8 flex items-center h-16 gap-6">
          {/* Logo (left) */}
          <Link href="/" aria-label="Metricline Group home" className="hidden md:flex flex-shrink-0">
            <NavLogo theme="light" />
          </Link>

          {/* Desktop nav — centered */}
          <nav
            className="hidden md:flex flex-1 justify-center items-center gap-0.5"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const isDivisions = link.label === "Divisions";
              return isDivisions ? (
                <button
                  key={link.href}
                  onClick={() => setDivisionsOpen((o) => !o)}
                  onBlur={() => setTimeout(() => setDivisionsOpen(false), 150)}
                  className={[
                    "flex items-center gap-1 px-3.5 py-2 rounded-md text-[14px] font-medium transition-colors duration-150",
                    divisionsOpen
                      ? "text-group-text bg-group-surface"
                      : "text-group-textMuted hover:text-group-text hover:bg-group-surface",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {link.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${divisionsOpen ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "px-3.5 py-2 rounded-md text-[14px] font-medium transition-colors duration-150",
                    isActive(link.href)
                      ? "text-group-text"
                      : "text-group-textMuted hover:text-group-text hover:bg-group-surface",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-group-textMuted hover:text-group-text transition-colors ml-auto"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Divisions dropdown */}
        <div className="relative hidden md:block">
          <AnimatePresence>
            {divisionsOpen && (
              <DivisionsDropdown onClose={() => setDivisionsOpen(false)} />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
