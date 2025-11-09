import type { Metadata } from "next";

// Generate SEO metadata for Blog page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "Blog – Flowxtra | Smart Hiring Insights & Recruitment Trends",
      description: "Discover practical strategies, expert tips, and the latest updates shaping the future of recruitment and talent management.",
      keywords: ["recruitment blog", "hiring tips", "HR insights", "talent management", "recruiting trends", "ATS blog"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Blog – Flowxtra | Smart Hiring Insights & Recruitment Trends",
        description: "Discover practical strategies, expert tips, and the latest updates shaping the future of recruitment and talent management.",
        url: `${baseUrl}/en/blog`,
        type: "website",
      },
      alternates: {
        // Canonical is handled by root layout to avoid conflicts
        languages: {
          'en': `${baseUrl}/en/blog`,
          'de': `${baseUrl}/de/blog`,
          'fr': `${baseUrl}/fr/blog`,
          'es': `${baseUrl}/es/blog`,
          'it': `${baseUrl}/it/blog`,
          'nl': `${baseUrl}/nl/blog`,
          'ar': `${baseUrl}/ar/blog`,
        },
      },
    },
    de: {
      title: "Blog – Flowxtra | Intelligente Einstellungserkenntnisse & Rekrutierungstrends",
      description: "Entdecken Sie praktische Strategien, Experten-Tipps und die neuesten Updates, die die Zukunft der Rekrutierung und Talentmanagement prägen.",
      keywords: ["rekrutierungsblog", "einstellungstipps", "hr-erkenntnisse", "talentmanagement", "rekrutierungstrends", "ats-blog"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Blog – Flowxtra | Intelligente Einstellungserkenntnisse & Rekrutierungstrends",
        description: "Entdecken Sie praktische Strategien, Experten-Tipps und die neuesten Updates, die die Zukunft der Rekrutierung und Talentmanagement prägen.",
        url: `${baseUrl}/de/blog`,
        type: "website",
      },
      alternates: {
        // Canonical is handled by root layout to avoid conflicts
        languages: {
          'en': `${baseUrl}/en/blog`,
          'de': `${baseUrl}/de/blog`,
          'fr': `${baseUrl}/fr/blog`,
          'es': `${baseUrl}/es/blog`,
          'it': `${baseUrl}/it/blog`,
          'nl': `${baseUrl}/nl/blog`,
          'ar': `${baseUrl}/ar/blog`,
        },
      },
    },
    fr: {
      title: "Blog – Flowxtra | Insights d'Embauche Intelligente & Tendances du Recrutement",
      description: "Découvrez des stratégies pratiques, des conseils d'experts et les dernières mises à jour qui façonnent l'avenir du recrutement et de la gestion des talents.",
      keywords: ["blog recrutement", "conseils embauche", "insights RH", "gestion talents", "tendances recrutement", "blog ATS"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Blog – Flowxtra | Insights d'Embauche Intelligente & Tendances du Recrutement",
        description: "Découvrez des stratégies pratiques, des conseils d'experts et les dernières mises à jour qui façonnent l'avenir du recrutement et de la gestion des talents.",
        url: `${baseUrl}/fr/blog`,
        type: "website",
      },
      alternates: {
        // Canonical is handled by root layout to avoid conflicts
        languages: {
          'en': `${baseUrl}/en/blog`,
          'de': `${baseUrl}/de/blog`,
          'fr': `${baseUrl}/fr/blog`,
          'es': `${baseUrl}/es/blog`,
          'it': `${baseUrl}/it/blog`,
          'nl': `${baseUrl}/nl/blog`,
          'ar': `${baseUrl}/ar/blog`,
        },
      },
    },
    es: {
      title: "Blog – Flowxtra | Insights de Contratación Inteligente & Tendencias de Reclutamiento",
      description: "Descubre estrategias prácticas, consejos de expertos y las últimas actualizaciones que están dando forma al futuro del reclutamiento y la gestión del talento.",
      keywords: ["blog reclutamiento", "consejos contratación", "insights RRHH", "gestión talento", "tendencias reclutamiento", "blog ATS"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Blog – Flowxtra | Insights de Contratación Inteligente & Tendencias de Reclutamiento",
        description: "Descubre estrategias prácticas, consejos de expertos y las últimas actualizaciones que están dando forma al futuro del reclutamiento y la gestión del talento.",
        url: `${baseUrl}/es/blog`,
        type: "website",
      },
      alternates: {
        // Canonical is handled by root layout to avoid conflicts
        languages: {
          'en': `${baseUrl}/en/blog`,
          'de': `${baseUrl}/de/blog`,
          'fr': `${baseUrl}/fr/blog`,
          'es': `${baseUrl}/es/blog`,
          'it': `${baseUrl}/it/blog`,
          'nl': `${baseUrl}/nl/blog`,
          'ar': `${baseUrl}/ar/blog`,
        },
      },
    },
    it: {
      title: "Blog – Flowxtra | Insights di Assunzione Intelligente & Tendenze del Reclutamento",
      description: "Scopri strategie pratiche, consigli di esperti e gli ultimi aggiornamenti che stanno plasmando il futuro del reclutamento e della gestione del talento.",
      keywords: ["blog reclutamento", "consigli assunzione", "insights HR", "gestione talenti", "tendenze reclutamento", "blog ATS"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Blog – Flowxtra | Insights di Assunzione Intelligente & Tendenze del Reclutamento",
        description: "Scopri strategie pratiche, consigli di esperti e gli ultimi aggiornamenti che stanno plasmando il futuro del reclutamento e della gestione del talento.",
        url: `${baseUrl}/it/blog`,
        type: "website",
      },
      alternates: {
        // Canonical is handled by root layout to avoid conflicts
        languages: {
          'en': `${baseUrl}/en/blog`,
          'de': `${baseUrl}/de/blog`,
          'fr': `${baseUrl}/fr/blog`,
          'es': `${baseUrl}/es/blog`,
          'it': `${baseUrl}/it/blog`,
          'nl': `${baseUrl}/nl/blog`,
          'ar': `${baseUrl}/ar/blog`,
        },
      },
    },
    nl: {
      title: "Blog – Flowxtra | Slimme Wervingsinsights & Rekruterings Trends",
      description: "Ontdek praktische strategieën, expert tips en de nieuwste updates die de toekomst van werving en talentmanagement vormgeven.",
      keywords: ["wervingsblog", "wervingstips", "HR insights", "talentmanagement", "rekruterings trends", "ATS blog"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Blog – Flowxtra | Slimme Wervingsinsights & Rekruterings Trends",
        description: "Ontdek praktische strategieën, expert tips en de nieuwste updates die de toekomst van werving en talentmanagement vormgeven.",
        url: `${baseUrl}/nl/blog`,
        type: "website",
      },
      alternates: {
        // Canonical is handled by root layout to avoid conflicts
        languages: {
          'en': `${baseUrl}/en/blog`,
          'de': `${baseUrl}/de/blog`,
          'fr': `${baseUrl}/fr/blog`,
          'es': `${baseUrl}/es/blog`,
          'it': `${baseUrl}/it/blog`,
          'nl': `${baseUrl}/nl/blog`,
          'ar': `${baseUrl}/ar/blog`,
        },
      },
    },
    ar: {
      title: "المدونة – Flowxtra | رؤى التوظيف الذكي واتجاهات التوظيف",
      description: "اكتشف استراتيجيات عملية ونصائح الخبراء وأحدث التحديثات التي تشكل مستقبل التوظيف وإدارة المواهب.",
      keywords: ["مدونة التوظيف", "نصائح التوظيف", "رؤى الموارد البشرية", "إدارة المواهب", "اتجاهات التوظيف", "مدونة ATS"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "المدونة – Flowxtra | رؤى التوظيف الذكي واتجاهات التوظيف",
        description: "اكتشف استراتيجيات عملية ونصائح الخبراء وأحدث التحديثات التي تشكل مستقبل التوظيف وإدارة المواهب.",
        url: `${baseUrl}/ar/blog`,
        type: "website",
      },
      alternates: {
        // Canonical is handled by root layout to avoid conflicts
        languages: {
          'en': `${baseUrl}/en/blog`,
          'de': `${baseUrl}/de/blog`,
          'fr': `${baseUrl}/fr/blog`,
          'es': `${baseUrl}/es/blog`,
          'it': `${baseUrl}/it/blog`,
          'nl': `${baseUrl}/nl/blog`,
          'ar': `${baseUrl}/ar/blog`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function BlogLayout({
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

