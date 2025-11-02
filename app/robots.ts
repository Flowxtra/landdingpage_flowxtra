import { MetadataRoute } from "next";

/**
 * Robots.txt for SEO
 * Controls how search engines crawl and index the site
 */
export default function robots(): MetadataRoute.Robots {
  // Base URL from environment variable or default to production
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Block API routes
          "/_next/", // Block Next.js internal files
          "/admin/", // Block admin routes (if any)
          "/private/", // Block private routes (if any)
          "/*.json", // Block JSON files (except if needed for SEO)
          "/404", // Block 404 pages
        ],
      },
      // Allow Googlebot full access
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/private/"],
      },
      // Allow Bingbot full access
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
