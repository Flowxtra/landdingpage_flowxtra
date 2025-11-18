import type { Metadata } from "next";
import { headers } from "next/headers";

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

export default function ATSRecruitingSoftwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flowxtra ATS Recruiting Software",
    "operatingSystem": "Web, Windows, macOS",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Applicant Tracking System (ATS)",
    "softwareVersion": "1.0",
    "url": "https://flowxtra.com/ats-recruiting-software/",
    "image": `${baseUrl}/Main-flowxtra-Logo.png`,
    "description": "Flowxtra ATS is a free applicant tracking system that helps companies streamline their hiring process. Features include unlimited free job postings, AI-powered candidate filtering, multi-posting to job boards, candidate profile management, email templates, and integrated interviews. GDPR, CCPA, and EU AI Act compliant.",
    "isCompatibleWith": [
      "https://n8n.io/",
      "https://www.canva.com/",
      "https://chat.openai.com/",
      "https://gemini.google.com/",
      "https://claude.ai/",
      "https://www.perplexity.ai/"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": [
        "Startups",
        "HR teams",
        "Recruitment agencies",
        "Small and medium-sized businesses (SMBs)",
        "Enterprises"
      ]
    },
    "creator": {
      "@type": "Organization",
      "name": "Flowxtra GmbH"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Forever Plan – Unlimited Job Postings",
        "price": "0.00",
        "priceCurrency": "EUR",
        "url": "https://flowxtra.com/pricing/",
        "availability": "https://schema.org/InStock",
        "category": "FreeSoftware",
        "description": "Free Forever plan with unlimited job postings, AI candidate filtering, multi-posting, and candidate management. No credit card required."
      },
      {
        "@type": "Offer",
        "name": "Free Forever Plan – Unlimited Job Postings (USD)",
        "price": "0.00",
        "priceCurrency": "USD",
        "url": "https://flowxtra.com/pricing/",
        "availability": "https://schema.org/InStock",
        "category": "FreeSoftware",
        "description": "Free Forever plan with unlimited job postings, AI candidate filtering, multi-posting, and candidate management. No credit card required."
      },
      {
        "@type": "Offer",
        "name": "Professional Plan – Advanced ATS Features",
        "price": "249.00",
        "priceCurrency": "EUR",
        "url": "https://flowxtra.com/pricing/",
        "availability": "https://schema.org/InStock",
        "category": "PaidSoftware",
        "description": "Professional Plan includes all Free features plus advanced analytics, custom fields, API access, and more. Starting from €249/month."
      },
      {
        "@type": "Offer",
        "name": "Professional Plan – Advanced ATS Features (USD)",
        "price": "249.00",
        "priceCurrency": "USD",
        "url": "https://flowxtra.com/pricing/",
        "availability": "https://schema.org/InStock",
        "category": "PaidSoftware",
        "description": "Professional Plan includes all Free features plus advanced analytics, custom fields, API access, and more. Starting from $249/month."
      }
    ],
    "featureList": [
      "Unlimited free job postings",
      "AI-powered candidate filtering and ranking",
      "Multi-posting to multiple job boards simultaneously",
      "Comprehensive candidate profile management",
      "Professional email templates for hiring",
      "Integrated online interviews and video interviews",
      "Team collaboration for candidate evaluation",
      "Reports and analytics to optimize hiring",
      "GDPR, EU AI Act, CCPA, and CPRA compliance",
      "Available in EUR (€) and USD ($)"
    ],
    "keywords": [
      "ATS software",
      "applicant tracking system",
      "recruiting software",
      "ATS recruiting",
      "free ATS",
      "hiring software",
      "recruitment platform",
      "applicant tracking",
      "candidate management system",
      "recruitment CRM",
      "talent acquisition software",
      "job posting software",
      "recruiting platform",
      "ATS system",
      "free applicant tracking",
      "best ATS software",
      "recruitment management system"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Flowxtra ATS free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — Flowxtra ATS offers a free plan with unlimited job postings. You can post jobs, filter candidates with AI, manage applications, and track your hiring process at no cost. Advanced features like custom fields, API access, and advanced analytics are available in paid plans."
        }
      },
      {
        "@type": "Question",
        "name": "What is an ATS (Applicant Tracking System)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An Applicant Tracking System (ATS) is software that helps companies manage the entire hiring process, from posting job openings to tracking candidates through the recruitment pipeline. Flowxtra ATS streamlines this process with AI-powered filtering, multi-posting capabilities, and comprehensive candidate management tools."
        }
      },
      {
        "@type": "Question",
        "name": "Can I post jobs to multiple job boards at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Flowxtra's multi-posting feature allows you to post a single job opening to multiple job boards simultaneously, including Google for Jobs, LinkedIn, Facebook, and many others. This saves time and ensures your job postings reach the widest possible audience."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI candidate filtering work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flowxtra's AI-powered candidate filtering automatically ranks and filters candidates based on their qualifications, skills, and experience. The system analyzes resumes and applications to match candidates with job requirements, helping you identify the best-fit candidates faster and more efficiently."
        }
      },
      {
        "@type": "Question",
        "name": "Is Flowxtra ATS GDPR compliant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra ATS is fully GDPR, CCPA, and EU AI Act compliant. All candidate data is securely stored in the EU, and we follow strict data protection regulations to ensure your candidates' privacy and your company's compliance."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}

