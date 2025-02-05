import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/assets',
  assetPrefix: '/assets/',
  trailingSlash: true,
};

export default nextConfig;
