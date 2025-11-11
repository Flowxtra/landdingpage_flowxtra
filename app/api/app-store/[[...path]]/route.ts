import { NextRequest, NextResponse } from "next/server";

/**
 * API Proxy Route for App Store API
 * This route proxies requests to the backend API to avoid CORS issues in development
 *
 * Usage: /api/app-store/* -> https://api.flowxtra.com/api/app-store/*
 *
 * Uses optional catch-all route [[...path]] to handle both:
 * - /api/app-store (empty path)
 * - /api/app-store/slug (with path segments)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] | undefined }> }
) {
  try {
    // Safely resolve params - handle case where params might be undefined
    let resolvedParams: { path?: string[] | undefined } = {};
    try {
      resolvedParams = (await params) || {};
    } catch (paramsError) {
      console.warn("[App Store API Proxy] Error resolving params:", paramsError);
      resolvedParams = {};
    }

    console.log(
      "[App Store API Proxy] Resolved params:",
      JSON.stringify(resolvedParams)
    );

    const path = resolvedParams?.path;
    console.log("[App Store API Proxy] Path from params:", path);

    // Handle optional catch-all: path can be undefined, empty array, or not exist
    const pathString =
      path && Array.isArray(path) && path.length > 0 ? path.join("/") : "";

    console.log("[App Store API Proxy] Path string:", pathString);

    // Get query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    // Build the backend API URL
    // Priority: NEXT_PUBLIC_BACKEND_URL > NEXT_PUBLIC_API_URL (if not localhost) > default
    let backendUrl: string | undefined;

    // First, try NEXT_PUBLIC_BACKEND_URL (production backend)
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
      backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    }
    // Second, try NEXT_PUBLIC_API_URL only if it's NOT localhost
    else if (process.env.NEXT_PUBLIC_API_URL) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      // Skip if it's localhost (development local backend)
      if (
        !apiUrl.includes("localhost") &&
        !apiUrl.includes("127.0.0.1") &&
        !apiUrl.startsWith("http://localhost") &&
        !apiUrl.startsWith("http://127.0.0.1")
      ) {
        backendUrl = apiUrl;
      }
    }

    // Fallback to default production URL
    if (!backendUrl) {
      backendUrl = "https://api.flowxtra.com";
    }

    // Remove trailing /api if present (we'll add it back)
    backendUrl = backendUrl.replace(/\/api\/?$/, "");

    // Ensure we have a clean base URL
    if (!backendUrl.startsWith("http")) {
      backendUrl = `https://${backendUrl}`;
    }

    // Build the API URL - handle empty path (for app store listing)
    const pathPart = pathString ? `/${pathString}` : "";
    const apiUrl = `${backendUrl}/api/app-store${pathPart}${
      queryString ? `?${queryString}` : ""
    }`;

    // Debug logging
    console.log("[App Store API Proxy] Proxying request:", {
      originalPath: request.nextUrl.pathname,
      pathString,
      backendUrl,
      apiUrl,
      queryString,
      envApiUrl: process.env.NEXT_PUBLIC_API_URL,
      envBackendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    });

    // Forward the request to the backend API
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Don't cache the response
      cache: "no-store",
    });

    if (!response.ok) {
      let errorText = "";
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = "Failed to read error response";
      }

      console.error("[App Store API Proxy] Error:", {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        error: errorText.substring(0, 500), // Limit error text length
      });

      return NextResponse.json(
        {
          error: "API request failed",
          status: response.status,
          message: errorText.substring(0, 200), // Limit message length
        },
        {
          status: response.status,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    // Parse JSON response
    let data;
    try {
      const text = await response.text();
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("[App Store API Proxy] JSON Parse Error:", {
        error:
          parseError instanceof Error
            ? parseError.message
            : "Unknown parse error",
        url: apiUrl,
      });
      return NextResponse.json(
        {
          error: "Invalid JSON response from API",
          message:
            parseError instanceof Error ? parseError.message : "Unknown error",
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    // Return the response with CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[App Store API Proxy] Unexpected error:", error);
    console.error("[App Store API Proxy] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    });
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

