import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const canonicalUrl = `${baseUrl}/${locale}/ad-quality-guidelines`;
  
  const metadata = {
    en: {
      title: "Ad Quality Guidelines – Flowxtra",
      description: "Ad Quality Guidelines for job postings and social media content published through Flowxtra.",
    },
    de: {
      title: "Richtlinien für Anzeigenqualität – Flowxtra",
      description: "Richtlinien für Anzeigenqualität für Stellenausschreibungen und Social-Media-Inhalte, die über Flowxtra veröffentlicht werden.",
    },
  };

  const baseMetadata = metadata[locale as keyof typeof metadata] || metadata.en;

  return {
    ...baseMetadata,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function AdQualityGuidelinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

