import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Self-hosted HTML -> PNG renderer, replacing a third-party screenshot API that
 * turned out to be capped at 5 pages/day. Runs headless Chromium via
 * @sparticuz/chromium, which is purpose-built to fit inside a Vercel serverless
 * function. No external quota: bounded only by this account's own Vercel
 * function-execution limits, which are far more generous for this volume.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-render-secret");
  if (!secret || secret !== process.env.RENDER_HTML_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const html = String(body.html || "");
  const width = Number(body.width) || 1080;
  const height = Number(body.height) || 1350;

  if (!html.trim()) {
    return NextResponse.json({ error: "html is required" }, { status: 400 });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
      executablePath: await chromium.executablePath(),
      headless: "shell",
      defaultViewport: { width, height, deviceScaleFactor: 1 },
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load", timeout: 30000 });
    // Give webfonts a moment to finish swapping in before the screenshot.
    await page.evaluate(() => (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts.ready).catch(() => {});

    const png = await page.screenshot({ type: "png" });

    return new NextResponse(Buffer.from(png), {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "render failed: " + message }, { status: 500 });
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}
