import type { Metadata } from "next";
import { headers } from "next/headers";

// Generate SEO metadata for Pricing page
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
  
  // Map locale to page path (some locales have translated URLs)
  const pagePaths: Record<string, string> = {
    'en': 'pricing',
    'de': 'preise',
    'fr': 'pricing',
    'es': 'pricing',
    'it': 'pricing',
    'nl': 'pricing',
    'ar': 'pricing',
  };
  
  // Build canonical URL using actual pathname and current host to ensure it matches current page
  // Fallback to constructed URL if pathname is not available
  const pagePath = pagePaths[locale] || pagePaths['en'];
  const canonicalUrl = pathname 
    ? `${currentBaseUrl}${pathname}`
    : `${currentBaseUrl}/${locale}/${pagePath}`;
  
  // Build hreflang URLs for all supported languages
  // Use the same base URL as canonical to ensure consistency
  const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'nl', 'ar'];
  const hreflangUrls: Record<string, string> = {};
  supportedLocales.forEach(lang => {
    const langPath = pagePaths[lang] || pagePaths['en'];
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/${langPath}`;
  });
  
  const metadata = {
    en: {
      title: "Pricing Plans – Flowxtra | Free ATS & Recruiting Software",
      description: "Choose the perfect plan for your business. Start with 10 free job postings per month. Transparent pricing, no hidden fees.",
      keywords: ["pricing", "plans", "free job posting", "ATS pricing", "recruiting software cost", "affordable hiring platform"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Pricing Plans – Flowxtra | Free ATS & Recruiting Software",
        description: "Choose the perfect plan for your business. Start with 10 free job postings per month. Transparent pricing, no hidden fees.",
        url: canonicalUrl,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "Preispläne – Flowxtra | Kostenlose ATS & Recruiting-Software",
      description: "Wählen Sie den perfekten Plan für Ihr Unternehmen. Beginnen Sie mit 10 kostenlosen Stellenanzeigen pro Monat. Transparente Preise, keine versteckten Gebühren.",
      keywords: ["preise", "pläne", "kostenlose stellenausschreibung", "ATS preise", "recruiting-software kosten", "erschwingliche einstellungsplattform"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Preispläne – Flowxtra | Kostenlose ATS & Recruiting-Software",
        description: "Wählen Sie den perfekten Plan für Ihr Unternehmen. Beginnen Sie mit 10 kostenlosen Stellenanzeigen pro Monat. Transparente Preise, keine versteckten Gebühren.",
        url: canonicalUrl,
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

export default async function PricingLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Flowxtra GmbH",
    "legalName": "Flowxtra GmbH",
    "url": baseUrl,
    "logo": "https://flowxtra.com/assets/images/new-imge/Logo-XS.png",
    "description": "Advanced recruitment platform with AI-powered tools for modern hiring teams. Streamline your hiring process with applicant tracking, multiposting, and automation.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+43-676-905-4441",
      "contactType": "Customer Support",
      "email": "support@flowxtra.com",
      "availableLanguage": ["en", "de", "fr", "es", "it", "nl", "ar"],
      "areaServed": "Worldwide"
    },
    "sameAs": [
      "https://www.linkedin.com/company/flowxtra",
      "https://www.facebook.com/Fowxtra",
      "http://x.com/flowxtra_com",
      "https://www.instagram.com/flowxtra_com/",
      "https://youtube.com/@flowxtra_com",
      "https://medium.com/@flowxtra",
      "https://www.tiktok.com/@flowxtra.ai"
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Recruitment Platform",
        "item": `${baseUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Pricing Plans",
        "item": `${baseUrl}/pricing/`
      }
    ]
  };

  // Product Schemas for all plans
  const productSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Flowxtra Free Plan",
      "description": "For freelancers & hobbies. Includes 10 job postings per month, career page, job widget, multiposting, online meeting tool, and more.",
      "image": "https://flowxtra.com/assets/images/new-imge/Logo-XS.png",
      "brand": { "@type": "Brand", "name": "Flowxtra" },
      "offers": [
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "EUR",
          "price": "0",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "DE",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        },
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "USD",
          "price": "0",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        }
      ],
      "category": "Recruitment Software",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Flowxtra Starter Plan",
      "description": "For small companies. Includes 15 job postings per month, 5 user seats, smart candidate filtering, custom fields, roles & permissions, and all free features.",
      "image": "https://flowxtra.com/assets/images/new-imge/Logo-XS.png",
      "brand": { "@type": "Brand", "name": "Flowxtra" },
      "offers": [
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "EUR",
          "price": "30",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "DE",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        },
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "USD",
          "price": "30",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        }
      ],
      "category": "Recruitment Software",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Flowxtra Basic Plan",
      "description": "For growing businesses. Includes 25 job postings per month, 10 user seats, unlimited storage, journey flow automation, AI job ad builder, and all starter features.",
      "image": "https://flowxtra.com/assets/images/new-imge/Logo-XS.png",
      "brand": { "@type": "Brand", "name": "Flowxtra" },
      "offers": [
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "EUR",
          "price": "99",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "DE",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        },
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "USD",
          "price": "99",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        }
      ],
      "category": "Recruitment Software",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Flowxtra Professional Plan",
      "description": "For active companies. Includes 35 job postings per month, 15 user seats, newsletter, talent pool, reports & analytics, database migration, and all basic features.",
      "image": "https://flowxtra.com/assets/images/new-imge/Logo-XS.png",
      "brand": { "@type": "Brand", "name": "Flowxtra" },
      "offers": [
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "EUR",
          "price": "249",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "DE",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        },
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "USD",
          "price": "249",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        }
      ],
      "category": "Recruitment Software",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Flowxtra Advanced Plan",
      "description": "For large teams. Includes 45 job postings per month, 20 user seats, priority support, and all professional features.",
      "image": "https://flowxtra.com/assets/images/new-imge/Logo-XS.png",
      "brand": { "@type": "Brand", "name": "Flowxtra" },
      "offers": [
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "EUR",
          "price": "399",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "DE",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        },
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "USD",
          "price": "399",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        }
      ],
      "category": "Recruitment Software",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Flowxtra Premium Plan",
      "description": "For big organizations. Includes 65 job postings per month, unlimited user seats, premium support with online meetings, and all advanced features.",
      "image": "https://flowxtra.com/assets/images/new-imge/Logo-XS.png",
      "brand": { "@type": "Brand", "name": "Flowxtra" },
      "offers": [
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "EUR",
          "price": "799",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "DE",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        },
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "USD",
          "price": "799",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        }
      ],
      "category": "Recruitment Software",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Flowxtra Enterprise Plan",
      "description": "For custom needs. Includes unlimited job postings, unlimited user seats, unlimited ATS requirement, dedicated account manager, custom integrations, and all premium features.",
      "image": "https://flowxtra.com/assets/images/new-imge/Logo-XS.png",
      "brand": { "@type": "Brand", "name": "Flowxtra" },
      "offers": [
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "EUR",
          "price": "0",
          "priceValidUntil": "2027-12-31",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "0",
            "priceCurrency": "EUR",
            "valueAddedTaxIncluded": "false"
          },
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "DE",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        },
        {
          "@type": "Offer",
          "url": `${baseUrl}/pricing/`,
          "priceCurrency": "USD",
          "price": "0",
          "priceValidUntil": "2027-12-31",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "0",
            "priceCurrency": "USD",
            "valueAddedTaxIncluded": "false"
          },
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "seller": { "@type": "Organization", "name": "Flowxtra GmbH" }
        }
      ],
      "category": "Recruitment Software",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  ];

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Flowxtra free to use for posting job?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Flowxtra offers a completely FREE plan with UNLIMITED job postings — forever. No credit card required, no hidden fees, no limits. Post as many jobs as you need across your career page, Google Jobs, LinkedIn, Facebook, and Instagram — all free forever."
        }
      },
      {
        "@type": "Question",
        "name": "How many free job postings do companies get with Flowxtra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flowxtra's Free plan offers UNLIMITED job postings — forever. There are no limits, no monthly caps, and no restrictions. Post as many jobs as you need across your career page, Google Jobs, LinkedIn, Facebook, and Instagram at no cost — all free forever. No credit card required. Upgrade to paid plans for additional features like advanced analytics, priority support, and team collaboration tools."
        }
      },
      {
        "@type": "Question",
        "name": "How much does Flowxtra recruitment software cost for companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flowxtra ATS pricing starts at €0 for the Free plan with UNLIMITED job postings. For companies, plans range from €30/month (Starter - 15 jobs, 5 team members) to €799/month (Premium - 65 jobs, unlimited users). Enterprise companies receive custom pricing with unlimited job postings, dedicated support, and tailored solutions. All plans include multiposting to Google Jobs, LinkedIn, Facebook, and Instagram — all free forever on the Free plan. Plus GDPR compliance, career pages, and 24/7 support."
        }
      },
      {
        "@type": "Question",
        "name": "What features are included in each Flowxtra ATS pricing plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All Flowxtra plans include core recruitment features: multiposting to Google Jobs, LinkedIn, Facebook, Instagram, and 50+ job boards (all free forever on the Free plan), career pages, Kanban boards, online meeting tools, and GDPR compliance. Higher plans add advanced features like AI-powered automation, unlimited storage, journey flow builders, recruitment analytics, talent pools, custom domains, and white-label branding. Enterprise plans include dedicated account managers and custom integrations."
        }
      },
      {
        "@type": "Question",
        "name": "Can companies upgrade their Flowxtra plan as they grow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, companies can upgrade their Flowxtra subscription at any time to access more job postings, team seats, and advanced hiring features. Upgrades are instant and prorated. Growing businesses typically start with Starter (€30/month) and scale to Professional (€249/month) or Enterprise as hiring volume increases. No data migration needed when upgrading."
        }
      },
      {
        "@type": "Question",
        "name": "How many job postings can companies publish with Flowxtra ATS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flowxtra allows companies to publish multiple job postings depending on their plan: Free (unlimited), Starter (15), Basic (25), Professional (35), Advanced (45), Premium (65), and Enterprise (unlimited). All job postings are automatically distributed to Google Jobs, LinkedIn, Facebook, Instagram, and 50+ platforms at no extra cost — all free forever on the Free plan. The Free plan offers unlimited job postings with no monthly limits or restrictions."
        }
      },
      {
        "@type": "Question",
        "name": "Does Flowxtra applicant tracking system integrate with Google for Jobs and LinkedIn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra automatically posts all job openings to Google Jobs, LinkedIn, Facebook, and Instagram for free forever on the Free plan. Our multiposting feature also distributes jobs to Indeed, Stepstone, and 50+ job boards simultaneously. This helps companies reach more qualified candidates without manual posting or additional fees. Jobs appear on Google Search, LinkedIn, Facebook, and Instagram within 24-48 hours — all free forever."
        }
      },
      {
        "@type": "Question",
        "name": "Can Flowxtra recruitment software integrate with existing HR systems and tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra integrates with major HR software, CRM systems, and business tools through API connections and webhooks. All plans include API access for custom integrations with payroll systems, HRIS platforms, email marketing tools like Mailchimp, calendar apps, and communication platforms. Enterprise plans include dedicated integration support and custom development."
        }
      },
      {
        "@type": "Question",
        "name": "How many team members can collaborate in Flowxtra hiring platform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flowxtra supports team collaboration with user seats varying by plan: Free (1 user), Starter (5), Basic (10), Professional (15), Advanced (20), Premium and Enterprise (unlimited). Team members can access role-based permissions for recruiters, hiring managers, and admins. All users can collaborate on candidate reviews, interview scheduling, and hiring decisions in real-time."
        }
      },
      {
        "@type": "Question",
        "name": "What is multiposting and how does it help companies hire faster?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multiposting is automated job distribution to 50+ platforms simultaneously including Google for Jobs, LinkedIn, Indeed, Stepstone, and social media. Instead of manually posting to each site, Flowxtra publishes once and reaches candidates across all channels instantly. This increases job visibility by 400%, reduces time-to-hire by 50%, and attracts 3-5x more qualified applicants for companies."
        }
      },
      {
        "@type": "Question",
        "name": "Does Flowxtra provide recruitment analytics for data-driven hiring decisions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra offers comprehensive recruitment analytics starting from the Professional plan. Track key metrics including source effectiveness, time-to-hire, pipeline conversion rates, drop-off points, team productivity, and candidate quality scores. Analytics dashboards provide real-time insights to optimize hiring strategies and reduce recruitment costs. Export reports in CSV and Excel formats."
        }
      },
      {
        "@type": "Question",
        "name": "Can recruitment agencies manage multiple clients with Flowxtra ATS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra's client profiles feature (available from Basic plan) allows recruitment agencies to manage multiple client companies with separate job postings, hiring pipelines, candidate databases, and team permissions. Each client gets isolated data, custom branding, and dedicated workflows. Perfect for staffing agencies handling 10-100+ clients simultaneously with full transparency and security."
        }
      },
      {
        "@type": "Question",
        "name": "Does Flowxtra support multi-location hiring for enterprise companies with global offices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra's multi-office feature (from Basic plan) helps enterprise companies organize hiring across multiple locations, countries, and regions. Assign jobs, users, and reports by office location. Support for international hiring includes multi-language job postings, local compliance (GDPR, CCPA), timezone management, and location-based analytics for companies with 5-500+ offices worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI-powered recruitment automation work in Flowxtra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flowxtra uses AI to automate repetitive hiring tasks while keeping humans in control. AI features include job description generation, candidate CV parsing, smart search through applications, automated interview scheduling, and email responses. Important: Flowxtra does NOT use AI for automated candidate scoring, ranking, or selection decisions - all hiring choices remain with your team, ensuring EU AI Act compliance."
        }
      },
      {
        "@type": "Question",
        "name": "Can companies automate candidate communication and email workflows?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra automates candidate communication with customizable email templates, automated confirmations, rejection notifications, interview reminders, and follow-ups. Advanced plans include Journey Flow automation - create conditional workflows that send personalized emails based on candidate actions, stage changes, or custom triggers. Save 10+ hours per week on candidate communication while improving response rates by 60%."
        }
      },
      {
        "@type": "Question",
        "name": "What is recruitment workflow automation and how does Journey Flow help companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Journey Flow (from Basic plan) is an advanced workflow automation builder for recruitment. Create custom hiring processes with conditional logic, automated actions, and multi-step sequences. Examples: auto-send welcome emails when candidates apply, request documents after screening, schedule interviews automatically, send contracts to selected candidates, and trigger onboarding workflows. Similar to n8n but designed specifically for recruitment teams."
        }
      },
      {
        "@type": "Question",
        "name": "Does Flowxtra offer AI job description generator for faster hiring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra's AI job ad builder (from Basic plan) generates optimized job descriptions in seconds. Input role title, requirements, and company details - AI creates compelling, SEO-optimized job postings that attract quality candidates. Includes industry best practices, inclusive language suggestions, and keyword optimization for better visibility on job boards. Companies reduce job posting time from 2 hours to 5 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Is Flowxtra GDPR compliant for European companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra is fully GDPR and CCPA compliant on all plans. Features include consent management, data access controls, right to erasure, data portability, audit trails, and EU-hosted servers. Candidate data is encrypted, stored securely, and managed exclusively by your company. Automated compliance reports help HR teams meet legal requirements. Flowxtra also complies with EU AI Act transparency requirements for recruitment systems."
        }
      },
      {
        "@type": "Question",
        "name": "Can companies use custom domains for their career pages and job portals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Flowxtra supports custom domains (from Starter plan) for career pages and application forms. Use careers.yourcompany.com instead of yourcompany.flowxtra.com to strengthen employer branding. Includes SSL certificates, DNS configuration support, and full customization of colors, fonts, logos, and content. Companies see 45% higher application rates with branded custom domains versus generic subdomains."
        }
      },
      {
        "@type": "Question",
        "name": "Does Flowxtra offer unlimited data storage for candidate resumes and files?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, unlimited data storage is included from the Basic plan and above. Store unlimited candidate resumes, cover letters, portfolios, interview recordings, assessments, and documents without storage caps or additional fees. All files are encrypted, backed up daily, and accessible instantly. Lower plans (Free and Starter) include generous storage limits suitable for small teams with moderate hiring volumes."
        }
      },
      {
        "@type": "Question",
        "name": "What support options does Flowxtra provide for companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flowxtra offers 24/7 support on all plans. Free plan includes ticket support, Starter through Advanced provide live chat support, Premium and Enterprise add online meeting support with senior engineers. All companies receive email support, knowledge base access, video tutorials, and onboarding assistance. Enterprise clients get dedicated account managers, priority support channels, and custom training sessions for hiring teams."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can companies start hiring with Flowxtra ATS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companies can start hiring with Flowxtra in under 10 minutes. Sign up, create your first job posting, and it's automatically published to your career page and distributed to Google for Jobs, LinkedIn, and 50+ job boards instantly. No technical setup, credit card, or contracts required for the Free plan. Upgrade anytime as your hiring needs grow. Most companies receive their first applications within 24 hours."
        }
      }
    ]
  };

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Product Schemas for all plans */}
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {children}
    </>
  );
}

