import type { Metadata } from "next";

// Generate SEO metadata for Pricing page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const metadata = {
    en: {
      title: "Pricing Plans – Flowxtra | Free ATS & Recruiting Software",
      description: "Choose the perfect plan for your business. Start with 10 free job postings per month. Transparent pricing, no hidden fees.",
      keywords: ["pricing", "plans", "free job posting", "ATS pricing", "recruiting software cost", "affordable hiring platform"],
      openGraph: {
        title: "Pricing Plans – Flowxtra | Free ATS & Recruiting Software",
        description: "Choose the perfect plan for your business. Start with 10 free job postings per month. Transparent pricing, no hidden fees.",
        url: "https://flowxtra.com/en/pricing",
        type: "website",
      },
      alternates: {
        canonical: "https://flowxtra.com/en/pricing",
        languages: {
          'en': 'https://flowxtra.com/en/pricing',
          'de': 'https://flowxtra.com/de/preise',
        },
      },
    },
    de: {
      title: "Preispläne – Flowxtra | Kostenlose ATS & Recruiting-Software",
      description: "Wählen Sie den perfekten Plan für Ihr Unternehmen. Beginnen Sie mit 10 kostenlosen Stellenanzeigen pro Monat. Transparente Preise, keine versteckten Gebühren.",
      keywords: ["preise", "pläne", "kostenlose stellenausschreibung", "ATS preise", "recruiting-software kosten", "erschwingliche einstellungsplattform"],
      openGraph: {
        title: "Preispläne – Flowxtra | Kostenlose ATS & Recruiting-Software",
        description: "Wählen Sie den perfekten Plan für Ihr Unternehmen. Beginnen Sie mit 10 kostenlosen Stellenanzeigen pro Monat. Transparente Preise, keine versteckten Gebühren.",
        url: "https://flowxtra.com/de/preise",
        type: "website",
      },
      alternates: {
        canonical: "https://flowxtra.com/de/preise",
        languages: {
          'en': 'https://flowxtra.com/en/pricing',
          'de': 'https://flowxtra.com/de/preise',
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

