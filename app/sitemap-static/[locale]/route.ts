import { NextRequest, NextResponse } from "next/server";
import { isSupportedLocale } from "@/lib/locales";
import { getSitemapRoutes } from "@/lib/static-routes";

/**
 * Static Pages Sitemap (Split by locale)
 * Contains all static pages for a specific language
 *
 * Route format: /sitemap-static/en, /sitemap-static/de
 *
 * Pages are dynamically loaded from lib/static-routes.ts
 * Locales are dynamically validated using lib/locales.ts
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ locale: string }> }
) {
  const params = await context.params;
  const { locale } = params;

  // Validate locale dynamically using centralized config
  if (!isSupportedLocale(locale)) {
    return new NextResponse("Invalid locale", { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";

  // Get all static routes for this locale dynamically from configuration
  const staticRoutes = getSitemapRoutes(locale);

  // Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages for this locale (dynamically from configuration)
  staticRoutes.forEach((route) => {
    const path = route.paths[locale] || route.paths.en;
    if (!path) return; // Skip if no path for this locale

    const url = `${baseUrl}/${locale}${path}`;

    xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  // Add blog listing page for this locale
  xml += `
  <url>
    <loc>${baseUrl}/${locale}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Add app-store listing page for this locale
  xml += `
  <url>
    <loc>${baseUrl}/${locale}/app-store</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
