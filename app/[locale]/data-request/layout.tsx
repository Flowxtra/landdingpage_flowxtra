import type { Metadata } from "next";
import { headers } from "next/headers";

// Generate SEO metadata for Data Request page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  // Get current pathname and host from headers to build canonical URL
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const host = headersList.get('host') || '';
  
  // Determine the base URL to use
  const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
  const currentBaseUrl = host && (host.includes('localhost') || host.includes('127.0.0.1'))
    ? `${protocol}://${host}`
    : baseUrl;
  
  // Map locale to page path
  const pagePaths: Record<string, string> = {
    'en': 'data-request',
    'de': 'data-request',
    'fr': 'data-request',
    'es': 'data-request',
    'it': 'data-request',
    'nl': 'data-request',
    'ar': 'data-request',
  };
  
  // Build canonical URL
  const pagePath = pagePaths[locale] || pagePaths['en'];
  const canonicalUrl = pathname 
    ? `${currentBaseUrl}${pathname}`
    : `${currentBaseUrl}/${locale}/${pagePath}`;
  
  // Build hreflang URLs for all supported languages
  const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'nl', 'ar'];
  const hreflangUrls: Record<string, string> = {};
  supportedLocales.forEach(lang => {
    const langPath = pagePaths[lang] || pagePaths['en'];
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/${langPath}`;
  });
  
  const metadata = {
    en: {
      title: "Data Request – Request Your Personal Data | Flowxtra",
      description: "Request access to your personal data stored by Flowxtra. Submit a data request to download, update, or delete your information in compliance with GDPR and privacy regulations.",
      keywords: ["data request", "GDPR", "privacy request", "personal data", "data access", "data deletion", "privacy rights"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Data Request – Request Your Personal Data | Flowxtra",
        description: "Request access to your personal data stored by Flowxtra. Submit a data request to download, update, or delete your information in compliance with GDPR and privacy regulations.",
        url: canonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "Datenanfrage – Ihre persönlichen Daten anfordern | Flowxtra",
      description: "Fordern Sie Zugang zu Ihren bei Flowxtra gespeicherten persönlichen Daten an. Stellen Sie eine Datenanfrage, um Ihre Informationen herunterzuladen, zu aktualisieren oder zu löschen, in Übereinstimmung mit DSGVO und Datenschutzbestimmungen.",
      keywords: ["datenanfrage", "DSGVO", "datenschutz anfrage", "persönliche daten", "datenzugriff", "datenlöschung", "datenschutzrechte"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Datenanfrage – Ihre persönlichen Daten anfordern | Flowxtra",
        description: "Fordern Sie Zugang zu Ihren bei Flowxtra gespeicherten persönlichen Daten an. Stellen Sie eine Datenanfrage, um Ihre Informationen herunterzuladen, zu aktualisieren oder zu löschen, in Übereinstimmung mit DSGVO und Datenschutzbestimmungen.",
        url: canonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    ar: {
      title: "طلب البيانات – طلب بياناتك الشخصية | Flowxtra",
      description: "اطلب الوصول إلى بياناتك الشخصية المخزنة في Flowxtra. قدم طلب بيانات لتنزيل أو تحديث أو حذف معلوماتك وفقًا لقوانين GDPR ولوائح الخصوصية.",
      keywords: ["طلب البيانات", "GDPR", "طلب الخصوصية", "البيانات الشخصية", "الوصول إلى البيانات", "حذف البيانات", "حقوق الخصوصية"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "طلب البيانات – طلب بياناتك الشخصية | Flowxtra",
        description: "اطلب الوصول إلى بياناتك الشخصية المخزنة في Flowxtra. قدم طلب بيانات لتنزيل أو تحديث أو حذف معلوماتك وفقًا لقوانين GDPR ولوائح الخصوصية.",
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
  
  return {
    ...baseMetadata,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangUrls,
    },
    ...(baseMetadata.openGraph && {
      openGraph: {
        ...baseMetadata.openGraph,
        url: canonicalUrl,
      },
    }),
  };
}

export default function DataRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

