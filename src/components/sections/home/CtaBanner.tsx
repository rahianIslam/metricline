"use client";

import Button from "@/components/ui/Button";

export default function CtaBanner() {
  return (
    <section className="bg-anchor-bg border-t-4 border-[#C8832A]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — trust signals */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-anchor-textMuted mb-6">
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
                  <span
                    className="mt-[7px] w-[4px] h-[4px] flex-shrink-0 bg-[#C8832A]"
                    aria-hidden="true"
                  />
                  <p className="text-[15px] text-anchor-textMuted">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-[40px] font-bold leading-tight text-anchor-text">
              Ready to discuss<br />your project?
            </h2>
            <p className="text-[15px] text-anchor-textMuted">
              From early concept to start-up. One team, one point of accountability.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button href="/contact" variant="primary" size="lg">
                Start a conversation
              </Button>
              <Button href="/portfolio" variant="ghost" context="dark" size="lg" showArrow={false}>
                View our work
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
