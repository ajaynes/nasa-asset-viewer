import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-assets.nasa.gov",
      },
    ],
  },
  assetPrefix: '/nasa-asset-viewer/',
  basePath: '/nasa-asset-viewer',
  output: 'export',
  reactStrictMode: true,
};

export default nextConfig;
