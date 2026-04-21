import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity CDN — used for CMS-managed images (case studies, team photos, equipment)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    // Use modern formats for all images
    formats: ["image/avif", "image/webp"],
    // Appropriate device sizes for responsive images across the site
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
  },

  // Compress all text responses
  compress: true,

  // Strip X-Powered-By header
  poweredByHeader: false,

  // Strict mode catches runtime issues early
  reactStrictMode: true,
};

export default nextConfig;
