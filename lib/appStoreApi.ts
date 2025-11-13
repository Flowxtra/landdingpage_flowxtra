// App Store API Service
// This file handles all API calls to the app store backend

/**
 * Get API base URL from environment variables
 * Development: Uses proxy route (/api/app-store) to avoid CORS issues
 * Production: Uses NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_API_URL
 */
function getApiBaseUrl(): string {
  // ALWAYS use Next.js API route as proxy to avoid CORS issues
  // This works for both client-side and server-side (Next.js API routes handle both)
  // The proxy route at /api/app-store will forward requests to the actual backend API
  console.log("[getApiBaseUrl] Using proxy /api/app-store (avoids CORS)");
  return "/api/app-store";
}

// TypeScript Interfaces
export interface AppCategory {
  id: number;
  name: string;
  slug: string;
  translations?: {
    en: string;
    de?: string;
    [key: string]: string | undefined;
  };
}

export interface App {
  id: number;
  name: string; // App name in the requested locale
  slug: string;
  description: string; // Full description in the requested locale
  shortDescription?: string; // Brief description in the requested locale
  category: string; // Category name in the requested locale
  categoryId: number;
  categorySlug: string;
  icon: string;
  screenshots?: string[];
  features?: string[]; // Features in the requested locale
  websiteUrl?: string; // Official website URL (comes from backend)
  isVerified?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Optional: If backend provides translations object
  translations?: {
    en?: {
      name?: string;
      description?: string;
      shortDescription?: string;
      features?: string[];
    };
    de?: {
      name?: string;
      description?: string;
      shortDescription?: string;
      features?: string[];
    };
    ar?: {
      name?: string;
      description?: string;
      shortDescription?: string;
      features?: string[];
    };
    es?: {
      name?: string;
      description?: string;
      shortDescription?: string;
      features?: string[];
    };
    fr?: {
      name?: string;
      description?: string;
      shortDescription?: string;
      features?: string[];
    };
    it?: {
      name?: string;
      description?: string;
      shortDescription?: string;
      features?: string[];
    };
    nl?: {
      name?: string;
      description?: string;
      shortDescription?: string;
      features?: string[];
    };
  };
}

export interface AppsResponse {
  success: boolean;
  data: {
    apps: App[];
    categories?: AppCategory[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalApps: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface AppResponse {
  success: boolean;
  data: {
    app: App;
    relatedApps?: App[];
  };
}

// Get image URL helper
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return "";

  // If already absolute URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Get base URL from environment
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_developemant_BACKEND_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL) ||
    "https://app.flowxtra.com";

  // Remove /api if present
  const cleanBaseUrl = baseUrl.replace(/\/api$/, "");

  // If path starts with /, use it directly
  if (imagePath.startsWith("/")) {
    return `${cleanBaseUrl}${imagePath}`;
  }

  // Otherwise, assume it's in storage
  return `${cleanBaseUrl}/storage/${imagePath}`;
}

// Get App Store Apps List
export async function getApps(params: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  locale?: string;
  minimal?: boolean;
}): Promise<AppsResponse> {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.category) queryParams.append("category", params.category);
  if (params.search) queryParams.append("search", params.search);
  if (params.locale) queryParams.append("locale", params.locale);
  if (params.minimal) queryParams.append("minimal", "true");

  // Get API base URL (may be proxy path in development)
  const apiBaseUrl = getApiBaseUrl();
  
  // Build URL - if using proxy (/api/app-store), use absolute URL to avoid locale prefix
  // In client-side, relative paths get locale prefix added by Next.js
  let url: string;
  if (apiBaseUrl === "/api/app-store") {
    // Client-side: use absolute URL to avoid locale prefix
    if (typeof window !== "undefined") {
      url = `${window.location.origin}${apiBaseUrl}?${queryParams.toString()}`;
    } else {
      // Server-side: relative path is fine
      url = `${apiBaseUrl}?${queryParams.toString()}`;
    }
  } else {
    url = `${apiBaseUrl}/app-store?${queryParams.toString()}`;
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
    (fetchOptions as any).next = { revalidate: 900 };
  } else {
    // Client-side: use no-store to always fetch fresh data
    fetchOptions.cache = "no-store";
  }

  try {
    console.log(`[App Store API] Fetching apps from: ${url}`);
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(`[App Store API] API Error ${response.status}:`, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(
      `[App Store API] Successfully fetched ${
        data.data?.apps?.length || 0
      } apps`
    );
    return data;
  } catch (error) {
    // Log error and rethrow
    console.error("[App Store API] Failed to fetch apps:", error);
    console.error(`[App Store API] Failed URL: ${url}`);
    throw error;
  }
}

// Get Single App
export async function getApp(
  slug: string,
  locale: string = "en"
): Promise<AppResponse> {
  // Get API base URL (may be proxy path in development)
  const apiBaseUrl = getApiBaseUrl();
  
  // Build URL - if using proxy (/api/app-store), use absolute URL to avoid locale prefix
  let url: string;
  if (apiBaseUrl === "/api/app-store") {
    // Client-side: use absolute URL to avoid locale prefix
    if (typeof window !== "undefined") {
      url = `${window.location.origin}${apiBaseUrl}/${slug}?locale=${locale}`;
    } else {
      // Server-side: relative path is fine
      url = `${apiBaseUrl}/${slug}?locale=${locale}`;
    }
  } else {
    url = `${apiBaseUrl}/app-store/${slug}?locale=${locale}`;
  }

  const fetchOptions: RequestInit = {
    headers: {
      Accept: "application/json",
    },
  };

  if (typeof window === "undefined") {
    (fetchOptions as any).next = { revalidate: 900 };
  } else {
    fetchOptions.cache = "no-store";
  }

  try {
    console.log(`[App Store API] Fetching app: ${slug} from: ${url}`);
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(`[App Store API] API Error ${response.status}:`, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`[App Store API] Successfully fetched app: ${slug}`);
    return data;
  } catch (error) {
    // Log error and rethrow
    console.error("[App Store API] Failed to fetch app:", error);
    console.error(`[App Store API] Failed URL: ${url}`);
    throw error;
  }
}

// Get App Categories
export async function getAppCategories(locale: string = "en"): Promise<{
  success: boolean;
  data: {
    categories: AppCategory[];
  };
}> {
  // Get API base URL (may be proxy path in development)
  const apiBaseUrl = getApiBaseUrl();
  
  // Build URL - if using proxy (/api/app-store), use absolute URL to avoid locale prefix
  let url: string;
  if (apiBaseUrl === "/api/app-store") {
    // Client-side: use absolute URL to avoid locale prefix
    if (typeof window !== "undefined") {
      url = `${window.location.origin}${apiBaseUrl}/categories?locale=${locale}`;
    } else {
      // Server-side: relative path is fine
      url = `${apiBaseUrl}/categories?locale=${locale}`;
    }
  } else {
    url = `${apiBaseUrl}/app-store/categories?locale=${locale}`;
  }

  const fetchOptions: RequestInit = {
    headers: {
      Accept: "application/json",
    },
  };

  if (typeof window === "undefined") {
    (fetchOptions as any).next = { revalidate: 3600 };
  } else {
    fetchOptions.cache = "no-store";
  }

  try {
    console.log(`[App Store API] Fetching categories from: ${url}`);
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(`[App Store API] API Error ${response.status}:`, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(
      `[App Store API] Successfully fetched ${
        data.data?.categories?.length || 0
      } categories`
    );
    return data;
  } catch (error) {
    // Log error and rethrow
    console.error("[App Store API] Failed to fetch categories:", error);
    console.error(`[App Store API] Failed URL: ${url}`);
    throw error;
  }
}
