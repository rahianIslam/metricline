"use client";

// Footer — dark, minimal three-column layout.
// Col 1: logo + tagline
// Col 2: site links
// Col 3: contact info + LinkedIn

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANY, NAV_LINKS, DIVISIONS } from "@/lib/content";
import NavLogo from "@/components/ui/NavLogo";

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-anchor-bg border-t border-anchor-border">
      {/* Main grid */}
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto w-full px-6 2xl:px-20 py-14 2xl:py-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-5">
          {/* Logo */}
          <Link
            href="/"
            className="group w-fit opacity-90 hover:opacity-100 transition-opacity duration-200"
            aria-label="Metricline Projects home"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <NavLogo theme="dark" />
          </Link>

          {/* Tagline */}
          <p className="text-[13px] text-anchor-textMuted leading-relaxed max-w-[240px]">
            {COMPANY.tagline}
          </p>

          {/* Certifications */}
          <div className="flex gap-2">
            {COMPANY.certifications.map((cert) => (
              <span
                key={cert}
                className="font-mono text-[11px] tracking-[0.12em] uppercase text-anchor-textMuted border border-anchor-border rounded px-2.5 py-1"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2 — Links */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-anchor-textMuted mb-1">
            Navigation
          </p>
          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-[14px] text-anchor-textMuted hover:text-anchor-text transition-colors duration-150 group w-fit"
              >
                <ArrowRight
                  size={11}
                  className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 transition-all duration-150"
                />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Division quick links */}
          <div className="mt-3 flex flex-col gap-1.5">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-anchor-textMuted mb-1">
              Divisions
            </p>
            {DIVISIONS.map((div) => (
              <Link
                key={div.slug}
                href={`/${div.slug}`}
                className="flex items-center gap-2 text-[13px] text-anchor-textMuted hover:text-anchor-text transition-colors duration-150 w-fit group"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: div.accent }}
                  aria-hidden="true"
                />
                {div.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 — Contact */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-anchor-textMuted mb-1">
            Contact
          </p>

          {/* Email */}
          <div>
            <p className="text-[11px] text-anchor-textMuted uppercase tracking-wide mb-0.5">Email</p>
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-[14px] text-anchor-textMuted hover:text-anchor-text transition-colors duration-150"
            >
              {COMPANY.email}
            </a>
          </div>

          {/* Phone — TODO_CLIENT */}
          {COMPANY.phone ? (
            <div>
              <p className="text-[11px] text-anchor-textMuted uppercase tracking-wide mb-0.5">Phone</p>
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-[14px] text-anchor-textMuted hover:text-anchor-text transition-colors duration-150"
              >
                {COMPANY.phone}
              </a>
            </div>
          ) : null}

          {/* Address */}
          <div>
            <p className="text-[11px] text-anchor-textMuted uppercase tracking-wide mb-0.5">Location</p>
            <p className="text-[14px] text-anchor-textMuted">{COMPANY.address}</p>
            <p className="text-[12px] text-anchor-textMuted mt-0.5">
              Serving {COMPANY.regions.join(", ")}
            </p>
          </div>

          {/* LinkedIn */}
          {COMPANY.linkedin ? (
            <a
              href={COMPANY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-fit text-anchor-textMuted hover:text-anchor-text transition-colors duration-150"
              aria-label="Metricline on LinkedIn"
            >
              <LinkedinIcon size={16} />
              <span className="text-[13px]">LinkedIn</span>
            </a>
          ) : (
            // TODO_CLIENT: LinkedIn URL
            <p className="text-[12px] text-anchor-textMuted italic">LinkedIn coming soon</p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-anchor-border">
        <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto w-full px-6 2xl:px-20 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-anchor-textMuted">
            &copy; {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-anchor-textMuted">
            Calgary &middot; Alberta &middot; Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
