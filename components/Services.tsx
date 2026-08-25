"use client";

import Image from "next/image";
import { ShieldCheck, PhoneCall, Gear } from "@phosphor-icons/react";
import { SectionHead, Button, Reveal } from "@/components/ui/Kit";
import { SERVICES, ALSO_INCLUDED, type Service } from "@/lib/site";

const ICONS = { "managed-it": Gear, cybersecurity: ShieldCheck, "cloud-phone": PhoneCall };

export default function Services() {
  const [featured, ...rest] = SERVICES;

  return (
    <section id="services" className="border-b border-line px-4 py-24 sm:px-6 sm:py-32">
      <SectionHead
        label="Services"
        title="Everything your business needs, one invoice."
        intro="Managed IT is the core of what we do — cybersecurity, cloud phone and Microsoft 365 support the same team, the same invoice."
      />

      <div className="mt-10 flex justify-center">
        <Button href="#lead-form" variant="dark">Get a Quote</Button>
      </div>

      <div className="mx-auto mt-14 max-w-5xl rounded-[28px] border border-line bg-bg-soft p-2 sm:p-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:p-1">
          <ServiceCard service={featured} featured />
          {rest.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>

      <Reveal className="mx-auto mt-10 max-w-5xl">
        <p className="text-center text-sm text-ink-faint">
          Also included: {ALSO_INCLUDED.join(" · ")}
        </p>
      </Reveal>
    </section>
  );
}

function ServiceCard({ service, featured }: { service: Service; featured?: boolean }) {
  const Icon = ICONS[service.id as keyof typeof ICONS];

  return (
    <Reveal
      className={`flex flex-col overflow-hidden rounded-[22px] bg-white ${featured ? "sm:col-span-3 sm:flex-row" : ""}`}
    >
      <div className={`relative ${featured ? "h-56 sm:h-auto sm:w-2/5" : "h-40"}`}>
        <Image
          src={service.image}
          alt={`${service.name} — TrueTel`}
          fill
          sizes={featured ? "(max-width:1024px) 100vw, 40vw" : "(max-width:1024px) 100vw, 33vw"}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="flex size-10 items-center justify-center rounded-full bg-accent/30 text-ink">
          <Icon size={18} weight="bold" />
        </span>
        <h3 className="text-display-md text-xl text-ink">{service.name}</h3>
        <p className="text-sm leading-relaxed text-ink-secondary">{service.blurb}</p>
        <ul className="mt-1 space-y-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-ink">
              <span className="size-1.5 shrink-0 rounded-full bg-ink" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
