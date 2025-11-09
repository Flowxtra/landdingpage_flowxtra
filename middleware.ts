import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { supportedLocales, defaultLocale } from "@/lib/locales";

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
  // All supported locales - dynamically loaded from lib/locales.ts
  locales: supportedLocales,

  // Default locale (fallback) - dynamically loaded from lib/locales.ts
  defaultLocale: defaultLocale,

  // Enable automatic locale detection from browser
  localeDetection: true,

  // If locale is missing or invalid, redirect to default (en)
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Store original pathname for canonical URL (before any rewrites)
  const originalPathname = pathname;

  // Redirect German URLs with English paths to translated German URLs
  if (englishToGerman[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = englishToGerman[pathname];
    const redirectResponse = NextResponse.redirect(url, 301); // Permanent redirect
    redirectResponse.headers.set("x-pathname", originalPathname);
    return redirectResponse;
  }

  // Rewrite translated German URLs to internal English paths
  if (germanToEnglish[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = germanToEnglish[pathname];
    const rewriteResponse = NextResponse.rewrite(url);
    // Use original pathname (German URL) for canonical
    rewriteResponse.headers.set("x-pathname", originalPathname);
    return rewriteResponse;
  }

  // Run next-intl middleware
  const response = intlMiddleware(request);

  // Add pathname to headers for canonical URL generation in generateMetadata
  if (response) {
    response.headers.set("x-pathname", originalPathname);

    // Enable bfcache (back/forward cache) by not setting no-store
    // Only set cache headers for pages, not for API routes or static files
    if (!pathname.startsWith("/api") && !pathname.includes(".")) {
      response.headers.set(
        "Cache-Control",
        "public, max-age=0, must-revalidate"
      );
    }
  }

  return response;
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    "/",
    "/(de|en|fr|es|it|nl)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
