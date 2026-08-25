import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";

export const metadata: Metadata = {
  title: "Request Received | TrueTel",
  robots: { index: false, follow: false },
};

/**
 * GHL post-submit redirect target for the Managed IT lead form (Sites >
 * Forms > this form > Settings/Actions > redirect here instead of an
 * in-place thank-you message). A page view here fires the Meta Pixel
 * "Lead" and GA4 "generate_lead" conversion events — the only reliable
 * way to track a conversion from a cross-origin form embed.
 */
export default function ThankYouPage() {
  return <ThankYouContent />;
}
