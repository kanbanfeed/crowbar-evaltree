import type { NextConfig } from "next";

const CROWBAR_ORIGIN =
  process.env.CROWBAR_ORIGIN || "https://crowbarltd.com";

const nextConfig: NextConfig = {
  reactCompiler: false,

  async redirects() {
    return [
      // redirect root
      {
        source: "/",
        destination: `${CROWBAR_ORIGIN}/evaltree`,
        permanent: true,
      },
      // redirect all paths
      {
        source: "/:path*",
        destination: `${CROWBAR_ORIGIN}/evaltree/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
