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
      title: "Affiliate Program – Earn 50% Commission | Flowxtra",
      description: "Join Flowxtra's affiliate program and earn 50% commission on first-year subscriptions. Share your unique referral link and start earning today.",
      keywords: ["affiliate program", "referral program", "earn commission", "partner program", "flowxtra affiliate"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Affiliate Program – Earn 50% Commission | Flowxtra",
        description: "Join Flowxtra's affiliate program and earn 50% commission on first-year subscriptions. Share your unique referral link and start earning today.",
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
      title: "Partnerprogramm – Verdienen Sie 50% Provision | Flowxtra",
      description: "Treten Sie Flowxtras Partnerprogramm bei und verdienen Sie 50% Provision auf Abonnements im ersten Jahr. Teilen Sie Ihren eindeutigen Empfehlungslink und fangen Sie noch heute an zu verdienen.",
      keywords: ["partnerprogramm", "empfehlungsprogramm", "provision verdienen", "partnerprogramm", "flowxtra partner"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Partnerprogramm – Verdienen Sie 50% Provision | Flowxtra",
        description: "Treten Sie Flowxtras Partnerprogramm bei und verdienen Sie 50% Provision auf Abonnements im ersten Jahr. Teilen Sie Ihren eindeutigen Empfehlungslink und fangen Sie noch heute an zu verdienen.",
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

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

