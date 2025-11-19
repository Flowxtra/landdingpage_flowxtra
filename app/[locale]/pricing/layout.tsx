import type { Metadata } from "next";
import { headers } from "next/headers";
import { getPricingSchema } from "@/lib/schemaLoader";

const pricingPagePaths: Record<string, string> = {
  en: "pricing",
  "en-us": "pricing",
  "en-gb": "pricing",
  "en-au": "pricing",
  "en-ca": "pricing",
  de: "preise",
  "de-at": "preise",
  "de-ch": "preise",
  fr: "pricing",
  es: "pricing",
  it: "pricing",
  nl: "pricing",
  ar: "pricing",
};

const pricingBreadcrumbNames: Record<string, string> = {
  en: "Pricing Plans",
  "en-us": "Pricing Plans",
  "en-gb": "Pricing Plans",
  "en-au": "Pricing Plans",
  "en-ca": "Pricing Plans",
  de: "Preispläne",
  "de-at": "Preispläne",
  "de-ch": "Preispläne",
  fr: "Plans tarifaires",
  es: "Planes de precios",
  it: "Piani tariffari",
  nl: "Prijzen",
  ar: "الباقات والأسعار",
};

const pricingSupportedLocales = Object.keys(pricingPagePaths);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const host = headersList.get("host") || "";

  const protocol =
    host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
  const currentBaseUrl =
    host && (host.includes("localhost") || host.includes("127.0.0.1"))
      ? `${protocol}://${host}`
      : baseUrl;

  const pagePath = pricingPagePaths[locale] || pricingPagePaths.en;
  const canonicalUrl = pathname
    ? `${currentBaseUrl}${pathname}`
    : `${currentBaseUrl}/${locale}/${pagePath}`;

  const hreflangUrls: Record<string, string> = {};
  pricingSupportedLocales.forEach((lang) => {
    const langPath = pricingPagePaths[lang] || pricingPagePaths.en;
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/${langPath}`;
  });

  const metadata = {
    en: {
      title: "Pricing Plans – Flowxtra | Free ATS & Recruiting Software",
      description:
        "Choose the perfect plan for your business. Start with Unlimited Job postings per month. Transparent pricing, no hidden fees.",
      keywords: [
        "pricing",
        "plans",
        "free job posting",
        "ATS pricing",
        "recruiting software cost",
        "affordable hiring platform",
      ],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Pricing Plans – Flowxtra | Free ATS & Recruiting Software",
        description:
          "Choose the perfect plan for your business. Start with Unlimited Job postings per month. Transparent pricing, no hidden fees.",
        url: canonicalUrl,
        type: "website",
      },
    },
    de: {
      title: "Preispläne – Flowxtra | Kostenlose ATS & Recruiting-Software",
      description:
        "Wählen Sie den perfekten Plan für Ihr Unternehmen. Beginnen Sie mit 10 kostenlosen Stellenanzeigen pro Monat. Transparente Preise, keine versteckten Gebühren.",
      keywords: [
        "preise",
        "pläne",
        "kostenlose stellenausschreibung",
        "ATS preise",
        "recruiting-software kosten",
        "erschwingliche einstellungsplattform",
      ],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Preispläne – Flowxtra | Kostenlose ATS & Recruiting-Software",
        description:
          "Wählen Sie den perfekten Plan für Ihr Unternehmen. Beginnen Sie mit 10 kostenlosen Stellenanzeigen pro Monat. Transparente Preise, keine versteckten Gebühren.",
        url: canonicalUrl,
        type: "website",
      },
    },
  };

  const baseMetadata =
    metadata[locale as keyof typeof metadata] || metadata.en;

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

export default async function PricingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const pagePath = pricingPagePaths[locale] || pricingPagePaths.en;
  const breadcrumbName =
    pricingBreadcrumbNames[locale] || pricingBreadcrumbNames.en;
  const pricingUrl = `${baseUrl}/${locale}/${pagePath}`;

  const pricingSchema = getPricingSchema(locale, {
    BASE_URL: baseUrl,
    PRICING_URL: pricingUrl,
    PRICING_BREADCRUMB_NAME: breadcrumbName,
  });

  const schemaEntries: Record<string, unknown>[] = [];

  if (pricingSchema.organization) {
    schemaEntries.push(pricingSchema.organization);
  }
  if (pricingSchema.breadcrumb) {
    schemaEntries.push(pricingSchema.breadcrumb);
  }
  if (pricingSchema.products?.length) {
    schemaEntries.push(...pricingSchema.products);
  }
  if (pricingSchema.faq) {
    schemaEntries.push(pricingSchema.faq);
  }

  return (
    <>
      {schemaEntries.map((schemaObject, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaObject),
          }}
        />
      ))}
      {children}
    </>
  );
}
