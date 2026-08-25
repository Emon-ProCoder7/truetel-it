import Image from "next/image";
import { CONTACT, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink px-4 pb-8 pt-16 text-white sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-white p-1.5">
              <Image src="/brand/truetel-logo.png" alt="TrueTel" width={22} height={22} className="object-contain" />
            </span>
            <span className="text-lg font-semibold">TrueTel</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Managed IT, cybersecurity, cloud phone and Microsoft 365 for Melbourne businesses. Built in{" "}
            {CONTACT.suburb.split(",")[0]}, serving {CONTACT.region}.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Index</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/70 hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href={CONTACT.phoneHref} className="text-white hover:text-accent">{CONTACT.phoneDisplay}</a></li>
              <li><a href={CONTACT.emailHref} className="text-white/70 hover:text-white">{CONTACT.email}</a></li>
              <li className="text-white/70">{CONTACT.suburb}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} TrueTel Pty Ltd · ABN [pending — Jack to confirm]</span>
        <span>This page is built for a paid Managed IT ad campaign — not indexed for organic search.</span>
      </div>
    </footer>
  );
}
