"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle, Phone, ArrowLeft } from "@phosphor-icons/react";
import { CONTACT } from "@/lib/site";

/** Fires once, on load — this page exists specifically to be the GHL
 * post-submit redirect target, so a page view here IS a confirmed lead. */
function fireLeadConversion() {
  try {
    const w = window as unknown as {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };
    w.fbq?.("track", "Lead", { content_name: "managed_it_assessment" });
    w.gtag?.("event", "generate_lead", { event_category: "managed_it_landing" });
  } catch {
    // Tracking must never break the confirmation page.
  }
}

export default function ThankYouContent() {
  useEffect(() => {
    fireLeadConversion();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex max-w-md flex-col items-center"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle size={36} weight="fill" className="text-accent-ink" />
        </span>

        <h1 className="text-display-lg mt-6 text-[clamp(1.9rem,4vw,2.6rem)] text-ink">
          Request received.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-secondary">
          Thanks for booking your free IT assessment. We&apos;ll call within 4 business hours —
          no sales script, just questions about what you&apos;ve got and what you need.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bg-soft"
          >
            <ArrowLeft size={15} weight="bold" />
            Back to homepage
          </Link>
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-bright"
          >
            <Phone size={15} weight="fill" />
            Call {CONTACT.phoneDisplay} now
          </a>
        </div>
      </motion.div>
    </main>
  );
}
