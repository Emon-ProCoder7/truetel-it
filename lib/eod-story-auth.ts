import { NextRequest } from "next/server";

export const EOD_PORTAL_COOKIE = "truetel_eod_portal_session";

/**
 * This cookie is a simple shared-password gate for an internal review tool, not a user
 * identity system. The value is a fixed token derived from the env secret (not a per-user
 * session), so there's nothing to look up -- just compare what the browser sent to what it
 * should be.
 */
export function portalSessionToken(): string {
  const secret = process.env.EOD_PORTAL_SECRET || "";
  return `authed:${secret.slice(0, 16)}`;
}

export function isPortalAuthed(request: NextRequest): boolean {
  const cookie = request.cookies.get(EOD_PORTAL_COOKIE)?.value;
  return !!cookie && cookie === portalSessionToken();
}

export function n8nBaseUrl(): string {
  const base = process.env.EOD_N8N_BASE_URL;
  if (!base) throw new Error("EOD_N8N_BASE_URL is not set");
  return base.replace(/\/+$/, "");
}

export function n8nPortalSecret(): string {
  const secret = process.env.EOD_PORTAL_SECRET;
  if (!secret) throw new Error("EOD_PORTAL_SECRET is not set");
  return secret;
}

/** Calls one of the Truetel EOD Story Engine's n8n webhooks, server-side only. */
export async function callEodWebhook(
  path: string,
  init?: { method?: string; body?: unknown }
): Promise<Response> {
  const url = `${n8nBaseUrl()}/webhook/${path}`;
  return fetch(url, {
    method: init?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Portal-Secret": n8nPortalSecret(),
    },
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
}
