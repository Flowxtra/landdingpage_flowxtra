import { NextRequest, NextResponse } from "next/server";
import { isSupportedLocale } from "@/lib/locales";

/**
 * Blog Posts Sitemap (Split by locale and batch index)
 *
 * Route format: /sitemap/en/blog/0.xml, /sitemap/en/blog/1.xml, etc.
 * Each file contains up to 100 blog posts
 *
 * Locales are dynamically validated using lib/locales.ts
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
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.flowxtra.com";

    // Calculate which page contains the posts for this batch
    // batchIndex 0 = posts 0-99 (page 1, if limit=100)
    // batchIndex 1 = posts 100-199 (page 2, if limit=100)
    const page = batchIndex + 1;
    const limit = 100;

    const response = await fetch(
      `${apiUrl}/api/blog?page=${page}&limit=${limit}&locale=${locale}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch blog posts for sitemap (locale: ${locale}, batch: ${batchIndex})`
      );
      return [];
    }

    const data = await response.json();

    if (data.success && data.data && data.data.posts) {
      return data.data.posts.map((post: any) => ({
        id: post.id,
        slug: post.slug,
        date: post.date,
        updatedAt: post.updatedAt || post.date,
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
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
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
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
