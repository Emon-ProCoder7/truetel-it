"use client";

/**
 * Captures UTM/click-id params on first landing and persists them across the
 * session (so attribution survives even if the visitor browses before
 * submitting the form). Read by the lead form's hidden fields.
 */

export type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
  landingUrl: string;
};

const STORAGE_KEY = "tt_attribution";
const PARAM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "gclid", "fbclid"] as const;

export function captureAttribution(): Attribution {
  const empty: Attribution = {
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    gclid: "",
    fbclid: "",
    landingUrl: "",
  };
  if (typeof window === "undefined") return empty;

  try {
    const params = new URLSearchParams(window.location.search);
    const hasAny = PARAM_KEYS.some((k) => params.has(k));

    if (hasAny) {
      const attribution: Attribution = {
        utmSource: params.get("utm_source") ?? "",
        utmMedium: params.get("utm_medium") ?? "",
        utmCampaign: params.get("utm_campaign") ?? "",
        utmContent: params.get("utm_content") ?? "",
        gclid: params.get("gclid") ?? "",
        fbclid: params.get("fbclid") ?? "",
        landingUrl: window.location.href,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
      return attribution;
    }

    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Attribution;

    return { ...empty, landingUrl: window.location.href };
  } catch {
    return empty;
  }
}

/** Fire the Lead conversion event on both platforms after a successful submit. */
export function fireLeadConversion() {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };
    w.fbq?.("track", "Lead", { content_name: "managed_it_assessment" });
    w.gtag?.("event", "generate_lead", { event_category: "managed_it_landing" });
  } catch {
    // Tracking must never break the success state.
  }
}
