import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { HERO } from "@/lib/site";

export const alt = "TrueTel — Powering Australian Business with IT Automation & Cloud";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const root = process.cwd();
  const [bg, logo, bold, extraBold] = await Promise.all([
    readFile(join(root, "public/og-bg.png")),
    readFile(join(root, "public/brand/truetel-logo.png")),
    readFile(join(root, "assets/PlusJakartaSans-Bold.ttf")),
    readFile(join(root, "assets/PlusJakartaSans-ExtraBold.ttf")),
  ]);

  const bgSrc = `data:image/png;base64,${bg.toString("base64")}`;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#131313",
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(100deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.72) 40%, rgba(10,10,10,0.28) 68%, rgba(10,10,10,0.1) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#ffffff",
              borderRadius: 14,
              padding: "10px 20px",
              alignSelf: "flex-start",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} height={34} style={{ objectFit: "contain" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
            <div
              style={{
                display: "flex",
                color: "#D6FD70",
                background: "rgba(214,253,112,0.14)",
                border: "1px solid rgba(214,253,112,0.4)",
                borderRadius: 999,
                padding: "8px 20px",
                fontSize: 22,
                fontWeight: 700,
                alignSelf: "flex-start",
                marginBottom: 28,
              }}
            >
              {HERO.eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: -1.2,
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>{HERO.headlineLine1}</span>
              <span style={{ whiteSpace: "nowrap" }}>{HERO.headlineLine2}</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 24,
              fontSize: 24,
              fontWeight: 700,
              color: "#EBF213",
            }}
          >
            managed-it.truetel.com.au
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: bold, style: "normal", weight: 700 },
        { name: "Plus Jakarta Sans", data: extraBold, style: "normal", weight: 800 },
      ],
    }
  );
}
