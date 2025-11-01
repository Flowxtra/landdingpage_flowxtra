// Translated routes for SEO-friendly URLs
export const routes = {
  home: {
    en: "/",
    de: "/",
  },
  contactUs: {
    en: "/contact-us",
    de: "/kontakt",
  },
  pricing: {
    en: "/pricing",
    de: "/preise",
  },
  features: {
    en: "/features",
    de: "/funktionen",
  },
  socialMediaManagement: {
    en: "/social-media-management",
    de: "/social-media-management",
  },
  atsRecruitingSoftware: {
    en: "/ats-recruiting-software",
    de: "/ats-recruiting-software",
  },
  getStarted: {
    en: "/get-started",
    de: "/jetzt-starten",
  },
  login: {
    en: "/login",
    de: "/anmelden",
  },
} as const;

// Helper function to get translated route
export function getRoute(
  routeName: keyof typeof routes,
  locale: string
): string {
  const route = routes[routeName];
  return route[locale as keyof typeof route] || route.en;
}

// Helper function to get full URL with locale
export function getLocalizedPath(
  routeName: keyof typeof routes,
  locale: string
): string {
  const route = getRoute(routeName, locale);
  return `/${locale}${route}`;
}

