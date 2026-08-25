"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, TrendUp } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HERO_CAROUSEL_CARDS, RATING } from "@/lib/site";

type CardData = (typeof HERO_CAROUSEL_CARDS)[number];

function Card({ card }: { card: CardData }) {
  const style = { transform: `rotateZ(${card.rotate}deg) translateY(${Math.abs(card.rotate)}px)` };

  if (card.kind === "financial") {
    return (
      <div style={style} className="w-40 shrink-0 rounded-2xl bg-white p-3.5 shadow-xl">
        <div className="text-[0.65rem] text-ink-faint">{card.label}</div>
        <div className="mt-0.5 text-base font-bold text-ink">
          ${card.value.toLocaleString()} <span className="text-xs font-normal text-ink-faint">/ ${card.target.toLocaleString()}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-soft">
          <div className="h-full rounded-full bg-accent" style={{ width: `${card.percent}%` }} />
        </div>
      </div>
    );
  }

  if (card.kind === "photo") {
    return (
      <div style={style} className="relative h-40 w-32 shrink-0 overflow-hidden rounded-2xl shadow-xl">
        <Image src={card.image} alt="" fill sizes="128px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute bottom-2 left-2 right-2 text-[0.65rem] font-medium leading-tight text-white">{card.caption}</span>
      </div>
    );
  }

  if (card.kind === "chart") {
    return (
      <div style={style} className="w-40 shrink-0 rounded-2xl bg-white p-3.5 shadow-xl">
        <div className="flex items-center justify-between text-[0.65rem] text-ink-faint">
          <span>{card.label}</span>
          <TrendUp size={12} weight="bold" className="text-accent" />
        </div>
        <svg viewBox="0 0 120 40" className="mt-2 h-10 w-full">
          <polyline points="0,32 20,26 40,28 60,18 80,20 100,8 120,10" fill="none" stroke="#b8874a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (card.kind === "dark") {
    return (
      <div style={style} className="flex h-40 w-40 shrink-0 flex-col justify-between rounded-2xl bg-ink p-4 text-white shadow-xl">
        <span className="flex size-6 items-center justify-center rounded-full bg-accent/90">
          <Star size={12} weight="fill" className="text-accent-ink" />
        </span>
        <p className="text-sm font-semibold leading-snug">{card.text}</p>
      </div>
    );
  }

  if (card.kind === "app") {
    return (
      <div style={style} className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl shadow-xl">
        <Image src={card.image} alt="" fill sizes="128px" className="object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-start justify-center gap-1.5 p-2.5">
          {card.pills.map((p) => (
            <span key={p} className="rounded-full bg-white/90 px-2 py-1 text-[0.6rem] font-medium text-ink shadow-sm">{p}</span>
          ))}
        </div>
      </div>
    );
  }

  // bars
  return (
    <div style={style} className="w-40 shrink-0 rounded-2xl bg-white p-3.5 shadow-xl">
      <div className="text-[0.65rem] text-ink-faint">{card.label}</div>
      <div className="mt-2 flex h-10 items-end gap-1">
        {[30, 45, 40, 60, 75, 65, 90].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm bg-accent" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

/** Single-row infinite perspective carousel + trust rating bar. */
export default function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const loop = [...HERO_CAROUSEL_CARDS, ...HERO_CAROUSEL_CARDS];

  useGSAP(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, { xPercent: -50, duration: 42, ease: "none", repeat: -1 });
  }, []);

  return (
    <div className="relative z-10 pb-8 pt-2 sm:pb-10">
      <div className="overflow-hidden pb-2" style={{ perspective: "1200px" }}>
        <div ref={trackRef} className="flex w-max items-end gap-4 px-4" style={{ transformStyle: "preserve-3d" }}>
          {loop.map((card, i) => (
            <Card key={i} card={card} />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-center justify-center gap-2.5 text-sm font-medium text-white/90">
        <span className="flex items-center gap-0.5 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={15} weight="fill" />
          ))}
        </span>
        Rated {RATING.score}/5 by {RATING.count} Australian businesses
        {RATING.mock && <span className="text-white/50">(illustrative)</span>}
      </div>
    </div>
  );
}
