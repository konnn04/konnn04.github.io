import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '', // Empty string since you're using the root domain
  trailingSlash: true,
};

export default nextConfig;
