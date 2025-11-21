import { NextRequest, NextResponse } from "next/server";
import { isSupportedLocale } from "@/lib/locales";
import { getApps } from "@/lib/appStoreApi";

/**
 * App Store Apps Sitemap (Split by locale and batch index)
 *
 * Route format: /sitemap/en/app-store/0.xml, /sitemap/en/app-store/1.xml, etc.
 * Each file contains up to 100 apps
 *
 * Locales are dynamically validated using lib/locales.ts
 * Uses getApps from lib/appStoreApi.ts to fetch real data from API
 */

interface App {
  id: number;
  slug: string;
  updatedAt?: string;
  createdAt?: string;
}

async function getAppsBatch(
  locale: string,
  batchIndex: number,
  batchSize: number = 100
): Promise<App[]> {
  try {
    // Calculate which page contains the apps for this batch
    // batchIndex 0 = apps 0-99 (page 1, if limit=100)
    // batchIndex 1 = apps 100-199 (page 2, if limit=100)
    const page = batchIndex + 1;
    const limit = batchSize;

    // Use getApps from lib/appStoreApi.ts to fetch real data
    const response = await getApps({
      page,
      limit,
      locale,
      minimal: true, // Only fetch minimal data needed for sitemap
    });

    if (response.success && response.data && response.data.apps) {
      // Filter apps: only include apps that have translation for this locale
      // If translations object exists, check if this locale has translation
      // If translations doesn't exist, include all apps (backward compatibility)
      return response.data.apps
        .filter((app) => {
          // If app has translations object, check if this locale is available
          if (app.translations && typeof app.translations === 'object') {
            // Check if translation exists for this locale
            const hasTranslation = app.translations[locale as keyof typeof app.translations] !== undefined;
            // If locale is 'en', always include (default language)
            if (locale === 'en') return true;
            // For other locales, only include if translation exists
            return hasTranslation;
          }
          // If no translations object, include all apps (backward compatibility)
          // This means API doesn't provide translation info, so we trust API response
          return true;
        })
        .map((app) => ({
          id: app.id,
          slug: app.slug,
          updatedAt: app.updatedAt || app.createdAt,
          createdAt: app.createdAt,
        }));
    }

    return [];
  } catch (error) {
    console.error(
      `Error fetching apps for sitemap (locale: ${locale}, batch: ${batchIndex}):`,
      error
    );
    return [];
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ locale: string; index: string }> }
) {
  const params = await context.params;
  const { locale, index } = params;
  const batchIndex = parseInt(index, 10);

  // Validate locale dynamically using centralized config
  if (isNaN(batchIndex) || batchIndex < 0 || !isSupportedLocale(locale)) {
    return new NextResponse("Invalid parameters", { status: 400 });
  }

  // Base locales for app-store (exclude variants to prevent duplicate content)
  const appStoreBaseLocales = ["en", "de", "fr", "es", "it", "nl", "ar"];

  // If locale is a variant, return empty sitemap (variants redirect to base locales)
  if (!appStoreBaseLocales.includes(locale)) {
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const apps = await getAppsBatch(locale, batchIndex);

  // If no apps, return empty sitemap
  if (apps.length === 0) {
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  }

  // Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  apps.forEach((app) => {
    const url = `${baseUrl}/${locale}/app-store/${app.slug}`;
    const lastMod = app.updatedAt
      ? new Date(app.updatedAt).toISOString()
      : app.createdAt
      ? new Date(app.createdAt).toISOString()
      : new Date().toISOString();

    xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
