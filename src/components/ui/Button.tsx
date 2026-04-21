"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "md" | "lg";
type ButtonContext = "light" | "dark";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** "light" = on cream/white bg, "dark" = inside dark anchor sections */
  context?: ButtonContext;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  /** Override arrow visibility */
  showArrow?: boolean;
  /** External link */
  external?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-[13px]",
  lg: "px-7 py-3.5 text-[14px]",
};

function getVariantClasses(variant: ButtonVariant, context: ButtonContext): string {
  if (variant === "primary") {
    return "bg-[#C8832A] text-white hover:bg-[#D99440] border border-transparent shadow-[var(--shadow-button-primary)]";
  }
  if (context === "dark") {
    return "bg-transparent text-white border border-white/30 hover:border-white/60 hover:bg-white/5";
  }
  return "bg-transparent text-group-text border border-group-text/25 hover:border-group-text/50 hover:bg-group-text/5";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  context = "light",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  showArrow = true,
  external = false,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    sizeClasses[size],
    getVariantClasses(variant, context),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          size={14}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group ${classes}`}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${classes}`}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
}

// ── Division-tinted variant ───────────────────────────────────
// Used on division pages where the accent color is the bg.

interface DivisionButtonProps extends Omit<ButtonProps, "variant"> {
  accentColor: string;
  accentHoverColor: string;
  darkText?: boolean;
}

export function DivisionButton({
  accentColor,
  accentHoverColor: _accentHoverColor,
  darkText = false,
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  size = "md",
  className = "",
  showArrow = true,
  external = false,
}: DivisionButtonProps) {
  const classes = [
    "inline-flex items-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    sizeClasses[size],
    darkText ? "text-black" : "text-white",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    backgroundColor: accentColor,
  };

  const inner = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          size={14}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group ${classes}`}
        style={style}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${classes}`}
      style={style}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
}
