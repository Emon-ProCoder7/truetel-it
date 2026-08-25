"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger children of this element instead of animating it as one block. */
  stagger?: boolean;
  staggerAmount?: number;
  delay?: number;
  y?: number;
  as?: "div" | "section";
};

/**
 * Scroll-triggered fade + rise, matching the reference site's GSAP
 * ScrollTrigger reveal pattern: elements start slightly below and
 * transparent, animate to their resting position once ~80% into view.
 */
export default function Reveal({
  children,
  className,
  stagger = false,
  staggerAmount = 0.12,
  delay = 0,
  y = 32,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : el;

      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "expo.out",
        stagger: stagger ? staggerAmount : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  const Comp = as;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
