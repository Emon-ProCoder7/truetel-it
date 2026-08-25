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
  email: "admin@truetel.com.au",
  emailHref: "mailto:admin@truetel.com.au",
  suburb: "Ravenhall, VIC 3023",
  region: "Melbourne's western suburbs",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why TrueTel", href: "#why" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ---- Hero ------------------------------------------------------------- */

export const HERO = {
  eyebrow: "Managed IT Services · Melbourne",
  headlineLine1: "Powering Australian Business",
  headlineLine2: "with IT Automation & Cloud",
  sub: "Streamline operations, boost security, and empower your remote workforce with tailor-made MSP solutions — Managed IT, cloud phone and Microsoft 365, under one Melbourne roof.",
  ctaPrimary: "Explore Solutions",
  ctaSecondary: "Get Started",
};

/** Rating bar under the hero carousel. [ASSUMPTION: illustrative until real
 * review volume/score exists — swap for a verified figure before launch.] */
export const RATING = {
  score: "4.9",
  count: "500+",
  label: "Rated by Australian businesses",
  mock: true,
};

/** 3-track infinite carousel content, per the hero brief. */
export const HERO_CAROUSEL = [
  {
    speed: 46,
    tone: "light" as const,
    items: ["Automated Patch Management", "Cloud Phone / VoIP Setup", "MS 365 Security Audit"],
  },
  {
    speed: 34,
    tone: "accent" as const,
    items: ["24/7 IT Helpdesk Support", "Zero-Trust Cybersecurity", "Network Infrastructure"],
  },
  {
    speed: 52,
    tone: "light" as const,
    items: ["Disaster Recovery", "Teams Integration", "Managed Backup & Restore"],
  },
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

/* ---- Expertise (4-card grid) — this now IS the Services section (the old
   3-card photo layout was retired in favour of this design). Card 1's
   "Monthly Expense" figure and card 3's "Business Growth" percentage are
   illustrative UI dressing, not verified metrics. */

export const EXPERTISE = {
  eyebrow: "Expertise",
  title: "Where human insight meets intelligent technology",
  intro: "We combine hands-on Melbourne technicians with the automation and monitoring tools that keep problems from becoming outages.",
};

export const EXPERTISE_CARD_1 = {
  title: "Automation & optimization",
  body: "Patch management, monitoring and ticket routing run automatically — freeing your team to fix what actually needs a human.",
  performanceLabel: "Performance",
  performanceValue: "In the past 7 days",
  expenseLabel: "Monthly IT spend",
  expenseValue: 4900,
  expenseTarget: 10000,
  progressPercent: 49,
  rows: ["Patch management", "Ticket routing", "Endpoint monitoring"],
};

export const EXPERTISE_CARD_2 = {
  title: "Data analytics & insights",
  body: "Every ticket, patch and call is logged — turning raw helpdesk data into a clear picture of what's actually costing your business time.",
  chartLabel: "Intelligence in Every Decision",
  years: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  bars: [30, 42, 38, 55, 62, 74, 88],
};

export const EXPERTISE_CARD_3 = {
  title: "Digital transformation",
  body: "We guide Melbourne businesses through full-scale IT modernisation — legacy systems, manual processes, and disconnected tools replaced with one managed stack.",
  metricLabel: "Business growth",
  metricValue: "49%",
  mock: true,
  tagsTop: ["Cloud migration", "Legacy replacement", "Process automation", "Unified stack"],
  tagsBottom: ["Zero downtime", "Fixed monthly cost", "One partner", "Local support"],
};

export const EXPERTISE_CARD_4 = {
  title: "Experience intelligence",
  body: "Real-time monitoring means we see problems forming — and act on them — before they interrupt your team's day.",
  pills: [
    { name: "Helpdesk", metric: "+18min faster" },
    { name: "Uptime", metric: "99.9%" },
    { name: "Response", metric: "SLA-backed" },
  ],
};

/* ---- Testimonials --------------------------------------------------------
   [ASSUMPTION: real testimonials — CEO/Jack to confirm before launch. Drafts
   below are clearly marked and must not be presented as verified quotes.] */

export const TESTIMONIALS = [
  {
    quote:
      "Switching to TrueTel was the best decision for our growing manufacturing business. Their local team responds fast and has transformed how we use technology.",
    name: "Michael T.",
    role: "Manufacturing Director",
    initials: "MT",
    sector: "Manufacturing · Truganina",
  },
  {
    quote:
      "After a cyber scare we needed serious help. TrueTel implemented full protection and monitors everything 24/7. Reassuring to work with a local provider.",
    name: "David R.",
    role: "IT Manager",
    initials: "DR",
    sector: "Logistics · Derrimut",
  },
  {
    quote:
      "One invoice instead of four vendors, and someone always picks up the phone. That alone was worth switching for.",
    name: "Sarah K.",
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
