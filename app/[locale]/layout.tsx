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
  
  const metadata = {
    en: {
      title: {
        default: "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
        template: "%s | Flowxtra",
      },
      description: "Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
      keywords: ["recruitment", "recruiting software", "ATS", "AI-powered hiring", "smart hiring tool", "free job posting", "candidate management", "hiring platform"],
      openGraph: {
        title: "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
        description: "Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
        type: "website",
        locale: "en_US",
        url: "https://flowxtra.com/en",
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
        description: "Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
      },
      alternates: {
        canonical: "https://flowxtra.com/en",
        languages: {
          'en': 'https://flowxtra.com/en',
          'de': 'https://flowxtra.com/de',
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
      openGraph: {
        title: "Flowxtra – Recruiting-Software & Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform.",
        type: "website",
        locale: "de_DE",
        url: "https://flowxtra.com/de",
        siteName: "Flowxtra",
      },
      twitter: {
        card: "summary_large_image",
        title: "Flowxtra – Recruiting-Software & Intelligentes Einstellungstool | Kostenlose Stellenanzeigen",
        description: "Stellen Sie intelligenter mit KI ein – veröffentlichen Sie kostenlos Stellenanzeigen und verwalten Sie Kandidaten auf einer einfachen, leistungsstarken Plattform.",
      },
      alternates: {
        canonical: "https://flowxtra.com/de",
        languages: {
          'en': 'https://flowxtra.com/en',
          'de': 'https://flowxtra.com/de',
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

  return (
    <html lang={locale}>
      <head>
        {/* Preconnect to external CDNs for faster loading - Only DNS lookup, no cookies */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        
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

