import type { Metadata } from "next";
import { headers } from "next/headers";
import { getAtsRecruitingSchema } from "@/lib/schemaLoader";

// Generate SEO metadata for ATS Recruiting Software page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  // Get current pathname and host from headers to build canonical URL
  // This ensures the canonical URL matches the actual current page URL (including localhost in dev)
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const host = headersList.get('host') || '';
  
  // Determine the base URL to use: prefer current request host in dev, otherwise use configured baseUrl
  // This ensures canonical works correctly in both development and production
  const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
  const currentBaseUrl = host && (host.includes('localhost') || host.includes('127.0.0.1'))
    ? `${protocol}://${host}`
    : baseUrl;
  
  // Build canonical URL using actual pathname and current host to ensure it matches current page
  // Fallback to constructed URL if pathname is not available
  const canonicalUrl = pathname 
    ? `${currentBaseUrl}${pathname}`
    : `${currentBaseUrl}/${locale}/ats-recruiting-software`;
  
  // Build hreflang URLs for all supported languages including country-specific locales
  // Use the same base URL as canonical to ensure consistency
  const supportedLocales = ['en', 'en-us', 'en-gb', 'en-au', 'en-ca', 'de', 'de-at', 'de-ch', 'fr', 'es', 'it', 'nl', 'ar'];
  const hreflangUrls: Record<string, string> = {};
  supportedLocales.forEach(lang => {
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/ats-recruiting-software`;
  });
  // Add x-default to indicate the default language version
  hreflangUrls['x-default'] = `${currentBaseUrl}/en/ats-recruiting-software`;
  
  const metadata = {
    en: {
      title: "ATS Software | Applicant Tracking System Software – Flowxtra",
      description: "Best ATS software and applicant tracking system software for modern hiring teams. Streamline candidate tracking with AI-powered filtering, automate job distribution across multiple job boards, and accelerate hiring decisions with our intelligent hiring manager software. Free forever with unlimited job postings.",
      keywords: ["ATS software", "applicant tracking system software", "candidate tracking software", "applicant tracking system", "recruiting software", "ATS recruiting", "free ATS", "hiring software", "recruitment platform", "best recruiting software", "ai recruitment software", "hiring management software", "talent crm", "staffing and recruiting software"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "ATS Software | Applicant Tracking System Software – Flowxtra",
        description: "Best ATS software and applicant tracking system software for modern hiring teams. Streamline candidate tracking with AI-powered filtering, automate job distribution across multiple job boards, and accelerate hiring decisions with our intelligent hiring manager software. Free forever with unlimited job postings.",
        url: `${baseUrl}/en/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "ATS Recruiting Software – Flowxtra | Kostenloses Bewerbermanagementsystem",
      description: "Optimieren Sie Ihren Einstellungsprozess mit Flowxtras kostenloser ATS Recruiting Software. Kostenlos Stellen ausschreiben, Kandidaten mit KI filtern, Bewerbungen verwalten und schneller einstellen.",
      keywords: ["ATS Software", "Bewerbermanagementsystem", "Recruiting Software", "ATS Recruiting", "kostenloses ATS", "Einstellungssoftware", "Recruiting-Plattform"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "ATS Recruiting Software – Flowxtra | Kostenloses Bewerbermanagementsystem",
        description: "Optimieren Sie Ihren Einstellungsprozess mit Flowxtras kostenloser ATS Recruiting Software. Kostenlos Stellen ausschreiben, Kandidaten mit KI filtern, Bewerbungen verwalten und schneller einstellen.",
        url: `${baseUrl}/de/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    "en-us": {
      title: "ATS Software | Applicant Tracking System Software for US Companies – Flowxtra",
      description: "Powerful ATS software and applicant tracking system software for US hiring teams. Streamline candidate tracking, automate job distribution across US job boards, and accelerate hiring decisions with our intelligent hiring manager software. Optimized for businesses in the United States.",
      keywords: ["ATS software", "applicant tracking system", "recruiting software", "ATS recruiting", "free ATS", "hiring software", "recruitment platform", "US ATS", "American applicant tracking"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "ATS Software | Applicant Tracking System Software for US Companies – Flowxtra",
        description: "Powerful ATS software and applicant tracking system software for US hiring teams. Streamline candidate tracking, automate job distribution across US job boards, and accelerate hiring decisions with our intelligent hiring manager software. Optimized for businesses in the United States.",
        url: `${baseUrl}/en-us/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    "en-gb": {
      title: "ATS Software | Applicant Tracking System Software for UK Companies – Flowxtra",
      description: "Powerful ATS software and applicant tracking system software for UK hiring teams. Streamline candidate tracking, automate job distribution across UK job boards, and accelerate hiring decisions with our intelligent hiring manager software. Optimized for businesses in the United Kingdom.",
      keywords: ["ATS software", "applicant tracking system", "recruiting software", "ATS recruiting", "free ATS", "hiring software", "recruitment platform", "UK ATS", "British applicant tracking"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "ATS Software | Applicant Tracking System Software for UK Companies – Flowxtra",
        description: "Powerful ATS software and applicant tracking system software for UK hiring teams. Streamline candidate tracking, automate job distribution across UK job boards, and accelerate hiring decisions with our intelligent hiring manager software. Optimized for businesses in the United Kingdom.",
        url: `${baseUrl}/en-gb/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    "en-au": {
      title: "ATS Software | Applicant Tracking System Software for Australian Companies – Flowxtra",
      description: "Powerful ATS software and applicant tracking system software for Australian hiring teams. Streamline candidate tracking, automate job distribution across Australian job boards, and accelerate hiring decisions with our intelligent hiring manager software. Optimized for businesses in Australia.",
      keywords: ["ATS software", "applicant tracking system", "recruiting software", "ATS recruiting", "free ATS", "hiring software", "recruitment platform", "Australian ATS", "Aussie applicant tracking"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "ATS Software | Applicant Tracking System Software for Australian Companies – Flowxtra",
        description: "Powerful ATS software and applicant tracking system software for Australian hiring teams. Streamline candidate tracking, automate job distribution across Australian job boards, and accelerate hiring decisions with our intelligent hiring manager software. Optimized for businesses in Australia.",
        url: `${baseUrl}/en-au/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    "en-ca": {
      title: "ATS Software | Applicant Tracking System Software for Canadian Companies – Flowxtra",
      description: "Powerful ATS software and applicant tracking system software for Canadian hiring teams. Streamline candidate tracking, automate job distribution across Canadian job boards, and accelerate hiring decisions with our intelligent hiring manager software. Optimized for businesses in Canada.",
      keywords: ["ATS software", "applicant tracking system", "recruiting software", "ATS recruiting", "free ATS", "hiring software", "recruitment platform", "Canadian ATS", "Canada applicant tracking"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "ATS Software | Applicant Tracking System Software for Canadian Companies – Flowxtra",
        description: "Powerful ATS software and applicant tracking system software for Canadian hiring teams. Streamline candidate tracking, automate job distribution across Canadian job boards, and accelerate hiring decisions with our intelligent hiring manager software. Optimized for businesses in Canada.",
        url: `${baseUrl}/en-ca/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    "de-at": {
      title: "ATS Software | Bewerbermanagementsystem für österreichische Unternehmen – Flowxtra",
      description: "Leistungsstarke ATS-Software und Bewerbermanagementsystem für österreichische Einstellungsteams. Optimieren Sie die Kandidatenverfolgung, automatisieren Sie die Stellenverteilung auf österreichischen Jobbörsen und beschleunigen Sie Einstellungsentscheidungen mit unserer intelligenten Einstellungssoftware. Optimiert für Unternehmen in Österreich.",
      keywords: ["ATS Software", "Bewerbermanagementsystem", "Recruiting Software", "ATS Recruiting", "kostenloses ATS", "Einstellungssoftware", "Recruiting-Plattform", "österreichisches ATS", "ATS Österreich"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "ATS Software | Bewerbermanagementsystem für österreichische Unternehmen – Flowxtra",
        description: "Leistungsstarke ATS-Software und Bewerbermanagementsystem für österreichische Einstellungsteams. Optimieren Sie die Kandidatenverfolgung, automatisieren Sie die Stellenverteilung auf österreichischen Jobbörsen und beschleunigen Sie Einstellungsentscheidungen mit unserer intelligenten Einstellungssoftware. Optimiert für Unternehmen in Österreich.",
        url: `${baseUrl}/de-at/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    "de-ch": {
      title: "ATS Software | Bewerbermanagementsystem für Schweizer Unternehmen – Flowxtra",
      description: "Leistungsstarke ATS-Software und Bewerbermanagementsystem für Schweizer Einstellungsteams. Optimieren Sie die Kandidatenverfolgung, automatisieren Sie die Stellenverteilung auf Schweizer Jobbörsen und beschleunigen Sie Einstellungsentscheidungen mit unserer intelligenten Einstellungssoftware. Optimiert für Unternehmen in der Schweiz.",
      keywords: ["ATS Software", "Bewerbermanagementsystem", "Recruiting Software", "ATS Recruiting", "kostenloses ATS", "Einstellungssoftware", "Recruiting-Plattform", "Schweizer ATS", "ATS Schweiz"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "ATS Software | Bewerbermanagementsystem für Schweizer Unternehmen – Flowxtra",
        description: "Leistungsstarke ATS-Software und Bewerbermanagementsystem für Schweizer Einstellungsteams. Optimieren Sie die Kandidatenverfolgung, automatisieren Sie die Stellenverteilung auf Schweizer Jobbörsen und beschleunigen Sie Einstellungsentscheidungen mit unserer intelligenten Einstellungssoftware. Optimiert für Unternehmen in der Schweiz.",
        url: `${baseUrl}/de-ch/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    fr: {
      title: "Logiciel ATS | Système de Suivi des Candidats pour Entreprises Françaises – Flowxtra",
      description: "Logiciel ATS puissant et système de suivi des candidats pour les équipes de recrutement françaises. Rationalisez le suivi des candidats, automatisez la distribution des offres d'emploi sur les sites d'emploi français et accélérez les décisions d'embauche avec notre logiciel de gestion de recrutement intelligent. Optimisé pour les entreprises en France.",
      keywords: ["logiciel ATS", "système de suivi des candidats", "logiciel de recrutement", "ATS recrutement", "ATS gratuit", "logiciel d'embauche", "plateforme de recrutement", "ATS français"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Logiciel ATS | Système de Suivi des Candidats pour Entreprises Françaises – Flowxtra",
        description: "Logiciel ATS puissant et système de suivi des candidats pour les équipes de recrutement françaises. Rationalisez le suivi des candidats, automatisez la distribution des offres d'emploi sur les sites d'emploi français et accélérez les décisions d'embauche avec notre logiciel de gestion de recrutement intelligent. Optimisé pour les entreprises en France.",
        url: `${baseUrl}/fr/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    es: {
      title: "Software ATS | Sistema de Seguimiento de Candidatos para Empresas Españolas – Flowxtra",
      description: "Software ATS potente y sistema de seguimiento de candidatos para equipos de contratación españoles. Optimice el seguimiento de candidatos, automatice la distribución de ofertas de trabajo en portales de empleo españoles y acelere las decisiones de contratación con nuestro software inteligente de gestión de contratación. Optimizado para empresas en España.",
      keywords: ["software ATS", "sistema de seguimiento de candidatos", "software de reclutamiento", "ATS reclutamiento", "ATS gratuito", "software de contratación", "plataforma de reclutamiento", "ATS español"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Software ATS | Sistema de Seguimiento de Candidatos para Empresas Españolas – Flowxtra",
        description: "Software ATS potente y sistema de seguimiento de candidatos para equipos de contratación españoles. Optimice el seguimiento de candidatos, automatice la distribución de ofertas de trabajo en portales de empleo españoles y acelere las decisiones de contratación con nuestro software inteligente de gestión de contratación. Optimizado para empresas en España.",
        url: `${baseUrl}/es/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    it: {
      title: "Software ATS | Sistema di Tracciamento Candidati per Aziende Italiane – Flowxtra",
      description: "Software ATS potente e sistema di tracciamento candidati per team di assunzione italiani. Semplifica il tracciamento dei candidati, automatizza la distribuzione delle offerte di lavoro su portali italiani e accelera le decisioni di assunzione con il nostro software intelligente di gestione del recruiting. Ottimizzato per aziende in Italia.",
      keywords: ["software ATS", "sistema di tracciamento candidati", "software di recruiting", "ATS recruiting", "ATS gratuito", "software di assunzione", "piattaforma di recruiting", "ATS italiano"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Software ATS | Sistema di Tracciamento Candidati per Aziende Italiane – Flowxtra",
        description: "Software ATS potente e sistema di tracciamento candidati per team di assunzione italiani. Semplifica il tracciamento dei candidati, automatizza la distribuzione delle offerte di lavoro su portali italiani e accelera le decisioni di assunzione con il nostro software intelligente di gestione del recruiting. Ottimizzato per aziende in Italia.",
        url: `${baseUrl}/it/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    nl: {
      title: "ATS Software | Sollicitant Tracking Systeem voor Nederlandse Bedrijven – Flowxtra",
      description: "Krachtige ATS-software en sollicitant tracking systeem voor Nederlandse wervingsteams. Stroomlijn kandidaat tracking, automatiseer vacature distributie op Nederlandse vacaturesites en versnel wervingsbeslissingen met onze intelligente wervingssoftware. Geoptimaliseerd voor bedrijven in Nederland.",
      keywords: ["ATS software", "sollicitant tracking systeem", "wervingssoftware", "ATS werving", "gratis ATS", "wervingssoftware", "wervingsplatform", "Nederlandse ATS"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "ATS Software | Sollicitant Tracking Systeem voor Nederlandse Bedrijven – Flowxtra",
        description: "Krachtige ATS-software en sollicitant tracking systeem voor Nederlandse wervingsteams. Stroomlijn kandidaat tracking, automatiseer vacature distributie op Nederlandse vacaturesites en versnel wervingsbeslissingen met onze intelligente wervingssoftware. Geoptimaliseerd voor bedrijven in Nederland.",
        url: `${baseUrl}/nl/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    ar: {
      title: "برنامج ATS | نظام تتبع المتقدمين للشركات العربية – Flowxtra",
      description: "برنامج ATS قوي ونظام تتبع المتقدمين لفرق التوظيف العربية. قم بتبسيط تتبع المرشحين، وأتمتة توزيع الوظائف على منصات التوظيف العربية، وتسريع قرارات التوظيف مع برنامج إدارة التوظيف الذكي لدينا. محسّن للشركات في المنطقة العربية.",
      keywords: ["برنامج ATS", "نظام تتبع المتقدمين", "برنامج التوظيف", "ATS التوظيف", "ATS مجاني", "برنامج التوظيف", "منصة التوظيف", "ATS عربي"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "برنامج ATS | نظام تتبع المتقدمين للشركات العربية – Flowxtra",
        description: "برنامج ATS قوي ونظام تتبع المتقدمين لفرق التوظيف العربية. قم بتبسيط تتبع المرشحين، وأتمتة توزيع الوظائف على منصات التوظيف العربية، وتسريع قرارات التوظيف مع برنامج إدارة التوظيف الذكي لدينا. محسّن للشركات في المنطقة العربية.",
        url: `${baseUrl}/ar/ats-recruiting-software`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
  };

  // Get base metadata for current locale, or fallback to English
  const baseMetadata = metadata[locale as keyof typeof metadata] || metadata.en;
  
  // Return metadata with canonical and languages explicitly set (not merged)
  // This ensures nested layout's alternates take precedence over root layout
  return {
    ...baseMetadata,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangUrls,
    },
    // Explicitly exclude any alternates from parent layout
    ...(baseMetadata.openGraph && {
      openGraph: {
        ...baseMetadata.openGraph,
        url: canonicalUrl, // Update OpenGraph URL to match canonical
      },
    }),
  };
}

export default async function ATSRecruitingSoftwareLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const pageUrl = `${baseUrl}/${locale}/ats-recruiting-software`;

  const schema = getAtsRecruitingSchema(locale, {
    BASE_URL: baseUrl,
    PAGE_URL: pageUrl,
    LOCALE_CODE: locale,
  });

  return (
    <>
      {Object.entries(schema).map(([key, schemaObject]) => (
        <script
          key={key}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
        />
      ))}
      {children}
    </>
  );
}

