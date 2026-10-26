import { NextRequest, NextResponse } from "next/server";
import { isPortalAuthed, callEodWebhook } from "@/lib/eod-story-auth";

export async function POST(request: NextRequest) {
  if (!isPortalAuthed(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const draftId = String(body.draftId || "");
  if (!draftId) {
    return NextResponse.json({ error: "draftId is required" }, { status: 400 });
  }

  try {
    const res = await callEodWebhook("truetel-eod/reject", { method: "POST", body: { draftId } });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Could not reach the automation server" }, { status: 502 });
  }
}
