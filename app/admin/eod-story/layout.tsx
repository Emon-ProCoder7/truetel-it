import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrueTel Story Portal",
  robots: { index: false, follow: false, nocache: true },
};

export default function EodStoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
