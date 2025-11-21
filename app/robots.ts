import { MetadataRoute } from "next";

/**
 * Robots.txt for SEO + AI crawlers
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";

  const sitemapPaths = [
    "/sitemap_index.xml",
    "/sitemap.xml",
    "/sitemap-all.xml",
    "/sitemap-ar.xml",
    "/sitemap-static-ar.xml",
    "/sitemap-ar-app-store-0.xml",
    "/sitemap-de.xml",
    "/sitemap-static-de.xml",
    "/sitemap-de-app-store-0.xml",
    "/sitemap-de-at.xml",
    "/sitemap-static-de-at.xml",
    "/sitemap-de-ch.xml",
    "/sitemap-static-de-ch.xml",
    "/sitemap-en.xml",
    "/sitemap-static-en.xml",
    "/sitemap-en-app-store-0.xml",
    "/sitemap-en-blog-0.xml",
    "/sitemap-en-au.xml",
    "/sitemap-static-en-au.xml",
    "/sitemap-en-ca.xml",
    "/sitemap-static-en-ca.xml",
    "/sitemap-en-gb.xml",
    "/sitemap-static-en-gb.xml",
    "/sitemap-en-us.xml",
    "/sitemap-static-en-us.xml",
    "/sitemap-es.xml",
    "/sitemap-static-es.xml",
    "/sitemap-es-app-store-0.xml",
    "/sitemap-fr.xml",
    "/sitemap-static-fr.xml",
    "/sitemap-fr-app-store-0.xml",
    "/sitemap-it.xml",
    "/sitemap-static-it.xml",
    "/sitemap-it-app-store-0.xml",
    "/sitemap-nl.xml",
    "/sitemap-static-nl.xml",
    "/sitemap-nl-app-store-0.xml",
  ];

  const staticAllowList = [
    "/*.css$",
    "/*.js$",
    "/*.jpg$",
    "/*.jpeg$",
    "/*.png$",
    "/*.svg$",
    "/*.gif$",
    "/*.webp$",
    "/llms.txt",
    "/public/",
    "/static/",
  ];

  const sensitiveDisallowList = [
    "/api/",
    "/_next/",
    "/admin/",
    "/private/",
    "/dashboard/",
    "/settings/",
    "/account/",
    "/profile/",
    "/checkout/",
    "/cart/",
    "/login/",
    "/register/",
    "/password/",
    "/search?",
    "/*?*utm",
    "/*?*ref",
    "/*?*session",
    "/*.json$",
    "/*.xml$",
    "/404",
    "/500",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", ...staticAllowList],
        disallow: sensitiveDisallowList,
      },
      {
        userAgent: "Googlebot",
        allow: ["/", ...staticAllowList],
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: sitemapPaths.map((path) => `${baseUrl}${path}`),
    host: baseUrl,
  };
}
