"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

// ── Types ─────────────────────────────────────────────────────

type EnquiryType = "new-project" | "rental-enquiry" | "careers" | "general";

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  enquiryType: EnquiryType;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

// ── Enquiry options ───────────────────────────────────────────

const ENQUIRY_OPTIONS: { value: EnquiryType; label: string }[] = [
  { value: "new-project", label: "New Project Enquiry" },
  { value: "rental-enquiry", label: "Equipment Rental Enquiry" },
  { value: "careers", label: "Careers" },
  { value: "general", label: "General" },
];

// ── Subcomponents ─────────────────────────────────────────────

interface FieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, required, optional, error, children }: FieldProps) {
  return (
    <div className="group/field">
      <div className="flex items-center justify-between mb-2">
        <label className="font-mono text-[11px] tracking-[0.14em] uppercase text-group-textMuted transition-colors duration-200 group-focus-within/field:text-projects-accent">
          {label}
          {required && (
            <span className="text-projects-accent ml-0.5">*</span>
          )}
        </label>
        {optional && (
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-group-textMuted">
            Optional
          </span>
        )}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-red-400/80"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Shared input class ────────────────────────────────────────

const inputBase =
  "w-full bg-transparent text-group-text text-[15px] leading-[1.6] " +
  "border-b border-group-border pb-3 " +
  "placeholder:text-group-textMuted " +
  "focus:outline-none focus:border-projects-accent " +
  "transition-colors duration-200 " +
  "disabled:opacity-40 disabled:cursor-not-allowed";

// ── Success State ─────────────────────────────────────────────

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-6 py-16"
    >
      {/* Animated check ring */}
      <div className="relative w-14 h-14">
        <svg className="absolute inset-0" viewBox="0 0 56 56" fill="none">
          <motion.circle
            cx="28"
            cy="28"
            r="26"
            stroke="#E8742A"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <CheckCircle size={22} className="text-projects-accent" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Text */}
      <div>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-projects-accent mb-3">
          Transmission Received
        </p>
        <h3
          className="font-extrabold text-group-text mb-3 leading-tight tracking-tight"
          style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
        >
          We&apos;ll be in touch
          <br />
          <span className="text-group-textMuted">within one business day.</span>
        </h3>
        <p className="text-body-md text-group-textMuted max-w-[420px] leading-[1.7]">
          Your enquiry has been routed to our team in Calgary. We take every
          project conversation seriously — expect a thoughtful response.
        </p>
      </div>

      {/* Divider + metadata */}
      <div
        className="w-full h-px bg-group-border mt-4"
        aria-hidden="true"
      />
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {["Calgary, AB", "AB · SK · BC", "APEGA · APEGS"].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-projects-accent/60" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-group-textMuted">
              {item}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main Form ─────────────────────────────────────────────────

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const { ref, inView } = useInView();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      enquiryType: "new-project",
    },
  });

  const messageValue = watch("message", "");
  const MAX_CHARS = 1200;

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Section label */}
      <motion.p
        variants={fadeUp}
        className="font-mono text-[11px] tracking-[0.2em] uppercase text-projects-accent mb-10"
      >
        Project Enquiry
      </motion.p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <SuccessState key="success" />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-9"
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Row 1: Name + Company */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-9">
              <Field label="Full Name" required error={errors.name?.message}>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className={inputBase}
                  disabled={status === "submitting"}
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Enter at least 2 characters" },
                  })}
                />
              </Field>

              <Field label="Company" required error={errors.company?.message}>
                <input
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Industries Ltd."
                  className={inputBase}
                  disabled={status === "submitting"}
                  {...register("company", {
                    required: "Company is required",
                  })}
                />
              </Field>
            </motion.div>

            {/* Row 2: Email + Phone */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-9">
              <Field label="Email Address" required error={errors.email?.message}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  className={inputBase}
                  disabled={status === "submitting"}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </Field>

              <Field label="Phone" optional>
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (403) 555-0100"
                  className={inputBase}
                  disabled={status === "submitting"}
                  {...register("phone")}
                />
              </Field>
            </motion.div>

            {/* Row 3: Enquiry type */}
            <motion.div variants={fadeUp}>
              <Field label="Enquiry Type" required error={errors.enquiryType?.message}>
                <select
                  className={`${inputBase} cursor-pointer appearance-none`}
                  disabled={status === "submitting"}
                  {...register("enquiryType", { required: "Select an enquiry type" })}
                >
                  {ENQUIRY_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-white text-group-text"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            </motion.div>

            {/* Row 4: Message */}
            <motion.div variants={fadeUp}>
              <Field label="Message" required error={errors.message?.message}>
                <div className="relative">
                  <textarea
                    rows={6}
                    placeholder="Tell us about your project — scope, timeline, location, key challenges..."
                    className={`${inputBase} resize-none`}
                    disabled={status === "submitting"}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 20,
                        message: "Please provide a bit more detail (min 20 characters)",
                      },
                      maxLength: {
                        value: MAX_CHARS,
                        message: `Maximum ${MAX_CHARS} characters`,
                      },
                    })}
                  />
                  {/* Character counter */}
                  <div className="flex justify-end mt-2">
                    <span
                      className={`font-mono text-[11px] tracking-[0.08em] transition-colors duration-200 ${
                        messageValue.length > MAX_CHARS * 0.9
                          ? "text-projects-accent/70"
                          : "text-[#9A8870]"
                      }`}
                    >
                      {messageValue.length} / {MAX_CHARS}
                    </span>
                  </div>
                </div>
              </Field>
            </motion.div>

            {/* Row 5: Error banner */}
            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-start gap-3 p-4 border border-red-500/20 bg-red-500/5 rounded"
                >
                  <AlertCircle size={15} className="text-red-400/70 mt-0.5 shrink-0" />
                  <p className="font-mono text-[11px] tracking-[0.05em] text-red-400/70 leading-[1.5]">
                    Transmission failed. Please try again or email us directly at{" "}
                    <span className="text-group-text">info@metricline.ca</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.div variants={fadeUp} className="flex items-center gap-6 pt-2">
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                className={[
                  "group inline-flex items-center gap-2.5 rounded-full font-semibold",
                  "tracking-wide text-[13px] px-7 py-3.5 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-projects-accent/40",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                  "bg-projects-accent text-black hover:bg-projects-accent-hover",
                ]
                  .filter(Boolean)
                  .join(" ")}
                whileTap={{ scale: 0.97 }}
              >
                {status === "submitting" ? (
                  <>
                    <Loader size={13} strokeWidth={2.5} className="animate-spin" />
                    <span>Sending&hellip;</span>
                  </>
                ) : (
                  <>
                    <span>Send Enquiry</span>
                    <ArrowRight
                      size={13}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </motion.button>

              <p className="font-mono text-[11px] tracking-[0.08em] text-group-textMuted leading-[1.5]">
                We respond within
                <br />
                one business day.
              </p>
            </motion.div>

            {/* Privacy note */}
            <motion.p
              variants={fadeUp}
              className="font-mono text-[11px] tracking-[0.06em] text-group-textMuted leading-[1.6] pt-1"
            >
              Your information is used solely to respond to this enquiry and
              will not be shared with third parties.
            </motion.p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
