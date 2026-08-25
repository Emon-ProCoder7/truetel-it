# TrueTel — Managed IT Ad Campaign Landing Page

Standalone landing page built for the TrueTel Managed IT Meta/Google video
ad campaign (see `/Ad run` in the main `truetel-redesign` project for the
full campaign brief). Message-matched to the ad: headline, offer, and CTA
mirror the ad copy exactly, per the landing-page audit in that brief.

Design and motion are modelled closely on [aeline.webflow.io](https://aeline.webflow.io/)
— same palette, type scale, and GSAP ScrollTrigger reveal/count-up pattern —
reskinned with TrueTel's logo, copy, and real service photography.

## Stack

- Next.js 16 (App Router) + Tailwind v4
- GSAP + ScrollTrigger for scroll reveals and count-up stats
- Motion (Framer Motion) for micro-interactions (nav, FAQ, buttons)
- Resend + Zod for the lead form (interim — see below)

## Lead form

The current form is a native Resend-based submission (validates, emails the
lead, captures UTM/gclid/fbclid attribution). This is an **interim**
implementation — it may be replaced by an embedded GoHighLevel form for the
live campaign. Do not swap it without explicit instruction.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `RESEND_API_KEY`, `RESEND_TO_EMAIL`, `RESEND_FROM_EMAIL`, `RESEND_REPLY_TO` — lead email delivery.
- `NEXT_PUBLIC_META_PIXEL_ID` — **reuse the existing Meta Pixel**, do not create a duplicate (per the ad-run brief).
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — the linked GA4 property's Measurement ID.

Without the Resend vars set, the form still renders and validates but shows
a "call us instead" fallback rather than failing silently.

## Development

```bash
npm install
npm run dev
```

## Deploying

Vercel-ready out of the box (`npm run build` has no required env vars at
build time). The page is currently `robots: noindex` since it's built for
paid traffic only — flip that in `app/layout.tsx` if organic indexing is
ever wanted.
