import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/passes=:count(\\d+){/}?",
        destination: "/?passes=:count",
      },
      {
        source: "/pases=:count(\\d+){/}?",
        destination: "/?passes=:count",
      },
      {
        source: "/passes/:count(\\d+){/}?",
        destination: "/?passes=:count",
      },
      {
        source: "/pases/:count(\\d+){/}?",
        destination: "/?passes=:count",
      },
    ];
  },
};

export default nextConfig;
