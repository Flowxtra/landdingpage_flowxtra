import type { Metadata } from "next";

// Generate SEO metadata for About Us page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "About Us – Flowxtra | Our Mission to Transform Recruitment",
      description: "Learn about Flowxtra's mission to revolutionize recruitment with AI-powered hiring tools. Discover our team, values, and commitment to helping businesses hire smarter and faster.",
      keywords: ["about flowxtra", "recruiting software company", "ATS company", "hiring platform", "recruitment solutions"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "About Us – Flowxtra | Our Mission to Transform Recruitment",
        description: "Learn about Flowxtra's mission to revolutionize recruitment with AI-powered hiring tools. Discover our team, values, and commitment to helping businesses hire smarter and faster.",
        url: `${baseUrl}/en/about`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/about`,
        languages: {
          'en': `${baseUrl}/en/about`,
          'de': `${baseUrl}/de/ueber-uns`,
        },
      },
    },
    de: {
      title: "Über uns – Flowxtra | Unsere Mission zur Transformation der Rekrutierung",
      description: "Erfahren Sie mehr über Flowxtras Mission, die Rekrutierung mit KI-gestützten Einstellungstools zu revolutionieren. Entdecken Sie unser Team, unsere Werte und unser Engagement, Unternehmen dabei zu helfen, intelligenter und schneller einzustellen.",
      keywords: ["über flowxtra", "recruiting-software unternehmen", "ats unternehmen", "einstellungsplattform", "rekrutierungslösungen"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Über uns – Flowxtra | Unsere Mission zur Transformation der Rekrutierung",
        description: "Erfahren Sie mehr über Flowxtras Mission, die Rekrutierung mit KI-gestützten Einstellungstools zu revolutionieren. Entdecken Sie unser Team, unsere Werte und unser Engagement, Unternehmen dabei zu helfen, intelligenter und schneller einzustellen.",
        url: `${baseUrl}/de/ueber-uns`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/ueber-uns`,
        languages: {
          'en': `${baseUrl}/en/about`,
          'de': `${baseUrl}/de/ueber-uns`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

