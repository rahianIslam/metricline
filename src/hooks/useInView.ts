"use client";

import { useRef } from "react";
import { useInView as useFramerInView } from "framer-motion";

interface UseInViewOptions {
  /** Root margin for the IntersectionObserver. Default: "-80px" */
  margin?: string;
  /** Amount of element visible before triggering. Default: "some" */
  amount?: "some" | "all" | number;
}

/**
 * Thin wrapper around Framer Motion's useInView.
 * Always uses `once: true` — animations only fire once per session.
 *
 * Usage:
 *   const { ref, inView } = useInView()
 *   <div ref={ref}>…</div>
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options: UseInViewOptions = {}): {
  ref: React.RefObject<T | null>;
  inView: boolean;
} {
  const { margin = "-80px", amount = "some" } = options;

  const ref = useRef<T>(null);
  const inView = useFramerInView(ref, {
    once: true,
    margin: margin as `${number}px`,
    amount,
  });

  return { ref, inView };
}
