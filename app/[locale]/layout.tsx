import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M3DPV9C5');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3DPV9C5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Google tag (gtag.js) - Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16786153056"
          strategy="afterInteractive"
        />
        
        {/* Google tag (gtag.js) - Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-33HQSXK6F2"
          strategy="afterInteractive"
        />
        
        <Script id="google-tag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16786153056');
            gtag('config', 'G-33HQSXK6F2');
          `}
        </Script>

        {/* Event snippet for Subscribe conversion page */}
        <Script id="google-conversion" strategy="afterInteractive">
          {`
            gtag('event', 'conversion', {'send_to': 'AW-16786153056/LJj1CObF2IMbEOC8ocQ-'});
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rasaazt5qp");
          `}
        </Script>

        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-partner-id" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "8282209";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display:'none'}} alt="" src="https://px.ads.linkedin.com/collect/?pid=8282209&fmt=gif" />
        </noscript>

        {/* TikTok Pixel Code */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('D020C0RC77U0CJB7LSN0');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1210170290049770');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1210170290049770&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

