import type { Metadata } from "next";

// Generate SEO metadata for Accessibility page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const metadata = {
    en: {
      title: "Accessibility Statement - Flowxtra | WCAG 2.1 AA Compliance",
      description: "Our commitment to web accessibility and WCAG compliance. Learn how Flowxtra ensures an inclusive experience for all users.",
      keywords: ["accessibility", "WCAG 2.1", "AA compliance", "screen reader", "keyboard navigation", "inclusive design"],
      openGraph: {
        title: "Accessibility Statement - Flowxtra | WCAG 2.1 AA Compliance",
        description: "Our commitment to web accessibility and WCAG compliance. Learn how Flowxtra ensures an inclusive experience for all users.",
        url: "https://flowxtra.com/en/accessibility",
        type: "website",
      },
      alternates: {
        canonical: "https://flowxtra.com/en/accessibility",
        languages: {
          'en': 'https://flowxtra.com/en/accessibility',
          'de': 'https://flowxtra.com/de/barrierefreiheit',
        },
      },
    },
    de: {
      title: "Barrierefreiheitserklärung - Flowxtra | WCAG 2.1 AA-Konformität",
      description: "Unser Engagement für Web-Barrierefreiheit und WCAG-Konformität. Erfahren Sie, wie Flowxtra ein inklusives Erlebnis für alle Benutzer gewährleistet.",
      keywords: ["barrierefreiheit", "WCAG 2.1", "AA-Konformität", "screenreader", "tastaturnavigation", "inklusives design"],
      openGraph: {
        title: "Barrierefreiheitserklärung - Flowxtra | WCAG 2.1 AA-Konformität",
        description: "Unser Engagement für Web-Barrierefreiheit und WCAG-Konformität. Erfahren Sie, wie Flowxtra ein inklusives Erlebnis für alle Benutzer gewährleistet.",
        url: "https://flowxtra.com/de/barrierefreiheit",
        type: "website",
      },
      alternates: {
        canonical: "https://flowxtra.com/de/barrierefreiheit",
        languages: {
          'en': 'https://flowxtra.com/en/accessibility',
          'de': 'https://flowxtra.com/de/barrierefreiheit',
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

