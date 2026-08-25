"use client";

import { useRef } from "react";
import {
  Wrench,
  PhoneCall,
  ShieldCheck,
  Headset,
  LockKey,
  WifiHigh,
  CloudArrowUp,
  UsersThree,
  Database,
  Star,
} from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HERO_CAROUSEL, RATING } from "@/lib/site";

const ICONS: Record<string, React.ComponentType<{ size?: number; weight?: "bold" | "fill" | "regular" }>> = {
  "Automated Patch Management": Wrench,
  "Cloud Phone / VoIP Setup": PhoneCall,
  "MS 365 Security Audit": ShieldCheck,
  "24/7 IT Helpdesk Support": Headset,
  "Zero-Trust Cybersecurity": LockKey,
  "Network Infrastructure": WifiHigh,
  "Disaster Recovery": CloudArrowUp,
  "Teams Integration": UsersThree,
  "Managed Backup & Restore": Database,
};

function Track({ speed, tone, items, rotate }: { speed: number; tone: "light" | "accent"; items: string[]; rotate: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loop = [...items, ...items]; // duplicated for seamless xPercent loop

  useGSAP(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div
      className="overflow-hidden"
      style={{ transform: `rotateZ(${rotate}deg)` }}
    >
      <div ref={trackRef} className="flex w-max gap-3">
        {loop.map((label, i) => {
          const Icon = ICONS[label] ?? ShieldCheck;
          return (
            <span
              key={`${label}-${i}`}
              className={
                tone === "accent"
                  ? "flex shrink-0 items-center gap-2.5 rounded-2xl border border-white/40 bg-accent/90 px-5 py-3.5 text-sm font-semibold text-accent-ink shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md"
                  : "flex shrink-0 items-center gap-2.5 rounded-2xl border border-white/40 bg-white/55 px-5 py-3.5 text-sm font-semibold text-ink shadow-[0_12px_30px_-14px_rgba(0,0,0,0.3)] backdrop-blur-md"
              }
            >
              <span className={tone === "accent" ? "text-accent-ink" : "text-ink"}>
                <Icon size={16} weight="bold" />
              </span>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** 3D-perspective infinite triple-track carousel + trust rating bar. */
export default function HeroCarousel() {
  return (
    <div className="relative z-10 pb-8 pt-2 sm:pb-10">
      <div
        className="flex flex-col gap-3 px-4 sm:px-8"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <Track speed={HERO_CAROUSEL[0].speed} tone={HERO_CAROUSEL[0].tone} items={[...HERO_CAROUSEL[0].items]} rotate={-2} />
        <Track speed={HERO_CAROUSEL[1].speed} tone={HERO_CAROUSEL[1].tone} items={[...HERO_CAROUSEL[1].items]} rotate={0} />
        <Track speed={HERO_CAROUSEL[2].speed} tone={HERO_CAROUSEL[2].tone} items={[...HERO_CAROUSEL[2].items]} rotate={2} />
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-center gap-2.5 text-sm font-medium text-white/90">
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
