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
  // First, check if NEXT_PUBLIC_API_URL is set (highest priority)
  if (process.env.NEXT_PUBLIC_API_URL) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Add /api if not already included
    return apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
  }

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    // Development: Use local backend URL from .env.local
    const devUrl = process.env.NEXT_PUBLIC_developemant_BACKEND_URL;

    if (!devUrl) {
      const error =
        "NEXT_PUBLIC_developemant_BACKEND_URL is not configured in .env.local. Please add it.";
      console.error("❌", error);
      throw new Error(error);
    }

    // Add /api if not already included
    return devUrl.endsWith("/api") ? devUrl : `${devUrl}/api`;
  } else {
    // Production: Use production backend URL from environment
    const prodUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!prodUrl) {
      const error =
        "NEXT_PUBLIC_BACKEND_URL is not configured in production environment.";
      console.error("❌", error);
      throw new Error(error);
    }

    // Add /api if not already included
    return prodUrl.endsWith("/api") ? prodUrl : `${prodUrl}/api`;
  }
}

const API_BASE_URL = getApiBaseUrl();

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
    structuredData?: any;
  };
}

export interface BlogPostResponse {
  success: boolean;
  data: {
    post: BlogPost;
    relatedPosts: BlogPost[];
    structuredData?: any;
  };
}

export interface CategoriesResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}

// Helper function to build image URL
export function getImageUrl(imagePath: string): string {
  if (!imagePath) {
    return "";
  }

  // If already absolute URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
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

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.category) queryParams.append("category", params.category);
  if (params.tag) queryParams.append("tag", params.tag);
  if (params.search) queryParams.append("search", params.search);
  if (params.locale) queryParams.append("locale", params.locale);
  if (params.minimal) queryParams.append("minimal", "true");
  if (params.fields) queryParams.append("fields", params.fields);

  const url = `${API_BASE_URL}/blog?${queryParams.toString()}`;

  // Debug logging
  console.log("[Blog API] getBlogPosts - Request URL:", url);
  console.log("[Blog API] getBlogPosts - Params:", {
    page: params.page,
    limit: params.limit,
    category: params.category,
    locale: params.locale,
    search: params.search,
    hasCategory: !!params.category,
  });

  // Build fetch options
  const fetchOptions: RequestInit = {
    headers: {
      Accept: "application/json",
    },
  };

  // Only add next.revalidate if we're in a server component (not client-side)
  if (typeof window === "undefined") {
    // Server-side: can use next.revalidate
    (fetchOptions as any).next = { revalidate: 900 };
  } else {
    // Client-side: use no-store to always fetch fresh data
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
    const errorData = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    console.error("[Blog API] getBlogPosts - Error:", {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
      url,
    });
    throw new Error(
      `API Error: ${response.status} - ${
        errorData.error || response.statusText
      }`
    );
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
  // Add timestamp query parameter to prevent caching when forceRefresh is true
  const timestamp = options?.forceRefresh ? `&_t=${Date.now()}` : "";
  const url = `${API_BASE_URL}/blog/${slug}?locale=${locale}${timestamp}`;

  // Debug logging (always log in development, or when error occurs)
  if (process.env.NODE_ENV === "development") {
    console.log("[Blog API] Fetching post:", {
      url,
      slug,
      locale,
      apiBaseUrl: API_BASE_URL,
      fullUrl: url,
    });
  }

  // Build fetch options
  const fetchOptions: RequestInit = {
    headers: {
      Accept: "application/json",
      // Add cache-control headers to prevent caching
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  };

  // Only add next.revalidate if we're in a server component (not client-side)
  // For client-side calls, use cache option instead
  if (typeof window === "undefined" && options?.revalidate) {
    // Server-side: can use next.revalidate
    (fetchOptions as any).next = { revalidate: options.revalidate };
  } else if (options?.cache) {
    // Client-side: use cache option
    fetchOptions.cache = options.cache;
  } else {
    // Default: no cache for client-side, revalidate for server-side
    if (typeof window === "undefined") {
      (fetchOptions as any).next = { revalidate: 900 };
    } else {
      // Force no cache for client-side to always get fresh data
      fetchOptions.cache = "no-store";
    }
  }

  let response = await fetch(url, fetchOptions);

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
    // Get error details for better debugging
    let errorMessage = `API Error: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;

      if (process.env.NODE_ENV === "development") {
        console.error("[Blog API] Error response:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          url,
          slug,
          locale,
        });
      }
    } catch (e) {
      // If JSON parsing fails, use status text
      errorMessage = `${errorMessage} - ${response.statusText}`;
    }

    if (response.status === 404) {
      throw new Error(
        `Post not found: "${slug}" (locale: ${locale}). Make sure the slug matches the locale.`
      );
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

// Get Blog Categories
export async function getBlogCategories(
  locale: string = "en"
): Promise<CategoriesResponse> {
  const url = `${API_BASE_URL}/blog/categories?locale=${locale}`;

  // Debug logging
  if (process.env.NODE_ENV === "development") {
    console.log("[Blog API] getBlogCategories - Request URL:", url);
  }

  // Build fetch options
  const fetchOptions: RequestInit = {
    headers: {
      Accept: "application/json",
    },
  };

  // Only add next.revalidate if we're in a server component (not client-side)
  if (typeof window === "undefined") {
    // Server-side: can use next.revalidate
    (fetchOptions as any).next = { revalidate: 3600 };
  } else {
    // Client-side: use no-store to always fetch fresh data
    fetchOptions.cache = "no-store";
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
