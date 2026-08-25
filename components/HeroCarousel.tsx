"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star, TrendUp } from "@phosphor-icons/react";
import { HERO_CAROUSEL_CARDS, RATING } from "@/lib/site";

type CardData = (typeof HERO_CAROUSEL_CARDS)[number];

/** Every card renders inside the same fixed box — a uniform card size is
 * what makes the ring read as a smooth cylinder instead of a jagged one. */
const CARD_W = 135;
const CARD_H = 95;
const cardBox = "w-[135px] h-[95px] rounded-2xl shadow-xl overflow-hidden";

function Card({ card }: { card: CardData }) {
  if (card.kind === "financial") {
    return (
      <div className={`${cardBox} bg-white p-2.5`}>
        <div className="text-[0.6rem] text-ink-faint">{card.label}</div>
        <div className="mt-0.5 text-sm font-bold text-ink">
          ${card.value.toLocaleString()} <span className="text-[0.65rem] font-normal text-ink-faint">/ ${card.target.toLocaleString()}</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bg-soft">
          <div className="h-full rounded-full bg-accent" style={{ width: `${card.percent}%` }} />
        </div>
      </div>
    );
  }

  if (card.kind === "photo") {
    return (
      <div className={`${cardBox} relative`}>
        <Image src={card.image} alt="" fill sizes={`${CARD_W}px`} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[0.6rem] font-medium leading-tight text-white">{card.caption}</span>
      </div>
    );
  }

  if (card.kind === "chart") {
    return (
      <div className={`${cardBox} bg-white p-2.5`}>
        <div className="flex items-center justify-between text-[0.6rem] text-ink-faint">
          <span>{card.label}</span>
          <TrendUp size={11} weight="bold" className="text-accent" />
        </div>
        <svg viewBox="0 0 120 40" className="mt-1.5 h-7 w-full">
          <polyline points="0,32 20,26 40,28 60,18 80,20 100,8 120,10" fill="none" stroke="#b8874a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (card.kind === "dark") {
    return (
      <div className={`${cardBox} flex flex-col justify-between bg-ink p-2.5 text-white`}>
        <span className="flex size-5 items-center justify-center rounded-full bg-accent/90">
          <Star size={10} weight="fill" className="text-accent-ink" />
        </span>
        <p className="text-xs font-semibold leading-snug">{card.text}</p>
      </div>
    );
  }

  if (card.kind === "app") {
    return (
      <div className={`${cardBox} relative`}>
        <Image src={card.image} alt="" fill sizes={`${CARD_W}px`} className="object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-start justify-center gap-1 p-2">
          {card.pills.map((p) => (
            <span key={p} className="rounded-full bg-white/90 px-1.5 py-0.5 text-[0.55rem] font-medium text-ink shadow-sm">{p}</span>
          ))}
        </div>
      </div>
    );
  }

  // bars
  return (
    <div className={`${cardBox} bg-white p-2.5`}>
      <div className="text-[0.6rem] text-ink-faint">{card.label}</div>
      <div className="mt-1.5 flex h-7 items-end gap-1">
        {[30, 45, 40, 60, 75, 65, 90].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm bg-accent" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ---- Geometry — precise cylindrical-arc blueprint -------------------------- */
const RADIUS = 520;
const ANGLE_STEP = 22.5;
const TOTAL_SLOTS = 360 / ANGLE_STEP; // 16
const RING_CARDS = Array.from({ length: TOTAL_SLOTS }, (_, i) => HERO_CAROUSEL_CARDS[i % HERO_CAROUSEL_CARDS.length]);
const DEG_PER_FRAME = 0.11; // faster perpetual spin

const VISIBLE_WINDOW = 65; // beyond this, a card is fully hidden
const FADE_START = 42; // fade begins here, reaching 0 at VISIBLE_WINDOW

function normalizedAngle(combined: number) {
  const wrapped = ((combined % 360) + 360) % 360;
  return Math.abs(wrapped > 180 ? wrapped - 360 : wrapped);
}

function visibilityFor(normalized: number) {
  if (normalized > VISIBLE_WINDOW) return 0;
  if (normalized > FADE_START) return 1 - (normalized - FADE_START) / (VISIBLE_WINDOW - FADE_START);
  return 1;
}

/**
 * Cards arranged around a continuously auto-rotating 3D cylinder (runs on
 * its own — no scroll or drag dependency). Every wrapper between the
 * perspective root and the cards carries `preserve-3d` so the 3D space
 * never collapses flat; each card is positioned with a single unified
 * `rotateY() translateZ()` transform — no secondary 2D offset layer.
 * Only the front-facing +/-65deg arc is ever visible.
 */
export default function HeroCarousel() {
  const ringRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0;

    const applyVisibility = () => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const normalized = normalizedAngle(angle + i * ANGLE_STEP);
        const v = visibilityFor(normalized);
        el.style.opacity = String(v);
        el.style.pointerEvents = v === 0 ? "none" : "auto";
      });
    };

    if (reduce) {
      applyVisibility();
      return;
    }

    let raf = 0;
    const tick = () => {
      angle += DEG_PER_FRAME;
      if (ringRef.current) ringRef.current.style.transform = `rotateY(${angle}deg)`;
      applyVisibility();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative z-10 w-full pb-8 pt-16 sm:pb-10">
      <div className="relative h-[380px] w-full overflow-hidden" style={{ perspective: 1800, transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(10deg)" }}>
          <div ref={ringRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {RING_CARDS.map((card, i) => (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  marginLeft: -CARD_W / 2,
                  marginTop: -CARD_H / 2,
                  transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Card card={card} />
              </div>
            ))}
          </div>
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
