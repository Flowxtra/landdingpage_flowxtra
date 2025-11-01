import { useState, useEffect } from "react";
import { UserLocation } from "@/types/consent";

export function useGeoLocation(): UserLocation {
  const [location, setLocation] = useState<UserLocation>("OTHER");

  useEffect(() => {
    // Method 1: Browser locale detection
    const browserLocale = navigator.language || (navigator as any).userLanguage;

    // Method 2: Timezone-based detection
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Quick detection based on locale
    if (
      browserLocale.startsWith("de") ||
      browserLocale.startsWith("at") ||
      browserLocale.startsWith("fr") ||
      browserLocale.startsWith("it") ||
      browserLocale.startsWith("es") ||
      browserLocale.startsWith("nl") ||
      browserLocale.startsWith("pl") ||
      browserLocale.startsWith("pt")
    ) {
      setLocation("EU");
      return;
    }

    if (browserLocale.startsWith("en")) {
      // Try to detect if California
      if (
        timezone.includes("America/Los_Angeles") ||
        timezone.includes("America/Denver")
      ) {
        detectLocationFromIP().then(setLocation);
      } else {
        detectLocationFromIP().then(setLocation);
      }
    } else {
      // Method 3: IP-based detection (requires API call)
      detectLocationFromIP().then(setLocation);
    }
  }, []);

  return location;
}

async function detectLocationFromIP(): Promise<UserLocation> {
  try {
    // Use free IP geolocation service
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    if (data.country_code === "US") {
      return data.region_code === "CA" ? "US-CA" : "US-OTHER";
    }

    if (
      data.country_code === "AT" ||
      data.country_code === "DE" ||
      data.in_eu === true
    ) {
      return "EU";
    }

    return "OTHER";
  } catch {
    // Fallback to EU for safety (more strict)
    return "EU";
  }
}
