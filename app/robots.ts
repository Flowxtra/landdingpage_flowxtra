import { MetadataRoute } from "next";

/**
 * Robots.txt for SEO
 * Controls how search engines crawl and index the site
 */
export default function robots(): MetadataRoute.Robots {
  // Base URL from environment variable or default to production
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";

  const sitemapPaths = [
    "/sitemap.xml",
    "/sitemap_index.xml",
    "/sitemap-all.xml",
    "/sitemap-ar.xml",
    "/sitemap-static-ar.xml",
    "/sitemap-ar-app-store-0.xml",
    "/sitemap-de.xml",
    "/sitemap-static-de.xml",
    "/sitemap-de-app-store-0.xml",
    "/sitemap-de-at.xml",
    "/sitemap-static-de-at.xml",
    "/sitemap-de-ch.xml",
    "/sitemap-static-de-ch.xml",
    "/sitemap-en.xml",
    "/sitemap-static-en.xml",
    "/sitemap-en-blog-0.xml",
    "/sitemap-en-app-store-0.xml",
    "/sitemap-en-au.xml",
    "/sitemap-static-en-au.xml",
    "/sitemap-en-ca.xml",
    "/sitemap-static-en-ca.xml",
    "/sitemap-en-gb.xml",
    "/sitemap-static-en-gb.xml",
    "/sitemap-en-us.xml",
    "/sitemap-static-en-us.xml",
    "/sitemap-es.xml",
    "/sitemap-static-es.xml",
    "/sitemap-es-app-store-0.xml",
    "/sitemap-fr.xml",
    "/sitemap-static-fr.xml",
    "/sitemap-fr-app-store-0.xml",
    "/sitemap-it.xml",
    "/sitemap-static-it.xml",
    "/sitemap-it-app-store-0.xml",
    "/sitemap-nl.xml",
    "/sitemap-static-nl.xml",
    "/sitemap-nl-app-store-0.xml",
  ];

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
    sitemap: sitemapPaths.map((path) => `${baseUrl}${path}`),
    host: baseUrl,
  };
}
