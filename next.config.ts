import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  outputFileTracingIncludes: {
    "/api/render-html": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
};

export default nextConfig;
