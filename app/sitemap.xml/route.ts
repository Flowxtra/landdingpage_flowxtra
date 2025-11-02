import { NextResponse } from "next/server";
import { supportedLocales } from "@/lib/locales";

/**
 * Sitemap Index for SEO
 *
 * This generates a sitemap index XML that references:
 * 1. Static pages sitemap (split by locale)
 * 2. Blog posts sitemaps (split by language, 100 posts per file)
 *
 * Format:
 * - /sitemap-static-en.xml, /sitemap-static-de.xml, etc. (static pages per locale)
 * - /sitemap-en-blog-0.xml, /sitemap-en-blog-1.xml, etc. (English blog posts)
 * - /sitemap-de-blog-0.xml, /sitemap-de-blog-1.xml, etc. (German blog posts)
 *
 * Languages are dynamically loaded from lib/locales.ts - no manual updates needed!
 */

async function getBlogPostsCount(locale: string): Promise<number> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.flowxtra.com";

    // Fetch first page to get total count
    const response = await fetch(
      `${apiUrl}/api/blog?page=1&limit=1&locale=${locale}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(
        `❌ Failed to fetch blog posts count for sitemap (locale: ${locale}): ${response.status} ${response.statusText}`
      );
      console.error(
        `   API URL attempted: ${apiUrl}/api/blog?page=1&limit=1&locale=${locale}`
      );
      console.error(
        `   This is normal if the blog API is not implemented yet. Static pages sitemap will still work.`
      );
      return 0;
    }

    const data = await response.json();

    if (data.success && data.data && data.data.pagination) {
      const totalPosts = data.data.pagination.totalPosts || 0;
      if (totalPosts > 0) {
        console.log(`✅ Found ${totalPosts} blog posts for locale "${locale}"`);
      }
      return totalPosts;
    }

    // Log if response structure is unexpected
    if (!data.success) {
      console.warn(
        `⚠️ API returned success=false for locale "${locale}":`,
        data.message || "Unknown error"
      );
    } else if (!data.data?.pagination) {
      console.warn(
        `⚠️ API response missing pagination data for locale "${locale}". Response structure:`,
        Object.keys(data.data || {})
      );
    }

    // Fallback: try to count all posts
    let totalCount = 0;
    let currentPage = 1;
    let hasMorePages = true;
    const limit = 100;

    while (hasMorePages) {
      const pageResponse = await fetch(
        `${apiUrl}/api/blog?page=${currentPage}&limit=${limit}&locale=${locale}`,
        {
          next: { revalidate: 3600 },
        }
      );

      if (!pageResponse.ok) break;

      const pageData = await pageResponse.json();

      if (pageData.success && pageData.data && pageData.data.posts) {
        totalCount += pageData.data.posts.length;

        if (pageData.data.pagination) {
          hasMorePages = pageData.data.pagination.hasNextPage;
          currentPage++;
        } else {
          hasMorePages = pageData.data.posts.length === limit;
          currentPage++;
        }
      } else {
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

  // Add static pages sitemaps for each locale
  locales.forEach((locale) => {
    xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-static-${locale}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
  });

  // Add blog sitemaps for each locale
  for (const locale of locales) {
    const totalPosts = await getBlogPostsCount(locale);
    const totalFiles = Math.ceil(totalPosts / postsPerFile);

    // Only add blog sitemaps if there are posts
    if (totalPosts > 0 && totalFiles > 0) {
      for (let fileIndex = 0; fileIndex < totalFiles; fileIndex++) {
        xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${locale}-blog-${fileIndex}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
      }
    }
    // If no posts found, log info (but don't break sitemap generation)
    if (totalPosts === 0) {
      console.info(
        `ℹ️ No blog posts found for locale "${locale}" - blog sitemaps will not be included`
      );
      console.info(
        `   This is normal if the API is not ready yet or has no blog posts.`
      );
    } else {
      console.log(
        `📝 Adding ${totalFiles} blog sitemap file(s) for locale "${locale}" (${totalPosts} posts total)`
      );
    }
  }

  xml += `
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
