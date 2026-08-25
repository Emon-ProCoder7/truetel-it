"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Star, CheckCircle } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button, Eyebrow } from "@/components/ui/Kit";
import Nav from "@/components/Nav";
import { HERO, HERO_STAT_CARDS, CONTACT } from "@/lib/site";

const SkyBackground = dynamic(() => import("@/components/ui/SkyBackground"), { ssr: false });

function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="reveal-word inline-block overflow-hidden pb-1">
          <span className="inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".reveal-word > span");
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.045,
        delay: 0.15,
      });
    },
    { scope: ref }
  );

  return (
    <section id="top" ref={ref} className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]">
        <Nav />

        <div className="absolute inset-0">
          <SkyBackground />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

        <div className="relative z-10 flex flex-col items-center px-5 pb-24 pt-32 text-center sm:pt-40 md:pb-32">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6 }}>
            <Eyebrow onDark>{HERO.eyebrow}</Eyebrow>
          </motion.div>

          <h1
            className="text-display-hero mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4rem)] text-white"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.25)" }}
          >
            <SplitWords text={HERO.headlineLine1} className="block" />
            <SplitWords text={HERO.headlineLine2} className="block text-white/80" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/90 sm:text-lg"
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#lead-form" variant="accent">Book a Free IT Assessment</Button>
            <Button href={CONTACT.phoneHref} variant="dark">Call {CONTACT.phoneDisplay}</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-6 flex items-center gap-2 text-sm text-white/85"
          >
            <span className="flex items-center gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} weight="fill" />
              ))}
            </span>
            {HERO.trustLine}
          </motion.div>
        </div>

        {/* Floating stat card cluster, overlapping the bottom edge */}
        <div className="relative z-10 -mt-16 hidden gap-4 px-6 pb-6 sm:flex sm:justify-center md:-mt-20">
          {HERO_STAT_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 + i * 0.1, duration: 0.6 }}
              className="card flex w-56 flex-col gap-1 p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle size={14} weight="fill" className="text-accent-bright" />
                <span className="text-xs font-medium uppercase tracking-wide">{card.label}</span>
              </div>
              <span className="text-display-md text-xl text-ink">{card.value}</span>
              <span className="text-xs text-ink-faint">{card.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
