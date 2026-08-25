"use client";

import { SectionHead, Reveal } from "@/components/ui/Kit";
import { PROCESS_STEPS } from "@/lib/site";

export default function Process() {
  return (
    <section id="process" className="border-b border-line bg-bg-soft px-4 py-24 sm:px-6 sm:py-32">
      <SectionHead
        label="How it works"
        title="Three steps. Two weeks. Zero downtime."
        intro="No drawn-out migrations, no mystery invoices. Here's exactly what happens after you book your free assessment."
      />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.step} delay={i * 0.1} className="flex flex-col rounded-[24px] bg-white p-7">
            <span className="text-display-hero text-5xl text-ink-faint">{step.step}</span>
            <h3 className="text-display-md mt-4 text-xl text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{step.body}</p>
            <span className="mt-5 inline-flex w-fit items-center rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-ink">
              {step.time}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
