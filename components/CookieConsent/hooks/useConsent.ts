import { useState, useEffect } from "react";
import { ConsentPreferences, ConsentCategory } from "@/types/consent";
import { ConsentManager } from "@/lib/consentManager";

export function useConsent() {
  // No longer need geo-location detection - all options shown to everyone

  // Initialize with default values (same on server and client to prevent hydration mismatch)
  const [hasConsent, setHasConsent] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Load consent from localStorage only on client side (after hydration)
  useEffect(() => {
    if (typeof window === "undefined") return;

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
    };

    ConsentManager.saveConsent(newPreferences, "banner");
    setPreferences(newPreferences);
    setHasConsent(true);

    // Dispatch custom event to notify other components about consent change
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("consentUpdated", {
          detail: { preferences: newPreferences },
        })
      );
    }
  };

  const rejectAll = () => {
    const newPreferences: ConsentPreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };

    ConsentManager.saveConsent(newPreferences, "banner");
    setPreferences(newPreferences);
    setHasConsent(true);

    // Dispatch custom event to notify other components about consent change
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("consentUpdated", {
          detail: { preferences: newPreferences },
        })
      );
    }
  };

  const savePreferences = (newPreferences: ConsentPreferences) => {
    ConsentManager.saveConsent(newPreferences, "preferences");
    setPreferences(newPreferences);
    setHasConsent(true);

    // Dispatch custom event to notify other components about consent change
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("consentUpdated", {
          detail: { preferences: newPreferences },
        })
      );
    }
  };

  const isCategoryAllowed = (category: ConsentCategory): boolean => {
    return ConsentManager.isCategoryAllowed(category);
  };

  return {
    hasConsent,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    isCategoryAllowed,
  };
}
