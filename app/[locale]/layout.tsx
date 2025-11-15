import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { headers } from 'next/headers';
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import ClientScripts from "@/components/ClientScripts";
import AccessibilityWidgetLoader from "@/components/Accessibility/AccessibilityWidgetLoader";
import AffiliateBanner from "@/components/AffiliateBanner";

// Lazy load non-critical components to reduce initial bundle size
// Header and Footer are loaded after initial render to reduce main-thread work
const Header = dynamic(() => import("@/components/Header"), {
  ssr: true, // Keep SSR for SEO, but load JS asynchronously
  loading: () => <div className="h-20 bg-white dark:bg-gray-900" />, // Reserve space to prevent layout shift
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: () => <div className="h-64 bg-white dark:bg-gray-900" />, // Reserve space to prevent layout shift
});

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003f4d",
};

// SEO Metadata per locale
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
  
  // Build canonical URL and hreflang URLs based on current pathname
  // Only set canonical for homepage and pages without nested layouts
  // Pages with nested layouts (blog/[slug], etc.) define their own canonical
  let canonicalUrl: string | undefined = undefined;
  let hreflangUrls: Record<string, string> = {};
  
  if (pathname && pathname.startsWith(`/${locale}`)) {
    // Extract the path after locale (e.g., "/blog", "/pricing", etc.)
    const pathAfterLocale = pathname.replace(`/${locale}`, '') || '/';

    // List of pages that have nested layouts and define their own canonical URLs
    const pagesWithNestedLayouts = [
      '/social-media-management',
      '/free-job-posting',
      '/kostenlose-stellenausschreibung',
      '/contact-us',
      '/kontakt',
      '/pricing',
      '/preise',
      '/dpa',
      '/imprint',
      '/impressum',
      '/disclaimer',
      '/privacy-policy',
      '/datenschutz',
      '/cookie-policy',
      '/cookie-richtlinie',
      '/terms-of-use',
      '/nutzungsbedingungen',
      '/affiliate',
      '/about',
      '/ueber-uns',
      '/app-store',
    ];

    // Check if this is a page that should have canonical in root layout
    // Skip pages with nested layouts (blog posts, app store items, etc.)
    const hasNestedLayout = (pathname.match(/\/blog\/[^\/]+/) || // Blog post: /en/blog/slug
                             pathname.match(/\/app-store\/[^\/]+/) || // App store item: /en/app-store/slug
                             pagesWithNestedLayouts.some(page => pathAfterLocale === page)); // Pages with their own layouts
    
    if (!hasNestedLayout) {
      // This is a simple page (homepage, pricing, etc.)
      canonicalUrl = `${currentBaseUrl}${pathname}`;
      
      // Build hreflang URLs for the same page in all languages
      // Use the same base URL as canonical to ensure consistency
      // Include DACH locales (de-at, de-ch) and English locales (en-us, en-gb, en-au, en-ca) with proper hreflang codes
      // Map locale codes to hreflang codes (de → de-DE, de-at → de-AT, de-ch → de-CH, en → en-US, en-us → en-US, en-gb → en-GB, en-au → en-AU, en-ca → en-CA)
      const supportedLocales = ['en', 'en-us', 'en-gb', 'en-au', 'en-ca', 'de', 'de-at', 'de-ch', 'fr', 'es', 'it', 'nl', 'ar'];
      supportedLocales.forEach(lang => {
        // Convert locale to hreflang code
        let hreflangCode = lang;
        if (lang === 'de') hreflangCode = 'de-DE';
        else if (lang === 'de-at') hreflangCode = 'de-AT';
        else if (lang === 'de-ch') hreflangCode = 'de-CH';
        else if (lang === 'en') hreflangCode = 'en-US'; // Default English is US
        else if (lang === 'en-us') hreflangCode = 'en-US';
        else if (lang === 'en-gb') hreflangCode = 'en-GB';
        else if (lang === 'en-au') hreflangCode = 'en-AU';
        else if (lang === 'en-ca') hreflangCode = 'en-CA';
        hreflangUrls[hreflangCode] = `${currentBaseUrl}/${lang}${pathAfterLocale}`;
      });
    }
    // If hasNestedLayout, leave canonicalUrl as undefined - nested layout will handle it
  } else {
    // Fallback to homepage if pathname is not available
    canonicalUrl = `${currentBaseUrl}/${locale}`;
    const supportedLocales = ['en', 'en-us', 'en-gb', 'en-au', 'en-ca', 'de', 'de-at', 'de-ch', 'fr', 'es', 'it', 'nl', 'ar'];
    supportedLocales.forEach(lang => {
      // Convert locale to hreflang code
      let hreflangCode = lang;
      if (lang === 'de') hreflangCode = 'de-DE';
      else if (lang === 'de-at') hreflangCode = 'de-AT';
      else if (lang === 'de-ch') hreflangCode = 'de-CH';
      else if (lang === 'en') hreflangCode = 'en-US'; // Default English is US
      else if (lang === 'en-us') hreflangCode = 'en-US';
      else if (lang === 'en-gb') hreflangCode = 'en-GB';
      else if (lang === 'en-au') hreflangCode = 'en-AU';
      else if (lang === 'en-ca') hreflangCode = 'en-CA';
      hreflangUrls[hreflangCode] = `${currentBaseUrl}/${lang}`;
    });
  }
  
  const metadata = {
    en: {
      title: {
        default: "Flowxtra – Best Recruiting Software | Smart Hiring Tool | Free Job Posting",
        template: "%s | Flowxtra",
      },
      description: "The best recruiting software. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
      keywords: ["recruitment", "recruiting software", "ATS", "AI-powered hiring", "smart hiring tool", "free job posting", "candidate management", "hiring platform"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Best Recruiting Software | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
        type: "website",
        locale: "en_US",
        url: `${baseUrl}/en`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Best Recruiting Software | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
      },
      // Only add alternates if canonicalUrl is defined (i.e., no nested layout)
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    "en-us": {
      title: {
        default: "Flowxtra – Best Recruiting Software in the United States | Smart Hiring Tool | Free Job Posting",
        template: "%s | Flowxtra",
      },
      description: "The best recruiting software in the United States. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in the United States.",
      keywords: ["recruitment", "recruiting software", "ATS", "AI-powered hiring", "smart hiring tool", "free job posting", "candidate management", "hiring platform", "United States"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Best Recruiting Software in the United States | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software in the United States. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in the United States.",
        type: "website",
        locale: "en_US",
        url: `${baseUrl}/en-us`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Best Recruiting Software in the United States | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software in the United States. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in the United States.",
      },
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    "en-gb": {
      title: {
        default: "Flowxtra – Best Recruiting Software in the United Kingdom | Smart Hiring Tool | Free Job Posting",
        template: "%s | Flowxtra",
      },
      description: "The best recruiting software in the United Kingdom. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in the United Kingdom.",
      keywords: ["recruitment", "recruiting software", "ATS", "AI-powered hiring", "smart hiring tool", "free job posting", "candidate management", "hiring platform", "United Kingdom"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Best Recruiting Software in the United Kingdom | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software in the United Kingdom. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in the United Kingdom.",
        type: "website",
        locale: "en_GB",
        url: `${baseUrl}/en-gb`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Best Recruiting Software in the United Kingdom | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software in the United Kingdom. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in the United Kingdom.",
      },
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    "en-au": {
      title: {
        default: "Flowxtra – Best Recruiting Software in Australia | Smart Hiring Tool | Free Job Posting",
        template: "%s | Flowxtra",
      },
      description: "The best recruiting software in Australia. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in Australia.",
      keywords: ["recruitment", "recruiting software", "ATS", "AI-powered hiring", "smart hiring tool", "free job posting", "candidate management", "hiring platform", "Australia"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Best Recruiting Software in Australia | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software in Australia. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in Australia.",
        type: "website",
        locale: "en_AU",
        url: `${baseUrl}/en-au`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Best Recruiting Software in Australia | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software in Australia. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in Australia.",
      },
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    "en-ca": {
      title: {
        default: "Flowxtra – Best Recruiting Software in Canada | Smart Hiring Tool | Free Job Posting",
        template: "%s | Flowxtra",
      },
      description: "The best recruiting software in Canada. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in Canada.",
      keywords: ["recruitment", "recruiting software", "ATS", "AI-powered hiring", "smart hiring tool", "free job posting", "candidate management", "hiring platform", "Canada"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Best Recruiting Software in Canada | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software in Canada. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in Canada.",
        type: "website",
        locale: "en_CA",
        url: `${baseUrl}/en-ca`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Best Recruiting Software in Canada | Smart Hiring Tool | Free Job Posting",
        description: "The best recruiting software in Canada. Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform. Optimized for businesses in Canada.",
      },
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    de: {
      title: {
        default: "Flowxtra – Bestes Recruiting-Software in Deutschland | Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        template: "%s | Flowxtra",
      },
      description: "Das beste Recruiting-Software in Deutschland. Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform.",
      keywords: ["Rekrutierung", "Recruiting-Software", "ATS", "KI-gestützte Einstellung", "intelligentes Einstellungstool", "kostenlose Stellenausschreibung", "Kandidatenverwaltung", "Einstellungsplattform"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Bestes Recruiting-Software in Deutschland | Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Das beste Recruiting-Software in Deutschland. Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform.",
        type: "website",
        locale: "de_DE",
        url: `${baseUrl}/de`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Bestes Recruiting-Software in Deutschland | Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Das beste Recruiting-Software in Deutschland. Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform.",
      },
      // Only add alternates if canonicalUrl is defined (i.e., no nested layout)
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    "de-at": {
      title: {
        default: "Flowxtra – Bestes Recruiting-Software in Österreich | Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        template: "%s | Flowxtra",
      },
      description: "Das beste Recruiting-Software in Österreich. Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform. Speziell für Unternehmen in Österreich optimiert.",
      keywords: ["Rekrutierung", "Recruiting-Software", "ATS", "KI-gestützte Einstellung", "intelligentes Einstellungstool", "kostenlose Stellenausschreibung", "Kandidatenverwaltung", "Einstellungsplattform", "Österreich"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Bestes Recruiting-Software in Österreich | Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Das beste Recruiting-Software in Österreich. Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform. Speziell für Unternehmen in Österreich optimiert.",
        type: "website",
        locale: "de_AT",
        url: `${baseUrl}/de-at`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Bestes Recruiting-Software in Österreich | Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Das beste Recruiting-Software in Österreich. Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform. Speziell für Unternehmen in Österreich optimiert.",
      },
      // Only add alternates if canonicalUrl is defined (i.e., no nested layout)
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    "de-ch": {
      title: {
        default: "Flowxtra – Bestes Recruiting-Software in der Schweiz | Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        template: "%s | Flowxtra",
      },
      description: "Das beste Recruiting-Software in der Schweiz. Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform. Speziell für Unternehmen in der Schweiz optimiert.",
      keywords: ["Rekrutierung", "Recruiting-Software", "ATS", "KI-gestützte Einstellung", "intelligentes Einstellungstool", "kostenlose Stellenausschreibung", "Kandidatenverwaltung", "Einstellungsplattform", "Schweiz"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Bestes Recruiting-Software in der Schweiz | Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Das beste Recruiting-Software in der Schweiz. Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform. Speziell für Unternehmen in der Schweiz optimiert.",
        type: "website",
        locale: "de_CH",
        url: `${baseUrl}/de-ch`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Bestes Recruiting-Software in der Schweiz | Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Das beste Recruiting-Software in der Schweiz. Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform. Speziell für Unternehmen in der Schweiz optimiert.",
      },
      // Only add alternates if canonicalUrl is defined (i.e., no nested layout)
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    fr: {
      title: {
        default: "Flowxtra – Meilleur Logiciel de Recrutement en France | Outil d'Embauche Intelligent | Publication d'Emplois Gratuite",
        template: "%s | Flowxtra",
      },
      description: "Le meilleur logiciel de recrutement en France. Embauchez plus intelligemment avec l'IA — publiez des offres d'emploi gratuitement et gérez les candidats sur une plateforme simple et puissante.",
      keywords: ["recrutement", "logiciel de recrutement", "ATS", "embauche alimentée par l'IA", "outil d'embauche intelligent", "publication d'emplois gratuite", "gestion des candidats", "plateforme d'embauche"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Meilleur Logiciel de Recrutement en France | Outil d'Embauche Intelligent | Publication d'Emplois Gratuite",
        description: "Le meilleur logiciel de recrutement en France. Embauchez plus intelligemment avec l'IA — publiez des offres d'emploi gratuitement et gérez les candidats sur une plateforme simple et puissante.",
        type: "website",
        locale: "fr_FR",
        url: `${baseUrl}/fr`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Meilleur Logiciel de Recrutement en France | Outil d'Embauche Intelligent | Publication d'Emplois Gratuite",
        description: "Le meilleur logiciel de recrutement en France. Embauchez plus intelligemment avec l'IA — publiez des offres d'emploi gratuitement et gérez les candidats sur une plateforme simple et puissante.",
      },
      // Only add alternates if canonicalUrl is defined (i.e., no nested layout)
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    es: {
      title: {
        default: "Flowxtra – Mejor Software de Reclutamiento en España | Herramienta de Contratación Inteligente | Publicación de Empleos Gratuita",
        template: "%s | Flowxtra",
      },
      description: "El mejor software de reclutamiento en España. Contrata de forma más inteligente con IA — publica empleos gratis y gestiona candidatos en una plataforma simple y potente.",
      keywords: ["reclutamiento", "software de reclutamiento", "ATS", "contratación con IA", "herramienta de contratación inteligente", "publicación de empleos gratuita", "gestión de candidatos", "plataforma de contratación"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Mejor Software de Reclutamiento en España | Herramienta de Contratación Inteligente | Publicación de Empleos Gratuita",
        description: "El mejor software de reclutamiento en España. Contrata de forma más inteligente con IA — publica empleos gratis y gestiona candidatos en una plataforma simple y potente.",
        type: "website",
        locale: "es_ES",
        url: `${baseUrl}/es`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Mejor Software de Reclutamiento en España | Herramienta de Contratación Inteligente | Publicación de Empleos Gratuita",
        description: "El mejor software de reclutamiento en España. Contrata de forma más inteligente con IA — publica empleos gratis y gestiona candidatos en una plataforma simple y potente.",
      },
      // Only add alternates if canonicalUrl is defined (i.e., no nested layout)
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    it: {
      title: {
        default: "Flowxtra – Miglior Software di Reclutamento in Italia | Strumento di Assunzione Intelligente | Pubblicazione Lavori Gratuita",
        template: "%s | Flowxtra",
      },
      description: "Il miglior software di reclutamento in Italia. Assumi in modo più intelligente con l'IA — pubblica offerte di lavoro gratuitamente e gestisci i candidati su una piattaforma semplice e potente.",
      keywords: ["reclutamento", "software di reclutamento", "ATS", "assunzione con IA", "strumento di assunzione intelligente", "pubblicazione lavori gratuita", "gestione candidati", "piattaforma di assunzione"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Miglior Software di Reclutamento in Italia | Strumento di Assunzione Intelligente | Pubblicazione Lavori Gratuita",
        description: "Il miglior software di reclutamento in Italia. Assumi in modo più intelligente con l'IA — pubblica offerte di lavoro gratuitamente e gestisci i candidati su una piattaforma semplice e potente.",
        type: "website",
        locale: "it_IT",
        url: `${baseUrl}/it`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Miglior Software di Reclutamento in Italia | Strumento di Assunzione Intelligente | Pubblicazione Lavori Gratuita",
        description: "Il miglior software di reclutamento in Italia. Assumi in modo più intelligente con l'IA — pubblica offerte di lavoro gratuitamente e gestisci i candidati su una piattaforma semplice e potente.",
      },
      // Only add alternates if canonicalUrl is defined (i.e., no nested layout)
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    nl: {
      title: {
        default: "Flowxtra – Beste Wervingssoftware in Nederland | Slimme Wervings Tool | Gratis Vacatures Plaatsen",
        template: "%s | Flowxtra",
      },
      description: "De beste wervingssoftware in Nederland. Werve slimmer met AI — plaats vacatures gratis en beheer kandidaten op één eenvoudig, krachtig platform.",
      keywords: ["werving", "wervingssoftware", "ATS", "AI-aangedreven werving", "slimme wervings tool", "gratis vacatures plaatsen", "kandidaatbeheer", "wervingsplatform"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Beste Wervingssoftware in Nederland | Slimme Wervings Tool | Gratis Vacatures Plaatsen",
        description: "De beste wervingssoftware in Nederland. Werve slimmer met AI — plaats vacatures gratis en beheer kandidaten op één eenvoudig, krachtig platform.",
        type: "website",
        locale: "nl_NL",
        url: `${baseUrl}/nl`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Beste Wervingssoftware in Nederland | Slimme Wervings Tool | Gratis Vacatures Plaatsen",
        description: "De beste wervingssoftware in Nederland. Werve slimmer met AI — plaats vacatures gratis en beheer kandidaten op één eenvoudig, krachtig platform.",
      },
      // Only add alternates if canonicalUrl is defined (i.e., no nested layout)
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
    ar: {
      title: {
        default: "Flowxtra – أفضل برنامج توظيف | أداة التوظيف الذكية | نشر الوظائف مجاناً",
        template: "%s | Flowxtra",
      },
      description: "أفضل برنامج توظيف. وظّف بذكاء أكبر مع الذكاء الاصطناعي — انشر الوظائف مجاناً وأدر المرشحين في منصة واحدة بسيطة وقوية.",
      keywords: ["توظيف", "برنامج توظيف", "ATS", "توظيف بالذكاء الاصطناعي", "أداة توظيف ذكية", "نشر وظائف مجاني", "إدارة المرشحين", "منصة توظيف"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – أفضل برنامج توظيف | أداة التوظيف الذكية | نشر الوظائف مجاناً",
        description: "أفضل برنامج توظيف. وظّف بذكاء أكبر مع الذكاء الاصطناعي — انشر الوظائف مجاناً وأدر المرشحين في منصة واحدة بسيطة وقوية.",
        type: "website",
        locale: "ar_SA",
        url: `${baseUrl}/ar`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – أفضل برنامج توظيف | أداة التوظيف الذكية | نشر الوظائف مجاناً",
        description: "أفضل برنامج توظيف. وظّف بذكاء أكبر مع الذكاء الاصطناعي — انشر الوظائف مجاناً وأدر المرشحين في منصة واحدة بسيطة وقوية.",
      },
      // Only add alternates if canonicalUrl is defined (i.e., no nested layout)
      ...(canonicalUrl && {
        alternates: {
          canonical: canonicalUrl,
          languages: Object.keys(hreflangUrls).length > 0 ? hreflangUrls : {
            'en': `${baseUrl}/en`,
            'en-US': `${baseUrl}/en-us`,
            'en-GB': `${baseUrl}/en-gb`,
            'en-AU': `${baseUrl}/en-au`,
            'en-CA': `${baseUrl}/en-ca`,
            'de-DE': `${baseUrl}/de`,
            'de-AT': `${baseUrl}/de-at`,
            'de-CH': `${baseUrl}/de-ch`,
            'fr': `${baseUrl}/fr`,
            'es': `${baseUrl}/es`,
            'it': `${baseUrl}/it`,
            'nl': `${baseUrl}/nl`,
            'ar': `${baseUrl}/ar`,
            'x-default': `${baseUrl}/`,
          },
        },
      }),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // CRITICAL: Pass locale explicitly to getMessages
  const messages = await getMessages({ locale });

  // Get metadata for current locale to access description
  const pageMetadata = await generateMetadata({ params: Promise.resolve({ locale }) });
  const metaDescription = typeof pageMetadata.description === 'string' 
    ? pageMetadata.description 
    : '';

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Meta description - Explicitly add to ensure Lighthouse detects it */}
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
        
        {/* Preload critical fonts to prevent layout shift */}
        <link
          rel="preload"
          href="/fonts/Roboto-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roboto-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roboto-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preload LCP image (mobile) - Critical for performance */}
        <link
          rel="preload"
          href="/img/ATS-Software-for-Recruitment2.svg"
          as="image"
          type="image/svg+xml"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        {/* Preload LCP image (desktop) - Critical for performance */}
        <link
          rel="preload"
          href="/img/ATS-Software-for-Recruitment.svg"
          as="image"
          type="image/svg+xml"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
        {/* Preload first slider image - Critical for features section */}
        <link
          rel="preload"
          href="/img/Smarter-Candidate-Filtering.svg"
          as="image"
          type="image/svg+xml"
          fetchPriority="high"
        />
        {/* Preload second slider image - Important for features section */}
        <link
          rel="preload"
          href="/img/candidate-fiter.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />

        {/* Preload Font Awesome fonts - Self-hosted for better performance */}
        <link
          rel="preload"
          href="/fonts/fa-solid-900.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/fa-brands-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Font Awesome CSS - Self-hosted for optimal performance */}
        {/* @font-face rules with font-display: swap are defined in globals.css using local fonts */}
        {/* Load Font Awesome CSS - non-blocking (fonts are preloaded above) */}
        <link
          rel="stylesheet"
          href="/fonts/fontawesome.min.css"
        />
        
        {/* DNS prefetch removed - scripts are lazy loaded after user interaction, prefetch is unnecessary and triggers "unused preconnect" warnings */}
        
        {/* Apply dark mode immediately before React loads to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Prevent scroll restoration - Always start at top of page */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Disable browser scroll restoration
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                // Ensure page starts at top on load
                if (typeof window !== 'undefined') {
                  window.addEventListener('load', function() {
                    // Only scroll to top if there's no hash in URL
                    if (!window.location.hash) {
                      window.scrollTo(0, 0);
                    }
                  });
                  // Also scroll to top immediately if page is already loaded
                  if (document.readyState === 'complete') {
                    if (!window.location.hash) {
                      window.scrollTo(0, 0);
                    }
                  }
                }
              })();
            `,
          }}
        />
        {/* Tracking scripts will be loaded by CookieScriptLoader only after consent */}
        
        {/* Homepage Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Flowxtra GmbH",
              "legalName": "Flowxtra GmbH",
              "url": "https://flowxtra.com",
              "logo": "https://flowxtra.com/wp-content/uploads/2025/02/Signature@2x.png",
              "description": "Flowxtra GmbH provides an AI-powered platform that unites recruitment, social media management, and e-signature tools — scalable for startups, SMEs, and large enterprises. The only system worldwide offering 10 free job postings monthly, fully compliant with EU AI Act, GDPR, CCPA, and CPRA.",
              "foundingDate": "2025",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Wipplingerstraße 20/18",
                "addressLocality": "Wien",
                "postalCode": "1010",
                "addressCountry": "AT"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+43-676-905-4441",
                  "contactType": "Customer Support",
                  "email": "support@flowxtra.com",
                  "availableLanguage": ["en", "de", "fr", "es", "it", "nl", "ar"],
                  "areaServed": "Worldwide"
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/flowxtra",
                "https://www.facebook.com/Fowxtra",
                "https://x.com/flowxtra_com",
                "https://www.instagram.com/flowxtra_com/",
                "https://youtube.com/@flowxtra_com",
                "https://medium.com/@flowxtra",
                "https://www.tiktok.com/@flowxtra.ai"
              ],
              "keywords": "ats software, ai recruitment software, free ats, applicant tracking system, applicant tracking software, candidate tracking system, hr recruiting software, hiring software, best ats software 2026, free ats software, ai hiring software, social media management platforms, social media monitoring tools, social media manager tool, social media scheduler, recruitment software",
              "areaServed": "Worldwide",
              "legalJurisdiction": ["Austrian Law", "EU Regulations", "California Law"],
              "knowsAbout": ["EU AI Act", "GDPR", "CCPA", "CPRA", "Recruitment automation", "Social media management", "Digital signature"]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
              "operatingSystem": "Web, Windows, macOS",
              "applicationCategory": "BusinessApplication",
              "applicationSubCategory": "AI Recruiting Software, Social Media Management, E-Signature",
              "description": "Flowxtra is an all-in-one AI-powered business suite combining recruiting, social media management, and digital contract signing. Built for startups, SMEs, and large enterprises — 10 free job postings monthly and full compliance with EU and US privacy laws.",
              "softwareVersion": "1.0",
              "url": "https://flowxtra.com",
              "audience": {
                "@type": "Audience",
                "audienceType": ["Startups", "Small and medium-sized businesses (SMBs)", "Large enterprises", "Recruitment agencies"]
              },
              "keywords": [
                "ats software",
                "ai recruitment software",
                "free ats",
                "applicant tracking system",
                "applicant tracking software",
                "hr recruiting software",
                "hiring software",
                "best ats software 2026",
                "best ats software 2027",
                "free ats software",
                "ai hiring software",
                "candidate tracking system",
                "social media management platforms",
                "social media monitoring tools",
                "social media manager tool",
                "social media scheduler",
                "recruitment software",
                "hiring manager software"
              ],
              "creator": {
                "@type": "Organization",
                "name": "Flowxtra GmbH"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "price": "0.00",
                  "priceCurrency": "EUR",
                  "url": "https://flowxtra.com/pricing/",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "price": "0.00",
                  "priceCurrency": "USD",
                  "url": "https://flowxtra.com/pricing/",
                  "availability": "https://schema.org/InStock"
                }
              ],
              "featureList": [
                "10 free job postings monthly — exclusive to Flowxtra",
                "AI-driven Applicant Tracking System (ATS)",
                "Social media post scheduler & analytics",
                "Digital e-signature and document tracking",
                "Smart candidate board with drag-and-drop pipeline",
                "Custom email templates and multiposting automation",
                "GDPR, EU AI Act, CCPA, and CPRA compliance",
                "Scalable for startups, SMEs, and large enterprises"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "50",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Sarah Mitchell",
                    "jobTitle": "HR Manager"
                  },
                  "datePublished": "2025-07-12",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "reviewBody": "Flowxtra transformed our hiring process! The free 10 job postings monthly are perfect for our startup, and the AI-powered candidate filtering saves us hours every week."
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Klaus Müller",
                    "jobTitle": "Recruitment Director"
                  },
                  "datePublished": "2025-08-05",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "reviewBody": "Best recruitment software we've ever used. The multiposting feature and social media manager integration are real game changers. Highly recommended!"
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Sophie Laurent",
                    "jobTitle": "HR Manager"
                  },
                  "datePublished": "2025-08-28",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "reviewBody": "As an HR manager, Flowxtra meets all my needs: ATS, social media management, and e-signatures. GDPR compliance gives us complete peace of mind."
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Petra Schneider",
                    "jobTitle": "Talent Acquisition Specialist"
                  },
                  "datePublished": "2025-09-18",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "reviewBody": "Great software with excellent features. The free plan is generous and the user interface is intuitive. Customer support could be faster, but overall very satisfied."
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Michael Thompson",
                    "jobTitle": "CEO & Founder"
                  },
                  "datePublished": "2025-10-22",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "reviewBody": "Finally, an all-in-one solution that actually works! Flowxtra combines recruitment, social media, and contracts seamlessly. The 10 free job posts are a lifesaver."
                }
              ],
              "softwareHelp": {
                "@type": "CreativeWork",
                "url": "https://flowxtra.com/contact-us/"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Flowxtra – Hire Smarter with AI Recruiting & Social Media Tools",
              "description": "See how Flowxtra helps you post jobs for free, automate recruitment, manage social media, and sign contracts online — all in one AI-powered platform.",
              "thumbnailUrl": "https://flowxtra.com/wp-content/uploads/2025/02/Signature@2x.png",
              "uploadDate": "2025-10-27T20:00:00+01:00",
              "publisher": {
                "@type": "Organization",
                "name": "Flowxtra GmbH"
              },
              "contentUrl": `https://www.youtube.com/watch?v=${locale === 'de' ? 'r5sBu2-NOqs' : 'CGa2grClFsw'}`,
              "embedUrl": `https://www.youtube.com/embed/${locale === 'de' ? 'r5sBu2-NOqs' : 'CGa2grClFsw'}`,
              "inLanguage": locale === 'de' ? 'de' : locale === 'ar' ? 'ar' : 'en'
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://flowxtra.com"
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Client-side only scripts - loaded asynchronously */}
          <ClientScripts />
          
          <AffiliateBanner />
          <Header />
          <main suppressHydrationWarning>
            {children}
          </main>
          <Footer />
          <AccessibilityWidgetLoader />
          {/* Vercel Speed Insights - Performance monitoring */}
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

