// Policies API Service
// This file handles all API calls to the policies backend

/**
 * Get API base URL from environment variables
 */
function getApiBaseUrl(): string {
  // First, check if NEXT_PUBLIC_API_URL is set (highest priority)
  if (process.env.NEXT_PUBLIC_API_URL) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    return apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
  }

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    const devUrl = process.env.NEXT_PUBLIC_developemant_BACKEND_URL;
    if (!devUrl) {
      const error =
        "NEXT_PUBLIC_developemant_BACKEND_URL is not configured in .env.local. Please add it.";
      console.error("❌", error);
      throw new Error(error);
    }
    return devUrl.endsWith("/api") ? devUrl : `${devUrl}/api`;
  } else {
    const prodUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!prodUrl) {
      const fallbackUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://flowxtra.com/api";
      console.warn(
        "⚠️ NEXT_PUBLIC_BACKEND_URL is not configured. Using fallback:",
        fallbackUrl
      );
      return fallbackUrl.endsWith("/api") ? fallbackUrl : `${fallbackUrl}/api`;
    }
    return prodUrl.endsWith("/api") ? prodUrl : `${prodUrl}/api`;
  }
}

const API_BASE_URL = getApiBaseUrl();

// TypeScript Interfaces
export interface Policy {
  id: number;
  site_id: number;
  type: string;
  language: string;
  title: string;
  content: string;
  change_log?: string | null;
  version: string;
  effective_at: string;
  status: string;
  created_at: string;
  updated_at: string;
  site?: {
    id: number;
    name: string;
    domain: string;
  };
}

export interface PoliciesResponse {
  success: boolean;
  data: {
    policies: Policy[];
    meta: {
      current_page: number;
      total: number;
      per_page: number;
      last_page: number;
      from: number;
      to: number;
    };
  };
}

export interface PolicyResponse {
  success: boolean;
  data: Policy;
}

// Policy type mapping for URL routes
export const POLICY_TYPE_MAP: Record<string, string> = {
  dpa: "DPA",
  imprint: "Imprint",
  disclaimer: "Disclaimer",
  "privacy-policy": "Privacy Policy",
  "cookie-policy": "Cookie Policy",
  "terms-of-use": "Terms of Use Companies",
};

// Get Policies List
export async function getPolicies(params: {
  site?: string;
  site_id?: number;
  type?: string;
  language?: string;
  page?: number;
  limit?: number;
}): Promise<PoliciesResponse> {
  const queryParams = new URLSearchParams();

  if (params.site) queryParams.append("site", params.site);
  if (params.site_id) queryParams.append("site_id", params.site_id.toString());
  if (params.type) queryParams.append("type", params.type);
  if (params.language) queryParams.append("language", params.language);
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());

  const url = `${API_BASE_URL}/privacy/policies/public?${queryParams.toString()}`;

  const fetchOptions: RequestInit = {
    headers: {
      Accept: "application/json",
    },
  };

  if (typeof window === "undefined") {
    (fetchOptions as any).next = { revalidate: 3600 };
  } else {
    // Client-side: use default cache to allow bfcache (back/forward cache)
    fetchOptions.cache = "default";
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
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

// Get Single Policy
export async function getPolicy(id: number): Promise<PolicyResponse> {
  const url = `${API_BASE_URL}/privacy/policies/public/${id}`;

  const fetchOptions: RequestInit = {
    headers: {
      Accept: "application/json",
    },
  };

  if (typeof window === "undefined") {
    (fetchOptions as any).next = { revalidate: 3600 };
  } else {
    // Client-side: use default cache to allow bfcache (back/forward cache)
    fetchOptions.cache = "default";
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
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

// Get Latest Policy by Type
export async function getLatestPolicyByType(
  type: string,
  language: string = "en",
  site: string = "Flowxtra"
): Promise<PolicyResponse | null> {
  try {
    const response = await getPolicies({
      site,
      type,
      language,
      limit: 1,
    });

    if (response.success && response.data.policies.length > 0) {
      return {
        success: true,
        data: response.data.policies[0],
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching latest policy:", error);
    return null;
  }
}

// Get Policy by Route (for dynamic routes)
export async function getPolicyByRoute(
  route: string,
  language: string = "en",
  site: string = "Flowxtra"
): Promise<PolicyResponse | null> {
  const policyType = POLICY_TYPE_MAP[route];
  if (!policyType) {
    return null;
  }

  return getLatestPolicyByType(policyType, language, site);
}
