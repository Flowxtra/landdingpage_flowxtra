import {
  ConsentData,
  ConsentPreferences,
  ConsentCategory,
} from "@/types/consent";

const CONSENT_STORAGE_KEY = "flowxtra_consent";
const CONSENT_VERSION = "1.0";

export class ConsentManager {
  /**
   * Generate a unique UUID for consent tracking (GDPR Article 7 requirement)
   * This ID proves that the user gave consent and when
   */
  private static generateConsentId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Get stored consent
  static getConsent(): ConsentData | null {
    if (typeof window === "undefined") return null;

    try {
      // Check if localStorage is available (Safari Private Mode may throw error)
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) return null;

      return JSON.parse(stored);
    } catch (error) {
      // Handle localStorage errors (Safari Private Mode, disabled storage, etc.)
      // Fail silently - return null to show banner again
      if (process.env.NODE_ENV === "development") {
        console.warn("localStorage access failed:", error);
      }
      return null;
    }
  }

  // Save consent
  static saveConsent(
    preferences: ConsentPreferences,
    consentMethod: "banner" | "preferences" = "banner"
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
      version: CONSENT_VERSION,
      userAgent:
        typeof window !== "undefined" ? navigator.userAgent : undefined,
      language: typeof window !== "undefined" ? navigator.language : undefined,
      consentMethod, // How consent was given (banner or preferences panel)
    };

    // Save to localStorage (with error handling for Safari Private Mode, etc.)
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    } catch (error) {
      // Handle localStorage errors (Safari Private Mode, quota exceeded, etc.)
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to save consent to localStorage:", error);
      }
      // Continue anyway - try to log to backend even if localStorage fails
    }

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
    if (category === "essential") return true;

    return consent.preferences[category] === true;
  }

  // Revoke consent
  static revokeConsent(): void {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch (error) {
      // Handle localStorage errors (Safari Private Mode, etc.)
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to remove consent from localStorage:", error);
      }
    }
  }

  /**
   * Get backend URL from environment variables
   * Development: Uses NEXT_PUBLIC_developemant_BACKEND_URL from .env.local
   * Production: Uses NEXT_PUBLIC_BACKEND_URL from production environment
   *
   * @throws Error if backend URL is not configured
   */
  private static getBackendUrl(): string {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
      // Development: Use local backend URL from .env.local
      const devUrl = process.env.NEXT_PUBLIC_developemant_BACKEND_URL;

      if (!devUrl) {
        const error =
          "NEXT_PUBLIC_developemant_BACKEND_URL is not configured in .env.local. Please add it.";
        console.error("❌", error);
        throw new Error(error);
      }

      return devUrl;
    } else {
      // Production: Use production backend URL from environment
      const prodUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!prodUrl) {
        const error =
          "NEXT_PUBLIC_BACKEND_URL is not configured in production environment.";
        console.error("❌", error);
        throw new Error(error);
      }

      return prodUrl;
    }
  }

  /**
   * Log consent to Laravel backend server for GDPR Article 7 compliance
   * GDPR requires you to PROVE that consent was given
   *
   * Backend should store:
   * - Consent ID (unique identifier)
   * - IP Address (anonymized/hashed for privacy)
   * - Timestamp (when consent was given)
   * - Preferences (what was accepted)
   * - User Agent (browser info)
   * - Version (cookie policy version)
   *
   * This is REQUIRED even for non-registered visitors!
   */
  private static async logConsentToServer(data: ConsentData): Promise<void> {
    try {
      // Get backend URL based on environment (development or production)
      let backendUrl: string;

      try {
        backendUrl = this.getBackendUrl();
      } catch (error) {
        // If backend URL is not configured, fail gracefully
        // Consent is still stored in localStorage, so user experience is not affected
        if (process.env.NODE_ENV === "development") {
          console.error("❌ Backend URL configuration error:", error);
          console.error(
            "💡 Please create .env.local file with NEXT_PUBLIC_developemant_BACKEND_URL"
          );
        }
        return; // Exit silently - consent is saved in localStorage
      }

      const apiEndpoint = `${backendUrl}/api/consent/log`;

      // Log which backend we're connecting to (development only)
      if (process.env.NODE_ENV === "development") {
        console.log(`📡 Connecting to backend: ${apiEndpoint}`);
      }

      // Use fetch with timeout for better cross-browser compatibility
      // AbortController is supported in all modern browsers (Chrome 66+, Firefox 57+, Safari 12.1+)
      let controller: AbortController | null = null;
      let timeoutId: NodeJS.Timeout | null = null;

      // Only use AbortController if available (for older browsers fallback)
      if (typeof AbortController !== "undefined") {
        controller = new AbortController();
        timeoutId = setTimeout(() => controller!.abort(), 10000); // 10 second timeout
      }

      const fetchOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          consentId: data.consentId,
          preferences: data.preferences,
          timestamp: data.timestamp,
          version: data.version,
          userAgent: data.userAgent,
          language: data.language,
          consentMethod: data.consentMethod,
          // IP address will be captured by backend automatically
        }),
        credentials: "omit", // Don't send cookies (GDPR compliant)
      };

      // Add timeout signal if AbortController is available
      if (controller) {
        fetchOptions.signal = controller.signal;
      }

      const response = await fetch(apiEndpoint, fetchOptions);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(
          `Backend responded with status ${response.status}: ${errorText}`
        );
      }

      const result = await response.json();

      // Log success in development only
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Consent logged to backend:", result);
      }
    } catch (error) {
      // Fail silently - consent is still stored in localStorage
      // Only log errors in development
      if (process.env.NODE_ENV === "development") {
        console.error("❌ Failed to log consent to backend:", error);
        try {
          console.error("Backend URL:", this.getBackendUrl());
        } catch {
          // Ignore if getBackendUrl also fails
        }
      }
    }
  }
}
