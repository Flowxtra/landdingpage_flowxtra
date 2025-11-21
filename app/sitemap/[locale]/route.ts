import { NextRequest, NextResponse } from "next/server";
import { isSupportedLocale } from "@/lib/locales";
import { getBlogPosts } from "@/lib/blogApi";
import { getApps, type App } from "@/lib/appStoreApi";

/**
 * Locale-specific Sitemap Index
 *
 * Route format: /sitemap/en.xml, /sitemap/de.xml, etc.
 * Each locale sitemap index contains:
 * 1. Static pages sitemap
 * 2. Blog posts sitemaps (if available)
 * 3. App Store apps sitemaps (if available)
 *
 * Locales are dynamically validated using lib/locales.ts
 */

async function getAppsCount(locale: string): Promise<number> {
  try {
    const response = await getApps({
      page: 1,
      limit: 1,
      locale,
      minimal: true,
    });

    if (response.success && response.data && response.data.pagination) {
      const apps = response.data.apps ?? [];

      // Filter apps: only count apps that have translation for this locale
      const filteredApps = apps.filter((app: App) => {
        if (app.translations && typeof app.translations === "object") {
          const hasTranslation =
            app.translations[locale as keyof typeof app.translations] !==
            undefined;
          if (locale === "en") return true;
          return hasTranslation;
        }
        return true;
      });

      return filteredApps.length;
    }

    return 0;
  } catch (error) {
    console.warn(
      `⚠️ Error fetching apps count for locale "${locale}":`,
      error instanceof Error ? error.message : String(error)
    );
    return 0;
  }
}

async function getBlogPostsCount(locale: string): Promise<number> {
  try {
    // Try to get blog posts for the requested locale
    const response = await getBlogPosts({
      page: 1,
      limit: 1,
      locale,
      minimal: true,
    });

    if (response.success && response.data && response.data.pagination) {
      const totalPosts = response.data.pagination.totalPosts || 0;

      // If we have posts for this locale, return the count
      if (totalPosts > 0) {
        return totalPosts;
      }

      // If no posts for this locale and it's not English, try fallback chain
      // DACH locales: de-at/de-ch → de → en
      // English locales: en-us/en-gb/en-au/en-ca → en
      // Other locales: locale → en
      if (locale !== "en") {
        // For English locales, fallback to base English
        if (
          locale === "en-us" ||
          locale === "en-gb" ||
          locale === "en-au" ||
          locale === "en-ca"
        ) {
          console.log(
            `📝 No blog posts found for locale "${locale}", trying English (en) as fallback...`
          );
          const enResponse = await getBlogPosts({
            page: 1,
            limit: 1,
            locale: "en",
            minimal: true,
          });

          if (
            enResponse.success &&
            enResponse.data &&
            enResponse.data.pagination
          ) {
            const enTotalPosts = enResponse.data.pagination.totalPosts || 0;
            if (enTotalPosts > 0) {
              console.log(
                `📝 Using English blog posts (${enTotalPosts}) for locale "${locale}"`
              );
              return enTotalPosts;
            }
          }
        }
        // For DACH locales, try German first, then English
        else if (locale === "de-at" || locale === "de-ch") {
          console.log(
            `📝 No blog posts found for locale "${locale}", trying German (de) as fallback...`
          );
          const deResponse = await getBlogPosts({
            page: 1,
            limit: 1,
            locale: "de",
            minimal: true,
          });

          if (
            deResponse.success &&
            deResponse.data &&
            deResponse.data.pagination
          ) {
            const deTotalPosts = deResponse.data.pagination.totalPosts || 0;
            if (deTotalPosts > 0) {
              console.log(
                `📝 Using German blog posts (${deTotalPosts}) for locale "${locale}"`
              );
              return deTotalPosts;
            }
          }
        }

        // Fallback to English for all non-English locales
        console.log(
          `📝 No blog posts found for locale "${locale}", trying English as fallback...`
        );
        const enResponse = await getBlogPosts({
          page: 1,
          limit: 1,
          locale: "en",
          minimal: true,
        });

        if (
          enResponse.success &&
          enResponse.data &&
          enResponse.data.pagination
        ) {
          const enTotalPosts = enResponse.data.pagination.totalPosts || 0;
          if (enTotalPosts > 0) {
            console.log(
              `📝 Using English blog posts (${enTotalPosts}) for locale "${locale}"`
            );
            return enTotalPosts;
          }
        }
      }

      return totalPosts;
    }

    return 0;
  } catch (error) {
    console.warn(
      `⚠️ Error fetching blog posts count for locale "${locale}":`,
      error instanceof Error ? error.message : String(error)
    );
    return 0;
  }
}

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

  // Base locales for blog (exclude variants to prevent duplicate content)
  const blogBaseLocales = ["en", "de", "fr", "es", "it", "nl", "ar"];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const postsPerFile = 100; // 100 items per sitemap file

  // Build XML sitemap index (Google requires XML, not HTML)
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages sitemap for this locale
  xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-static-${locale}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;

  // Add blog sitemaps for this locale (if available) - only for base locales (not variants)
  if (blogBaseLocales.includes(locale)) {
    const totalPosts = await getBlogPostsCount(locale);
    const totalBlogFiles = Math.ceil(totalPosts / postsPerFile);

    if (totalPosts > 0 && totalBlogFiles > 0) {
      for (let fileIndex = 0; fileIndex < totalBlogFiles; fileIndex++) {
        xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${locale}-blog-${fileIndex}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
      }
      console.log(
        `📝 Adding ${totalBlogFiles} blog sitemap file(s) for locale "${locale}" (${totalPosts} posts total)`
      );
    }
  }

  // Add app-store sitemaps for this locale (if available) - only for base locales (not variants)
  if (blogBaseLocales.includes(locale)) {
    const totalApps = await getAppsCount(locale);
    const totalAppFiles = Math.ceil(totalApps / postsPerFile);

    if (totalApps > 0 && totalAppFiles > 0) {
      for (let fileIndex = 0; fileIndex < totalAppFiles; fileIndex++) {
        xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${locale}-app-store-${fileIndex}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
      }
      console.log(
        `📱 Adding ${totalAppFiles} app-store sitemap file(s) for locale "${locale}" (${totalApps} apps total)`
      );
    }
  }

  xml += `
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
