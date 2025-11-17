import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const canonicalUrl = `${baseUrl}/${locale}/gdpr`;
  
  const metadata = {
    en: {
      title: "GDPR (General Data Protection Regulation) – Flowxtra",
      description: "Read Flowxtra's GDPR compliance information and data protection regulations.",
    },
    de: {
      title: "DSGVO (Datenschutz-Grundverordnung) – Flowxtra",
      description: "Lesen Sie Flowxtras DSGVO-Konformitätsinformationen und Datenschutzbestimmungen.",
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

export default function GDPRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

