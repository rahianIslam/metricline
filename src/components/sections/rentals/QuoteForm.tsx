"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { DIVISIONS, COMPANY } from "@/lib/content";
import { fadeUp } from "@/lib/animations";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const division = DIVISIONS[1]; // Rentals

// ── Form data types ───────────────────────────────────────────
interface Step1Data {
  equipmentType: string;
  startDate: string;
  endDate: string;
  deliveryLocation: string;
  operatorRequired: "yes" | "no";
}

interface Step2Data {
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

type FormData = Step1Data & Step2Data;

// ── Shared input style ────────────────────────────────────────
const inputStyle = {
  backgroundColor: "transparent",
  borderColor: "rgba(255,255,255,0.15)",
  color: "white",
};

const inputHoverStyle = {
  borderColor: "#F5C30A50",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-group-textDim mb-2">
      {children}
    </label>
  );
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  accent: string;
}

function InputField({ accent, className = "", ...props }: InputFieldProps) {
  return (
    <input
      {...props}
      className={[
        "w-full bg-transparent border-b py-3 text-body-md text-group-text placeholder:text-group-textMuted",
        "focus:outline-none transition-colors duration-200",
        "focus:border-b-[1.5px]",
        className,
      ].join(" ")}
      style={{ borderColor: "#DDD7CE" }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = accent;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#DDD7CE";
      }}
    />
  );
}

// ── Step indicator ────────────────────────────────────────────
function StepIndicator({ current, total, accent }: { current: number; total: number; accent: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] transition-all duration-300"
            style={{
              backgroundColor: i < current ? accent : i === current - 1 ? accent : "transparent",
              borderWidth: "1px",
              borderColor: i < current ? accent : "#DDD7CE",
              color: i === current - 1 ? "#0F0F0F" : i < current ? "#0F0F0F" : "#9A8870",
            }}
          >
            {i + 1}
          </div>
          {i < total - 1 && (
            <div
              className="w-8 h-px transition-colors duration-300"
              style={{ backgroundColor: i < current - 1 ? accent : "#DDD7CE" }}
            />
          )}
        </div>
      ))}
      <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-group-textDim ml-2">
        Step {current} of {total}
      </span>
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────
export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step1Data, setStep1Data] = useState<Partial<Step1Data>>({});

  const {
    register: registerStep1,
    handleSubmit: handleStep1,
    formState: { errors: errors1 },
  } = useForm<Step1Data>();

  const {
    register: registerStep2,
    handleSubmit: handleStep2,
    formState: { errors: errors2 },
  } = useForm<Step2Data>();

  const onStep1 = (data: Step1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2 = async (data: Step2Data) => {
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          enquiryType: "Rental enquiry",
          message: `RENTAL QUOTE REQUEST\n\nEquipment: ${step1Data.equipmentType}\nStart: ${step1Data.startDate}\nEnd: ${step1Data.endDate}\nDelivery: ${step1Data.deliveryLocation}\nOperator required: ${step1Data.operatorRequired}\n\nNotes: ${data.notes}`,
        }),
      });
    } catch {
      // Fail silently — submission confirmation shown regardless
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      id="quote"
      className="py-24 md:py-32 border-t"
      style={{ backgroundColor: division.surface, borderColor: division.border }}
      aria-label="Request a quote"
    >
      <div className="max-w-7xl 2xl:max-w-[1760px] mx-auto px-6 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — info panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel color="rentals" className="mb-6">Get a Quote</SectionLabel>
            <h2
              className="font-bold text-group-text leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              Tell us what you need.
              <span className="block text-group-textMuted">
                We'll make it work.
              </span>
            </h2>
            <p className="text-body-md leading-[1.7] mb-10" style={{ color: division.textMuted }}>
              {/* TODO_CONTENT: Quote form intro text */}
              Fill out the two-step form with your equipment needs and contact details.
              Our team will respond within one business day with availability and pricing.
            </p>

            {/* Feature bullets */}
            <ul className="space-y-4">
              {[
                "Same-day availability confirmation",
                "Competitive short and long-term rates",
                "Delivery to site included in quote",
                "Operator support available on request",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-body-sm text-group-textMuted">
                  <span
                    className="flex-shrink-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: division.accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* Contact fallback */}
            <div
              className="mt-10 p-5 rounded-sm border"
              style={{ backgroundColor: division.card, borderColor: division.border }}
            >
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: division.accent }}>
                Prefer to call?
              </p>
              <p className="text-body-sm text-group-textMuted">
                {/* TODO_CLIENT: phone number */}
                Contact us at{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-group-text hover:text-group-text/80 transition-colors">
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded-sm border p-8"
              style={{ backgroundColor: division.card, borderColor: division.border }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  // ── Success state ──────────────────────────
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="mb-6 relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <CheckCircle
                          size={48}
                          strokeWidth={1.5}
                          style={{ color: division.accent }}
                        />
                      </motion.div>
                    </div>
                    <h3 className="font-display text-heading-md font-bold text-group-text mb-3">Quote Request Sent</h3>
                    <p className="text-body-sm text-group-textMuted leading-[1.6] max-w-[280px]">
                      We'll review your requirements and get back to you within one business day.
                    </p>
                  </motion.div>

                ) : step === 1 ? (
                  // ── Step 1 — Equipment details ─────────────
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleStep1(onStep1)}
                    className="space-y-7"
                  >
                    <StepIndicator current={1} total={2} accent={division.accent} />

                    <div>
                      <FieldLabel>Equipment Needed *</FieldLabel>
                      <InputField
                        accent={division.accent}
                        placeholder="e.g. 50T Mobile Crane, Generator, Forklift"
                        {...registerStep1("equipmentType", { required: true })}
                      />
                      {errors1.equipmentType && (
                        <p className="mt-1 font-mono text-[11px] text-red-400">Required</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <FieldLabel>Start Date *</FieldLabel>
                        <InputField
                          accent={division.accent}
                          type="date"
                          {...registerStep1("startDate", { required: true })}
                        />
                        {errors1.startDate && (
                          <p className="mt-1 font-mono text-[11px] text-red-400">Required</p>
                        )}
                      </div>
                      <div>
                        <FieldLabel>End Date</FieldLabel>
                        <InputField
                          accent={division.accent}
                          type="date"
                          {...registerStep1("endDate")}
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Delivery Location *</FieldLabel>
                      <InputField
                        accent={division.accent}
                        placeholder="City, Province or site coordinates"
                        {...registerStep1("deliveryLocation", { required: true })}
                      />
                      {errors1.deliveryLocation && (
                        <p className="mt-1 font-mono text-[11px] text-red-400">Required</p>
                      )}
                    </div>

                    <div>
                      <FieldLabel>Operator Required? *</FieldLabel>
                      <div className="flex gap-3 mt-2">
                        {(["yes", "no"] as const).map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-2 cursor-pointer font-mono text-[11px] tracking-[0.1em] uppercase text-group-textMuted hover:text-group-text transition-colors"
                          >
                            <input
                              type="radio"
                              value={opt}
                              {...registerStep1("operatorRequired", { required: true })}
                              className="accent-yellow-400"
                            />
                            {opt === "yes" ? "Yes — include operator" : "No — equipment only"}
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-sm font-semibold text-[13px] tracking-wide transition-all duration-200"
                      style={{ backgroundColor: division.accent, color: "#0F0F0F" }}
                    >
                      <span>Continue to Contact Details</span>
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </button>
                  </motion.form>

                ) : (
                  // ── Step 2 — Contact details ───────────────
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleStep2(onStep2)}
                    className="space-y-7"
                  >
                    <StepIndicator current={2} total={2} accent={division.accent} />

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <FieldLabel>Your Name *</FieldLabel>
                        <InputField
                          accent={division.accent}
                          placeholder="Full name"
                          {...registerStep2("name", { required: true })}
                        />
                        {errors2.name && (
                          <p className="mt-1 font-mono text-[11px] text-red-400">Required</p>
                        )}
                      </div>
                      <div>
                        <FieldLabel>Company *</FieldLabel>
                        <InputField
                          accent={division.accent}
                          placeholder="Company name"
                          {...registerStep2("company", { required: true })}
                        />
                        {errors2.company && (
                          <p className="mt-1 font-mono text-[11px] text-red-400">Required</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Email *</FieldLabel>
                      <InputField
                        accent={division.accent}
                        type="email"
                        placeholder="you@company.com"
                        {...registerStep2("email", { required: true })}
                      />
                      {errors2.email && (
                        <p className="mt-1 font-mono text-[11px] text-red-400">Required</p>
                      )}
                    </div>

                    <div>
                      <FieldLabel>Phone</FieldLabel>
                      <InputField
                        accent={division.accent}
                        type="tel"
                        placeholder="+1 (xxx) xxx-xxxx"
                        {...registerStep2("phone")}
                      />
                    </div>

                    <div>
                      <FieldLabel>Additional Notes</FieldLabel>
                      <textarea
                        placeholder="Site constraints, access requirements, timeline details…"
                        rows={3}
                        {...registerStep2("notes")}
                        className="w-full bg-transparent border-b py-3 text-body-md text-group-text placeholder:text-group-textMuted focus:outline-none transition-colors duration-200 resize-none"
                        style={{ borderColor: "#DDD7CE" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = division.accent;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#DDD7CE";
                        }}
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2 px-5 py-3 rounded-sm font-semibold text-[13px] tracking-wide border border-group-border text-group-textMuted hover:text-group-text transition-colors duration-200"
                      >
                        <ArrowLeft size={14} strokeWidth={2.5} />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-semibold text-[13px] tracking-wide transition-all duration-200 disabled:opacity-50"
                        style={{ backgroundColor: division.accent, color: "#0F0F0F" }}
                      >
                        <span>{submitting ? "Sending…" : "Submit Quote Request"}</span>
                        {!submitting && <ArrowRight size={14} strokeWidth={2.5} />}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
