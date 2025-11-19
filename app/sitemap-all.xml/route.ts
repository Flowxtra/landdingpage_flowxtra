import { NextResponse } from "next/server";
import { supportedLocales } from "@/lib/locales";
import { getBlogPosts, type BlogPost } from "@/lib/blogApi";
import { getApps, type App } from "@/lib/appStoreApi";
import { getSitemapRoutes } from "@/lib/static-routes";

/**
 * Complete Sitemap (All URLs in One File)
 *
 * Route: /sitemap-all.xml
 * Contains all URLs directly without sitemap index structure
 * Useful for smaller sites or when you want a single XML file
 *
 * This is an alternative to the sitemap index structure
 */

async function getAllBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const allPosts: BlogPost[] = [];
    let currentPage = 1;
    let hasMorePages = true;
    const limit = 100;
    let actualLocale = locale; // Use this locale for fetching

    // Check if we have posts for the requested locale
    // Fallback chain:
    // DACH locales: de-at/de-ch → de → en
    // English locales: en-us/en-gb/en-au/en-ca → en
    // Other locales: locale → en
    if (locale !== "en") {
      const testResponse = await getBlogPosts({
        page: 1,
        limit: 1,
        locale,
        minimal: true,
      });

      if (
        !testResponse.success ||
        !testResponse.data ||
        !testResponse.data.posts ||
        testResponse.data.posts.length === 0
      ) {
        // For English locales, fallback to base English
        if (
          locale === "en-us" ||
          locale === "en-gb" ||
          locale === "en-au" ||
          locale === "en-ca"
        ) {
          console.log(
            `📝 No blog posts found for locale "${locale}", using English (en) as fallback...`
          );
          actualLocale = "en";
        }
        // For DACH locales, try German first, then English
        else if (locale === "de-at" || locale === "de-ch") {
          console.log(
            `📝 No blog posts found for locale "${locale}", trying German (de) as fallback...`
          );
          const deTestResponse = await getBlogPosts({
            page: 1,
            limit: 1,
            locale: "de",
            minimal: true,
          });

          if (
            deTestResponse.success &&
            deTestResponse.data &&
            deTestResponse.data.posts &&
            deTestResponse.data.posts.length > 0
          ) {
            actualLocale = "de";
          } else {
            console.log(
              `📝 No blog posts found for locale "${locale}", using English as fallback...`
            );
            actualLocale = "en";
          }
        }
        // For other locales, fallback directly to English
        else {
          console.log(
            `📝 No blog posts found for locale "${locale}", using English as fallback...`
          );
          actualLocale = "en";
        }
      }
    }

    while (hasMorePages) {
      try {
        const response = await getBlogPosts({
          page: currentPage,
          limit,
          locale: actualLocale,
          minimal: true,
        });

        if (response.success && response.data && response.data.posts) {
          allPosts.push(...response.data.posts);

          if (response.data.pagination) {
            hasMorePages = response.data.pagination.hasNextPage || false;
            currentPage++;
          } else {
            hasMorePages = response.data.posts.length === limit;
            currentPage++;
          }
        } else {
          hasMorePages = false;
        }
      } catch (error) {
        console.warn(
          `⚠️ Error fetching blog posts page ${currentPage} for locale "${actualLocale}":`,
          error
        );
        hasMorePages = false;
      }

      // Safety limit
      if (currentPage > 100) break;
    }

    return allPosts;
  } catch (error) {
    console.warn(
      `⚠️ Error fetching all blog posts for locale "${locale}":`,
      error
    );
    return [];
  }
}

async function getAllApps(locale: string): Promise<App[]> {
  try {
    const allApps: App[] = [];
    let currentPage = 1;
    let hasMorePages = true;
    const limit = 100;

    while (hasMorePages) {
      try {
        const response = await getApps({
          page: currentPage,
          limit,
          locale,
          minimal: true,
        });

        if (response.success && response.data && response.data.apps) {
          // Filter apps: only include apps that have translation for this locale
          const filteredApps = response.data.apps.filter((app: App) => {
            if (app.translations && typeof app.translations === "object") {
              const hasTranslation =
                app.translations[locale as keyof typeof app.translations] !==
                undefined;
              if (locale === "en") return true;
              return hasTranslation;
            }
            return true;
          });

          allApps.push(...filteredApps);

          if (response.data.pagination) {
            hasMorePages = response.data.pagination.hasNextPage || false;
            currentPage++;
          } else {
            hasMorePages = response.data.apps.length === limit;
            currentPage++;
          }
        } else {
          hasMorePages = false;
        }
      } catch (error) {
        console.warn(
          `⚠️ Error fetching apps page ${currentPage} for locale "${locale}":`,
          error
        );
        hasMorePages = false;
      }

      // Safety limit
      if (currentPage > 100) break;
    }

    return allApps;
  } catch (error) {
    console.warn(`⚠️ Error fetching all apps for locale "${locale}":`, error);
    return [];
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const locales = supportedLocales;

  // Build complete sitemap XML with all URLs
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages for all locales
  for (const locale of locales) {
    const staticRoutes = getSitemapRoutes(locale);

    staticRoutes.forEach((route) => {
      const path = route.paths[locale] || route.paths.en;
      if (!path) return;

      const url = `${baseUrl}/${locale}${path}`;
      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });

    // Add blog listing page
    xml += `
  <url>
    <loc>${baseUrl}/${locale}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Add app-store listing page
    xml += `
  <url>
    <loc>${baseUrl}/${locale}/app-store</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Add blog posts for this locale
    const blogPosts = await getAllBlogPosts(locale);
    blogPosts.forEach((post) => {
      const url = `${baseUrl}/${locale}/blog/${post.slug}`;
      const lastMod = post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : post.date
        ? new Date(post.date).toISOString()
        : new Date().toISOString();

      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add app-store apps for this locale
    const apps = await getAllApps(locale);
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
  }

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      // Blog content updates frequently - cache for 1 hour
      // Static pages and apps can be cached longer, but blog needs frequent updates
      "Cache-Control": "public, max-age=3600, s-maxage=3600, must-revalidate",
    },
  });
}
