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
      title: "Terms of Use – Flowxtra",
      description: "Read Flowxtra's Terms of Use for companies to understand the terms and conditions for using our services.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Terms of Use – Flowxtra",
        description: "Read Flowxtra's Terms of Use for companies to understand the terms and conditions for using our services.",
        url: `${baseUrl}/en/terms-of-use`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/terms-of-use`,
        languages: {
          'en': `${baseUrl}/en/terms-of-use`,
          'de': `${baseUrl}/de/nutzungsbedingungen`,
        },
      },
    },
    de: {
      title: "Nutzungsbedingungen – Flowxtra",
      description: "Lesen Sie Flowxtras Nutzungsbedingungen für Unternehmen, um die Bedingungen für die Nutzung unserer Dienste zu verstehen.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Nutzungsbedingungen – Flowxtra",
        description: "Lesen Sie Flowxtras Nutzungsbedingungen für Unternehmen, um die Bedingungen für die Nutzung unserer Dienste zu verstehen.",
        url: `${baseUrl}/de/nutzungsbedingungen`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/nutzungsbedingungen`,
        languages: {
          'en': `${baseUrl}/en/terms-of-use`,
          'de': `${baseUrl}/de/nutzungsbedingungen`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function TermsOfUseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

