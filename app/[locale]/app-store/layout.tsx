import type { Metadata } from "next";
import { headers } from "next/headers";

// Generate SEO metadata for App Store page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  // Get current host from headers to build canonical URL
  // This ensures the canonical URL matches the actual current page URL (including localhost in dev)
  const headersList = await headers();
  const host = headersList.get('host') || '';
  
  // Determine the base URL to use: prefer current request host in dev, otherwise use configured baseUrl
  // This ensures canonical works correctly in both development and production
  const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
  const currentBaseUrl = host && (host.includes('localhost') || host.includes('127.0.0.1'))
    ? `${protocol}://${host}`
    : baseUrl;
  
  // Normalize locale for canonical URL (variants redirect to base locales)
  const normalizeLocale = (loc: string): string => {
    if (loc.startsWith("en-")) return "en";
    if (loc.startsWith("de-")) return "de";
    return loc;
  };

  // Base locale for canonical URL (variants redirect to base)
  const baseLocale = normalizeLocale(locale);
  const baseCanonicalUrl = `${currentBaseUrl}/${baseLocale}/app-store`;

  // Build hreflang URLs for all supported languages (only base locales)
  // Use the same base URL as canonical to ensure consistency
  const baseLocales = ['en', 'de', 'fr', 'es', 'it', 'nl', 'ar'];
  const hreflangUrls: Record<string, string> = {};
  baseLocales.forEach(lang => {
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/app-store`;
  });
  
  const metadata = {
    en: {
      title: "App Store – Flowxtra | Integrations & Applications",
      description: "Discover powerful integrations and applications to extend your Flowxtra ATS. Connect with HR tools, communication platforms, and analytics services.",
      keywords: ["app store", "integrations", "ATS integrations", "HR tools", "recruitment apps", "workflow automation"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "App Store – Flowxtra | Integrations & Applications",
        description: "Discover powerful integrations and applications to extend your Flowxtra ATS. Connect with HR tools, communication platforms, and analytics services.",
        url: baseCanonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: baseCanonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "App Store – Flowxtra | Integrationen & Anwendungen",
      description: "Entdecken Sie leistungsstarke Integrationen und Anwendungen, um Ihr Flowxtra ATS zu erweitern. Verbinden Sie sich mit HR-Tools, Kommunikationsplattformen und Analysediensten.",
      keywords: ["app store", "integrationen", "ats-integrationen", "hr-tools", "rekrutierungs-apps", "workflow-automatisierung"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "App Store – Flowxtra | Integrationen & Anwendungen",
        description: "Entdecken Sie leistungsstarke Integrationen und Anwendungen, um Ihr Flowxtra ATS zu erweitern. Verbinden Sie sich mit HR-Tools, Kommunikationsplattformen und Analysediensten.",
        url: baseCanonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: baseCanonicalUrl,
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
      canonical: baseCanonicalUrl,
      languages: hreflangUrls,
    },
    // Explicitly exclude any alternates from parent layout
    ...(baseMetadata.openGraph && {
      openGraph: {
        ...baseMetadata.openGraph,
        url: baseCanonicalUrl, // Update OpenGraph URL to match canonical
      },
    }),
  };
}

export default function AppStoreLayout({
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

