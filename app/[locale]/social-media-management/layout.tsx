import type { Metadata } from "next";
import { headers } from "next/headers";
import { getSocialMediaSchema } from "@/lib/schemaLoader";

// Generate SEO metadata for Social Media Management page
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
    : `${currentBaseUrl}/${locale}/social-media-management`;
  
  // Build hreflang URLs for all supported languages
  // Use the same base URL as canonical to ensure consistency
  const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'nl', 'ar'];
  const hreflangUrls: Record<string, string> = {};
  supportedLocales.forEach(lang => {
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/social-media-management`;
  });
  // Add x-default to indicate the default language version
  hreflangUrls['x-default'] = `${currentBaseUrl}/en/social-media-management`;
  
  const metadata = {
    en: {
      title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
      description: "Manage and analyze your social channels from one platform. Our Social Media Manager saves time, keeps you organized, and helps grow your online presence.",
      keywords: ["social media management", "social media manager", "social media platform", "social media analytics", "manage social media"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
        description: "Manage and analyze your social channels from one platform. Our Social Media Manager saves time, keeps you organized, and helps grow your online presence.",
        url: `${baseUrl}/en/social-media-management`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
      description: "Verwalten und analysieren Sie Ihre Social-Media-Kanäle von einer Plattform aus. Unser Social Media Manager spart Zeit, hält Sie organisiert und hilft Ihnen, Ihre Online-Präsenz zu vergrößern.",
      keywords: ["social media management", "social media manager", "social media plattform", "social media analytics", "social media verwalten"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
        description: "Verwalten und analysieren Sie Ihre Social-Media-Kanäle von einer Plattform aus. Unser Social Media Manager spart Zeit, hält Sie organisiert und hilft Ihnen, Ihre Online-Präsenz zu vergrößern.",
        url: `${baseUrl}/de/social-media-management`,
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

export default async function SocialMediaManagementLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const pageUrl = `${baseUrl}/${locale}/social-media-management`;

  const schema = getSocialMediaSchema(locale, {
    BASE_URL: baseUrl,
    PAGE_URL: pageUrl,
    LOCALE_CODE: locale,
  });

  return (
    <>
      {Object.entries(schema).map(([key, schemaObject]) => (
        <script
          key={key}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
        />
      ))}
      {children}
    </>
  );
}

