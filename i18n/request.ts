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

  // Try to load the messages, fallback to English if not found
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    // If translation file not found, fallback to default locale
    console.warn(
      `Translation file for locale "${locale}" not found. Falling back to ${defaultLocale}.`
    );
    messages = (await import(`../messages/${defaultLocale}.json`)).default;
    locale = defaultLocale;
  }

  return {
    locale,
    messages,
  };
});
