import type { Metadata } from "next";

// Generate SEO metadata for Blog page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const metadata = {
    en: {
      title: "Blog – Flowxtra | Smart Hiring Insights & Recruitment Trends",
      description: "Discover practical strategies, expert tips, and the latest updates shaping the future of recruitment and talent management.",
      keywords: ["recruitment blog", "hiring tips", "HR insights", "talent management", "recruiting trends", "ATS blog"],
      openGraph: {
        title: "Blog – Flowxtra | Smart Hiring Insights & Recruitment Trends",
        description: "Discover practical strategies, expert tips, and the latest updates shaping the future of recruitment and talent management.",
        url: "https://flowxtra.com/en/blog",
        type: "website",
      },
      alternates: {
        canonical: "https://flowxtra.com/en/blog",
        languages: {
          'en': 'https://flowxtra.com/en/blog',
          'de': 'https://flowxtra.com/de/blog',
        },
      },
    },
    de: {
      title: "Blog – Flowxtra | Intelligente Einstellungserkenntnisse & Rekrutierungstrends",
      description: "Entdecken Sie praktische Strategien, Experten-Tipps und die neuesten Updates, die die Zukunft der Rekrutierung und Talentmanagement prägen.",
      keywords: ["rekrutierungsblog", "einstellungstipps", "hr-erkenntnisse", "talentmanagement", "rekrutierungstrends", "ats-blog"],
      openGraph: {
        title: "Blog – Flowxtra | Intelligente Einstellungserkenntnisse & Rekrutierungstrends",
        description: "Entdecken Sie praktische Strategien, Experten-Tipps und die neuesten Updates, die die Zukunft der Rekrutierung und Talentmanagement prägen.",
        url: "https://flowxtra.com/de/blog",
        type: "website",
      },
      alternates: {
        canonical: "https://flowxtra.com/de/blog",
        languages: {
          'en': 'https://flowxtra.com/en/blog',
          'de': 'https://flowxtra.com/de/blog',
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

