import type { Metadata } from "next";

// Generate SEO metadata for Accessibility page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "Accessibility Statement - Flowxtra | WCAG 2.1 AA Compliance",
      description: "Our commitment to web accessibility and WCAG compliance. Learn how Flowxtra ensures an inclusive experience for all users.",
      keywords: ["accessibility", "WCAG 2.1", "AA compliance", "screen reader", "keyboard navigation", "inclusive design"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Accessibility Statement - Flowxtra | WCAG 2.1 AA Compliance",
        description: "Our commitment to web accessibility and WCAG compliance. Learn how Flowxtra ensures an inclusive experience for all users.",
        url: `${baseUrl}/en/accessibility`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/accessibility`,
        languages: {
          'en': `${baseUrl}/en/accessibility`,
          'de': `${baseUrl}/de/barrierefreiheit`,
        },
      },
    },
    de: {
      title: "Barrierefreiheitserklärung - Flowxtra | WCAG 2.1 AA-Konformität",
      description: "Unser Engagement für Web-Barrierefreiheit und WCAG-Konformität. Erfahren Sie, wie Flowxtra ein inklusives Erlebnis für alle Benutzer gewährleistet.",
      keywords: ["barrierefreiheit", "WCAG 2.1", "AA-Konformität", "screenreader", "tastaturnavigation", "inklusives design"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Barrierefreiheitserklärung - Flowxtra | WCAG 2.1 AA-Konformität",
        description: "Unser Engagement für Web-Barrierefreiheit und WCAG-Konformität. Erfahren Sie, wie Flowxtra ein inklusives Erlebnis für alle Benutzer gewährleistet.",
        url: `${baseUrl}/de/barrierefreiheit`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/barrierefreiheit`,
        languages: {
          'en': `${baseUrl}/en/accessibility`,
          'de': `${baseUrl}/de/barrierefreiheit`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

