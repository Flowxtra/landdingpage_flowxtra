import type { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "Imprint – Flowxtra",
      description: "Flowxtra GmbH company information, contact details, and legal information.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Imprint – Flowxtra",
        description: "Flowxtra GmbH company information, contact details, and legal information.",
        url: `${baseUrl}/en/imprint`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/imprint`,
        languages: {
          'en': `${baseUrl}/en/imprint`,
          'de': `${baseUrl}/de/impressum`,
        },
      },
    },
    de: {
      title: "Impressum – Flowxtra",
      description: "Firmeninformationen, Kontaktdaten und rechtliche Informationen der Flowxtra GmbH.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Impressum – Flowxtra",
        description: "Firmeninformationen, Kontaktdaten und rechtliche Informationen der Flowxtra GmbH.",
        url: `${baseUrl}/de/impressum`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/impressum`,
        languages: {
          'en': `${baseUrl}/en/imprint`,
          'de': `${baseUrl}/de/impressum`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function ImprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

