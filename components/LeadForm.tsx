"use client";

import { useActionState, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleNotch, CheckCircle, WarningCircle, Phone } from "@phosphor-icons/react";
import { submitLead, type FormState } from "@/lib/form-action";
import { SectionHead, Reveal } from "@/components/ui/Kit";
import { FORM_FIELDS, CONTACT } from "@/lib/site";
import { captureAttribution, fireLeadConversion, type Attribution } from "@/lib/attribution";
import { spring } from "@/lib/motion-easings";
import { cn } from "@/lib/utils";

const initial: FormState = { ok: false };

const WHY_BOOK = [
  "30-minute call, no commitment",
  "A written plan with timelines & prices",
  "No lock-in contracts",
];

/**
 * Interim native lead form (Resend). Per instruction, this may be replaced
 * by an embedded GoHighLevel form for the live campaign — do not swap it
 * without being asked.
 */
export default function LeadForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  const [blurErrors, setBlurErrors] = useState<Record<string, string>>({});
  const [attribution, setAttribution] = useState<Attribution | null>(null);

  useEffect(() => {
    setAttribution(captureAttribution());
  }, []);

  useEffect(() => {
    if (state.ok) fireLeadConversion();
  }, [state.ok]);

  const validate = (name: string, value: string): string => {
    const v = value.trim();
    switch (name) {
      case "firstName": return v.length < 2 ? "Please enter your first name." : "";
      case "businessEmail": return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address." : "";
      case "phone": return !/^(\+?61|0)[\s-]?[2-578]\d(?:[\s-]?\d){7,8}$/.test(v.replace(/\s|-/g, "")) ? "Enter a valid Australian phone number." : "";
      case "businessAndSize": return v.length < 3 ? "Tell us your business name and rough size." : "";
      default: return "";
    }
  };
  const errorFor = (n: string) => state.fieldErrors?.[n as keyof FormState["fieldErrors"]] || blurErrors[n];

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

        <Reveal delay={0.08} className="rounded-[28px] border border-line bg-white p-8">
          <AnimatePresence mode="wait" initial={false}>
            {state.ok ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start gap-4 py-10"
              >
                <CheckCircle size={40} weight="fill" className="text-accent-bright" />
                <h3 className="text-display-md text-2xl text-ink">Request received.</h3>
                <p className="text-ink-secondary">Thanks{state.firstName ? `, ${state.firstName}` : ""}. {state.message}</p>
              </motion.div>
            ) : (
              <motion.form key="form" action={action} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5" noValidate>
                {state.error && (
                  <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" />
                    <span>{state.error}</span>
                  </div>
                )}

                {/* Attribution — populated client-side, invisible to the visitor. */}
                <input type="hidden" name="utmSource" value={attribution?.utmSource ?? ""} readOnly />
                <input type="hidden" name="utmMedium" value={attribution?.utmMedium ?? ""} readOnly />
                <input type="hidden" name="utmCampaign" value={attribution?.utmCampaign ?? ""} readOnly />
                <input type="hidden" name="utmContent" value={attribution?.utmContent ?? ""} readOnly />
                <input type="hidden" name="gclid" value={attribution?.gclid ?? ""} readOnly />
                <input type="hidden" name="fbclid" value={attribution?.fbclid ?? ""} readOnly />
                <input type="hidden" name="landingUrl" value={attribution?.landingUrl ?? ""} readOnly />

                {FORM_FIELDS.map((f) => {
                  const err = errorFor(f.name);
                  return (
                    <div key={f.name}>
                      <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-ink-secondary">
                        {f.label} <span className="text-accent-ink">*</span>
                      </label>
                      <input
                        id={f.name}
                        name={f.name}
                        type={f.type}
                        placeholder={f.placeholder}
                        autoComplete={f.autoComplete}
                        aria-invalid={!!err}
                        onBlur={(e) => setBlurErrors((p) => ({ ...p, [f.name]: validate(f.name, e.target.value) }))}
                        onChange={(e) => { if (blurErrors[f.name]) setBlurErrors((p) => ({ ...p, [f.name]: validate(f.name, e.target.value) })); }}
                        className={cn(
                          "w-full rounded-xl border bg-bg-soft px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors focus:outline-none focus:ring-2 focus:ring-accent",
                          err ? "border-red-300" : "border-line focus:border-transparent"
                        )}
                      />
                      {err ? <p className="mt-1.5 text-xs text-red-600">{err}</p> : null}
                    </div>
                  );
                })}

                <div>
                  <label htmlFor="optionalMessage" className="mb-1.5 block text-sm font-medium text-ink-secondary">
                    One sentence on what you&apos;d like to solve <span className="text-ink-faint">(optional)</span>
                  </label>
                  <textarea
                    id="optionalMessage" name="optionalMessage" rows={3} maxLength={200}
                    placeholder="e.g. Our phones drop calls and IT takes days to respond."
                    className="w-full resize-none rounded-xl border border-line bg-bg-soft px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={pending}
                  whileTap={{ scale: 0.98 }}
                  transition={spring.snappy}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-bright disabled:opacity-70"
                >
                  {pending ? (<><CircleNotch size={18} weight="bold" className="animate-spin" /> Booking…</>) : "Book my free assessment"}
                </motion.button>
                <p className="text-xs text-ink-faint">No spam. Your details are only used to call you back about your assessment.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
