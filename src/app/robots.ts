import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Studio is an internal CMS tool — no public indexing needed.
        disallow: "/studio/",
      },
    ],
    sitemap: "https://metricline.ca/sitemap.xml",
    host: "https://metricline.ca",
  };
}
