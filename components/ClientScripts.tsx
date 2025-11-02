"use client";

import dynamic from "next/dynamic";

// Client-side only components - must be in a Client Component
const CookieScriptLoader = dynamic(() => import("@/components/CookieConsent/CookieScriptLoader"), {
  ssr: false,
});

const CookieBanner = dynamic(() => import("@/components/CookieConsent/CookieBanner"), {
  ssr: false,
});

const FontAwesomeLoader = dynamic(() => import("@/components/FontAwesomeLoader"), {
  ssr: false,
});

export default function ClientScripts() {
  return (
    <>
      {/* Load Font Awesome only after functional cookies consent */}
      <FontAwesomeLoader />
      {/* Load tracking scripts only if consent is given */}
      <CookieScriptLoader />
      {/* Cookie Consent Banner - Shows only if no consent exists */}
      <CookieBanner />
    </>
  );
}

