"use client";

import { useRef } from "react";
import { TrendUp } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHead, Reveal, CountUp } from "@/components/ui/Kit";
import {
  EXPERTISE,
  EXPERTISE_CARD_1,
  EXPERTISE_CARD_2,
  EXPERTISE_CARD_3,
  EXPERTISE_CARD_4,
} from "@/lib/site";

export default function ExpertiseGrid() {
  return (
    <section id="services" className="border-b border-line px-4 py-24 sm:px-6 sm:py-32">
      <SectionHead label={EXPERTISE.eyebrow} title={EXPERTISE.title} intro={EXPERTISE.intro} />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        <CardShell><AutomationCard /></CardShell>
        <CardShell><AnalyticsCard /></CardShell>
        <CardShell><TransformationCard /></CardShell>
        <CardShell><IntelligenceCard /></CardShell>
      </div>
    </section>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return <Reveal className="rounded-[28px] border border-line bg-bg-soft p-7 sm:p-8">{children}</Reveal>;
}

function CardFooter({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-8">
      <h3 className="text-display-md text-xl text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{body}</p>
    </div>
  );
}

/* ---- Card 1: Automation & optimization ------------------------------------ */

function AutomationCard() {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const c = EXPERTISE_CARD_1;

  useGSAP(
    () => {
      if (!barRef.current) return;
      gsap.set(barRef.current, { width: "0%" });
      gsap.to(barRef.current, {
        width: `${c.progressPercent}%`,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });

      const rows = gsap.utils.toArray<HTMLElement>(".stagger-row", ref.current!);
      gsap.set(rows, { opacity: 0, y: 14 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <>
      <div ref={ref} className="relative h-52">
        <div className="absolute left-0 top-3 w-40 -rotate-6 rounded-2xl bg-ink p-4 text-white shadow-lg">
          <div className="flex items-center justify-between text-[0.7rem] text-white/55">
            <span>{c.performanceLabel}</span>
            <TrendUp size={13} weight="bold" className="text-accent" />
          </div>
          <div className="mt-1 text-xs text-white/70">{c.performanceValue}</div>
        </div>
        <div className="absolute right-0 top-0 w-52 rounded-2xl bg-white p-4 shadow-xl">
          <div className="text-xs text-ink-faint">{c.expenseLabel}</div>
          <div className="mt-1 text-lg font-bold text-ink">
            $<CountUp value={String(c.expenseValue)} /> <span className="text-sm font-normal text-ink-faint">/ ${c.expenseTarget.toLocaleString()}</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-soft">
            <div ref={barRef} className="h-full rounded-full bg-accent" />
          </div>
          <ul className="mt-3 space-y-1.5">
            {c.rows.map((r) => (
              <li key={r} className="stagger-row text-xs text-ink-secondary">{r}</li>
            ))}
          </ul>
        </div>
      </div>
      <CardFooter title={c.title} body={c.body} />
    </>
  );
}

/* ---- Card 2: Data analytics & insights ------------------------------------ */

function AnalyticsCard() {
  const ref = useRef<HTMLDivElement>(null);
  const c = EXPERTISE_CARD_2;
  const max = Math.max(...c.bars);

  useGSAP(
    () => {
      const bars = gsap.utils.toArray<HTMLElement>(".chart-bar", ref.current!);
      gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });
      gsap.to(bars, {
        scaleY: 1,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });

      const labels = gsap.utils.toArray<HTMLElement>(".chart-label", ref.current!);
      gsap.set(labels, { opacity: 0, y: 8 });
      gsap.to(labels, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.07,
        delay: 0.4,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <>
      <div ref={ref} className="relative h-52">
        <div className="absolute left-0 top-2 w-36 -rotate-6 rounded-2xl bg-ink p-4 text-white shadow-lg">
          <span className="text-[0.7rem] text-white/55">Expertise</span>
          <div className="mt-1 text-xs text-white/70">Combines strategy + AI</div>
        </div>
        <div className="absolute right-0 top-0 w-56 rotate-3 rounded-2xl bg-white p-4 shadow-xl">
          <div className="text-xs font-medium text-ink">{c.chartLabel}</div>
          <div className="mt-3 flex h-16 items-end gap-1.5">
            {c.bars.map((v, i) => (
              <div key={i} className="chart-bar w-full rounded-t-sm bg-accent" style={{ height: `${(v / max) * 100}%` }} />
            ))}
          </div>
          <div className="mt-1.5 flex gap-1.5">
            {c.years.map((y) => (
              <span key={y} className="chart-label w-full text-center text-[0.6rem] text-ink-faint">{y.slice(2)}</span>
            ))}
          </div>
        </div>
      </div>
      <CardFooter title={c.title} body={c.body} />
    </>
  );
}

/* ---- Card 3: Digital transformation (bi-directional marquee) -------------- */

function TransformationCard() {
  const c = EXPERTISE_CARD_3;
  const topLoop = [...c.tagsTop, ...c.tagsTop];
  const bottomLoop = [...c.tagsBottom, ...c.tagsBottom];

  return (
    <>
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-x-0 top-3 flex flex-col gap-2">
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
            <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-2">
              {topLoop.map((t, i) => (
                <span key={i} className="shrink-0 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white">{t}</span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
            <div className="flex w-max animate-[marquee-reverse_26s_linear_infinite] gap-2">
              {bottomLoop.map((t, i) => (
                <span key={i} className="shrink-0 rounded-full border border-line-strong bg-white px-3 py-1.5 text-xs font-medium text-ink">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 w-44 -translate-x-1/2 rounded-2xl bg-white p-4 text-center shadow-xl">
          <div className="text-xs text-ink-faint">
            {c.metricLabel} {c.mock && <span className="text-ink-faint">(illustrative)</span>}
          </div>
          <div className="mt-0.5 text-2xl font-bold text-ink">{c.metricValue}</div>
        </div>
      </div>
      <CardFooter title={c.title} body={c.body} />
    </>
  );
}

/* ---- Card 4: Experience intelligence (orbital float) ---------------------- */

function IntelligenceCard() {
  const c = EXPERTISE_CARD_4;
  const radii = [70, 95, 118];
  const durations = [14, 19, 24];

  return (
    <>
      <div className="relative h-52">
        {[1, 2, 3].map((ring) => (
          <span
            key={ring}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong"
            style={{ width: radii[ring - 1] * 2, height: radii[ring - 1] * 2 }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-ink text-xs font-bold text-white shadow-lg">
          TT
        </span>
        {c.pills.map((p, i) => (
          <span
            key={p.name}
            className="absolute left-1/2 top-1/2"
            style={{
              // @ts-expect-error -- custom property consumed by the orbit keyframe
              "--orbit-radius": `${radii[i]}px`,
              animation: `orbit ${durations[i]}s linear infinite`,
              animationDelay: `${-i * 4}s`,
            }}
          >
            <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-md">
              {p.name}
              <span className="text-accent-ink/70">{p.metric}</span>
            </span>
          </span>
        ))}
      </div>
      <CardFooter title={c.title} body={c.body} />
    </>
  );
}
