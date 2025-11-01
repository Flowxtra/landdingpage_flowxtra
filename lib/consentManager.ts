import { ConsentData, ConsentPreferences, UserLocation } from '@/types/consent';

const CONSENT_STORAGE_KEY = 'flowxtra_consent';
const CONSENT_VERSION = '1.0';

export class ConsentManager {
  // Get stored consent
  static getConsent(): ConsentData | null {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  // Save consent
  static saveConsent(preferences: ConsentPreferences, location: UserLocation): void {
    const consentData: ConsentData = {
      preferences: {
        essential: true, // Always true
        functional: preferences.functional,
        analytics: preferences.analytics,
        marketing: preferences.marketing,
        doNotSell: preferences.doNotSell,
      },
      timestamp: new Date().toISOString(),
      location,
      version: CONSENT_VERSION,
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
  }

  // Check if consent exists
  static hasConsent(): boolean {
    return this.getConsent() !== null;
  }

  // Check if specific category is allowed
  static isCategoryAllowed(category: ConsentCategory): boolean {
    const consent = this.getConsent();
    if (!consent) return false;

    // Essential is always allowed
    if (category === 'essential') return true;

    return consent.preferences[category] === true;
  }

  // Revoke consent
  static revokeConsent(): void {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  }
}

