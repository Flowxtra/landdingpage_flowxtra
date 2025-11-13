import { NextRequest, NextResponse } from "next/server";
import { isSupportedLocale } from "@/lib/locales";
import { getBlogPosts } from "@/lib/blogApi";

/**
 * Blog Posts Sitemap (Split by locale and batch index)
 *
 * Route format: /sitemap/en/blog/0.xml, /sitemap/en/blog/1.xml, etc.
 * Each file contains up to 100 blog posts
 *
 * Locales are dynamically validated using lib/locales.ts
 * Uses getBlogPosts from lib/blogApi.ts to fetch real data from API
 */

interface BlogPost {
  id: number;
  slug: string;
  date: string;
  updatedAt?: string;
}

async function getBlogPostsBatch(
  locale: string,
  batchIndex: number,
  batchSize: number = 100
): Promise<BlogPost[]> {
  try {
    // Calculate which page contains the posts for this batch
    // batchIndex 0 = posts 0-99 (page 1, if limit=100)
    // batchIndex 1 = posts 100-199 (page 2, if limit=100)
    const page = batchIndex + 1;
    const limit = batchSize;

    // Use getBlogPosts from lib/blogApi.ts to fetch real data
    // Blog posts update frequently, so we fetch fresh data for sitemap
    let response = await getBlogPosts({
      page,
      limit,
      locale,
      minimal: true, // Only fetch minimal data needed for sitemap
    });

    // If no posts for this locale and it's not English, try English as fallback
    // This ensures all languages show blog posts (using English content)
    if (
      (!response.success ||
        !response.data ||
        !response.data.posts ||
        response.data.posts.length === 0) &&
      locale !== "en"
    ) {
      console.log(
        `📝 No blog posts found for locale "${locale}" in batch ${batchIndex}, trying English as fallback...`
      );
      response = await getBlogPosts({
        page,
        limit,
        locale: "en",
        minimal: true,
      });
    }

    if (response.success && response.data && response.data.posts) {
      return response.data.posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        date: post.date,
        updatedAt: post.updatedAt || post.dateModified || post.date,
      }));
    }

    return [];
  } catch (error) {
    console.error(
      `Error fetching blog posts for sitemap (locale: ${locale}, batch: ${batchIndex}):`,
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const blogPosts = await getBlogPostsBatch(locale, batchIndex);

  // If no posts, return empty sitemap
  if (blogPosts.length === 0) {
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
          // Blog sitemaps update frequently - cache for 1 hour (3600 seconds)
          "Cache-Control":
            "public, max-age=3600, s-maxage=3600, must-revalidate",
        },
      }
    );
  }

  // Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  blogPosts.forEach((post) => {
    const url = `${baseUrl}/${locale}/blog/${post.slug}`;
    const lastMod = post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date(post.date).toISOString();

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
      // Blog sitemaps update frequently - cache for 1 hour (3600 seconds)
      // must-revalidate ensures fresh content when cache expires
      "Cache-Control": "public, max-age=3600, s-maxage=3600, must-revalidate",
    },
  });
}
