import { getRequestConfig } from "next-intl/server";
import {
  supportedLocales,
  defaultLocale,
  isSupportedLocale,
} from "@/lib/locales";

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale - in Next.js 15, the parameter is called requestLocale
  let locale = await requestLocale;

  // If locale is not provided or not supported, fallback to default locale
  if (!locale || !isSupportedLocale(locale)) {
    locale = defaultLocale;
  }

  // Try to load the messages with fallback chain
  // For DACH locales: de-at/de-ch → de → en
  // For English locales: en-us/en-gb/en-au/en-ca → en
  let messages;
  let fallbackChain: string[] = [];

  // Define fallback chain based on locale
  if (locale === "de-at" || locale === "de-ch") {
    // DACH locales fallback to de, then en
    fallbackChain = [locale, "de", defaultLocale];
  } else if (
    locale === "en-us" ||
    locale === "en-gb" ||
    locale === "en-au" ||
    locale === "en-ca"
  ) {
    // English locales fallback to en
    fallbackChain = [locale, defaultLocale];
  } else {
    // Other locales fallback to default (en)
    fallbackChain = [locale, defaultLocale];
  }

  // Try each locale in the fallback chain
  for (const fallbackLocale of fallbackChain) {
    try {
      messages = (await import(`../messages/${fallbackLocale}.json`)).default;
      // Merge messages: if current locale has overrides, merge them with base
      if (
        fallbackLocale !== locale &&
        (locale === "de-at" ||
          locale === "de-ch" ||
          locale === "en-us" ||
          locale === "en-gb" ||
          locale === "en-au" ||
          locale === "en-ca")
      ) {
        try {
          const overrideMessages = (await import(`../messages/${locale}.json`))
            .default;
          // Deep merge: override messages take precedence
          messages = {
            ...messages,
            ...overrideMessages,
            metadata: {
              ...messages.metadata,
              ...overrideMessages.metadata,
            },
            homepage: {
              ...messages.homepage,
              ...overrideMessages.homepage,
            },
          };
        } catch (overrideError) {
          // No override file, use base messages
        }
      }
      break; // Successfully loaded messages
    } catch (error) {
      // Try next fallback
      continue;
    }
  }

  // If all fallbacks failed, use default
  if (!messages) {
    console.warn(
      `Translation file for locale "${locale}" not found. Falling back to ${defaultLocale}.`
    );
    messages = (await import(`../messages/${defaultLocale}.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
