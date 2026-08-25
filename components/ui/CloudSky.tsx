"use client";

/**
 * Sky-blue gradient with soft floating SVG clouds — the hero's background
 * layer. Pure CSS drift (no WebGL), several depths/speeds for parallax.
 */
const CLOUDS = [
  { top: "8%", size: 420, opacity: 0.55, duration: 46, delay: 0, blur: 2 },
  { top: "22%", size: 260, opacity: 0.4, duration: 34, delay: -8, blur: 1 },
  { top: "44%", size: 520, opacity: 0.5, duration: 58, delay: -20, blur: 3 },
  { top: "62%", size: 300, opacity: 0.35, duration: 40, delay: -14, blur: 1 },
  { top: "6%", size: 200, opacity: 0.3, duration: 30, delay: -4, blur: 0.5 },
  { top: "76%", size: 380, opacity: 0.45, duration: 50, delay: -26, blur: 2 },
];

function Cloud({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 100" width={size} height={size * 0.5} fill="none">
      <ellipse cx="60" cy="60" rx="55" ry="32" fill="white" />
      <ellipse cx="105" cy="45" rx="45" ry="35" fill="white" />
      <ellipse cx="145" cy="60" rx="42" ry="26" fill="white" />
      <ellipse cx="90" cy="70" rx="70" ry="24" fill="white" />
    </svg>
  );
}

export default function CloudSky() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#3f8fe0] via-[#6ab4ec] to-[#bfe3f7]">
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5" />
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute left-0 will-change-transform"
          style={{
            top: c.top,
            opacity: c.opacity,
            filter: `blur(${c.blur}px)`,
            animation: `cloud-drift ${c.duration}s linear infinite`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <Cloud size={c.size} />
        </div>
      ))}
    </div>
  );
}
