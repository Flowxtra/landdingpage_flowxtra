import { ConsentData, ConsentPreferences, UserLocation, ConsentCategory } from '@/types/consent';

const CONSENT_STORAGE_KEY = 'flowxtra_consent';
const CONSENT_VERSION = '1.0';

export class ConsentManager {
  /**
   * Generate a unique UUID for consent tracking (GDPR Article 7 requirement)
   * This ID proves that the user gave consent and when
   */
  private static generateConsentId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

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
  static saveConsent(
    preferences: ConsentPreferences, 
    location: UserLocation,
    consentMethod: 'banner' | 'preferences' = 'banner'
  ): void {
    // Get existing consent ID or generate new one
    const existingConsent = this.getConsent();
    const consentId = existingConsent?.consentId || this.generateConsentId();

    const consentData: ConsentData = {
      consentId, // Unique identifier for this consent (GDPR Article 7)
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
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      language: typeof window !== 'undefined' ? navigator.language : undefined,
      consentMethod, // How consent was given (banner or preferences panel)
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    
    // Log to backend for GDPR compliance (Article 7 - proof of consent)
    this.logConsentToServer(consentData);
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

  /**
   * Log consent to backend server for GDPR Article 7 compliance
   * GDPR requires you to PROVE that consent was given
   * 
   * Backend should store:
   * - Consent ID (unique identifier)
   * - IP Address (anonymized/hashed for privacy)
   * - Timestamp (when consent was given)
   * - Preferences (what was accepted)
   * - User Agent (browser info)
   * - Location (EU/US-CA/OTHER)
   * - Version (cookie policy version)
   * 
   * This is REQUIRED even for non-registered visitors!
   */
  private static async logConsentToServer(data: ConsentData): Promise<void> {
    try {
      await fetch('/api/consent/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consentId: data.consentId,
          preferences: data.preferences,
          timestamp: data.timestamp,
          location: data.location,
          version: data.version,
          userAgent: data.userAgent,
          language: data.language,
          consentMethod: data.consentMethod,
          // IP address will be captured by backend automatically
        }),
      });
    } catch (error) {
      // Fail silently - consent is still stored in localStorage
      console.error('Failed to log consent to server:', error);
    }
  }
}

