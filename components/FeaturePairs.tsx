"use client";

import { TrendUp } from "@phosphor-icons/react";
import { Eyebrow, Reveal } from "@/components/ui/Kit";
import { FEATURE_PAIRS } from "@/lib/site";

export default function FeaturePairs() {
  return (
    <section className="border-b border-line px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center">Proof, not promises</Eyebrow>
        <Reveal>
          <h2 className="text-display-lg mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-ink">
            Where local support meets a real Melbourne team.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {FEATURE_PAIRS.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08} className="rounded-[28px] bg-bg-soft p-8">
            <div className="relative mb-10 flex h-40 items-center justify-center">
              <MockCard label={f.tagLabel} value={f.tagValue} />
            </div>
            <h3 className="text-display-md text-2xl text-ink">{f.title}</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-secondary">{f.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MockCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative">
      <div className="absolute -left-6 top-3 w-44 rotate-[-6deg] rounded-2xl bg-ink p-4 text-white shadow-xl">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>{label}</span>
          <TrendUp size={14} weight="bold" className="text-accent" />
        </div>
        <div className="mt-1 text-lg font-semibold">{value}</div>
      </div>
      <div className="w-48 rotate-[4deg] rounded-2xl bg-white p-4 shadow-xl">
        <div className="text-xs text-ink-faint">Status</div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-accent-bright" />
          <span className="text-sm font-semibold text-ink">All systems normal</span>
        </div>
      </div>
    </div>
  );
}
