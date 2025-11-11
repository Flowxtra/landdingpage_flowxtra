import type { Metadata } from "next";
import { headers } from "next/headers";

// Generate SEO metadata for Social Media Management page
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
    : `${currentBaseUrl}/${locale}/social-media-management`;
  
  // Build hreflang URLs for all supported languages
  // Use the same base URL as canonical to ensure consistency
  const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'nl', 'ar'];
  const hreflangUrls: Record<string, string> = {};
  supportedLocales.forEach(lang => {
    hreflangUrls[lang] = `${currentBaseUrl}/${lang}/social-media-management`;
  });
  // Add x-default to indicate the default language version
  hreflangUrls['x-default'] = `${currentBaseUrl}/en/social-media-management`;
  
  const metadata = {
    en: {
      title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
      description: "Manage and analyze your social channels from one platform. Our Social Media Manager saves time, keeps you organized, and helps grow your online presence.",
      keywords: ["social media management", "social media manager", "social media platform", "social media analytics", "manage social media"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
        description: "Manage and analyze your social channels from one platform. Our Social Media Manager saves time, keeps you organized, and helps grow your online presence.",
        url: `${baseUrl}/en/social-media-management`,
        type: "website",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: hreflangUrls,
      },
    },
    de: {
      title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
      description: "Verwalten und analysieren Sie Ihre Social-Media-Kanäle von einer Plattform aus. Unser Social Media Manager spart Zeit, hält Sie organisiert und hilft Ihnen, Ihre Online-Präsenz zu vergrößern.",
      keywords: ["social media management", "social media manager", "social media plattform", "social media analytics", "social media verwalten"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
        description: "Verwalten und analysieren Sie Ihre Social-Media-Kanäle von einer Plattform aus. Unser Social Media Manager spart Zeit, hält Sie organisiert und hilft Ihnen, Ihre Online-Präsenz zu vergrößern.",
        url: `${baseUrl}/de/social-media-management`,
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

export default function SocialMediaManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flowxtra Social Media Management",
    "operatingSystem": "Web, Windows, macOS",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Social Media Management Software",
    "softwareVersion": "1.0",
    "url": "https://flowxtra.com/social-media-manager/",
    "image": "https://flowxtra.com/wp-content/uploads/2025/02/Signature@2x.png",
    "description": "Flowxtra Social Media Manager is your AI-powered hub for scheduling, publishing, and automating content across multiple platforms. Supports integrations with tools like n8n, MCP, LLMS, Canva, and AI agents such as ChatGPT and Gemini. GDPR, CCPA, and EU AI Act compliant.",
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
        "Marketing teams",
        "Agencies",
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
        "name": "Free Forever Plan – Up to 4 Accounts",
        "price": "0.00",
        "priceCurrency": "EUR",
        "url": "https://flowxtra.com/pricing/",
        "availability": "https://schema.org/InStock",
        "category": "FreeSoftware",
        "description": "Free Forever plan for individuals and small teams — manage up to 4 connected social media accounts with scheduling and analytics. No credit card required."
      },
      {
        "@type": "Offer",
        "name": "Free Forever Plan – Up to 4 Accounts (USD)",
        "price": "0.00",
        "priceCurrency": "USD",
        "url": "https://flowxtra.com/pricing/",
        "availability": "https://schema.org/InStock",
        "category": "FreeSoftware",
        "description": "Free Forever plan for individuals and small teams — manage up to 4 connected social media accounts with scheduling and analytics. No credit card required."
      },
      {
        "@type": "Offer",
        "name": "Pro Plan – Pipelines, Collaboration & Unlimited Accounts",
        "price": "30.00",
        "priceCurrency": "EUR",
        "url": "https://flowxtra.com/pricing/",
        "availability": "https://schema.org/InStock",
        "category": "PaidSoftware",
        "description": "Pro Plan includes all Free features plus Pipelines, advanced analytics, and unlimited connected accounts. Starting from €30/month."
      },
      {
        "@type": "Offer",
        "name": "Pro Plan – Pipelines, Collaboration & Unlimited Accounts (USD)",
        "price": "30.00",
        "priceCurrency": "USD",
        "url": "https://flowxtra.com/pricing/",
        "availability": "https://schema.org/InStock",
        "category": "PaidSoftware",
        "description": "Pro Plan includes all Free features plus Pipelines, advanced analytics, and unlimited connected accounts. Starting from $30/month."
      }
    ],
    "featureList": [
      "Free Forever plan — connect up to 4 social media accounts",
      "AI-powered content generation and scheduling",
      "Drag-and-drop visual content calendar",
      "Team pipelines for collaborative publishing",
      "Advanced analytics and engagement tracking",
      "GDPR, EU AI Act, CCPA, and CPRA compliance",
      "Available in EUR (€) and USD ($)"
    ],
    "keywords": [
      "social media management platforms",
      "social media monitoring tools",
      "social monitoring tools",
      "social media manager tool",
      "tool social media management",
      "social media mgmt",
      "social manager tools",
      "social media management software",
      "social media scheduling tool",
      "social media scheduler",
      "social media content manager",
      "community manager social media",
      "best social media management tools",
      "social media content planner",
      "social media post scheduler",
      "post on multiple social media at once",
      "social media posting tools",
      "best social media scheduler",
      "free social media scheduler",
      "social media automation"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Flowxtra Social Media Management free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — Flowxtra Social Media Management offers a free plan that includes up to 4 social media accounts. You can connect your accounts from Instagram, Facebook, LinkedIn, TikTok, and X, manage them from one dashboard, schedule posts, and analyze your activity at no cost. If you need more than 4 accounts, you can upgrade to a paid plan. The only paid feature is the Social Media Pipeline, which allows you to collaborate with teams and partners without giving full access to your accounts."
        }
      },
      {
        "@type": "Question",
        "name": "What is Social Media Pipeline and why do I need it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Social Media Pipeline is a paid feature that enables secure collaboration. With one Pipeline subscription, you can assign up to 2 social media accounts to team members, clients, or departments, generate unique shareable links, and let others create or publish posts—all without accessing your Flowxtra dashboard or social accounts. It's perfect for marketing agencies, large teams, and companies with multiple departments who need to empower collaboration without compromising control."
        }
      },
      {
        "@type": "Question",
        "name": "How many social media accounts can I connect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With the free plan, you can connect up to 4 social media accounts from different platforms (Instagram, Facebook, LinkedIn, TikTok, X) to your Flowxtra dashboard. All accounts are managed from one unified interface, making it easy to plan, schedule, and track your social media activity across all platforms. If you need more than 4 accounts, you can upgrade to a paid subscription plan."
        }
      },
      {
        "@type": "Question",
        "name": "Can I schedule posts for multiple platforms at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Flowxtra's Visual Content Calendar allows you to schedule posts across all your connected platforms (Instagram, Facebook, LinkedIn, TikTok, and X) from one place. Schedule once and publish everywhere, or customize posts for each platform individually. You can also drag and drop to adjust your posting schedule instantly."
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

