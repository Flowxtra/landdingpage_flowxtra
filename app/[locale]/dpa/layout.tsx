import type { Metadata } from "next";
import { headers } from "next/headers";

// Generate SEO metadata for DPA page
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
  
  // Build canonical URL using actual pathname and current host to ensure it matches current page
  // Fallback to constructed URL if pathname is not available
  const canonicalUrl = pathname 
    ? `${currentBaseUrl}${pathname}`
    : `${currentBaseUrl}/${locale}/dpa`;
  
  // Build hreflang URLs for all supported languages
  // Use the same base URL as canonical to ensure consistency
  const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'nl', 'ar'];
  const hreflangUrls: Record<string, string> = {};
  supportedLocales.forEach(lang => {
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/dpa`;
  });
  
  const metadata = {
    en: {
      title: "Data Processing Agreement (DPA) – Flowxtra",
      description: "Read Flowxtra's Data Processing Agreement (DPA) to understand how we process personal data in compliance with GDPR and data protection laws.",
      keywords: ["DPA", "data processing agreement", "GDPR", "data protection", "Flowxtra"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Data Processing Agreement (DPA) – Flowxtra",
        description: "Read Flowxtra's Data Processing Agreement (DPA) to understand how we process personal data in compliance with GDPR and data protection laws.",
        url: canonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "Datenverarbeitungsvereinbarung (DPA) – Flowxtra",
      description: "Lesen Sie Flowxtras Datenverarbeitungsvereinbarung (DPA), um zu verstehen, wie wir personenbezogene Daten in Übereinstimmung mit der DSGVO und Datenschutzgesetzen verarbeiten.",
      keywords: ["DPA", "Datenverarbeitungsvereinbarung", "DSGVO", "Datenschutz", "Flowxtra"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Datenverarbeitungsvereinbarung (DPA) – Flowxtra",
        description: "Lesen Sie Flowxtras Datenverarbeitungsvereinbarung (DPA), um zu verstehen, wie wir personenbezogene Daten in Übereinstimmung mit der DSGVO und Datenschutzgesetzen verarbeiten.",
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

export default function DPALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

