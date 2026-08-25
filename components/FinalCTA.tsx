"use client";

import dynamic from "next/dynamic";
import { Reveal, Button } from "@/components/ui/Kit";

const SkyBackground = dynamic(() => import("@/components/ui/SkyBackground"), { ssr: false });

export default function FinalCTA() {
  return (
    <section className="px-3 py-3 sm:px-4 sm:py-4">
      <Reveal className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]">
        <div className="absolute inset-0">
          <SkyBackground />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
        <div className="relative z-10 flex flex-col items-start gap-6 px-8 py-20 sm:px-14 sm:py-28">
          <p className="text-sm font-semibold text-white/85">Trusted by Melbourne business owners</p>
          <h2 className="text-display-hero max-w-lg text-[clamp(1.9rem,4.2vw,3.2rem)] text-white">
            Ready for IT that just works?
          </h2>
          <p className="max-w-md text-white/85">
            Book a free 30-minute assessment. No sales script, no lock-in contracts — just a plan for your business.
          </p>
          <Button href="#lead-form" variant="accent">Book a Free IT Assessment</Button>
        </div>
      </Reveal>
    </section>
  );
}
