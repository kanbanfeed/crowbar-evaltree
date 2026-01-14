import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  experimental: {
    serverComponentsExternalPackages: ['canvas', 'pdfjs-dist'],
  },
};

export default nextConfig;
