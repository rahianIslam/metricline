"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Award } from "lucide-react";
import { COMPANY } from "@/lib/content";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

// ── Info row ──────────────────────────────────────────────────

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  placeholder?: boolean;
}

function InfoRow({ icon, label, value, placeholder }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-group-border last:border-b-0">
      <div className="mt-0.5 text-projects-accent/60 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9A8870] mb-1">
          {label}
        </p>
        {placeholder ? (
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-projects-accent/40" />
            <p className="font-mono text-[11px] tracking-[0.06em] italic text-[#9A8870]">
              To be confirmed
            </p>
          </div>
        ) : (
          <div className="text-[14px] text-group-text leading-[1.5] font-medium break-words">
            {value}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────

export default function ContactInfo() {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="sticky top-32"
    >
      {/* ── Card ─────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden rounded-sm bg-white shadow-[var(--shadow-card)]"
      >
        {/* 4px orange left border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-projects-accent"
          aria-hidden="true"
        />

        {/* Blueprint grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,84,65,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,84,65,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Corner accent — top-right */}
        <div
          className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(232,116,42,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative pl-8 pr-6 pt-7 pb-6">
          {/* Card header */}
          <div className="mb-1">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-projects-accent mb-4">
              Contact Information
            </p>
            <h2 className="font-bold text-group-text text-[18px] leading-snug tracking-tight">
              {COMPANY.displayName}
            </h2>
            <p className="font-mono text-[11px] tracking-[0.08em] text-[#9A8870] mt-1">
              {COMPANY.legalName}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-group-border my-5" />

          {/* Rows */}
          <div>
            <InfoRow
              icon={<Mail size={13} strokeWidth={1.5} />}
              label="Email"
              value={
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-projects-accent transition-colors duration-200"
                >
                  {COMPANY.email}
                </a>
              }
            />
            {/* TODO_CLIENT: Business phone number */}
            <InfoRow
              icon={<Phone size={13} strokeWidth={1.5} />}
              label="Phone"
              placeholder={!COMPANY.phone}
              value={
                COMPANY.phone ? (
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="hover:text-projects-accent transition-colors duration-200"
                  >
                    {COMPANY.phone}
                  </a>
                ) : null
              }
            />
            {/* TODO_CLIENT: Full office address */}
            <InfoRow
              icon={<MapPin size={13} strokeWidth={1.5} />}
              label="Office"
              value={
                <span>
                  {COMPANY.address}
                </span>
              }
            />
            {/* TODO_CLIENT: LinkedIn company page URL */}
            <InfoRow
              icon={<ExternalLink size={13} strokeWidth={1.5} />}
              label="LinkedIn"
              placeholder={!COMPANY.linkedin}
              value={
                COMPANY.linkedin ? (
                  <a
                    href={COMPANY.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-projects-accent transition-colors duration-200 truncate block"
                  >
                    {COMPANY.linkedin}
                  </a>
                ) : null
              }
            />
          </div>
        </div>
      </motion.div>

      {/* ── Coordinates flavour text ──────────────────────── */}
      <motion.div
        variants={fadeUp}
        className="mt-5 flex items-center gap-3 px-1"
      >
        <div className="w-1 h-1 rounded-full bg-projects-accent/40 shrink-0" />
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9A8870]">
          51.0447° N &nbsp;114.0719° W — Calgary, Alberta
        </p>
      </motion.div>

      {/* ── Service regions ───────────────────────────────── */}
      <motion.div variants={fadeUp} className="mt-4 px-1">
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9A8870] mb-3">
          Serving
        </p>
        <div className="flex flex-wrap gap-2">
          {COMPANY.regions.map((region) => (
            <span
              key={region}
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#9A8870] border border-group-border px-2.5 py-1 rounded-full"
            >
              {region}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Certifications ────────────────────────────────── */}
      <motion.div variants={fadeUp} className="mt-5 px-1">
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9A8870] mb-3">
          Certifications
        </p>
        <div className="flex flex-wrap gap-2">
          {COMPANY.certifications.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border"
              style={{
                color: "rgba(232,116,42,0.7)",
                borderColor: "rgba(232,116,42,0.18)",
                backgroundColor: "rgba(232,116,42,0.04)",
              }}
            >
              <Award size={9} strokeWidth={2} />
              {cert}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Response time note ────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        className="mt-8 p-4 border border-group-border rounded-sm"
        style={{ backgroundColor: "rgba(247,244,239,0.8)" }}
      >
        <div className="flex items-start gap-3">
          {/* Pulse dot */}
          <div className="relative mt-1 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-projects-accent" />
            <motion.div
              className="absolute inset-0 rounded-full bg-projects-accent"
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="font-mono text-[11px] tracking-[0.06em] text-[#9A8870] leading-[1.7]">
            Our team in Calgary monitors enquiries during business hours
            (MST). We respond to every submission within one business day.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
