import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const canonicalUrl = `${baseUrl}/${locale}/subprocessors`;
  
  const metadata = {
    en: {
      title: "Sub-processors – Flowxtra",
      description: "List of Flowxtra's authorized sub-processors and data processing partners.",
    },
    de: {
      title: "Unterauftragsverarbeiter – Flowxtra",
      description: "Liste der autorisierten Unterauftragsverarbeiter und Datenverarbeitungspartner von Flowxtra.",
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

export default function SubprocessorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

