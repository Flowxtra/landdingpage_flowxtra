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
  
  // Mock data for metadata
  const postTitle = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Blog Post';
  
  const metadata = {
    en: {
      title: `${postTitle} – Flowxtra Blog`,
      description: "Discover insights, tips, and trends in recruitment and talent management.",
      keywords: ["recruitment", "hiring", "HR", "talent management", "ATS"],
      openGraph: {
        title: `${postTitle} – Flowxtra Blog`,
        description: "Discover insights, tips, and trends in recruitment and talent management.",
        url: `https://flowxtra.com/en/blog/${slug}`,
        type: "article",
      },
      alternates: {
        canonical: `https://flowxtra.com/en/blog/${slug}`,
        languages: {
          'en': `https://flowxtra.com/en/blog/${slug}`,
          'de': `https://flowxtra.com/de/blog/${slug}`,
        },
      },
    },
    de: {
      title: `${postTitle} – Flowxtra Blog`,
      description: "Entdecken Sie Erkenntnisse, Tipps und Trends in der Rekrutierung und Talentmanagement.",
      keywords: ["rekrutierung", "einstellung", "hr", "talentmanagement", "ats"],
      openGraph: {
        title: `${postTitle} – Flowxtra Blog`,
        description: "Entdecken Sie Erkenntnisse, Tipps und Trends in der Rekrutierung und Talentmanagement.",
        url: `https://flowxtra.com/de/blog/${slug}`,
        type: "article",
      },
      alternates: {
        canonical: `https://flowxtra.com/de/blog/${slug}`,
        languages: {
          'en': `https://flowxtra.com/en/blog/${slug}`,
          'de': `https://flowxtra.com/de/blog/${slug}`,
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

