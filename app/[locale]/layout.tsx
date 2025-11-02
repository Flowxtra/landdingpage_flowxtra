import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import type { Metadata, Viewport } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieScriptLoader from "@/components/CookieConsent/CookieScriptLoader";
import CookieBanner from "@/components/CookieConsent/CookieBanner";
import FontAwesomeLoader from "@/components/FontAwesomeLoader";

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
  
  // Canonical URL for homepage
  const canonicalUrl = `${baseUrl}/${locale}`;
  
  const metadata = {
    en: {
      title: {
        default: "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
        template: "%s | Flowxtra",
      },
      description: "Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
      keywords: ["recruitment", "recruiting software", "ATS", "AI-powered hiring", "smart hiring tool", "free job posting", "candidate management", "hiring platform"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
        description: "Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
        type: "website",
        locale: "en_US",
        url: `${baseUrl}/en`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
        description: "Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en': `${baseUrl}/en`,
          'de': `${baseUrl}/de`,
        },
      },
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
        default: "Flowxtra – Recruiting-Software & Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        template: "%s | Flowxtra",
      },
      description: "Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform.",
      keywords: ["Rekrutierung", "Recruiting-Software", "ATS", "KI-gestützte Einstellung", "intelligentes Einstellungstool", "kostenlose Stellenausschreibung", "Kandidatenverwaltung", "Einstellungsplattform"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Flowxtra – Recruiting-Software & Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform.",
        type: "website",
        locale: "de_DE",
        url: `${baseUrl}/de`,
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Recruiting-Software & Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform.",
      },
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en': `${baseUrl}/en`,
          'de': `${baseUrl}/de`,
        },
      },
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
    <html lang={locale} suppressHydrationWarning>
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
          href="/img/ATS-Software-for-Recruitment2.webp"
          as="image"
          type="image/webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        {/* Preload LCP image (desktop) - Critical for performance */}
        <link
          rel="preload"
          href="/img/ATS-Software-for-Recruitment.webp"
          as="image"
          type="image/webp"
          media="(min-width: 769px)"
          fetchPriority="high"
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
        {/* Tracking scripts will be loaded by CookieScriptLoader only after consent */}
      </head>
      <body className="antialiased">
        {/* Load Font Awesome only after functional cookies consent */}
        <FontAwesomeLoader />
        {/* Load tracking scripts only if consent is given */}
        <CookieScriptLoader />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          {/* Cookie Consent Banner - Shows only if no consent exists */}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

