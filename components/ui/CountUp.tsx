"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  /** e.g. "27", "99.9", "100" — parsed for the animated count, prefix/suffix kept static. */
  value: string;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Animated count-up on scroll into view, matching the reference site's stat tiles. */
export default function CountUp({ value, prefix = "", suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const numeric = parseFloat(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const isNumeric = !Number.isNaN(numeric);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !isNumeric) return;
      const obj = { n: 0 };
      gsap.to(obj, {
        n: numeric,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          const formatted = decimals
            ? obj.n.toFixed(decimals)
            : Math.round(obj.n).toLocaleString("en-AU");
          el.textContent = `${prefix}${formatted}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [value] }
  );

  if (!isNumeric) {
    return (
      <span className={className}>
        {prefix}
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {decimals ? (0).toFixed(decimals) : 0}
      {suffix}
    </span>
  );
}
