import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home folder confuses root detection; pin it to this project.
  turbopack: { root: __dirname },
};

export default nextConfig;
