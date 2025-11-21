import type { Metadata } from "next";
import { getBlogPost } from "@/lib/blogApi";
import { getImageUrl } from "@/lib/blogApi";

// Generate SEO metadata for Blog Post page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string, slug: string}> 
}): Promise<Metadata> {
  const {locale, slug} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  try {
    // Normalize locale for API (en-au → en, de-ch → de, etc.)
    const normalizeLocale = (loc: string): string => {
      if (loc.startsWith("en-")) return "en";
      if (loc.startsWith("de-")) return "de";
      return loc;
    };

    // Base locale for canonical URL (variants redirect to base)
    const baseLocale = normalizeLocale(locale);
    
    // Fetch post data from API using normalized locale
    const response = await getBlogPost(slug, baseLocale);
    
    if (response.success && response.data?.post) {
      const post = response.data.post;
      const imageUrl = post.image ? getImageUrl(post.image) : `${baseUrl}/favicon.png`;
      
      // Base locales for hreflang (exclude variants to prevent duplicate content)
      const baseLocales = ["en", "de", "fr", "es", "it", "nl", "ar"];
      
      // Build hreflang URLs using only base locales
      const hreflangUrls: Record<string, string> = {};
      baseLocales.forEach((baseLoc) => {
        hreflangUrls[baseLoc] = `${baseUrl}/${baseLoc}/blog/${slug}`;
      });
      
      const metadata: Metadata = {
        title: `${post.title} – Flowxtra Blog`,
        description: post.excerpt || "Discover insights, tips, and trends in recruitment and talent management.",
        keywords: post.keywords ? post.keywords.split(',').map(k => k.trim()) : ["recruitment", "hiring", "HR", "talent management", "ATS"],
        metadataBase: new URL(baseUrl),
        openGraph: {
          title: post.title,
          description: post.excerpt || "Discover insights, tips, and trends in recruitment and talent management.",
          url: `${baseUrl}/${baseLocale}/blog/${slug}`,
          type: "article",
          images: [imageUrl],
          publishedTime: post.datePublished,
          modifiedTime: post.dateModified || post.datePublished,
          authors: post.author ? [post.author.name] : undefined,
        },
        alternates: {
          canonical: `${baseUrl}/${baseLocale}/blog/${slug}`,
          languages: hreflangUrls,
        },
      };

      return metadata;
    }
  } catch (error) {
    console.error('Error fetching post metadata:', error);
  }
  
  // Fallback metadata if API fails
  const postTitle = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Blog Post';
  
  return {
    title: `${postTitle} – Flowxtra Blog`,
    description: "Discover insights, tips, and trends in recruitment and talent management.",
    metadataBase: new URL(baseUrl),
  };
}

export default async function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD structured data is now rendered in the root layout's <head> section
  // to ensure it's properly detected by search engines
  return <>{children}</>;
}

