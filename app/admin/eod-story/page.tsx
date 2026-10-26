"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Eyebrow } from "@/components/ui/Kit";
import SkyBackground from "@/components/ui/SkyBackground";

type Draft = {
  draftId: string;
  status: string;
  eyebrowText: string;
  headlineWhite: string;
  headlineGold: string;
  subhead: string;
  serviceTag: string;
  workflowNodes: { icon: string; label: string }[];
  impactSentence: string;
  captionFacebook: string;
  captionInstagram: string;
  captionLinkedin: string;
  hashtags: string[];
  pageUrl: string;
  feedbackHistory: string[];
  revisionCount: number;
};

type Tab = "facebook" | "instagram" | "linkedin";

type DayItem = { category: string; summary: string };
type TimelineDay = { date: string; items: DayItem[] };
type TimelineEmployee = { name: string; totalEntries: number; lastActivity: string | null; days: TimelineDay[] };
type TimelineReport = { employees: TimelineEmployee[] };

const ROSTER = ["Alvi", "Toby", "Sam", "Farhan", "Felix", "Mark", "Dex"];
const ROLES = ["Technical", "Semi-technical", "Customer-facing"];
const SERVICE_AREAS = ["Managed IT", "Cloud Phone", "AI Voice Agent (Zara)", "Cybersecurity", "Internal Ops", "Other"];

const EMPTY_EOD_FORM = {
  employeeName: "",
  role: "",
  serviceArea: "",
  clientProject: "",
  setting: "",
  stakes: "",
  action: "",
  turningPoint: "",
  result: "",
  proof: "",
  humanMoment: "",
  visualCue: "",
};

function LogoBadge() {
  return (
    <span className="flex size-9 items-center justify-center rounded-full bg-white p-1.5 shadow-sm">
      <Image src="/brand/truetel-logo.png" alt="TrueTel" width={26} height={26} className="object-contain" priority />
    </span>
  );
}

export default function EodStoryPortal() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyDraftId, setBusyDraftId] = useState<string | null>(null);
  const [feedbackByDraft, setFeedbackByDraft] = useState<Record<string, string>>({});
  const [tabByDraft, setTabByDraft] = useState<Record<string, Tab>>({});
  const [toast, setToast] = useState("");

  const [weekly, setWeekly] = useState<TimelineReport | null>(null);
  const [weeklyLoading, setWeeklyLoading] = useState(false);
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);

  const [showEodForm, setShowEodForm] = useState(false);
  const [eodForm, setEodForm] = useState(EMPTY_EOD_FORM);
  const [submittingEod, setSubmittingEod] = useState(false);

  const loadDrafts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/eod-story/drafts", { cache: "no-store" });
    if (res.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    setAuthed(true);
    const data = await res.json().catch(() => ({ drafts: [] }));
    setDrafts(Array.isArray(data.drafts) ? data.drafts : []);
    setLoading(false);
  }, []);

  const loadWeekly = useCallback(async () => {
    setWeeklyLoading(true);
    const res = await fetch("/api/eod-story/weekly-report", { cache: "no-store" });
    if (res.status === 401) {
      setWeeklyLoading(false);
      return;
    }
    const data = await res.json().catch(() => null);
    setWeekly(data && Array.isArray(data.employees) ? data : null);
    setWeeklyLoading(false);
  }, []);

  useEffect(() => {
    loadDrafts();
    loadWeekly();
  }, [loadDrafts, loadWeekly]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/eod-story/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadDrafts();
      loadWeekly();
    } else {
      setAuthError("Incorrect password.");
    }
  }

  async function handleSubmitEod(e: React.FormEvent) {
    e.preventDefault();
    const required: (keyof typeof EMPTY_EOD_FORM)[] = [
      "employeeName",
      "role",
      "serviceArea",
      "setting",
      "stakes",
      "action",
      "result",
      "proof",
    ];
    const missing = required.filter((k) => !eodForm[k].trim());
    if (missing.length > 0) {
      showToast("Please fill in all the required fields first.");
      return;
    }

    setSubmittingEod(true);
    try {
      const res = await fetch("/api/eod-story/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eodForm),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        showToast(data.error || "Could not log that EOD entry.");
      } else {
        showToast("Logged, and your post is ready below for review.");
        setEodForm(EMPTY_EOD_FORM);
        setShowEodForm(false);
        await Promise.all([loadDrafts(), loadWeekly()]);
      }
    } finally {
      setSubmittingEod(false);
    }
  }

  function setEodField(field: keyof typeof EMPTY_EOD_FORM, value: string) {
    setEodForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleRegenerate(draftId: string) {
    const feedback = (feedbackByDraft[draftId] || "").trim();
    if (!feedback) {
      showToast("Type what you'd like changed first.");
      return;
    }
    setBusyDraftId(draftId);
    try {
      const res = await fetch("/api/eod-story/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId, feedback }),
      });
      const data = await res.json();
      if (!res.ok) showToast(data.error || "Could not regenerate this draft.");
      else {
        showToast("Draft updated with your feedback.");
        setFeedbackByDraft((prev) => ({ ...prev, [draftId]: "" }));
        await loadDrafts();
      }
    } finally {
      setBusyDraftId(null);
    }
  }

  async function handleApprove(draftId: string) {
    if (!confirm("Post this to TrueTel's Facebook Page and Instagram now?")) return;
    setBusyDraftId(draftId);
    try {
      const res = await fetch("/api/eod-story/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId }),
      });
      const data = await res.json();
      if (!res.ok) showToast(data.error || "Could not publish this draft.");
      else {
        showToast("Posted to Facebook and Instagram.");
        await loadDrafts();
      }
    } finally {
      setBusyDraftId(null);
    }
  }

  async function handleReject(draftId: string) {
    if (!confirm("Skip this draft? Its entries stay queued for next time.")) return;
    setBusyDraftId(draftId);
    try {
      const res = await fetch("/api/eod-story/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId }),
      });
      const data = await res.json();
      if (!res.ok) showToast(data.error || "Could not skip this draft.");
      else {
        showToast("Skipped. Those entries will appear in the next cycle.");
        await loadDrafts();
      }
    } finally {
      setBusyDraftId(null);
    }
  }

  async function handleDelete(draftId: string) {
    if (!confirm("Delete this draft and its graphic for good? This can't be undone.")) return;
    setBusyDraftId(draftId);
    try {
      const res = await fetch("/api/eod-story/delete-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId }),
      });
      const data = await res.json();
      if (!res.ok) showToast(data.error || "Could not delete this draft.");
      else {
        showToast("Deleted.");
        await loadDrafts();
      }
    } finally {
      setBusyDraftId(null);
    }
  }

  if (authed === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-sm text-ink-faint">Loading…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-4">
        <form onSubmit={submitPassword} className="card w-full max-w-sm space-y-5 p-8">
          <div className="flex items-center gap-2.5">
            <LogoBadge />
            <span className="text-[1.05rem] font-semibold tracking-tight text-ink">TrueTel</span>
          </div>
          <div>
            <h1 className="text-display-sm text-ink">Story Portal</h1>
            <p className="mt-1 text-sm text-ink-secondary">Enter the portal password to review pending posts.</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full border border-line-strong px-4 py-3 text-sm outline-none focus:border-ink"
            placeholder="Password"
            autoFocus
          />
          {authError && <p className="text-sm text-red-600">{authError}</p>}
          <Button type="submit" variant="dark" className="w-full justify-center">
            Enter
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg px-3 pb-16 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto max-w-5xl">
        {/* Banner -- same sky shader + logo treatment as the main site's hero */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]">
          <div className="absolute inset-0">
            <SkyBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/35" />
          </div>
          <div className="relative z-10 flex flex-col gap-4 px-6 py-8 sm:px-10 sm:py-12">
            <div className="flex items-center gap-2.5">
              <LogoBadge />
              <span className="text-[1.05rem] font-semibold tracking-tight text-white">TrueTel</span>
            </div>
            <div>
              <Eyebrow onDark>Internal · not indexed</Eyebrow>
              <h1 className="text-display-lg mt-2 text-[clamp(1.8rem,3.4vw,2.6rem)] text-white">Story Portal</h1>
              <p className="mt-2 max-w-md text-white/75">
                Review what the EOD story engine wrote before anything goes out to Facebook or Instagram.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button variant="accent" onClick={() => setShowEodForm((v) => !v)}>
                {showEodForm ? "Close EOD Form" : "Log Today's EOD & Generate Post"}
              </Button>
              <button
                onClick={loadDrafts}
                className="rounded-full border border-white/35 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {toast && (
          <div className="card-accent mt-6 px-5 py-3 text-sm font-medium">{toast}</div>
        )}

        {showEodForm && (
          <form onSubmit={handleSubmitEod} className="card mt-6 space-y-5 p-6">
            <div>
              <Eyebrow>Log an EOD</Eyebrow>
              <h2 className="text-display-sm mt-1 text-ink">What did we get done today?</h2>
              <p className="mt-1 text-sm text-ink-secondary">
                A few short answers. This feeds the social story engine and the timeline below -- your name is
                never published.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="text-sm">
                <span className="mb-1 block font-medium text-ink">Your name</span>
                <select
                  value={eodForm.employeeName}
                  onChange={(e) => setEodField("employeeName", e.target.value)}
                  className="w-full rounded-full border border-line-strong px-4 py-2.5 text-sm outline-none focus:border-ink"
                >
                  <option value="">Select…</option>
                  {ROSTER.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-medium text-ink">Role</span>
                <select
                  value={eodForm.role}
                  onChange={(e) => setEodField("role", e.target.value)}
                  className="w-full rounded-full border border-line-strong px-4 py-2.5 text-sm outline-none focus:border-ink"
                >
                  <option value="">Select…</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-medium text-ink">Service area</span>
                <select
                  value={eodForm.serviceArea}
                  onChange={(e) => setEodField("serviceArea", e.target.value)}
                  className="w-full rounded-full border border-line-strong px-4 py-2.5 text-sm outline-none focus:border-ink"
                >
                  <option value="">Select…</option>
                  {SERVICE_AREAS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block text-sm">
              <span className="mb-1 block font-medium text-ink">Client or project (internal only, never published)</span>
              <input
                value={eodForm.clientProject}
                onChange={(e) => setEodField("clientProject", e.target.value)}
                className="w-full rounded-full border border-line-strong px-4 py-2.5 text-sm outline-none focus:border-ink"
              />
            </label>

            {[
              { key: "setting" as const, label: "The setting: what kind of business/site, and what was the situation when you started?", placeholder: "e.g. a 12-seat accounting office in Sunshine, phones had been dropping calls for a week" },
              { key: "stakes" as const, label: "The stakes: what was at risk if this didn't get handled?" },
              { key: "action" as const, label: "The action: in plain words, what did you actually do? (skip tool/software names)" },
              { key: "turningPoint" as const, label: "The turning point: the moment it clicked, or the hardest part (optional)" },
              { key: "result" as const, label: "The result: what's true now that wasn't true this morning?" },
              { key: "proof" as const, label: "The proof: any real number, scale or timeframe that makes this concrete?", placeholder: "e.g. 3 sites, same-day fix, 40 staff back online" },
              { key: "humanMoment" as const, label: "The human moment: anything the client/team actually said or did? (optional, only if real)" },
              { key: "visualCue" as const, label: "Visual cue: if this were one photo, what would it look like? (optional)" },
            ].map(({ key, label, placeholder }) => (
              <label key={key} className="block text-sm">
                <span className="mb-1 block font-medium text-ink">{label}</span>
                <textarea
                  value={eodForm[key]}
                  onChange={(e) => setEodField(key, e.target.value)}
                  placeholder={placeholder}
                  rows={2}
                  className="w-full rounded-2xl border border-line-strong px-4 py-3 text-sm outline-none focus:border-ink"
                />
              </label>
            ))}

            <Button type="submit" variant="dark" className={submittingEod ? "opacity-60" : ""}>
              {submittingEod ? "Logging…" : "Submit EOD"}
            </Button>
          </form>
        )}

        {/* EOD timeline -- grows day by day, never resets to a fixed week; same source as the social drafts */}
        <section className="card mt-8 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <Eyebrow>EOD Timeline</Eyebrow>
              <h2 className="text-display-sm mt-1 text-ink">Click an employee to see their day-by-day log</h2>
            </div>
            <button
              onClick={loadWeekly}
              className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink-secondary hover:bg-bg-soft"
            >
              {weeklyLoading ? "Refreshing…" : "Refresh"}
            </button>
          </div>

          {!weekly && (
            <p className="mt-4 text-sm text-ink-faint">{weeklyLoading ? "Loading…" : "Could not load the EOD timeline."}</p>
          )}

          {weekly && (
            <div className="mt-5 divide-y divide-line">
              {weekly.employees.map((emp) => {
                const open = expandedEmployee === emp.name;
                return (
                  <div key={emp.name} className="py-3">
                    <button
                      onClick={() => emp.totalEntries > 0 && setExpandedEmployee(open ? null : emp.name)}
                      className="flex w-full items-center justify-between gap-3 text-left"
                      disabled={emp.totalEntries === 0}
                    >
                      <span className="font-semibold text-ink">{emp.name}</span>
                      <span className="flex items-center gap-3 text-sm text-ink-faint">
                        {emp.lastActivity && <span>last logged {emp.lastActivity}</span>}
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            emp.totalEntries > 0 ? "bg-accent text-accent-ink" : "bg-bg-soft text-ink-faint"
                          }`}
                        >
                          {emp.totalEntries} {emp.totalEntries === 1 ? "entry" : "entries"}
                        </span>
                        {emp.totalEntries > 0 && (
                          <span className="font-semibold text-ink-secondary">{open ? "Hide" : "View timeline"}</span>
                        )}
                      </span>
                    </button>

                    {open && (
                      <div className="mt-3 space-y-4 rounded-2xl bg-bg-soft p-4">
                        {emp.days.map((day) => (
                          <div key={day.date}>
                            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-faint">
                              {new Date(day.date + "T00:00:00").toLocaleDateString("en-AU", {
                                weekday: "long",
                                day: "numeric",
                                month: "short",
                              })}
                            </p>
                            <ul className="mt-1.5 space-y-1.5">
                              {day.items.map((item, i) => (
                                <li key={i} className="flex gap-2 text-sm">
                                  <span className="mt-0.5 flex-shrink-0 rounded-full border border-line-strong px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink-faint">
                                    {item.category}
                                  </span>
                                  <span className="text-ink-secondary">{item.summary}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <p className="mt-4 text-xs text-ink-faint">
            Every day an EOD is logged, it's added here grouped by work category, so different projects never blur
            into one summary. This keeps growing week over week from the same log the social posts draw from.
          </p>
        </section>

        <div className="mt-10 space-y-8">
          {loading && drafts.length === 0 && <p className="text-sm text-ink-faint">Loading drafts…</p>}

          {!loading && drafts.length === 0 && (
            <div className="card p-12 text-center">
              <p className="text-ink-secondary">No drafts waiting for review.</p>
              <p className="mt-1 text-sm text-ink-faint">
                Log today&apos;s EOD above and a post generates instantly for you to review here.
              </p>
            </div>
          )}

          {drafts.map((d) => {
            const tab = tabByDraft[d.draftId] || "facebook";
            const captionByTab: Record<Tab, string> = {
              facebook: d.captionFacebook,
              instagram: d.captionInstagram,
              linkedin: d.captionLinkedin,
            };
            const busy = busyDraftId === d.draftId;

            return (
              <section key={d.draftId} className="card overflow-hidden">
                <div className="grid md:grid-cols-[340px_1fr]">
                  <div className="flex flex-col items-center justify-center gap-3 bg-bg-soft p-4">
                    <div style={{ width: 300, height: 375, position: "relative", overflow: "hidden", borderRadius: 16 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={d.pageUrl}
                        alt={`Preview ${d.draftId}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <a
                      href={d.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line-strong bg-bg px-4 py-2 text-xs font-semibold text-ink-secondary hover:bg-white"
                    >
                      Open full size ↗
                    </a>
                  </div>

                  <div className="space-y-5 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Eyebrow>{d.eyebrowText}</Eyebrow>
                      <span className="text-xs text-ink-faint">
                        {d.serviceTag} · rev {d.revisionCount} · {d.status}
                      </span>
                    </div>

                    <h2 className="text-display-md text-ink">
                      {d.headlineWhite} <span className="text-accent-ink bg-accent rounded px-1">{d.headlineGold}</span>
                    </h2>
                    <p className="text-sm text-ink-secondary">{d.subhead}</p>

                    {d.workflowNodes?.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {d.workflowNodes.map((node, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 rounded-full border border-line-strong bg-bg-soft px-3 py-1.5 text-xs font-semibold uppercase text-ink">
                              {node.label}
                            </span>
                            {i < d.workflowNodes.length - 1 && <span className="text-ink-faint">→</span>}
                          </div>
                        ))}
                      </div>
                    )}
                    {d.impactSentence && (
                      <p className="rounded-xl bg-bg-soft p-3 text-sm font-medium text-ink">{d.impactSentence}</p>
                    )}

                    <div>
                      <div className="mb-2 flex gap-2">
                        {(["facebook", "instagram", "linkedin"] as Tab[]).map((t) => (
                          <button
                            key={t}
                            onClick={() => setTabByDraft((prev) => ({ ...prev, [d.draftId]: t }))}
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${
                              tab === t ? "border-ink bg-ink text-white" : "border-line-strong text-ink-secondary"
                            }`}
                          >
                            {t[0].toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>
                      <p className="whitespace-pre-wrap rounded-xl bg-bg-soft p-3 text-sm text-ink">
                        {captionByTab[tab] || "(no caption for this platform)"}
                      </p>
                      <p className="mt-2 text-xs text-ink-faint">{d.hashtags?.map((h) => `#${h}`).join(" ")}</p>
                    </div>

                    {d.feedbackHistory?.length > 0 && (
                      <details className="text-xs text-ink-faint">
                        <summary className="cursor-pointer">Revision history ({d.feedbackHistory.length})</summary>
                        <ul className="mt-1 list-inside list-disc space-y-1">
                          {d.feedbackHistory.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </details>
                    )}

                    <div className="space-y-3 border-t border-line pt-4">
                      <textarea
                        value={feedbackByDraft[d.draftId] || ""}
                        onChange={(e) => setFeedbackByDraft((prev) => ({ ...prev, [d.draftId]: e.target.value }))}
                        placeholder="What should change? e.g. 'shorten the Instagram caption', 'use a brighter photo', 'make the headline punchier'"
                        rows={2}
                        className="w-full rounded-2xl border border-line-strong px-4 py-3 text-sm outline-none focus:border-ink"
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" onClick={() => handleRegenerate(d.draftId)} className={busy ? "opacity-60" : ""}>
                          {busy ? "Working…" : "Request Changes"}
                        </Button>
                        <Button variant="accent" onClick={() => handleApprove(d.draftId)} className={busy ? "opacity-60" : ""}>
                          {busy ? "Working…" : "Approve & Post"}
                        </Button>
                        <button
                          onClick={() => handleReject(d.draftId)}
                          disabled={busy}
                          className="ml-auto rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink-secondary hover:bg-bg-soft disabled:opacity-50"
                        >
                          Skip This Cycle
                        </button>
                        <button
                          onClick={() => handleDelete(d.draftId)}
                          disabled={busy}
                          className="rounded-full border border-red-300 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
