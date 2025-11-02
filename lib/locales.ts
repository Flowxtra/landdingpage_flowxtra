/**
 * Supported Locales Configuration
 *
 * This file centralizes all locale configuration.
 * Add new languages here and they will be automatically included in:
 * - Middleware
 * - Sitemap generation
 * - i18n routing
 */

/**
 * All supported locales in the application
 * Add new locales here to automatically enable them across the app
 */
export const supportedLocales = ["en", "de"] as const;

/**
 * Type for supported locale values
 */
export type SupportedLocale = (typeof supportedLocales)[number];

/**
 * Default locale (fallback)
 */
export const defaultLocale: SupportedLocale = "en";

/**
 * Check if a locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

/**
 * Get all available locales dynamically by scanning the messages directory
 * This is useful for runtime locale detection
 */
export async function getAvailableLocales(): Promise<SupportedLocale[]> {
  try {
    // In Next.js, we can read the messages directory
    // For now, return the static list, but this can be enhanced to scan the directory
    return [...supportedLocales];
  } catch (error) {
    console.error("Error getting available locales:", error);
    return [defaultLocale];
  }
}
