import type { Metadata } from "next";

// Generate SEO metadata for Blog Post page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string, slug: string}> 
}): Promise<Metadata> {
  const {locale, slug} = await params;
  
  // TODO: Fetch post data from API
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`);
  // const post = await response.json();
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  // Mock data for metadata
  const postTitle = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Blog Post';
  
  const metadata = {
    en: {
      title: `${postTitle} – Flowxtra Blog`,
      description: "Discover insights, tips, and trends in recruitment and talent management.",
      keywords: ["recruitment", "hiring", "HR", "talent management", "ATS"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: `${postTitle} – Flowxtra Blog`,
        description: "Discover insights, tips, and trends in recruitment and talent management.",
        url: `${baseUrl}/en/blog/${slug}`,
        type: "article",
      },
      alternates: {
        canonical: `${baseUrl}/en/blog/${slug}`,
        languages: {
          'en': `${baseUrl}/en/blog/${slug}`,
          'de': `${baseUrl}/de/blog/${slug}`,
        },
      },
    },
    de: {
      title: `${postTitle} – Flowxtra Blog`,
      description: "Entdecken Sie Erkenntnisse, Tipps und Trends in der Rekrutierung und Talentmanagement.",
      keywords: ["rekrutierung", "einstellung", "hr", "talentmanagement", "ats"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: `${postTitle} – Flowxtra Blog`,
        description: "Entdecken Sie Erkenntnisse, Tipps und Trends in der Rekrutierung und Talentmanagement.",
        url: `${baseUrl}/de/blog/${slug}`,
        type: "article",
      },
      alternates: {
        canonical: `${baseUrl}/de/blog/${slug}`,
        languages: {
          'en': `${baseUrl}/en/blog/${slug}`,
          'de': `${baseUrl}/de/blog/${slug}`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

