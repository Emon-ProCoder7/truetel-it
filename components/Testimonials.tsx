"use client";

import { Quotes } from "@phosphor-icons/react";
import { SectionHead, Reveal } from "@/components/ui/Kit";
import { TESTIMONIALS } from "@/lib/site";

export default function Testimonials() {
  return (
    <section className="border-b border-line px-4 py-24 sm:px-6 sm:py-32">
      <SectionHead label="What Melbourne businesses say" title="Real problems. One partner." />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08} className="flex h-full flex-col rounded-[24px] bg-ink p-7 text-white">
            <Quotes size={28} weight="fill" className="text-accent" />
            <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-white/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-accent">
                {t.initials}
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-white/55">{t.sector}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
