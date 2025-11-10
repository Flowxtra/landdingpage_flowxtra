import type { Metadata } from "next";

// Generate SEO metadata for Free Job Posting page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "Free Job Posting – Post Jobs for Free | Flowxtra",
      description: "Post unlimited job openings for free with Flowxtra. Reach top talent across multiple job boards with our free job posting platform. No credit card required.",
      keywords: ["free job posting", "post jobs for free", "free job board", "free job posting sites", "free recruitment platform", "post jobs online free"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Free Job Posting – Post Jobs for Free | Flowxtra",
        description: "Post unlimited job openings for free with Flowxtra. Reach top talent across multiple job boards with our free job posting platform. No credit card required.",
        url: `${baseUrl}/en/free-job-posting`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/free-job-posting`,
        languages: {
          'en': `${baseUrl}/en/free-job-posting`,
          'de': `${baseUrl}/de/kostenlose-stellenausschreibung`,
        },
      },
    },
    de: {
      title: "Kostenlose Stellenausschreibung – Jobs kostenlos veröffentlichen | Flowxtra",
      description: "Veröffentlichen Sie unbegrenzt kostenlose Stellenanzeigen mit Flowxtra. Erreichen Sie Top-Talente auf mehreren Jobbörsen mit unserer kostenlosen Stellenausschreibungsplattform. Keine Kreditkarte erforderlich.",
      keywords: ["kostenlose stellenausschreibung", "jobs kostenlos veröffentlichen", "kostenlose jobbörse", "kostenlose stellenausschreibungsseiten", "kostenlose rekrutierungsplattform", "jobs online kostenlos veröffentlichen"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Kostenlose Stellenausschreibung – Jobs kostenlos veröffentlichen | Flowxtra",
        description: "Veröffentlichen Sie unbegrenzt kostenlose Stellenanzeigen mit Flowxtra. Erreichen Sie Top-Talente auf mehreren Jobbörsen mit unserer kostenlosen Stellenausschreibungsplattform. Keine Kreditkarte erforderlich.",
        url: `${baseUrl}/de/kostenlose-stellenausschreibung`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/kostenlose-stellenausschreibung`,
        languages: {
          'en': `${baseUrl}/en/free-job-posting`,
          'de': `${baseUrl}/de/kostenlose-stellenausschreibung`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function FreeJobPostingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

