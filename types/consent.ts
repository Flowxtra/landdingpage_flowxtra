export type ConsentCategory =
  | "essential"
  | "functional"
  | "analytics"
  | "marketing";

export type UserLocation = "EU" | "US-CA" | "US-OTHER" | "OTHER";

export interface ConsentPreferences {
  essential: boolean; // Always true
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  doNotSell?: boolean; // CCPA specific
}

export interface ConsentData {
  preferences: ConsentPreferences;
  timestamp: string;
  location: UserLocation;
  version: string; // Cookie Policy version
}
