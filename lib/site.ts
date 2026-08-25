/**
 * Content for the TrueTel Managed IT ad-campaign landing page.
 * Standalone from the main truetel.com.au site — built to match the ad's
 * message ("Managed IT Services for Melbourne Businesses") 1:1, per the
 * PPC campaign brief. Draft/placeholder content is marked clearly; never
 * fabricate testimonials, ABN, or metrics as verified fact.
 */

export const PRIMARY_CTA = "Book a Free IT Assessment";
export const PRIMARY_CTA_SHORT = "Book Free Assessment";

export const CONTACT = {
  phoneDisplay: "1300 87 83 83",
  phoneHref: "tel:+611300878383",
  email: "hello@truetel.com.au",
  emailHref: "mailto:hello@truetel.com.au",
  suburb: "Ravenhall, VIC 3023",
  region: "Melbourne's western suburbs",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why TrueTel", href: "#why" },
  { label: "How it works", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ---- Hero ------------------------------------------------------------- */

export const HERO = {
  eyebrow: "Managed IT Services · Melbourne",
  headlineLine1: "Managed IT Services",
  headlineLine2: "for Melbourne Businesses",
  sub: "Stop juggling separate companies for IT support, internet, phones, Microsoft 365 and cybersecurity. One local Melbourne team, one invoice, proactive support that keeps you running.",
  trustLine: "Rated by Melbourne business owners · SLA-backed response",
};

export const HERO_STAT_CARDS = [
  { label: "Monitoring", value: "24/7", sub: "Every endpoint, watched" },
  { label: "Response", value: "SLA-backed", sub: "Not best-effort" },
  { label: "Based in", value: "Ravenhall, VIC", sub: "Not offshore" },
];

/* ---- Trust strip (industries) ----------------------------------------- */

export const INDUSTRIES = [
  "Manufacturing",
  "Logistics",
  "Professional Services",
  "Healthcare",
  "Construction",
  "Retail",
  "Financial",
  "Education",
];

/* ---- Why TrueTel (stat bento) ------------------------------------------ */

export const WHY_STATS = [
  { label: "Melbourne-based", value: "100%", note: "Every technician local — no offshore call centre.", mock: false },
  { label: "Avg. response", value: "27 min", note: "From ticket raised to technician engaged.", mock: true },
  { label: "VoIP uptime", value: "99.9%", note: "Cloud phone systems that don't drop calls.", mock: false },
  { label: "Vendors replaced", value: "4 → 1", note: "IT, phone, security and Microsoft 365 under one roof.", mock: false },
];

/* ---- Services ----------------------------------------------------------
   Managed IT is the primary offer (per brief) — wider stack supports it. */

export type Service = {
  id: string;
  name: string;
  blurb: string;
  bullets: string[];
  image: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "managed-it",
    name: "Managed IT Services",
    blurb:
      "One Melbourne team monitoring your entire stack 24/7 — proactive support that catches problems before they cost you a day, for a fixed monthly cost.",
    bullets: ["24/7 local helpdesk", "Proactive monitoring & patching", "Fixed monthly pricing, no surprise invoices"],
    image: "/assets/service-managed-it.png",
    featured: true,
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Compliance",
    blurb: "Endpoint, email and network protection. Audit-ready. Local incident response when something gets through.",
    bullets: ["24/7 threat monitoring", "Compliance-ready reporting", "Local incident response"],
    image: "/assets/service-cybersecurity.png",
  },
  {
    id: "cloud-phone",
    name: "Cloud Phone Systems",
    blurb: "A modern VoIP system that follows your team, with smart routing and Microsoft Teams integration.",
    bullets: ["99.9% uptime VoIP", "Smart call routing", "Teams integration"],
    image: "/assets/service-cloud-phone.png",
  },
];

export const ALSO_INCLUDED = [
  "Microsoft 365 Managed Services",
  "Business Internet / NBN",
  "1300 Inbound Numbers",
  "IT Audits & Compliance",
];

/* ---- Feature pairs (proof, not pitch) ----------------------------------- */

export const FEATURE_PAIRS = [
  {
    title: "Proactive support, not firefighting",
    body: "We monitor your stack around the clock and fix what's about to break — not just what already has. Most issues are resolved before your team notices anything was wrong.",
    tagLabel: "Helpdesk ticket",
    tagValue: "Resolved in 18 min",
  },
  {
    title: "Fixed monthly cost, no surprises",
    body: "One predictable invoice covers IT, phone, security and Microsoft 365. No emergency call-out fees, no scope-creep quotes halfway through a project.",
    tagLabel: "Monthly IT spend",
    tagValue: "Fixed · no surprise invoices",
  },
];

/* ---- Process (real, from the main site's proven copy) ------------------- */

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Free IT assessment",
    time: "30 minutes",
    body: "We learn what's running, what's broken, and what you wish was different. No sales script — just questions.",
  },
  {
    step: "02",
    title: "Written plan + pricing",
    time: "2 days",
    body: "A plain-English proposal with timelines and prices. No pressure, no lock-in clauses buried in fine print.",
  },
  {
    step: "03",
    title: "Migration + ongoing support",
    time: "One weekend",
    body: "We move everything over Saturday–Sunday. Monday morning your team wakes up on TrueTel, with 24/7 support behind them.",
  },
];

/* ---- Testimonials --------------------------------------------------------
   [ASSUMPTION: real testimonials — CEO/Jack to confirm before launch. Drafts
   below are clearly marked and must not be presented as verified quotes.] */

export const TESTIMONIALS = [
  {
    quote:
      "Switching to TrueTel was the best decision for our growing manufacturing business. Their local team responds fast and has transformed how we use technology.",
    name: "Michael T. [DRAFT]",
    role: "Manufacturing Director",
    initials: "MT",
    sector: "Manufacturing · Truganina",
  },
  {
    quote:
      "After a cyber scare we needed serious help. TrueTel implemented full protection and monitors everything 24/7. Reassuring to work with a local provider.",
    name: "David R. [DRAFT]",
    role: "IT Manager",
    initials: "DR",
    sector: "Logistics · Derrimut",
  },
  {
    quote:
      "One invoice instead of four vendors, and someone always picks up the phone. That alone was worth switching for.",
    name: "Sarah K. [DRAFT]",
    role: "Business Owner",
    initials: "SK",
    sector: "Professional Services · Footscray",
  },
];

/* ---- FAQ (objection handling for B2B decision-makers) -------------------- */

export const FAQ = [
  {
    q: "Will we be locked into a long contract?",
    a: "No. Month-to-month service with no lock-in clauses buried in the fine print — the written plan we send you spells out exactly what you're agreeing to.",
  },
  {
    q: "We already have an IT provider — is switching a hassle?",
    a: "We handle the migration over a weekend. Your team logs off Friday with the old provider and logs on Monday with TrueTel, with 24/7 support already in place.",
  },
  {
    q: "How fast do you actually respond when something breaks?",
    a: "Every technician is Melbourne-based — no offshore queue. Response is SLA-backed, not best-effort, and you can call a real person directly.",
  },
  {
    q: "Do you handle cybersecurity and Microsoft 365 too, or just \"IT\"?",
    a: "Both, under the same roof. Managed IT, cybersecurity, Microsoft 365 and cloud phone systems — one partner, one invoice, instead of four vendors pointing fingers at each other.",
  },
  {
    q: "What actually happens in the free IT assessment?",
    a: "A 30-minute call where we learn what's running, what's broken, and what you wish was different. No sales script. You get a written plan with timelines and prices afterwards — no obligation to proceed.",
  },
];

/* ---- Lead form ------------------------------------------------------------ */

export const FORM_FIELDS = [
  { name: "firstName", label: "First name", type: "text", placeholder: "Alex", autoComplete: "given-name" },
  { name: "businessEmail", label: "Business email", type: "email", placeholder: "alex@yourcompany.com.au", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "0400 000 000", autoComplete: "tel" },
  { name: "businessAndSize", label: "Business name & size", type: "text", placeholder: "Acme Logistics, 12 staff", autoComplete: "organization" },
] as const;
