"use client";

import Image from "next/image";
import { SectionHead, Reveal, CountUp } from "@/components/ui/Kit";
import { WHY_STATS } from "@/lib/site";

function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: value, suffix: "" };
  return { prefix: match[1], number: match[2], suffix: match[3] };
}

export default function WhyStats() {
  const [featured, gray, lime, dark] = WHY_STATS;

  return (
    <section id="why" className="border-b border-line px-4 py-24 sm:px-6 sm:py-32">
      <SectionHead
        label="Why TrueTel"
        title={
          <>
            One Melbourne partner,{" "}
            <span className="text-ink-faint">zero</span> finger-pointing.
          </>
        }
        intro="Real numbers from a team that actually shows up — not an offshore ticket queue."
      />

      <Reveal stagger staggerAmount={0.1} className="mt-14 mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Featured photo card */}
        <StatCard className="relative overflow-hidden text-white sm:col-span-2 sm:row-span-2 min-h-[280px]">
          <Image src="/assets/founder-portrait.png" alt="The TrueTel Melbourne team" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="relative flex h-full flex-col justify-end gap-1 p-6">
            <span className="text-display-hero text-4xl">
              {(() => { const v = parseValue(featured.value); return <CountUp value={v.number} prefix={v.prefix} suffix={v.suffix} />; })()}
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-white/85">{featured.note}</p>
          </div>
        </StatCard>

        <StatCard className="relative bg-bg-soft text-ink">
          {gray.mock && (
            <span className="absolute right-4 top-4 rounded-full border border-line-strong px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-ink-faint">
              illustrative
            </span>
          )}
          <p className="text-sm text-ink-secondary">{gray.label}</p>
          <span className="text-display-md text-3xl">
            {(() => { const v = parseValue(gray.value); return <CountUp value={v.number} prefix={v.prefix} suffix={v.suffix} />; })()}
          </span>
          <p className="mt-1 text-sm text-ink-faint">{gray.note}</p>
        </StatCard>

        <StatCard className="bg-accent text-accent-ink">
          <p className="text-sm text-accent-ink/70">{lime.label}</p>
          <span className="text-display-md text-3xl">
            {(() => { const v = parseValue(lime.value); return <CountUp value={v.number} prefix={v.prefix} suffix={v.suffix} />; })()}
          </span>
          <p className="mt-1 text-sm text-accent-ink/70">{lime.note}</p>
        </StatCard>

        <StatCard className="bg-ink text-white sm:col-span-2">
          <p className="text-sm text-white/60">{dark.label}</p>
          <span className="text-display-md text-3xl">{dark.value}</span>
          <p className="mt-1 max-w-sm text-sm text-white/70">{dark.note}</p>
        </StatCard>
      </Reveal>
    </section>
  );
}

function StatCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col justify-end gap-1 rounded-[24px] p-6 ${className}`}>{children}</div>;
}
