import { NextRequest, NextResponse } from "next/server";

/**
 * API Proxy Route for Contact API
 * This route proxies POST requests to the backend API to avoid CORS issues in development
 *
 * Usage: POST /api/contact -> POST https://api.flowxtra.com/api/contact
 */
export async function POST(request: NextRequest) {
  // Log that the route is being called
  console.log("=".repeat(50));
  console.log("[Contact API Proxy] POST request received");
  console.log("[Contact API Proxy] Request URL:", request.url);
  console.log("[Contact API Proxy] Request method:", request.method);
  console.log("=".repeat(50));

  try {
    // Get request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error(
        "[Contact API Proxy] Error parsing request body:",
        parseError
      );
      return NextResponse.json(
        {
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

    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === "development";

    // Check if reCAPTCHA is enabled from environment variable
    // Default: false (disabled) - same as backend
    const isRecaptchaEnabled =
      process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "true";

    // In development mode, if token is missing, add dummy token
    // Backend will accept it if RECAPTCHA_ENABLED=false
    if (isDevelopment && !body.recaptcha_token) {
      body = {
        ...body,
        recaptcha_token: "test-token-development-mode",
      };
      console.log(
        "[Contact API Proxy] Development mode: Added dummy recaptcha_token"
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
      } else {
        console.log(
          "[Contact API Proxy] Skipping NEXT_PUBLIC_BACKEND_URL (localhost detected):",
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
      } else {
        console.log(
          "[Contact API Proxy] Skipping NEXT_PUBLIC_API_URL (localhost detected):",
          apiUrl
        );
      }
    }

    // ALWAYS use production server as fallback (never localhost)
    if (!backendUrl) {
      backendUrl = "https://api.flowxtra.com";
      console.log(
        "[Contact API Proxy] Using production server (fallback):",
        backendUrl
      );
    } else {
      console.log(
        "[Contact API Proxy] Using backend URL from env:",
        backendUrl
      );
    }

    // Remove trailing /api if present (we'll add it back)
    const originalBackendUrl = backendUrl;
    backendUrl = backendUrl.replace(/\/api\/?$/, "");
    if (originalBackendUrl !== backendUrl) {
      console.log(
        "[Contact API Proxy] Removed /api from backend URL:",
        originalBackendUrl,
        "->",
        backendUrl
      );
    }

    // Ensure we have a clean base URL
    if (!backendUrl.startsWith("http")) {
      backendUrl = `https://${backendUrl}`;
      console.log(
        "[Contact API Proxy] Added https:// to backend URL:",
        backendUrl
      );
    }

    // Build the API URL
    const apiUrl = `${backendUrl}/api/contact`;

    // Debug logging
    console.log("[Contact API Proxy] Proxying request:", {
      originalPath: request.nextUrl.pathname,
      backendUrl,
      apiUrl,
      envApiUrl: process.env.NEXT_PUBLIC_API_URL,
      envBackendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      bodyKeys: Object.keys(body),
      hasRecaptchaToken: !!body.recaptcha_token,
    });

    // Ensure we're not using localhost
    if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
      console.error(
        "[Contact API Proxy] ERROR: API URL contains localhost! This should not happen."
      );
      console.error("[Contact API Proxy] API URL:", apiUrl);
      return NextResponse.json(
        {
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
        "[Contact API Proxy] Response status:",
        response.status,
        response.statusText
      );
    } catch (fetchError) {
      console.error("[Contact API Proxy] Fetch error:", {
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
      } catch (e) {
        errorText = "Failed to read error response";
      }

      console.error("[Contact API Proxy] Error:", {
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
      console.error("[Contact API Proxy] JSON Parse Error:", {
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
    // Log error to console (will appear in terminal where Next.js dev server runs)
    console.error("=".repeat(50));
    console.error("[Contact API Proxy] UNEXPECTED ERROR:");
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
