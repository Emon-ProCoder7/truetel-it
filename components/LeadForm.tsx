"use client";

import Script from "next/script";
import { CheckCircle, Phone } from "@phosphor-icons/react";
import { SectionHead, Reveal } from "@/components/ui/Kit";
import { CONTACT } from "@/lib/site";

const WHY_BOOK = [
  "30-minute call, no commitment",
  "A written plan with timelines & prices",
  "No lock-in contracts",
];

const GHL_FORM_ID = "HOlyYqrQwyqhQYipas1x";

/**
 * Lead capture — embeds the GoHighLevel form as-provided so submissions
 * save straight into GHL. It's a cross-origin iframe, so its internal
 * fields/button can't be restyled from this app; only the surrounding
 * card matches the page. Do not swap this back to the native/Resend form
 * without being asked.
 */
export default function LeadForm() {
  return (
    <section id="lead-form" className="px-4 py-24 sm:px-6 sm:py-32">
      <SectionHead
        label="Free IT Assessment"
        title="Book your free IT assessment. 90 seconds."
        intro="We call within 4 business hours. No sales script — just questions about what you've got and what you need."
      />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="flex flex-col rounded-[28px] bg-bg-soft p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-secondary">Why book</p>
          <ul className="mt-5 space-y-3">
            {WHY_BOOK.map((x) => (
              <li key={x} className="flex items-center gap-3 text-sm text-ink">
                <CheckCircle size={18} weight="fill" className="shrink-0 text-accent-bright" />
                {x}
              </li>
            ))}
          </ul>

          <a
            href={CONTACT.phoneHref}
            className="mt-8 flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-semibold text-ink shadow-sm"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
              <Phone size={17} weight="fill" />
            </span>
            Prefer to call? {CONTACT.phoneDisplay}
          </a>
        </Reveal>

        <Reveal delay={0.08} className="overflow-hidden rounded-[28px] border border-line bg-white p-4 sm:p-6">
          {/* EMBED — GoHighLevel form as provided (cross-origin: cannot be
              restyled from this app; surrounding card matches the page). */}
          <iframe
            src={`https://api.leadconnectorhq.com/widget/form/${GHL_FORM_ID}`}
            style={{ width: "100%", height: "797px", border: "none", borderRadius: "8px" }}
            id={`inline-${GHL_FORM_ID}`}
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Truetel-Managed IT Landing Page - Lead Generation"
            data-height="797"
            data-layout-iframe-id={`inline-${GHL_FORM_ID}`}
            data-form-id={GHL_FORM_ID}
            title="Book a free IT assessment"
          />
        </Reveal>
      </div>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </section>
  );
}
