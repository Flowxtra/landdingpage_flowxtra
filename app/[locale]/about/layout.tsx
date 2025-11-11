import type { Metadata } from "next";
import { headers } from "next/headers";

// Generate SEO metadata for About Us page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  // Get current pathname and host from headers to build canonical URL
  // This ensures the canonical URL matches the actual current page URL (including localhost in dev)
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const host = headersList.get('host') || '';
  
  // Determine the base URL to use: prefer current request host in dev, otherwise use configured baseUrl
  // This ensures canonical works correctly in both development and production
  const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
  const currentBaseUrl = host && (host.includes('localhost') || host.includes('127.0.0.1'))
    ? `${protocol}://${host}`
    : baseUrl;
  
  // Map locale to page path (some locales have translated URLs)
  const pagePaths: Record<string, string> = {
    'en': 'about',
    'de': 'ueber-uns',
    'fr': 'about',
    'es': 'about',
    'it': 'about',
    'nl': 'about',
    'ar': 'about',
  };
  
  // Build canonical URL using actual pathname and current host to ensure it matches current page
  // Fallback to constructed URL if pathname is not available
  const pagePath = pagePaths[locale] || pagePaths['en'];
  const canonicalUrl = pathname 
    ? `${currentBaseUrl}${pathname}`
    : `${currentBaseUrl}/${locale}/${pagePath}`;
  
  // Build hreflang URLs for all supported languages
  // Use the same base URL as canonical to ensure consistency
  const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'nl', 'ar'];
  const hreflangUrls: Record<string, string> = {};
  supportedLocales.forEach(lang => {
    const langPath = pagePaths[lang] || pagePaths['en'];
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/${langPath}`;
  });
  
  const metadata = {
    en: {
      title: "About Us – Flowxtra | Our Mission to Transform Recruitment",
      description: "Learn about Flowxtra's mission to revolutionize recruitment with AI-powered hiring tools. Discover our team, values, and commitment to helping businesses hire smarter and faster.",
      keywords: ["about flowxtra", "recruiting software company", "ATS company", "hiring platform", "recruitment solutions"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "About Us – Flowxtra | Our Mission to Transform Recruitment",
        description: "Learn about Flowxtra's mission to revolutionize recruitment with AI-powered hiring tools. Discover our team, values, and commitment to helping businesses hire smarter and faster.",
        url: canonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
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
        url: canonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
  };

  // Get base metadata for current locale, or fallback to English
  const baseMetadata = metadata[locale as keyof typeof metadata] || metadata.en;
  
  // Return metadata with canonical and languages explicitly set (not merged)
  // This ensures nested layout's alternates take precedence over root layout
  return {
    ...baseMetadata,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangUrls,
    },
    // Explicitly exclude any alternates from parent layout
    ...(baseMetadata.openGraph && {
      openGraph: {
        ...baseMetadata.openGraph,
        url: canonicalUrl, // Update OpenGraph URL to match canonical
      },
    }),
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

