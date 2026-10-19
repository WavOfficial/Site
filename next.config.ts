import type { NextConfig } from "next";

// Static export to `out/`, same hosting setup as ovra-site
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
