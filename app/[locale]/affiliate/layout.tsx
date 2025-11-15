import type { Metadata } from "next";
import { headers } from "next/headers";

// Generate SEO metadata for Affiliate page
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
    : `${currentBaseUrl}/${locale}/affiliate`;
  
  // Build hreflang URLs for all supported languages
  // Use the same base URL as canonical to ensure consistency
  const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'nl', 'ar'];
  const hreflangUrls: Record<string, string> = {};
  supportedLocales.forEach(lang => {
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/affiliate`;
  });
  
  const metadata = {
    en: {
      title: "Flowxtra Affiliate Program – Earn 50% Commission Promoting Recruitment Software",
      description: "Join Flowxtra's affiliate program and earn 50% recurring commissions for 12 months promoting AI-powered HR software in Europe.",
      keywords: ["affiliate program", "referral program", "earn commission", "partner program", "flowxtra affiliate", "hr software affiliate", "recruitment software affiliate", "ats affiliate program"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra Affiliate Program – Earn 50% Commission Promoting Recruitment Software",
        description: "Join Flowxtra's affiliate program and earn 50% recurring commissions for 12 months promoting AI-powered HR software in Europe.",
        url: canonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "Flowxtra Partnerprogramm – Verdienen Sie 50% Provision bei der Bewerbung von Recruiting-Software",
      description: "Treten Sie Flowxtras Partnerprogramm bei und verdienen Sie 50% wiederkehrende Provisionen für 12 Monate bei der Bewerbung von KI-gestützter HR-Software in Europa.",
      keywords: ["partnerprogramm", "empfehlungsprogramm", "provision verdienen", "partnerprogramm", "flowxtra partner", "hr-software partner", "recruiting-software partner", "ats partnerprogramm"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra Partnerprogramm – Verdienen Sie 50% Provision bei der Bewerbung von Recruiting-Software",
        description: "Treten Sie Flowxtras Partnerprogramm bei und verdienen Sie 50% wiederkehrende Provisionen für 12 Monate bei der Bewerbung von KI-gestützter HR-Software in Europa.",
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

export default async function AffiliateLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  // AffiliateProgram JSON-LD Structured Data (using Program type from Schema.org)
  const affiliateProgramSchema = {
    "@context": "https://schema.org",
    "@type": "Program",
    "name": locale === "de" ? "Flowxtra Partnerprogramm" : "Flowxtra Affiliate Program",
    "description": locale === "de" 
      ? "Verdienen Sie 50% wiederkehrende Provisionen für 12 Monate bei der Bewerbung von KI-gestützter HR-Software in Europa."
      : "Join Flowxtra's affiliate program and earn 50% recurring commissions for 12 months promoting AI-powered HR software in Europe.",
    "url": `${baseUrl}/${locale}/affiliate`,
    "programType": "Affiliate Program",
    "provider": {
      "@type": "Organization",
      "name": "Flowxtra GmbH",
      "url": baseUrl,
      "logo": `${baseUrl}/Main-flowxtra-Logo.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Wipplingerstraße 20/18",
        "addressLocality": "Wien",
        "postalCode": "1010",
        "addressCountry": "AT"
      }
    },
    "offers": {
      "@type": "Offer",
      "description": locale === "de"
        ? "50% Provision für bis zu 12 Monate"
        : "50% commission for up to 12 months",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "50%",
        "priceCurrency": "EUR",
        "valueAddedTaxIncluded": false,
        "description": locale === "de"
          ? "50% Provision auf monatliche Abonnements"
          : "50% commission on monthly subscriptions"
      }
    },
    "termsOfService": `${baseUrl}/${locale}/affiliate`,
    "areaServed": {
      "@type": "Place",
      "name": "Europe"
    },
    "about": {
      "@type": "SoftwareApplication",
      "name": "Flowxtra",
      "applicationCategory": "BusinessApplication",
      "description": locale === "de"
        ? "KI-gestützte Recruiting- und HR-Software mit kostenloser Stellenausschreibung"
        : "AI-powered recruitment and HR software with free job posting"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(affiliateProgramSchema) }}
      />
      {children}
    </>
  );
}

