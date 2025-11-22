import { NextRequest, NextResponse } from "next/server";
import { isSupportedLocale } from "@/lib/locales";
import {
  getBlogPosts,
  normalizeLocaleForApi,
  getImageUrl,
} from "@/lib/blogApi";

/**
 * RSS Feed for Blog Posts (RSS 2.0 Standard)
 *
 * Route format: /feed/en.xml, /feed/de.xml, /feed/ar.xml, etc.
 *
 * Uses catch-all route to handle .xml extension
 */

// Use BlogPost type from lib/blogApi.ts instead of defining our own
import type { BlogPost } from "@/lib/blogApi";

// Get locale-specific feed metadata
function getFeedMetadata(locale: string) {
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

// Decode HTML entities (for content:encoded in CDATA)
// This function decodes HTML entities that may be double-encoded or triple-encoded
// Uses a more aggressive approach to handle all encoding levels
function decodeHtmlEntities(html: string): string {
  if (!html) return html;

  let decoded = html;
  
  // Keep decoding until no more changes (handles multiple levels of encoding)
  let previousDecoded = "";
  let iterations = 0;
  const maxIterations = 20; // Increased limit for deeply encoded content
  
  while (decoded !== previousDecoded && iterations < maxIterations) {
    previousDecoded = decoded;
    iterations++;
    
    // Decode in order: most specific first, then general
    // Handle all levels of encoding (triple, double, single)
    decoded = decoded
      // Quadruple-encoded: &amp;amp;amp;#039; -> &amp;amp;#039;
      .replace(/&amp;amp;amp;#(\d+);/g, "&#$1;")
      .replace(/&amp;amp;amp;#x([0-9a-fA-F]+);/g, "&#x$1;")
      .replace(/&amp;amp;amp;quot;/g, '"')
      .replace(/&amp;amp;amp;apos;/g, "'")
      .replace(/&amp;amp;amp;lt;/g, "<")
      .replace(/&amp;amp;amp;gt;/g, ">")
      .replace(/&amp;amp;amp;amp;/g, "&")
      .replace(/&amp;amp;amp;nbsp;/g, " ")
      // Triple-encoded: &amp;amp;#039; -> &amp;#039;
      .replace(/&amp;amp;#(\d+);/g, "&#$1;")
      .replace(/&amp;amp;#x([0-9a-fA-F]+);/g, "&#x$1;")
      .replace(/&amp;amp;quot;/g, '"')
      .replace(/&amp;amp;apos;/g, "'")
      .replace(/&amp;amp;lt;/g, "<")
      .replace(/&amp;amp;gt;/g, ">")
      .replace(/&amp;amp;amp;/g, "&")
      .replace(/&amp;amp;nbsp;/g, " ")
      // Double-encoded: &amp;#039; -> &#039;
      .replace(/&amp;#(\d+);/g, "&#$1;")
      .replace(/&amp;#x([0-9a-fA-F]+);/g, "&#x$1;")
      .replace(/&amp;quot;/g, '"')
      .replace(/&amp;apos;/g, "'")
      .replace(/&amp;lt;/g, "<")
      .replace(/&amp;gt;/g, ">")
      .replace(/&amp;amp;/g, "&")
      .replace(/&amp;nbsp;/g, " ")
      // Now decode the actual entities (numeric first, then named)
      .replace(/&#(\d+);/g, (match, num) => {
        const charCode = parseInt(num, 10);
        // Only decode safe characters (0-127 for ASCII, or valid UTF-8)
        if (charCode >= 0 && charCode <= 0x10FFFF) {
          return String.fromCharCode(charCode);
        }
        return match; // Keep original if invalid
      })
      .replace(/&#x([0-9a-fA-F]+);/gi, (match, hex) => {
        const charCode = parseInt(hex, 16);
        // Only decode safe characters
        if (charCode >= 0 && charCode <= 0x10FFFF) {
          return String.fromCharCode(charCode);
        }
        return match; // Keep original if invalid
      })
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ");
  }

  return decoded;
}

// Format date for RSS (RFC 822 format)
function formatRssDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toUTCString();
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> }
) {
  try {
    const params = await context.params;
    const slug = params?.slug || [];

    // Extract locale from slug (e.g., ["en.xml"] -> "en", ["de.xml"] -> "de")
    if (slug.length === 0) {
      // Redirect to feed index page
      return NextResponse.redirect(new URL("/feed", request.url));
    }

    let locale = slug[0];

    // Remove .xml extension if present
    if (locale.endsWith(".xml")) {
      locale = locale.replace(/\.xml$/, "");
    }

    // Validate locale dynamically using centralized config
    if (!isSupportedLocale(locale)) {
      console.error("[RSS Feed] Invalid locale:", locale, "from slug:", slug);
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

      // Get description (prefer excerpt, then strip HTML from content)
      let description = "";
      if (post.excerpt) {
        description = stripHtml(post.excerpt);
      } else if (post.content) {
        description = stripHtml(post.content).substring(0, 500) + "...";
      } else {
        description = "Read the full article on Flowxtra Blog.";
      }

      // Get image URL if available (must be done before processing content)
      let imageUrl = "";
      let imageHtml = "";
      if (post.image) {
        imageUrl = getImageUrl(post.image);
        if (imageUrl) {
          // Add image HTML at the beginning of content
          // Escape quotes in alt text for HTML attribute
          const altText = post.title.replace(/"/g, "&quot;");
          imageHtml = `<p><img src="${imageUrl}" alt="${altText}" style="max-width: 100%; height: auto;" /></p>`;
        } else {
          console.warn(
            `[RSS Feed] Failed to get image URL for post "${post.title}":`,
            post.image
          );
        }
      } else {
        console.warn(`[RSS Feed] Post "${post.title}" has no image property`);
      }

      // Get full content for content:encoded
      // If content contains HTML entities, decode them first (CDATA doesn't need escaping)
      const fullContent = post.content
        ? decodeHtmlEntities(post.content)
        : description;

      // Debug: Check if content still has HTML entities after decoding
      // Always log in development to see what's happening
      if (process.env.NODE_ENV === "development" && post.content) {
        const hasEntities = /&(lt|gt|amp|quot|apos|#\d+);/i.test(fullContent);
        console.log(`[RSS Feed] Post "${post.title}" content decoding:`, {
          originalContentStart: post.content.substring(0, 150),
          decodedContentStart: fullContent.substring(0, 150),
          hasEntities: hasEntities,
          originalLength: post.content.length,
          decodedLength: fullContent.length,
        });
        
        if (hasEntities) {
          console.warn(`[RSS Feed] Post "${post.title}" STILL has HTML entities after decoding!`);
        }
      }

      // Combine image and content for content:encoded
      // CDATA section allows raw HTML without escaping
      // Image should appear at the beginning of the content
      let contentWithImage = fullContent;

      // Always add image HTML if available (even if content is empty)
      if (imageHtml) {
        contentWithImage = imageHtml + fullContent;
      }

      // Debug: Log image info for troubleshooting
      if (process.env.NODE_ENV === "development") {
        console.log(`[RSS Feed] Post "${post.title}":`, {
          hasImage: !!post.image,
          imageUrl,
          hasImageHtml: !!imageHtml,
          imageHtmlLength: imageHtml.length,
          imageHtmlPreview: imageHtml.substring(0, 100),
          fullContentStartsWith: fullContent.substring(0, 100),
          contentWithImageStartsWith: contentWithImage.substring(0, 150),
          contentWithImageHasImage: contentWithImage.startsWith("<p><img"),
        });
      }

      // Get author name
      const authorName = post.author?.name || "Flowxtra Team";
      const authorEmail = "blog@flowxtra.com"; // Default email since Author type doesn't have email

      // Get category (in BlogPost from API, category is a string, not an object)
      const category = typeof post.category === "string" ? post.category : "";

      // Get tags
      const tags = post.tags?.map((tag) => tag.name).join(", ") || "";

      xml += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(description)}</description>
      <content:encoded><![CDATA[${contentWithImage}]]></content:encoded>
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

      if (imageUrl) {
        // Add image as enclosure (for RSS readers)
        // Determine image type from URL extension
        const imageTypeMatch = imageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        let imageType = "image/jpeg"; // default
        if (imageTypeMatch) {
          const ext = imageTypeMatch[1].toLowerCase();
          if (ext === "png") imageType = "image/png";
          else if (ext === "gif") imageType = "image/gif";
          else if (ext === "webp") imageType = "image/webp";
          else imageType = "image/jpeg";
        }

        xml += `
      <enclosure url="${escapeXml(imageUrl)}" type="${imageType}"/>`;
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
