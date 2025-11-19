import { NextRequest, NextResponse } from "next/server";

/**
 * API Proxy Route for Consent API
 * This route proxies POST requests to the backend API to avoid CORS issues in development
 *
 * Usage: POST /api/consent/log -> POST https://api.flowxtra.com/api/consent/log
 */
export async function POST(request: NextRequest) {
  // Log that the route is being called
  console.log("=".repeat(50));
  console.log("[Consent API Proxy] POST request received");
  console.log("[Consent API Proxy] Request URL:", request.url);
  console.log("=".repeat(50));

  try {
    // Get request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error(
        "[Consent API Proxy] Error parsing request body:",
        parseError
      );
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
          message:
            parseError instanceof Error ? parseError.message : "Unknown error",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    // Build the backend API URL
    // Priority: NEXT_PUBLIC_BACKEND_URL (if not localhost) > NEXT_PUBLIC_API_URL (if not localhost) > default
    let backendUrl: string | undefined;

    // First, try NEXT_PUBLIC_BACKEND_URL only if it's NOT localhost
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
      const backendUrlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;
      // Skip if it's localhost (development local backend)
      if (
        !backendUrlEnv.includes("localhost") &&
        !backendUrlEnv.includes("127.0.0.1") &&
        !backendUrlEnv.startsWith("http://localhost") &&
        !backendUrlEnv.startsWith("http://127.0.0.1")
      ) {
        backendUrl = backendUrlEnv;
        console.log(
          "[Consent API Proxy] Using NEXT_PUBLIC_BACKEND_URL:",
          backendUrl
        );
      } else {
        console.log(
          "[Consent API Proxy] Skipping NEXT_PUBLIC_BACKEND_URL (localhost detected):",
          backendUrlEnv
        );
      }
    }

    // Second, try NEXT_PUBLIC_API_URL only if it's NOT localhost
    if (!backendUrl && process.env.NEXT_PUBLIC_API_URL) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      // Skip if it's localhost (development local backend)
      if (
        !apiUrl.includes("localhost") &&
        !apiUrl.includes("127.0.0.1") &&
        !apiUrl.startsWith("http://localhost") &&
        !apiUrl.startsWith("http://127.0.0.1")
      ) {
        backendUrl = apiUrl;
        console.log(
          "[Consent API Proxy] Using NEXT_PUBLIC_API_URL:",
          backendUrl
        );
      } else {
        console.log(
          "[Consent API Proxy] Skipping NEXT_PUBLIC_API_URL (localhost detected):",
          apiUrl
        );
      }
    }

    // ALWAYS use production server as fallback (never localhost)
    if (!backendUrl) {
      backendUrl = "https://api.flowxtra.com";
      console.log(
        "[Consent API Proxy] Using production server (fallback):",
        backendUrl
      );
    }

    // Remove trailing /api if present (we'll add it back)
    const originalBackendUrl = backendUrl;
    backendUrl = backendUrl.replace(/\/api\/?$/, "");
    if (originalBackendUrl !== backendUrl) {
      console.log(
        "[Consent API Proxy] Removed /api from backend URL:",
        originalBackendUrl,
        "->",
        backendUrl
      );
    }

    // Ensure we have a clean base URL
    if (!backendUrl.startsWith("http")) {
      backendUrl = `https://${backendUrl}`;
      console.log(
        "[Consent API Proxy] Added https:// to backend URL:",
        backendUrl
      );
    }

    // Build the API URL
    const apiUrl = `${backendUrl}/api/consent/log`;

    // Debug logging
    console.log("[Consent API Proxy] Proxying request:", {
      originalPath: request.nextUrl.pathname,
      backendUrl,
      apiUrl,
      envApiUrl: process.env.NEXT_PUBLIC_API_URL,
      envBackendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      bodyKeys: Object.keys(body),
      hasConsentId: !!body.consentId,
    });

    // Ensure we're not using localhost
    if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
      console.error(
        "[Consent API Proxy] ERROR: API URL contains localhost! This should not happen."
      );
      console.error("[Consent API Proxy] API URL:", apiUrl);
      return NextResponse.json(
        {
          success: false,
          error: "Configuration error",
          message:
            "API URL contains localhost. Please check environment variables.",
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

    // Forward the request to the backend API
    let response;
    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        body: JSON.stringify(body),
        // Don't cache the response
        cache: "no-store",
      });
      console.log(
        "[Consent API Proxy] Response status:",
        response.status,
        response.statusText
      );
    } catch (fetchError) {
      console.error("[Consent API Proxy] Fetch error:", {
        error:
          fetchError instanceof Error ? fetchError.message : "Unknown error",
        stack: fetchError instanceof Error ? fetchError.stack : undefined,
        url: apiUrl,
      });
      throw fetchError;
    }

    if (!response.ok) {
      let errorText = "";
      try {
        errorText = await response.text();
      } catch {
        errorText = "Failed to read error response";
      }

      console.error("[Consent API Proxy] Error:", {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        error: errorText.substring(0, 500), // Limit error text length
      });

      return NextResponse.json(
        {
          success: false,
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
      console.error("[Consent API Proxy] JSON Parse Error:", {
        error:
          parseError instanceof Error
            ? parseError.message
            : "Unknown parse error",
        url: apiUrl,
      });
      return NextResponse.json(
        {
          success: false,
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
    // Log error to console (will appear in terminal where Next.js dev server runs)
    console.error("=".repeat(50));
    console.error("[Consent API Proxy] UNEXPECTED ERROR:");
    console.error(
      "Error message:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.error(
      "Error name:",
      error instanceof Error ? error.name : "Unknown"
    );
    if (error instanceof Error && error.stack) {
      console.error("Error stack:", error.stack);
    }
    console.error("=".repeat(50));

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.stack
              : undefined
            : undefined,
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
