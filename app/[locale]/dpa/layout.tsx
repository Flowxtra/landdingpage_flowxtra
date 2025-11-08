import type { Metadata } from "next";

// Generate SEO metadata for DPA page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "Data Processing Agreement (DPA) – Flowxtra",
      description: "Read Flowxtra's Data Processing Agreement (DPA) to understand how we process personal data in compliance with GDPR and data protection laws.",
      keywords: ["DPA", "data processing agreement", "GDPR", "data protection", "Flowxtra"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Data Processing Agreement (DPA) – Flowxtra",
        description: "Read Flowxtra's Data Processing Agreement (DPA) to understand how we process personal data in compliance with GDPR and data protection laws.",
        url: `${baseUrl}/en/dpa`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/dpa`,
        languages: {
          'en': `${baseUrl}/en/dpa`,
          'de': `${baseUrl}/de/dpa`,
        },
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
        url: `${baseUrl}/de/dpa`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/dpa`,
        languages: {
          'en': `${baseUrl}/en/dpa`,
          'de': `${baseUrl}/de/dpa`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function DPALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

