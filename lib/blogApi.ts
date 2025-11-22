// Blog API Service
// This file handles all API calls to the blog backend

/**
 * Get API base URL from environment variables
 * Development: Uses NEXT_PUBLIC_developemant_BACKEND_URL from .env.local
 * Production: Uses NEXT_PUBLIC_BACKEND_URL from production environment
 * Fallback: Uses NEXT_PUBLIC_API_URL if available
 *
 * @throws Error if API URL is not configured
 */
function getApiBaseUrl(): string {
  // ALWAYS use Next.js API route as proxy to avoid CORS issues
  // This works for both client-side and server-side (Next.js API routes handle both)
  // The proxy route at /api/blog will forward requests to the actual backend API
  console.log("[getApiBaseUrl] Using proxy /api/blog (avoids CORS)");
  return "/api/blog";
}

type StructuredData = Record<string, unknown>;
type ExtendedRequestInit = RequestInit & { next?: { revalidate?: number } };

// TypeScript Interfaces
export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  photo?: string;
  shortBio?: string;
  bio?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  translations: {
    en: string;
    de: string;
    [key: string]: string;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categoryId: number;
  categorySlug: string;
  image: string;
  date: string;
  datePublished: string;
  updatedAt?: string;
  dateModified?: string;
  readingTime: number;
  primaryLanguage: string;
  availableLanguages: string[];
  tags?: Tag[];
  author?: Author;
  content?: string;
  keywords?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BlogPostsResponse {
  success: boolean;
  data: {
    posts: BlogPost[];
    categories?: Category[];
    pagination: Pagination;
    structuredData?: StructuredData;
  };
}

export interface PreviousNextPost {
  id: number;
  title: string;
  slug: string;
}

export interface BlogPostResponse {
  success: boolean;
  data: {
    post: BlogPost;
    relatedPosts: BlogPost[];
    previousPost?: PreviousNextPost;
    nextPost?: PreviousNextPost;
    structuredData?: StructuredData;
  };
}

export interface CategoriesResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}

/**
 * Normalize locale for API requests
 * Maps locale variants to base locales that the backend API supports
 *
 * Examples:
 * - en-au, en-ca, en-us, en-gb → en
 * - de-ch, de-at → de
 * - Other locales remain unchanged
 */
export function normalizeLocaleForApi(locale: string | undefined): string {
  if (!locale) return "en";

  // English variants → en
  if (locale.startsWith("en-")) {
    return "en";
  }

  // German variants → de
  if (locale.startsWith("de-")) {
    return "de";
  }

  // Return locale as-is for other languages
  return locale;
}

// Helper function to build image URL
export function getImageUrl(imagePath: string): string {
  if (!imagePath) {
    return "";
  }

  // If already absolute URL, check if we need to replace domain for development
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    // In development, replace flowxtra.com with localhost:8765
    // Check if we're in development mode (client-side or server-side)
    const isDevelopment =
      (typeof window !== "undefined" &&
        window.location.hostname === "localhost") ||
      process.env.NODE_ENV === "development";

    if (isDevelopment && imagePath.includes("flowxtra.com")) {
      const devBackendUrl =
        process.env.NEXT_PUBLIC_developemant_BACKEND_URL ||
        "http://localhost:8765";
      const devBaseUrl = devBackendUrl.replace("/api", ""); // Remove /api if present
      return imagePath.replace("https://flowxtra.com", devBaseUrl);
    }
    return imagePath;
  }

  // Build absolute URL
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://flowxtra.com";
  return `${baseUrl}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
}

// Get Blog Posts List
export async function getBlogPosts(params: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  locale?: string;
  minimal?: boolean;
  fields?: string;
}): Promise<BlogPostsResponse> {
  const queryParams = new URLSearchParams();

  // Normalize locale for API (en-au → en, de-ch → de, etc.)
  const normalizedLocale = normalizeLocaleForApi(params.locale);

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.category) queryParams.append("category", params.category);
  if (params.tag) queryParams.append("tag", params.tag);
  if (params.search) queryParams.append("search", params.search);
  queryParams.append("locale", normalizedLocale);
  if (params.minimal) queryParams.append("minimal", "true");
  if (params.fields) queryParams.append("fields", params.fields);

  // Add site parameter (required by backend API)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://flowxtra.com";
  const siteDomain = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  queryParams.append("site", siteDomain);

  // Get API base URL (may be proxy path in development)
  const apiBaseUrl = getApiBaseUrl();

  // Build URL - if using proxy (/api/blog), use absolute URL to avoid locale prefix
  // In client-side, relative paths get locale prefix added by Next.js
  // In server-side, fetch() requires absolute URL
  let url: string;

  // Add timestamp to bypass cache (for fresh data)
  // Always add timestamp to ensure fresh data in both client and server
  queryParams.append("_t", Date.now().toString());
  queryParams.append("_r", Math.random().toString(36).substring(7));

  if (apiBaseUrl === "/api/blog") {
    if (typeof window !== "undefined") {
      // Client-side: use absolute URL to avoid locale prefix
      url = `${window.location.origin}${apiBaseUrl}?${queryParams.toString()}`;
    } else {
      // Server-side: fetch() requires absolute URL
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://flowxtra.com");
      url = `${baseUrl}${apiBaseUrl}?${queryParams.toString()}`;
    }
  } else {
    url = `${apiBaseUrl}/blog?${queryParams.toString()}`;
  }

  // Debug logging
  console.log("[Blog API] getBlogPosts - API Base URL:", apiBaseUrl);
  console.log("[Blog API] getBlogPosts - Request URL:", url);
  console.log("[Blog API] getBlogPosts - Params:", {
    page: params.page,
    limit: params.limit,
    category: params.category,
    originalLocale: params.locale,
    normalizedLocale: normalizedLocale,
    search: params.search,
    hasCategory: !!params.category,
  });

  // Build fetch options
  const fetchOptions: ExtendedRequestInit = {
    headers: {
      Accept: "application/json",
    },
  };

  // Only add next.revalidate if we're in a server component (not client-side)
  if (typeof window === "undefined") {
    // Server-side: use no-store to always get fresh data
    // Timestamp in URL ensures fresh data, but no-store guarantees it
    fetchOptions.cache = "no-store";
  } else {
    // Client-side: use no-store to always get fresh data
    // This ensures new posts appear immediately
    fetchOptions.cache = "no-store";
  }

  const response = await fetch(url, fetchOptions);

  // Debug: Log response status
  console.log(
    "[Blog API] getBlogPosts - Response status:",
    response.status,
    response.statusText
  );

  if (!response.ok) {
    let errorData: { error?: string; message?: string } = {};
    let errorText = "";

    try {
      // Try to get error as text first (in case it's not JSON)
      errorText = await response.text();
      // Try to parse as JSON
      if (errorText) {
        try {
          errorData = JSON.parse(errorText) as {
            error?: string;
            message?: string;
          };
        } catch {
          // If not JSON, use text as error message
          errorData = { error: errorText, message: errorText };
        }
      }
    } catch {
      errorData = { error: "Failed to parse error response" };
    }

    // If errorData is empty or has no useful info, provide default message
    const errorMessage =
      errorData?.error ||
      errorData?.message ||
      errorText ||
      response.statusText ||
      `API request failed with status ${response.status}`;

    console.error("[Blog API] getBlogPosts - Error:", {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
      errorText: errorText.substring(0, 500), // Limit length
      url,
      originalLocale: params.locale,
      normalizedLocale: normalizedLocale,
    });

    throw new Error(`API Error: ${response.status} - ${errorMessage}`);
  }

  const data = await response.json();

  // Debug: Log response data summary
  console.log("[Blog API] getBlogPosts - Response data:", {
    success: data.success,
    postsCount: data.data?.posts?.length || 0,
    totalPosts: data.data?.pagination?.totalPosts,
    currentPage: data.data?.pagination?.currentPage,
    totalPages: data.data?.pagination?.totalPages,
    hasNextPage: data.data?.pagination?.hasNextPage,
    hasStructuredData: !!data.data?.structuredData,
    structuredDataType: data.data?.structuredData?.["@type"] || "N/A",
  });

  return data;
}

// Get Single Blog Post
export async function getBlogPost(
  slug: string,
  locale: string = "en",
  options?: {
    cache?: RequestCache;
    revalidate?: number;
    forceRefresh?: boolean;
  }
): Promise<BlogPostResponse> {
  // Don't encode the slug - Next.js router already handles URL encoding
  // The slug should be used as-is from the API response
  // Note: According to API docs, slug must match the locale (en slug for en locale, de slug for de locale)
  // Add timestamp and random query parameters to prevent caching
  // Always add timestamp to ensure fresh data - use both timestamp and random to completely bypass cache
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);

  // Normalize locale for API (en-au → en, de-ch → de, etc.)
  const normalizedLocale = normalizeLocaleForApi(locale);

  // Get API base URL (may be proxy path in development)
  const apiBaseUrl = getApiBaseUrl();

  // Add site parameter (required by backend API)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://flowxtra.com";
  const siteDomain = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  // Build URL - if using proxy (/api/blog), use absolute URL to avoid locale prefix
  // In client-side, relative paths get locale prefix added by Next.js
  // In server-side, fetch() requires absolute URL
  let url: string;
  if (apiBaseUrl === "/api/blog") {
    // Both client-side and server-side need absolute URL
    if (typeof window !== "undefined") {
      // Client-side: use window.location.origin
      url = `${window.location.origin}${apiBaseUrl}/${slug}?locale=${normalizedLocale}&site=${siteDomain}&_t=${timestamp}&_r=${random}`;
    } else {
      // Server-side: fetch() requires absolute URL
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://flowxtra.com");
      url = `${baseUrl}${apiBaseUrl}/${slug}?locale=${normalizedLocale}&site=${siteDomain}&_t=${timestamp}&_r=${random}`;
    }
  } else {
    url = `${apiBaseUrl}/blog/${slug}?locale=${normalizedLocale}&site=${siteDomain}&_t=${timestamp}&_r=${random}`;
  }

  // Debug logging (always log in development, or when error occurs)
  if (process.env.NODE_ENV === "development") {
    console.log("[Blog API] Fetching post:", {
      url,
      slug,
      originalLocale: locale,
      normalizedLocale: normalizedLocale,
      apiBaseUrl: apiBaseUrl,
      fullUrl: url,
    });
  }

  // Build fetch options
  const fetchOptions: ExtendedRequestInit = {
    headers: {
      Accept: "application/json",
      // Add cache-control headers to prevent caching
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      // Add random header to prevent any caching
      "X-Request-ID": `${Date.now()}-${Math.random()}`,
    },
  };

  // Only add next.revalidate if we're in a server component (not client-side)
  // For client-side calls, use cache option instead
  if (typeof window === "undefined" && options?.revalidate !== undefined) {
    // Server-side: can use next.revalidate
    fetchOptions.next = { revalidate: options.revalidate };
  } else if (options?.cache) {
    // Client-side: use cache option
    fetchOptions.cache = options.cache;
  } else {
    // Default: no cache for client-side, revalidate for server-side
    if (typeof window === "undefined") {
      // Use revalidate from options or default to 0 for fresh data
      fetchOptions.next = { revalidate: options?.revalidate ?? 0 };
    } else {
      // Client-side: use default cache to allow bfcache (back/forward cache)
      fetchOptions.cache = "default";
    }
  }

  const response = await fetch(url, fetchOptions);

  // If 404 and locale doesn't match slug's primary language, try with primary language
  if (!response.ok && response.status === 404) {
    // Try to get the post list first to find the correct slug for this locale
    // This is a fallback in case the slug doesn't match the locale
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[Blog API] Post not found with slug "${slug}" for locale "${locale}". This might be a locale mismatch.`
      );
      console.warn(`[Blog API] The slug must match the locale. For example:`);
      console.warn(`  - English slug for locale=en`);
      console.warn(`  - German slug for locale=de`);
    }
  }

  if (!response.ok) {
    let errorData: { error?: string; message?: string } = {};
    let errorText = "";

    try {
      // Try to get error as text first (in case it's not JSON)
      errorText = await response.text();
      // Try to parse as JSON
      if (errorText) {
        try {
          errorData = JSON.parse(errorText) as {
            error?: string;
            message?: string;
          };
        } catch {
          // If not JSON, use text as error message
          errorData = { error: errorText, message: errorText };
        }
      }
    } catch {
      errorData = { error: "Failed to parse error response" };
    }

    // If errorData is empty or has no useful info, provide default message
    const errorMessage =
      errorData?.error ||
      errorData?.message ||
      errorText ||
      response.statusText ||
      `API request failed with status ${response.status}`;

    if (process.env.NODE_ENV === "development") {
      console.error("[Blog API] Error response:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        errorText: errorText.substring(0, 500), // Limit length
        url,
        slug,
        originalLocale: locale,
        normalizedLocale: normalizedLocale,
      });
    }

    if (response.status === 404) {
      throw new Error(
        `Post not found: "${slug}" (locale: ${normalizedLocale}). Make sure the slug matches the locale.`
      );
    }

    throw new Error(`API Error: ${response.status} - ${errorMessage}`);
  }

  const data = await response.json();

  // Debug: Log structured data if available
  if (process.env.NODE_ENV === "development" && data.data?.structuredData) {
    console.log("[Blog API] getBlogPost - Structured data from API:", {
      type: data.data.structuredData["@type"] || "N/A",
      url: data.data.structuredData.url || "N/A",
      headline: data.data.structuredData.headline || "N/A",
      hasKeywords: !!data.data.structuredData.keywords,
      dateModified: data.data.structuredData.dateModified || "N/A",
    });
  }

  return data;
}

// Get Blog Categories
export async function getBlogCategories(
  locale: string = "en"
): Promise<CategoriesResponse> {
  // Normalize locale for API (en-au → en, de-ch → de, etc.)
  const normalizedLocale = normalizeLocaleForApi(locale);

  // Get API base URL (may be proxy path in development)
  const apiBaseUrl = getApiBaseUrl();

  // Add site parameter (required by backend API)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://flowxtra.com";
  const siteDomain = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  // Build URL - if using proxy (/api/blog), use absolute URL to avoid locale prefix
  // In client-side, relative paths get locale prefix added by Next.js
  let url: string;
  if (apiBaseUrl === "/api/blog") {
    // Client-side: use absolute URL to avoid locale prefix
    if (typeof window !== "undefined") {
      url = `${window.location.origin}${apiBaseUrl}/categories?locale=${normalizedLocale}&site=${siteDomain}`;
    } else {
      // Server-side: relative path is fine
      url = `${apiBaseUrl}/categories?locale=${normalizedLocale}&site=${siteDomain}`;
    }
  } else {
    url = `${apiBaseUrl}/blog/categories?locale=${normalizedLocale}&site=${siteDomain}`;
  }

  // Build fetch options
  const fetchOptions: ExtendedRequestInit = {
    headers: {
      Accept: "application/json",
    },
  };

  // Only add next.revalidate if we're in a server component (not client-side)
  if (typeof window === "undefined") {
    // Server-side: can use next.revalidate
    fetchOptions.next = { revalidate: 3600 };
  } else {
    // Client-side: use default cache to allow bfcache (back/forward cache)
    fetchOptions.cache = "default";
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    // If 404, the categories endpoint doesn't exist - this is optional
    if (response.status === 404) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[Blog API] Categories endpoint not found (404). This endpoint is optional."
        );
        console.warn(
          "[Blog API] Categories can be included in the blog posts response instead."
        );
      }
      // Return empty categories instead of throwing error
      return {
        success: true,
        data: {
          categories: [],
        },
      };
    }

    const errorData = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    throw new Error(
      `API Error: ${response.status} - ${
        errorData.error || response.statusText
      }`
    );
  }

  return response.json();
}

// Format date for display
export function formatDate(
  dateString: string,
  locale: string = "en-US"
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Format reading time
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
