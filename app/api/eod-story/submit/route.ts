import { NextRequest, NextResponse } from "next/server";
import { isPortalAuthed, callEodWebhook } from "@/lib/eod-story-auth";

export async function POST(request: NextRequest) {
  if (!isPortalAuthed(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));

  try {
    const res = await callEodWebhook("truetel-eod/submit", { method: "POST", body });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Could not reach the automation server" }, { status: 502 });
  }
}
