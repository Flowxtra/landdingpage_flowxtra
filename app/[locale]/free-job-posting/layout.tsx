import type { Metadata } from "next";
import { headers } from "next/headers";

// Generate SEO metadata for Free Job Posting page
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
    'en': 'free-job-posting',
    'de': 'kostenlose-stellenausschreibung',
    'fr': 'free-job-posting',
    'es': 'free-job-posting',
    'it': 'free-job-posting',
    'nl': 'free-job-posting',
    'ar': 'free-job-posting',
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
  // Add x-default to indicate the default language version
  hreflangUrls['x-default'] = `${currentBaseUrl}/en/free-job-posting`;
  
  const metadata = {
    en: {
      title: "Free Job Posting – Post Jobs for Free | Flowxtra",
      description: "Post unlimited job openings for free with Flowxtra. Reach top talent across multiple job boards with our free job posting platform. No credit card required.",
      keywords: ["free job posting", "post jobs for free", "free job board", "free job posting sites", "free recruitment platform", "post jobs online free"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Free Job Posting – Post Jobs for Free | Flowxtra",
        description: "Post unlimited job openings for free with Flowxtra. Reach top talent across multiple job boards with our free job posting platform. No credit card required.",
        url: `${baseUrl}/en/free-job-posting`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "Kostenlose Stellenausschreibung – Jobs kostenlos veröffentlichen | Flowxtra",
      description: "Veröffentlichen Sie unbegrenzt kostenlose Stellenanzeigen mit Flowxtra. Erreichen Sie Top-Talente auf mehreren Jobbörsen mit unserer kostenlosen Stellenausschreibungsplattform. Keine Kreditkarte erforderlich.",
      keywords: ["kostenlose stellenausschreibung", "jobs kostenlos veröffentlichen", "kostenlose jobbörse", "kostenlose stellenausschreibungsseiten", "kostenlose rekrutierungsplattform", "jobs online kostenlos veröffentlichen"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Kostenlose Stellenausschreibung – Jobs kostenlos veröffentlichen | Flowxtra",
        description: "Veröffentlichen Sie unbegrenzt kostenlose Stellenanzeigen mit Flowxtra. Erreichen Sie Top-Talente auf mehreren Jobbörsen mit unserer kostenlosen Stellenausschreibungsplattform. Keine Kreditkarte erforderlich.",
        url: `${baseUrl}/de/kostenlose-stellenausschreibung`,
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

export default function FreeJobPostingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

