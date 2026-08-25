import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://truetel.com.au/managed-it-services/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Managed IT Services for Melbourne Businesses | TrueTel",
  description:
    "Stop juggling separate companies for IT, internet, phones, Microsoft 365 and cybersecurity. One Melbourne team, SLA-backed response. Book a free IT assessment.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "TrueTel",
    title: "Managed IT Services for Melbourne Businesses",
    description:
      "One local Melbourne partner for Managed IT, cybersecurity, cloud phone and Microsoft 365. Book a free IT assessment.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${jakarta.variable} antialiased`}>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
