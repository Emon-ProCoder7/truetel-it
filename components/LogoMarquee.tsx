import { INDUSTRIES } from "@/lib/site";

export default function LogoMarquee() {
  return (
    <div className="overflow-hidden border-b border-line py-10">
      <div className="mb-5 text-center text-sm font-medium text-ink-faint">
        Serving Melbourne businesses across
      </div>
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-[marquee_36s_linear_infinite] gap-16 whitespace-nowrap hover:[animation-play-state:paused]">
          {[...INDUSTRIES, ...INDUSTRIES].map((s, i) => (
            <span key={i} className="text-xl font-semibold text-ink-faint/70">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
