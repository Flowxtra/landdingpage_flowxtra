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
      title: "Disclaimer – Flowxtra",
      description: "Read Flowxtra's disclaimer regarding website information, external links, and testimonials.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Disclaimer – Flowxtra",
        description: "Read Flowxtra's disclaimer regarding website information, external links, and testimonials.",
        url: `${baseUrl}/en/disclaimer`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/disclaimer`,
        languages: {
          'en': `${baseUrl}/en/disclaimer`,
          'de': `${baseUrl}/de/disclaimer`,
        },
      },
    },
    de: {
      title: "Haftungsausschluss – Flowxtra",
      description: "Lesen Sie Flowxtras Haftungsausschluss bezüglich Website-Informationen, externer Links und Testimonials.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Haftungsausschluss – Flowxtra",
        description: "Lesen Sie Flowxtras Haftungsausschluss bezüglich Website-Informationen, externer Links und Testimonials.",
        url: `${baseUrl}/de/disclaimer`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/disclaimer`,
        languages: {
          'en': `${baseUrl}/en/disclaimer`,
          'de': `${baseUrl}/de/disclaimer`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

