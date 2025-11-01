import { useState, useEffect } from "react";
import {
  ConsentPreferences,
  UserLocation,
  ConsentCategory,
} from "@/types/consent";
import { ConsentManager } from "@/lib/consentManager";
import { useGeoLocation } from "./useGeoLocation";

export function useConsent() {
  const location = useGeoLocation();

  // Check consent immediately on initialization (synchronously)
  const storedConsent =
    typeof window !== "undefined" ? ConsentManager.getConsent() : null;

  const [hasConsent, setHasConsent] = useState(!!storedConsent);
  const [preferences, setPreferences] = useState<ConsentPreferences>(
    storedConsent?.preferences || {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      doNotSell: location === "US-CA" ? false : undefined,
    }
  );

  useEffect(() => {
    const stored = ConsentManager.getConsent();
    if (stored) {
      setHasConsent(true);
      setPreferences(stored.preferences);
    }
  }, []);

  const acceptAll = () => {
    const newPreferences: ConsentPreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      doNotSell: location === "US-CA" ? false : undefined,
    };

    ConsentManager.saveConsent(newPreferences, location, "banner");
    setPreferences(newPreferences);
    setHasConsent(true);

    // Small delay to ensure state is saved before reload
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const rejectAll = () => {
    const newPreferences: ConsentPreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      doNotSell: location === "US-CA" ? true : undefined,
    };

    ConsentManager.saveConsent(newPreferences, location, "banner");
    setPreferences(newPreferences);
    setHasConsent(true);

    // Small delay to ensure state is saved before reload
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const savePreferences = (newPreferences: ConsentPreferences) => {
    ConsentManager.saveConsent(newPreferences, location, "preferences");
    setPreferences(newPreferences);
    setHasConsent(true);

    // Small delay to ensure state is saved before reload
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const isCategoryAllowed = (category: ConsentCategory): boolean => {
    return ConsentManager.isCategoryAllowed(category);
  };

  return {
    hasConsent,
    preferences,
    location,
    acceptAll,
    rejectAll,
    savePreferences,
    isCategoryAllowed,
  };
}
