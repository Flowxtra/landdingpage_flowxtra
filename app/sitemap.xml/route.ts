import { NextResponse } from "next/server";
import { supportedLocales } from "@/lib/locales";

/**
 * Sitemap Index for SEO
 *
 * This generates a sitemap index XML that references:
 * 1. Static pages sitemap (split by locale)
 * 2. Blog posts sitemaps (split by language, 100 posts per file)
 * 3. App Store apps sitemaps (split by language, 100 apps per file)
 *
 * Format:
 * - /sitemap-static-en.xml, /sitemap-static-de.xml, etc. (static pages per locale)
 * - /sitemap-en-blog-0.xml, /sitemap-en-blog-1.xml, etc. (English blog posts)
 * - /sitemap-de-blog-0.xml, /sitemap-de-blog-1.xml, etc. (German blog posts)
 * - /sitemap-en-app-store-0.xml, /sitemap-en-app-store-1.xml, etc. (English apps)
 * - /sitemap-de-app-store-0.xml, /sitemap-de-app-store-1.xml, etc. (German apps)
 *
 * Languages are dynamically loaded from lib/locales.ts - no manual updates needed!
 * Uses getBlogPosts and getApps from API to fetch real data
 */

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const locales = supportedLocales; // Dynamically loaded from lib/locales.ts

  // Build sitemap index XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add locale-specific sitemap indexes
  // Each locale has its own sitemap index that contains:
  // - Static pages
  // - Blog posts (if available)
  // - App Store apps (if available)
  locales.forEach((locale) => {
    xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${locale}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
  });

  xml += `
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
