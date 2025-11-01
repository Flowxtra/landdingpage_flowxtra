import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale - in Next.js 15, the parameter is called requestLocale
  let locale = await requestLocale;

  // Supported locales
  const supportedLocales = ["en", "de"];

  // If locale is not provided or not supported, fallback to English (default)
  if (!locale || !supportedLocales.includes(locale)) {
    locale = "en";
  }

  // Try to load the messages, fallback to English if not found
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    // If translation file not found, fallback to English
    console.warn(
      `Translation file for locale "${locale}" not found. Falling back to English.`
    );
    messages = (await import(`../messages/en.json`)).default;
    locale = "en";
  }

  return {
    locale,
    messages,
  };
});
