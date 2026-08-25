"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { spring } from "@/lib/motion-easings";
import CloudSky from "@/components/ui/CloudSky";
import Nav from "@/components/Nav";
import HeroCarousel from "@/components/HeroCarousel";
import { HERO } from "@/lib/site";

function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`flex flex-wrap justify-center ${className ?? ""}`}>
      {words.map((w, i) => (
        <span key={i} className="reveal-word mr-[0.28em] overflow-hidden pb-1 last:mr-0">
          <span className="inline-block will-change-transform">{w}</span>
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
        <CloudSky />

        <div className="relative z-10 flex flex-col items-center px-5 pb-6 pt-32 text-center sm:pt-40">
          <h1
            className="text-display-hero max-w-4xl text-[clamp(2.2rem,5.4vw,3.6rem)] text-white"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.25)" }}
          >
            <SplitWords text={HERO.headlineLine1} />
            <SplitWords text={HERO.headlineLine2} className="text-white/85" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/90 sm:text-lg"
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#services"
              whileTap={{ scale: 0.97 }}
              transition={spring.snappy}
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-bright"
            >
              {HERO.ctaPrimary}
            </motion.a>
            <motion.a
              href="#lead-form"
              whileTap={{ scale: 0.97 }}
              transition={spring.snappy}
              className="group inline-flex items-center gap-2 text-[0.95rem] font-semibold text-white"
            >
              {HERO.ctaSecondary}
              <span className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight size={15} weight="bold" />
              </span>
            </motion.a>
          </motion.div>
        </div>

        <HeroCarousel />
      </div>
    </section>
  );
}
