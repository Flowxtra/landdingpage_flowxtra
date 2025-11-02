/**
 * Static Routes Configuration
 *
 * This file defines all static pages with their routes, priorities, and translations.
 * Pages are automatically discovered and included in sitemap generation.
 *
 * To add a new page:
 * 1. Create the page in app/[locale]/page-name/
 * 2. Add it to this configuration
 * 3. It will automatically appear in sitemap for all locales
 */

export interface StaticRoute {
  /** Internal route identifier */
  routeKey: string;
  /** Priority for SEO (0.0 to 1.0) */
  priority: number;
  /** Change frequency for SEO */
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  /** Route paths for each locale */
  paths: Record<string, string>;
  /** Whether this page should be included in sitemap */
  includeInSitemap: boolean;
}

/**
 * All static pages configuration
 * Add new pages here - they will be automatically included in sitemap
 */
export const staticRoutes: StaticRoute[] = [
  {
    routeKey: "home",
    priority: 1.0,
    changeFrequency: "daily",
    includeInSitemap: true,
    paths: {
      en: "/",
      de: "/",
    },
  },
  {
    routeKey: "pricing",
    priority: 0.9,
    changeFrequency: "weekly",
    includeInSitemap: true,
    paths: {
      en: "/pricing",
      de: "/preise",
    },
  },
  {
    routeKey: "contactUs",
    priority: 0.8,
    changeFrequency: "weekly",
    includeInSitemap: true,
    paths: {
      en: "/contact-us",
      de: "/kontakt",
    },
  },
  {
    routeKey: "about",
    priority: 0.8,
    changeFrequency: "monthly",
    includeInSitemap: true,
    paths: {
      en: "/about",
      de: "/ueber-uns",
    },
  },
  {
    routeKey: "socialMediaManagement",
    priority: 0.8,
    changeFrequency: "weekly",
    includeInSitemap: true,
    paths: {
      en: "/social-media-management",
      de: "/social-media-management",
    },
  },
  {
    routeKey: "atsRecruitingSoftware",
    priority: 0.8,
    changeFrequency: "weekly",
    includeInSitemap: true,
    paths: {
      en: "/ats-recruiting-software",
      de: "/ats-recruiting-software",
    },
  },
  {
    routeKey: "accessibility",
    priority: 0.7,
    changeFrequency: "monthly",
    includeInSitemap: true,
    paths: {
      en: "/accessibility",
      de: "/barrierefreiheit",
    },
  },
];

/**
 * Get route path for a specific locale
 */
export function getRoutePath(routeKey: string, locale: string): string | null {
  const route = staticRoutes.find((r) => r.routeKey === routeKey);
  if (!route) return null;
  return route.paths[locale] || route.paths.en || null;
}

/**
 * Get all routes for a specific locale
 */
export function getRoutesForLocale(locale: string): StaticRoute[] {
  return staticRoutes.filter((route) => {
    // Check if route has a path for this locale
    return route.paths[locale] || route.paths.en;
  });
}

/**
 * Get routes that should be included in sitemap
 */
export function getSitemapRoutes(locale: string): StaticRoute[] {
  return getRoutesForLocale(locale).filter((route) => route.includeInSitemap);
}
