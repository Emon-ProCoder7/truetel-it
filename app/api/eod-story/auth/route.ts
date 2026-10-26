import { NextRequest, NextResponse } from "next/server";
import { EOD_PORTAL_COOKIE, portalSessionToken } from "@/lib/eod-story-auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  const expected = process.env.EOD_PORTAL_PASSWORD || "";

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(EOD_PORTAL_COOKIE, portalSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
