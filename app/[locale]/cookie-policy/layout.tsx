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
      title: "Cookie Policy – Flowxtra",
      description: "Learn about how Flowxtra uses cookies and similar technologies to enhance your browsing experience.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Cookie Policy – Flowxtra",
        description: "Learn about how Flowxtra uses cookies and similar technologies to enhance your browsing experience.",
        url: `${baseUrl}/en/cookie-policy`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/cookie-policy`,
        languages: {
          'en': `${baseUrl}/en/cookie-policy`,
          'de': `${baseUrl}/de/cookie-richtlinie`,
        },
      },
    },
    de: {
      title: "Cookie-Richtlinie – Flowxtra",
      description: "Erfahren Sie, wie Flowxtra Cookies und ähnliche Technologien verwendet, um Ihr Browsing-Erlebnis zu verbessern.",
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Cookie-Richtlinie – Flowxtra",
        description: "Erfahren Sie, wie Flowxtra Cookies und ähnliche Technologien verwendet, um Ihr Browsing-Erlebnis zu verbessern.",
        url: `${baseUrl}/de/cookie-richtlinie`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/cookie-richtlinie`,
        languages: {
          'en': `${baseUrl}/en/cookie-policy`,
          'de': `${baseUrl}/de/cookie-richtlinie`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

