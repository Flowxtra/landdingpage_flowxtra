import type { Metadata } from "next";
import { headers } from "next/headers";

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
    'en': 'imprint',
    'de': 'impressum',
    'fr': 'imprint',
    'es': 'imprint',
    'it': 'imprint',
    'nl': 'imprint',
    'ar': 'imprint',
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
      title: "Imprint – Flowxtra",
      description: "Flowxtra GmbH company information, contact details, and legal information.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Imprint – Flowxtra",
        description: "Flowxtra GmbH company information, contact details, and legal information.",
        url: canonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "Impressum – Flowxtra",
      description: "Firmeninformationen, Kontaktdaten und rechtliche Informationen der Flowxtra GmbH.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Impressum – Flowxtra",
        description: "Firmeninformationen, Kontaktdaten und rechtliche Informationen der Flowxtra GmbH.",
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

export default function ImprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

