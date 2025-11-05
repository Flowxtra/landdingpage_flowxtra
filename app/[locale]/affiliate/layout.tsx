import type { Metadata } from "next";

// Generate SEO metadata for Affiliate page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "Flowxtra Affiliate Program – Earn 50% Commission Promoting Recruitment Software",
      description: "Join Flowxtra's affiliate program and earn 50% recurring commissions for 12 months promoting AI-powered HR software in Europe.",
      keywords: ["affiliate program", "referral program", "earn commission", "partner program", "flowxtra affiliate", "hr software affiliate", "recruitment software affiliate", "ats affiliate program"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra Affiliate Program – Earn 50% Commission Promoting Recruitment Software",
        description: "Join Flowxtra's affiliate program and earn 50% recurring commissions for 12 months promoting AI-powered HR software in Europe.",
        url: `${baseUrl}/en/affiliate`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/affiliate`,
        languages: {
          'en': `${baseUrl}/en/affiliate`,
          'de': `${baseUrl}/de/affiliate`,
        },
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
        url: `${baseUrl}/de/affiliate`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/affiliate`,
        languages: {
          'en': `${baseUrl}/en/affiliate`,
          'de': `${baseUrl}/de/affiliate`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
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
      "logo": `${baseUrl}/wp-content/uploads/2025/02/Signature@2x.png`,
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

