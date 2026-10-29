import type { NextConfig } from "next";
const config: NextConfig = {
  devIndicators: false,
  // GitHub Pages hosts this repository under /tichulearnbook/.
  output: "export",
  basePath: "/tichulearnbook",
  trailingSlash: true,
  images: { unoptimized: true },
  distDir: process.env.TICHU_BUILD_DIR || ".next",
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  experimental: { cpus: 2 },
};
export default config;
