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

  // Skip middleware for API routes - they should not have locale prefix
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Store original pathname for canonical URL (before any rewrites)
  const originalPathname = pathname;

  // Special handling for English homepage: redirect /en to / for SEO
  // Only the homepage should be without /en prefix, other pages keep /en
  if (pathname === "/en" || pathname === "/en/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    const redirectResponse = NextResponse.redirect(url, 301); // Permanent redirect for SEO
    redirectResponse.headers.set("x-pathname", "/");
    return redirectResponse;
  }

  // For homepage without locale (/) - rewrite to /en internally but keep URL as /
  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    const rewriteResponse = NextResponse.rewrite(url);
    // Keep original pathname (/) for canonical URL
    rewriteResponse.headers.set("x-pathname", "/");
    return rewriteResponse;
  }

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

  // Redirect blog and app-store locale variants to base locales
  // English variants: en-us, en-gb, en-au, en-ca → en
  // German variants: de-at, de-ch → de
  const localeVariantRedirects: { [key: string]: string } = {
    // English variants → en
    "/en-us/blog": "/en/blog",
    "/en-gb/blog": "/en/blog",
    "/en-au/blog": "/en/blog",
    "/en-ca/blog": "/en/blog",
    "/en-us/app-store": "/en/app-store",
    "/en-gb/app-store": "/en/app-store",
    "/en-au/app-store": "/en/app-store",
    "/en-ca/app-store": "/en/app-store",
    // German variants → de
    "/de-at/blog": "/de/blog",
    "/de-ch/blog": "/de/blog",
    "/de-at/app-store": "/de/app-store",
    "/de-ch/app-store": "/de/app-store",
  };

  // Check if pathname matches locale variant redirect pattern
  const redirectMatch = Object.keys(localeVariantRedirects).find((pattern) =>
    pathname.startsWith(pattern)
  );

  if (redirectMatch) {
    const basePath = localeVariantRedirects[redirectMatch];
    const remainingPath = pathname.replace(redirectMatch, "");
    const redirectPath = `${basePath}${remainingPath}`;

    const url = request.nextUrl.clone();
    url.pathname = redirectPath;
    // Preserve query parameters
    const redirectResponse = NextResponse.redirect(url, 301); // Permanent redirect for SEO
    redirectResponse.headers.set("x-pathname", redirectPath);
    return redirectResponse;
  }

  // Run next-intl middleware
  const response = intlMiddleware(request);

  // Add pathname to headers for canonical URL generation in generateMetadata
  if (response) {
    response.headers.set("x-pathname", originalPathname);

    // Enable bfcache (back/forward cache) by NOT setting Cache-Control header
    // Next.js will handle page caching automatically, allowing browsers to use bfcache
    // Only API routes and static files should have explicit cache headers
    // Pages should not have Cache-Control to allow bfcache restoration
  }

  return response;
}

export const config = {
  // Match all paths except static files and API routes
  // Updated to support DACH locales (de-at, de-ch) and English locales (en-us, en-gb, en-au, en-ca)
  matcher: [
    "/",
    "/(de|de-at|de-ch|en|en-us|en-gb|en-au|en-ca|fr|es|it|nl|ar)/:path*",
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
