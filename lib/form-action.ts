"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { CONTACT } from "@/lib/site";

/* ---- Validation ---------------------------------------------------------- */

const auPhone = /^(\+?61|0)[\s-]?[2-578]\d(?:[\s-]?\d){7,8}$/;

export const leadSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name.").max(60),
  businessEmail: z
    .string()
    .trim()
    .min(1, "Business email is required.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required.")
    .refine((v) => auPhone.test(v.replace(/\s|-/g, "")), "Enter a valid Australian phone number."),
  businessAndSize: z
    .string()
    .trim()
    .min(3, "Tell us your business name and rough size.")
    .max(120),
  optionalMessage: z.string().trim().max(200).optional().or(z.literal("")),
  // Attribution — hidden fields populated client-side from the URL/session.
  utmSource: z.string().trim().max(80).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(80).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(120).optional().or(z.literal("")),
  utmContent: z.string().trim().max(120).optional().or(z.literal("")),
  gclid: z.string().trim().max(200).optional().or(z.literal("")),
  fbclid: z.string().trim().max(200).optional().or(z.literal("")),
  landingUrl: z.string().trim().max(300).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type FormState = {
  ok: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof LeadInput, string>>;
  firstName?: string;
};

/* ---- Rate limit (in-memory; fine for a single-server v1 landing page) ---- */

const RATE_WINDOW_MS = 60_000;
const lastHit = new Map<string, number>();

function rateLimited(ip: string) {
  const now = Date.now();
  const prev = lastHit.get(ip) ?? 0;
  if (now - prev < RATE_WINDOW_MS) return true;
  lastHit.set(ip, now);
  if (lastHit.size > 5000) {
    for (const [k, t] of lastHit) if (now - t > RATE_WINDOW_MS) lastHit.delete(k);
  }
  return false;
}

/* ---- Action ---------------------------------------------------------------
   NOTE: this native form is an interim submission path. Per instruction, a
   GoHighLevel-embedded form may replace it for the live ad campaign — do not
   change this without being asked. */

export async function submitLead(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "local").split(",")[0].trim();

  if (rateLimited(ip)) {
    return { ok: false, error: "You just sent a request — give it a minute, then try again." };
  }

  const parsed = leadSchema.safeParse({
    firstName: formData.get("firstName"),
    businessEmail: formData.get("businessEmail"),
    phone: formData.get("phone"),
    businessAndSize: formData.get("businessAndSize"),
    optionalMessage: formData.get("optionalMessage") ?? "",
    utmSource: formData.get("utmSource") ?? "",
    utmMedium: formData.get("utmMedium") ?? "",
    utmCampaign: formData.get("utmCampaign") ?? "",
    utmContent: formData.get("utmContent") ?? "",
    gclid: formData.get("gclid") ?? "",
    fbclid: formData.get("fbclid") ?? "",
    landingUrl: formData.get("landingUrl") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: FormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "leads@truetel.com.au";

  if (!apiKey || !to) {
    console.warn("[submitLead] RESEND env vars missing — email not sent.");
    return {
      ok: false,
      error: `Online booking isn't connected yet. Call us on ${CONTACT.phoneDisplay} and we'll book your assessment right away.`,
    };
  }

  try {
    const { Resend } = await import("resend");
    const { render } = await import("@react-email/components");
    const { default: LeadEmail } = await import("@/lib/emails/LeadEmail");

    const submittedAt = new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Australia/Melbourne",
    }).format(new Date());

    const element = LeadEmail({ ...data, submittedAt });
    const html = await render(element);
    const text = await render(element, { plainText: true });

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `TrueTel Managed IT Landing <${from}>`,
      to: [to],
      replyTo: process.env.RESEND_REPLY_TO || data.businessEmail,
      subject: `New Managed IT lead: ${data.firstName} (${data.businessAndSize})`,
      html,
      text,
    });

    if (error) {
      console.error("[submitLead] Resend error:", error);
      return { ok: false, error: "Something went wrong sending your request. Please try again." };
    }

    return {
      ok: true,
      firstName: data.firstName,
      message: "We'll call within 4 business hours.",
    };
  } catch (err) {
    console.error("[submitLead] Unexpected error:", err);
    return { ok: false, error: "Something went wrong on our end. Please try again shortly." };
  }
}
