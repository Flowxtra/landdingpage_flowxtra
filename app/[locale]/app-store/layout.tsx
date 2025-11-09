import type { Metadata } from "next";

// Generate SEO metadata for App Store page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "App Store – Flowxtra | Integrations & Applications",
      description: "Discover powerful integrations and applications to extend your Flowxtra ATS. Connect with HR tools, communication platforms, and analytics services.",
      keywords: ["app store", "integrations", "ATS integrations", "HR tools", "recruitment apps", "workflow automation"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "App Store – Flowxtra | Integrations & Applications",
        description: "Discover powerful integrations and applications to extend your Flowxtra ATS. Connect with HR tools, communication platforms, and analytics services.",
        url: `${baseUrl}/en/app-store`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/app-store`,
        languages: {
          'en': `${baseUrl}/en/app-store`,
          'de': `${baseUrl}/de/app-store`,
        },
      },
    },
    de: {
      title: "App Store – Flowxtra | Integrationen & Anwendungen",
      description: "Entdecken Sie leistungsstarke Integrationen und Anwendungen, um Ihr Flowxtra ATS zu erweitern. Verbinden Sie sich mit HR-Tools, Kommunikationsplattformen und Analysediensten.",
      keywords: ["app store", "integrationen", "ats-integrationen", "hr-tools", "rekrutierungs-apps", "workflow-automatisierung"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "App Store – Flowxtra | Integrationen & Anwendungen",
        description: "Entdecken Sie leistungsstarke Integrationen und Anwendungen, um Ihr Flowxtra ATS zu erweitern. Verbinden Sie sich mit HR-Tools, Kommunikationsplattformen und Analysediensten.",
        url: `${baseUrl}/de/app-store`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/app-store`,
        languages: {
          'en': `${baseUrl}/en/app-store`,
          'de': `${baseUrl}/de/app-store`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function AppStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

