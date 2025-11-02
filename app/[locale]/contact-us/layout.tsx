import type { Metadata } from "next";

// Generate SEO metadata for Contact Us page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "Contact Us – Flowxtra Support | Get Help with Recruiting Software",
      description: "Have questions about Flowxtra? Contact our support team for help with recruiting software, ATS features, and hiring solutions. We respond within 24 hours.",
      keywords: ["contact flowxtra", "recruiting software support", "ATS help", "customer support", "hiring platform contact"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Contact Us – Flowxtra Support | Get Help with Recruiting Software",
        description: "Have questions about Flowxtra? Contact our support team for help with recruiting software, ATS features, and hiring solutions. We respond within 24 hours.",
        url: `${baseUrl}/en/contact-us`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/contact-us`,
        languages: {
          'en': `${baseUrl}/en/contact-us`,
          'de': `${baseUrl}/de/kontakt`,
        },
      },
    },
    de: {
      title: "Kontakt – Flowxtra Support | Hilfe bei Recruiting-Software",
      description: "Haben Sie Fragen zu Flowxtra? Kontaktieren Sie unser Support-Team für Hilfe mit Recruiting-Software, ATS-Funktionen und Einstellungslösungen. Wir antworten innerhalb von 24 Stunden.",
      keywords: ["flowxtra kontakt", "recruiting-software support", "ATS hilfe", "kundensupport", "einstellungsplattform kontakt"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Kontakt – Flowxtra Support | Hilfe bei Recruiting-Software",
        description: "Haben Sie Fragen zu Flowxtra? Kontaktieren Sie unser Support-Team für Hilfe mit Recruiting-Software, ATS-Funktionen und Einstellungslösungen. Wir antworten innerhalb von 24 Stunden.",
        url: `${baseUrl}/de/kontakt`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/kontakt`,
        languages: {
          'en': `${baseUrl}/en/contact-us`,
          'de': `${baseUrl}/de/kontakt`,
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

