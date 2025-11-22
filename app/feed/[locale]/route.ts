import { NextRequest, NextResponse } from "next/server";
import { isSupportedLocale } from "@/lib/locales";
import { getBlogPosts, normalizeLocaleForApi } from "@/lib/blogApi";

/**
 * RSS Feed for Blog Posts (RSS 2.0 Standard)
 *
 * Route format: /feed/en.xml, /feed/de.xml, /feed/ar.xml, etc.
 *
 * Features:
 * - RSS 2.0 compliant
 * - Separate feed for each locale
 * - Latest 20 blog posts
 * - Full article content in description
 * - Proper encoding and caching
 * - HTML autodiscovery support
 *
 * Locales are dynamically validated using lib/locales.ts
 * Uses getBlogPosts from lib/blogApi.ts to fetch real data from API
 */

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  excerpt?: string;
  date: string;
  updatedAt?: string;
  author?: {
    name: string;
    email?: string;
  };
  category?: {
    name: string;
    slug: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
  image?: string;
}

// Get locale-specific feed metadata
function getFeedMetadata(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";

  const metadata: Record<
    string,
    { title: string; description: string; language: string }
  > = {
    en: {
      title: "Flowxtra Blog - Latest Articles",
      description:
        "Stay updated with the latest articles about ATS software, recruitment, HR management, and talent acquisition from Flowxtra.",
      language: "en-US",
    },
    "en-us": {
      title: "Flowxtra Blog - Latest Articles",
      description:
        "Stay updated with the latest articles about ATS software, recruitment, HR management, and talent acquisition from Flowxtra.",
      language: "en-US",
    },
    "en-gb": {
      title: "Flowxtra Blog - Latest Articles",
      description:
        "Stay updated with the latest articles about ATS software, recruitment, HR management, and talent acquisition from Flowxtra.",
      language: "en-GB",
    },
    "en-au": {
      title: "Flowxtra Blog - Latest Articles",
      description:
        "Stay updated with the latest articles about ATS software, recruitment, HR management, and talent acquisition from Flowxtra.",
      language: "en-AU",
    },
    "en-ca": {
      title: "Flowxtra Blog - Latest Articles",
      description:
        "Stay updated with the latest articles about ATS software, recruitment, HR management, and talent acquisition from Flowxtra.",
      language: "en-CA",
    },
    de: {
      title: "Flowxtra Blog - Neueste Artikel",
      description:
        "Bleiben Sie auf dem Laufenden mit den neuesten Artikeln über ATS-Software, Recruiting, HR-Management und Talentakquise von Flowxtra.",
      language: "de-DE",
    },
    "de-at": {
      title: "Flowxtra Blog - Neueste Artikel",
      description:
        "Bleiben Sie auf dem Laufenden mit den neuesten Artikeln über ATS-Software, Recruiting, HR-Management und Talentakquise von Flowxtra.",
      language: "de-AT",
    },
    "de-ch": {
      title: "Flowxtra Blog - Neueste Artikel",
      description:
        "Bleiben Sie auf dem Laufenden mit den neuesten Artikeln über ATS-Software, Recruiting, HR-Management und Talentakquise von Flowxtra.",
      language: "de-CH",
    },
    fr: {
      title: "Flowxtra Blog - Derniers Articles",
      description:
        "Restez à jour avec les derniers articles sur les logiciels ATS, le recrutement, la gestion RH et l'acquisition de talents de Flowxtra.",
      language: "fr-FR",
    },
    es: {
      title: "Flowxtra Blog - Últimos Artículos",
      description:
        "Mantente actualizado con los últimos artículos sobre software ATS, reclutamiento, gestión de RRHH y adquisición de talento de Flowxtra.",
      language: "es-ES",
    },
    it: {
      title: "Flowxtra Blog - Ultimi Articoli",
      description:
        "Resta aggiornato con gli ultimi articoli su software ATS, reclutamento, gestione HR e acquisizione di talenti di Flowxtra.",
      language: "it-IT",
    },
    nl: {
      title: "Flowxtra Blog - Laatste Artikelen",
      description:
        "Blijf op de hoogte van de nieuwste artikelen over ATS-software, werving, HR-beheer en talentacquisitie van Flowxtra.",
      language: "nl-NL",
    },
    ar: {
      title: "مدونة Flowxtra - أحدث المقالات",
      description:
        "ابق على اطلاع بأحدث المقالات حول برامج ATS والتوظيف وإدارة الموارد البشرية واكتساب المواهب من Flowxtra.",
      language: "ar-SA",
    },
  };

  return metadata[locale] || metadata.en;
}

// Escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Strip HTML tags and get plain text (for description)
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
}

// Format date for RSS (RFC 822 format)
function formatRssDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toUTCString();
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ locale: string }> }
) {
  try {
    const params = await context.params;
    let { locale } = params;

    // Remove .xml extension if present (Next.js may include it in the route param)
    if (locale.endsWith('.xml')) {
      locale = locale.replace(/\.xml$/, '');
    }

    // Validate locale dynamically using centralized config
    if (!isSupportedLocale(locale)) {
      console.error('[RSS Feed] Invalid locale:', locale);
      return new NextResponse("Invalid locale", { status: 400 });
    }

    // Base locales for blog (exclude variants to prevent duplicate content)
    const blogBaseLocales = ["en", "de", "fr", "es", "it", "nl", "ar"];

    // Normalize locale for API (en-au → en, de-ch → de, etc.)
    const normalizedLocale = normalizeLocaleForApi(locale);

    // If locale is a variant, use base locale for feed
    const feedLocale = blogBaseLocales.includes(locale)
      ? locale
      : normalizedLocale;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
    const feedMetadata = getFeedMetadata(feedLocale);
    const feedUrl = `${baseUrl}/feed/${feedLocale}.xml`;

    // Fetch latest 20 blog posts
    const response = await getBlogPosts({
      page: 1,
      limit: 20,
      locale: feedLocale,
      minimal: false, // Get full content for RSS
    });

    if (!response.success || !response.data || !response.data.posts) {
      // Return empty feed if no posts
      const emptyFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedMetadata.title)}</title>
    <link>${baseUrl}/${feedLocale}/blog</link>
    <description>${escapeXml(feedMetadata.description)}</description>
    <language>${feedMetadata.language}</language>
    <lastBuildDate>${formatRssDate(new Date())}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <generator>Flowxtra RSS Feed Generator</generator>
  </channel>
</rss>`;

      return new NextResponse(emptyFeed, {
        headers: {
          "Content-Type": "application/rss+xml; charset=utf-8",
          "Cache-Control":
            "public, max-age=3600, s-maxage=3600, must-revalidate",
        },
      });
    }

    const posts = response.data.posts as BlogPost[];
    const lastBuildDate =
      posts.length > 0 && posts[0].updatedAt
        ? new Date(posts[0].updatedAt)
        : posts.length > 0 && posts[0].date
        ? new Date(posts[0].date)
        : new Date();

    // Build RSS XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(feedMetadata.title)}</title>
    <link>${baseUrl}/${feedLocale}/blog</link>
    <description>${escapeXml(feedMetadata.description)}</description>
    <language>${feedMetadata.language}</language>
    <lastBuildDate>${formatRssDate(lastBuildDate)}</lastBuildDate>
    <pubDate>${formatRssDate(lastBuildDate)}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <generator>Flowxtra RSS Feed Generator</generator>
    <image>
      <url>${baseUrl}/Main-flowxtra-Logo.png</url>
      <title>${escapeXml(feedMetadata.title)}</title>
      <link>${baseUrl}/${feedLocale}/blog</link>
    </image>`;

    // Add items (blog posts)
    posts.forEach((post) => {
      const postUrl = `${baseUrl}/${feedLocale}/blog/${post.slug}`;
      const postDate = post.updatedAt
        ? new Date(post.updatedAt)
        : post.date
        ? new Date(post.date)
        : new Date();

      // Get description (prefer excerpt, then description, then strip HTML from content)
      let description = "";
      if (post.excerpt) {
        description = stripHtml(post.excerpt);
      } else if (post.description) {
        description = stripHtml(post.description);
      } else if (post.content) {
        description = stripHtml(post.content).substring(0, 500) + "...";
      } else {
        description = "Read the full article on Flowxtra Blog.";
      }

      // Get full content for content:encoded
      const fullContent = post.content ? escapeXml(post.content) : description;

      // Get author name
      const authorName = post.author?.name || "Flowxtra Team";
      const authorEmail = post.author?.email || "blog@flowxtra.com";

      // Get category
      const category = post.category?.name || "";

      // Get tags
      const tags = post.tags?.map((tag) => tag.name).join(", ") || "";

      xml += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(description)}</description>
      <content:encoded><![CDATA[${fullContent}]]></content:encoded>
      <pubDate>${formatRssDate(postDate)}</pubDate>
      <dc:creator>${escapeXml(authorName)}</dc:creator>
      <author>${escapeXml(authorEmail)} (${escapeXml(authorName)})</author>`;

      if (category) {
        xml += `
      <category>${escapeXml(category)}</category>`;
      }

      if (tags) {
        tags.split(", ").forEach((tag) => {
          if (tag.trim()) {
            xml += `
      <category>${escapeXml(tag.trim())}</category>`;
          }
        });
      }

      if (post.image) {
        const imageUrl = post.image.startsWith("http")
          ? post.image
          : `${baseUrl}${post.image.startsWith("/") ? "" : "/"}${post.image}`;
        xml += `
      <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg"/>`;
      }

      xml += `
    </item>`;
    });

    xml += `
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[RSS Feed] Error generating feed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
