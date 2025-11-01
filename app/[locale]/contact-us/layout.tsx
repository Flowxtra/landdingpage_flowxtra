import type { Metadata } from "next";

// Generate SEO metadata for Contact Us page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const metadata = {
    en: {
      title: "Contact Us – Flowxtra Support | Get Help with Recruiting Software",
      description: "Have questions about Flowxtra? Contact our support team for help with recruiting software, ATS features, and hiring solutions. We respond within 24 hours.",
      keywords: ["contact flowxtra", "recruiting software support", "ATS help", "customer support", "hiring platform contact"],
      openGraph: {
        title: "Contact Us – Flowxtra Support | Get Help with Recruiting Software",
        description: "Have questions about Flowxtra? Contact our support team for help with recruiting software, ATS features, and hiring solutions. We respond within 24 hours.",
        url: "https://flowxtra.com/en/contact-us",
        type: "website",
      },
      alternates: {
        canonical: "https://flowxtra.com/en/contact-us",
        languages: {
          'en': 'https://flowxtra.com/en/contact-us',
          'de': 'https://flowxtra.com/de/kontakt',
        },
      },
    },
    de: {
      title: "Kontakt – Flowxtra Support | Hilfe bei Recruiting-Software",
      description: "Haben Sie Fragen zu Flowxtra? Kontaktieren Sie unser Support-Team für Hilfe mit Recruiting-Software, ATS-Funktionen und Einstellungslösungen. Wir antworten innerhalb von 24 Stunden.",
      keywords: ["flowxtra kontakt", "recruiting-software support", "ATS hilfe", "kundensupport", "einstellungsplattform kontakt"],
      openGraph: {
        title: "Kontakt – Flowxtra Support | Hilfe bei Recruiting-Software",
        description: "Haben Sie Fragen zu Flowxtra? Kontaktieren Sie unser Support-Team für Hilfe mit Recruiting-Software, ATS-Funktionen und Einstellungslösungen. Wir antworten innerhalb von 24 Stunden.",
        url: "https://flowxtra.com/de/kontakt",
        type: "website",
      },
      alternates: {
        canonical: "https://flowxtra.com/de/kontakt",
        languages: {
          'en': 'https://flowxtra.com/en/contact-us',
          'de': 'https://flowxtra.com/de/kontakt',
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

