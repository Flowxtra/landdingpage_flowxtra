import { useState, useEffect } from "react";
import { ConsentPreferences, ConsentCategory } from "@/types/consent";
import { ConsentManager } from "@/lib/consentManager";

export function useConsent() {
  // No longer need geo-location detection - all options shown to everyone

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
    };

    ConsentManager.saveConsent(newPreferences, "OTHER", "banner");
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

    ConsentManager.saveConsent(newPreferences, "OTHER", "banner");
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
    ConsentManager.saveConsent(newPreferences, "OTHER", "preferences");
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
