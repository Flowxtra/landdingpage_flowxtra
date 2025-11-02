export type ConsentCategory =
  | "essential"
  | "functional"
  | "analytics"
  | "marketing";

export interface ConsentPreferences {
  essential: boolean; // Always true
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  doNotSell?: boolean; // CCPA specific
}

export interface ConsentData {
  consentId: string; // Unique consent identifier (UUID)
  preferences: ConsentPreferences;
  timestamp: string;
  version: string; // Cookie Policy version
  ipAddress?: string; // Optional - for backend logging
  userAgent?: string; // Optional - browser info
  language?: string; // Optional - language used
  consentMethod?: "banner" | "preferences"; // How consent was given
}
