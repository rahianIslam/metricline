import type { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactInfo from "@/components/sections/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Metricline Group of Industries. Tell us about your project — we respond within one business day.",
  openGraph: {
    title: "Contact | Metricline Group",
    description:
      "Reach our Calgary team for project enquiries, rental requests, or general questions.",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      {/* ── Two-column body ──────────────────────────────── */}
      <section className="bg-group-bg py-20 md:py-28">
        <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 xl:gap-24 items-start">

            {/* ── Left: Form ─────────────────────────────── */}
            <div>
              <ContactForm />
            </div>

            {/* ── Right: Info panel ──────────────────────── */}
            <div>
              <ContactInfo />
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom divider ───────────────────────────────── */}
      <div className="h-px bg-group-border" aria-hidden="true" />
    </>
  );
}
