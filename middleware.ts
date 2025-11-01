import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// Translated route mappings (German → English internal paths)
const germanToEnglish: { [key: string]: string } = {
  "/de/kontakt": "/de/contact-us",
  "/de/preise": "/de/pricing",
  "/de/funktionen": "/de/features",
  "/de/jetzt-starten": "/de/get-started",
  "/de/anmelden": "/de/login",
  "/de/barrierefreiheit": "/de/accessibility",
};

// Reverse mapping (English → German URLs) for redirects
const englishToGerman: { [key: string]: string } = {
  "/de/contact-us": "/de/kontakt",
  "/de/pricing": "/de/preise",
  "/de/features": "/de/funktionen",
  "/de/get-started": "/de/jetzt-starten",
  "/de/login": "/de/anmelden",
  "/de/accessibility": "/de/barrierefreiheit",
};

const intlMiddleware = createMiddleware({
  // All supported locales
  locales: ["en", "de"],

  // Default locale (fallback) - English
  defaultLocale: "en",

  // Enable automatic locale detection from browser
  localeDetection: true,

  // If locale is missing or invalid, redirect to default (en)
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect German URLs with English paths to translated German URLs
  if (englishToGerman[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = englishToGerman[pathname];
    return NextResponse.redirect(url, 301); // Permanent redirect
  }

  // Rewrite translated German URLs to internal English paths
  if (germanToEnglish[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = germanToEnglish[pathname];
    return NextResponse.rewrite(url);
  }

  // Run next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except static files and API routes
  matcher: ["/", "/(de|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
