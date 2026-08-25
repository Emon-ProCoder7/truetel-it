import Image from "next/image";

/** Static sky photo background for the hero. */
export default function CloudSky() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image src="/brand/sky.avif" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/15 to-transparent" />
    </div>
  );
}
