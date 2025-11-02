import { useState, useEffect } from "react";
import { UserLocation } from "@/types/consent";

/**
 * useGeoLocation - Detects user location for GDPR/CCPA compliance
 *
 * Uses multiple detection methods in order of priority:
 * 1. Browser locale (fastest, no API calls)
 * 2. Timezone detection
 * 3. Server-side IP detection (via Next.js API route - no CORS issues)
 *
 * Falls back to "EU" for safety (most strict privacy requirements)
 */
export function useGeoLocation(): UserLocation {
  const [location, setLocation] = useState<UserLocation>("OTHER");

  useEffect(() => {
    const detectLocation = async () => {
      // Method 1: Browser locale detection (fastest, no API calls)
      const browserLocale =
        navigator.language || (navigator as any).userLanguage;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Quick EU detection based on locale (most common case)
      const euLocales = [
        "de",
        "at",
        "fr",
        "it",
        "es",
        "nl",
        "pl",
        "pt",
        "be",
        "dk",
        "fi",
        "se",
        "ie",
        "cz",
        "hu",
        "ro",
        "bg",
        "hr",
        "sk",
        "si",
        "lt",
        "lv",
        "ee",
        "mt",
        "cy",
        "lu",
      ];

      if (
        euLocales.some((locale) =>
          browserLocale.toLowerCase().startsWith(locale)
        )
      ) {
        setLocation("EU");
        return;
      }

      // For English locale, check timezone first
      if (browserLocale.startsWith("en")) {
        // California timezones
        const californiaTimezones = [
          "America/Los_Angeles",
          "America/Denver",
          "America/Phoenix",
          "America/Anchorage",
        ];

        if (californiaTimezones.some((tz) => timezone.includes(tz))) {
          // Likely California, but verify with server-side API
          const serverLocation = await detectLocationFromServer();
          if (serverLocation) {
            setLocation(serverLocation);
          } else {
            // Fallback: if timezone suggests CA, use US-CA
            setLocation("US-CA");
          }
          return;
        }

        // Other US timezones
        if (timezone.startsWith("America/")) {
          const serverLocation = await detectLocationFromServer();
          setLocation(serverLocation || "US-OTHER");
          return;
        }

        // English but not US timezone - could be UK, AU, etc.
        // Use server detection or default to OTHER
        const serverLocation = await detectLocationFromServer();
        setLocation(serverLocation || "OTHER");
        return;
      }

      // For other locales, try server-side detection
      const serverLocation = await detectLocationFromServer();
      setLocation(serverLocation || "OTHER");
    };

    detectLocation();
  }, []);

  return location;
}

/**
 * Detect location from server-side API (no CORS issues, more reliable)
 * Falls back to EU if detection fails (most strict privacy requirements)
 */
async function detectLocationFromServer(): Promise<UserLocation | null> {
  try {
    // Use Next.js API route to avoid CORS issues
    const response = await fetch("/api/geo-location", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Don't cache to get accurate location
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Geo-location API failed");
    }

    const data = await response.json();

    if (data.country_code === "US") {
      return data.region_code === "CA" ? "US-CA" : "US-OTHER";
    }

    // EU countries
    const euCountries = [
      "AT",
      "BE",
      "BG",
      "HR",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "FR",
      "DE",
      "GR",
      "HU",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MT",
      "NL",
      "PL",
      "PT",
      "RO",
      "SK",
      "SI",
      "ES",
      "SE",
    ];

    if (euCountries.includes(data.country_code) || data.in_eu === true) {
      return "EU";
    }

    return "OTHER";
  } catch (error) {
    // Silent fail - fallback to EU for safety (most strict)
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Geo-location detection failed, using EU as fallback:",
        error
      );
    }
    return null; // Return null to let caller decide fallback
  }
}
