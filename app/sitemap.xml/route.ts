import { NextResponse } from "next/server";
import { supportedLocales } from "@/lib/locales";
import { getBlogPosts } from "@/lib/blogApi";
import { getApps } from "@/lib/appStoreApi";

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

async function getAppsCount(locale: string): Promise<number> {
  try {
    // Use getApps from lib/appStoreApi.ts to fetch real data
    // Fetch first page to get total count
    const response = await getApps({
      page: 1,
      limit: 1,
      locale,
      minimal: true, // Only fetch minimal data needed for count
    });

    if (response.success && response.data && response.data.pagination) {
      // Get actual apps to filter by translation
      const apps = response.data.apps || [];
      
      // Filter apps: only count apps that have translation for this locale
      const filteredApps = apps.filter((app: any) => {
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
        return true;
      });
      
      const totalApps = filteredApps.length;
      if (totalApps > 0) {
        console.log(`✅ Found ${totalApps} apps (with translation) for locale "${locale}"`);
      }
      return totalApps;
    }

    // Fallback: try to count all apps
    let totalCount = 0;
    let currentPage = 1;
    let hasMorePages = true;
    const limit = 100;

    while (hasMorePages) {
      try {
        const pageResponse = await getApps({
          page: currentPage,
          limit,
          locale,
          minimal: true,
        });

        if (
          pageResponse.success &&
          pageResponse.data &&
          pageResponse.data.apps
        ) {
          // Filter apps: only count apps that have translation for this locale
          const filteredApps = pageResponse.data.apps.filter((app: any) => {
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
            return true;
          });
          
          totalCount += filteredApps.length;

          if (pageResponse.data.pagination) {
            hasMorePages = pageResponse.data.pagination.hasNextPage || false;
            currentPage++;
          } else {
            hasMorePages = pageResponse.data.apps.length === limit;
            currentPage++;
          }
        } else {
          hasMorePages = false;
        }
      } catch (pageError) {
        console.warn(
          `⚠️ Error fetching apps page ${currentPage} for locale "${locale}":`,
          pageError
        );
        hasMorePages = false;
      }

      // Safety limit
      if (currentPage > 100) break;
    }

    return totalCount;
  } catch (error) {
    // Network errors or API unavailable - log but don't break sitemap
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn(
      `⚠️ Error fetching apps count for sitemap (locale: ${locale}): ${errorMessage}`
    );
    return 0;
  }
}

async function getBlogPostsCount(locale: string): Promise<number> {
  try {
    // Use getBlogPosts from lib/blogApi.ts to fetch real data
    // Fetch first page to get total count
    const response = await getBlogPosts({
      page: 1,
      limit: 1,
      locale,
      minimal: true, // Only fetch minimal data needed for count
    });

    if (response.success && response.data && response.data.pagination) {
      const totalPosts = response.data.pagination.totalPosts || 0;
      if (totalPosts > 0) {
        console.log(`✅ Found ${totalPosts} blog posts for locale "${locale}"`);
      }
      return totalPosts;
    }

    // Log if response structure is unexpected
    if (!response.success) {
      console.warn(
        `⚠️ API returned success=false for locale "${locale}":`,
        (response as any).message || "Unknown error"
      );
    } else if (!response.data?.pagination) {
      console.warn(
        `⚠️ API response missing pagination data for locale "${locale}". Response structure:`,
        Object.keys(response.data || {})
      );
    }

    // Fallback: try to count all posts
    let totalCount = 0;
    let currentPage = 1;
    let hasMorePages = true;
    const limit = 100;

    while (hasMorePages) {
      try {
        const pageResponse = await getBlogPosts({
          page: currentPage,
          limit,
          locale,
          minimal: true,
        });

        if (
          pageResponse.success &&
          pageResponse.data &&
          pageResponse.data.posts
        ) {
          totalCount += pageResponse.data.posts.length;

          if (pageResponse.data.pagination) {
            hasMorePages = pageResponse.data.pagination.hasNextPage || false;
            currentPage++;
          } else {
            hasMorePages = pageResponse.data.posts.length === limit;
            currentPage++;
          }
        } else {
          hasMorePages = false;
        }
      } catch (pageError) {
        console.warn(
          `⚠️ Error fetching page ${currentPage} for locale "${locale}":`,
          pageError
        );
        hasMorePages = false;
      }

      // Safety limit
      if (currentPage > 100) break;
    }

    return totalCount;
  } catch (error) {
    // Network errors or API unavailable - log but don't break sitemap
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn(
      `⚠️ Error fetching blog posts count for sitemap (locale: ${locale}): ${errorMessage}`
    );
    console.warn(
      `   This is normal if the blog API is not available yet. Static pages sitemap will still work.`
    );
    return 0;
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const locales = supportedLocales; // Dynamically loaded from lib/locales.ts
  const postsPerFile = 100;

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
