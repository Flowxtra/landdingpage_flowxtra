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
      title: "Privacy Policy – Flowxtra",
      description: "Read Flowxtra's Privacy Policy to understand how we collect, use, and protect your personal information.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Privacy Policy – Flowxtra",
        description: "Read Flowxtra's Privacy Policy to understand how we collect, use, and protect your personal information.",
        url: `${baseUrl}/en/privacy-policy`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/privacy-policy`,
        languages: {
          'en': `${baseUrl}/en/privacy-policy`,
          'de': `${baseUrl}/de/datenschutz`,
        },
      },
    },
    de: {
      title: "Datenschutzerklärung – Flowxtra",
      description: "Lesen Sie Flowxtras Datenschutzerklärung, um zu verstehen, wie wir Ihre persönlichen Informationen sammeln, verwenden und schützen.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Datenschutzerklärung – Flowxtra",
        description: "Lesen Sie Flowxtras Datenschutzerklärung, um zu verstehen, wie wir Ihre persönlichen Informationen sammeln, verwenden und schützen.",
        url: `${baseUrl}/de/datenschutz`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/datenschutz`,
        languages: {
          'en': `${baseUrl}/en/privacy-policy`,
          'de': `${baseUrl}/de/datenschutz`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

