"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { spring } from "@/lib/motion-easings";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/* ---- Eyebrow — small square-bullet label, matching the reference ---------- */
export function Eyebrow({ children, onDark, className }: { children: ReactNode; onDark?: boolean; className?: string }) {
  return <span className={cn("eyebrow", onDark && "on-dark", className)}>{children}</span>;
}

/* ---- Pill button — lime / dark / outline, matching the reference ---------- */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "accent",
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "accent" | "dark" | "outline";
  className?: string;
}) {
  const styles = {
    accent: "bg-accent text-accent-ink hover:bg-accent-bright",
    dark: "bg-ink text-white hover:bg-ink/85",
    outline: "border border-line-strong text-ink hover:bg-bg-soft",
  }[variant];

  const badgeStyles = {
    accent: "bg-black/10",
    dark: "bg-white/15",
    outline: "bg-black/5",
  }[variant];

  const content = (
    <>
      {children}
      <span className={cn("flex size-6 items-center justify-center rounded-full", badgeStyles)}>
        <ArrowUpRight size={13} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </>
  );

  const cls = cn(
    "group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-colors duration-200",
    styles,
    className
  );

  if (href) {
    return (
      <motion.a href={href} whileTap={{ scale: 0.97 }} transition={spring.snappy} className={cls}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} onClick={onClick} whileTap={{ scale: 0.97 }} transition={spring.snappy} className={cls}>
      {content}
    </motion.button>
  );
}

/* ---- Section head — eyebrow + headline + intro, center-aligned ------------ */
export function SectionHead({
  label,
  title,
  intro,
  onDark,
  className,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex max-w-2xl flex-col items-center gap-5 text-center", className)}>
      <Eyebrow onDark={onDark}>{label}</Eyebrow>
      <Reveal>
        <h2 className={cn("text-display-lg text-[clamp(1.9rem,3.6vw,3rem)]", onDark ? "text-white" : "text-ink")}>{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.08}>
          <p className={cn("text-lg leading-relaxed", onDark ? "text-white/70" : "text-ink-secondary")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

export { default as Reveal } from "./Reveal";
export { default as CountUp } from "./CountUp";
