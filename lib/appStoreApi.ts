// App Store API Service
// This file handles all API calls to the app store backend

import {
  getMockApps,
  getMockApp,
  getMockRelatedApps,
  mockCategories,
} from "./appStoreMockData";

/**
 * Get API base URL from environment variables
 * Development: Uses NEXT_PUBLIC_developemant_BACKEND_URL from .env.local
 * Production: Uses NEXT_PUBLIC_BACKEND_URL from production environment
 * Fallback: Uses NEXT_PUBLIC_API_URL if available
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
      // Fallback to API_URL or default production URL
      const fallbackUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://flowxtra.com/api";
      console.warn(
        "⚠️ NEXT_PUBLIC_BACKEND_URL is not configured. Using fallback:",
        fallbackUrl
      );
      return fallbackUrl.endsWith("/api") ? fallbackUrl : `${fallbackUrl}/api`;
    }

    // Add /api if not already included
    return prodUrl.endsWith("/api") ? prodUrl : `${prodUrl}/api`;
  }
}

const API_BASE_URL = getApiBaseUrl();

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

  const url = `${API_BASE_URL}/app-store?${queryParams.toString()}`;

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
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Fallback to mock data if API fails
    console.warn("[App Store API] Using mock data due to API error:", error);
    const mockData = getMockApps({
      page: params.page,
      limit: params.limit,
      category: params.category,
      search: params.search,
    });

    return {
      success: true,
      data: {
        apps: mockData.apps,
        categories: mockCategories,
        pagination: mockData.pagination,
      },
    };
  }
}

// Get Single App
export async function getApp(
  slug: string,
  locale: string = "en"
): Promise<AppResponse> {
  const url = `${API_BASE_URL}/app-store/${slug}?locale=${locale}`;

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
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Fallback to mock data if API fails
    console.warn(
      "[App Store API] Using mock data for app detail due to API error:",
      error
    );
    const mockApp = getMockApp(slug);

    if (!mockApp) {
      throw new Error("App not found");
    }

    const relatedApps = getMockRelatedApps(mockApp.id, mockApp.categorySlug);

    return {
      success: true,
      data: {
        app: mockApp,
        relatedApps,
      },
    };
  }
}

// Get App Categories
export async function getAppCategories(locale: string = "en"): Promise<{
  success: boolean;
  data: {
    categories: AppCategory[];
  };
}> {
  const url = `${API_BASE_URL}/app-store/categories?locale=${locale}`;

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
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Fallback to mock data if API fails
    console.warn(
      "[App Store API] Using mock data for categories due to API error:",
      error
    );
    return {
      success: true,
      data: {
        categories: mockCategories,
      },
    };
  }
}
