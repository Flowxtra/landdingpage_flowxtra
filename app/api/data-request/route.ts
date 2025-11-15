import { NextRequest, NextResponse } from "next/server";

/**
 * API Proxy Route for Data Request API
 * This route proxies POST requests to the backend API to avoid CORS issues
 *
 * Usage: POST /api/data-request -> POST https://api.flowxtra.com/api/data-request
 */
export async function POST(request: NextRequest) {
  console.log("=".repeat(50));
  console.log("[Data Request API Proxy] POST request received");
  console.log("[Data Request API Proxy] Request URL:", request.url);
  console.log("=".repeat(50));

  try {
    // Get request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error(
        "[Data Request API Proxy] Error parsing request body:",
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

    // Validate required fields
    if (!body.email || !body.full_name || !body.request_type) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "Email, full name, and request type are required",
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

    // Validate request type
    const validRequestTypes = ["request_data", "delete_data", "update_data"];
    if (!validRequestTypes.includes(body.request_type)) {
      return NextResponse.json(
        {
          error: "Invalid request type",
          message: `Request type must be one of: ${validRequestTypes.join(", ")}`,
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
      if (
        !backendUrlEnv.includes("localhost") &&
        !backendUrlEnv.includes("127.0.0.1") &&
        !backendUrlEnv.startsWith("http://localhost") &&
        !backendUrlEnv.startsWith("http://127.0.0.1")
      ) {
        backendUrl = backendUrlEnv;
      } else {
        console.log(
          "[Data Request API Proxy] Skipping NEXT_PUBLIC_BACKEND_URL (localhost detected):",
          backendUrlEnv
        );
      }
    }

    // Second, try NEXT_PUBLIC_API_URL only if it's NOT localhost
    if (!backendUrl && process.env.NEXT_PUBLIC_API_URL) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (
        !apiUrl.includes("localhost") &&
        !apiUrl.includes("127.0.0.1") &&
        !apiUrl.startsWith("http://localhost") &&
        !apiUrl.startsWith("http://127.0.0.1")
      ) {
        backendUrl = apiUrl;
      } else {
        console.log(
          "[Data Request API Proxy] Skipping NEXT_PUBLIC_API_URL (localhost detected):",
          apiUrl
        );
      }
    }

    // ALWAYS use production server as fallback (never localhost)
    if (!backendUrl) {
      backendUrl = "https://api.flowxtra.com";
      console.log(
        "[Data Request API Proxy] Using production server (fallback):",
        backendUrl
      );
    } else {
      console.log(
        "[Data Request API Proxy] Using backend URL from env:",
        backendUrl
      );
    }

    // Remove trailing /api if present (we'll add it back)
    const originalBackendUrl = backendUrl;
    backendUrl = backendUrl.replace(/\/api\/?$/, "");
    if (originalBackendUrl !== backendUrl) {
      console.log(
        "[Data Request API Proxy] Removed /api from backend URL:",
        originalBackendUrl,
        "->",
        backendUrl
      );
    }

    // Ensure we have a clean base URL
    if (!backendUrl.startsWith("http")) {
      backendUrl = `https://${backendUrl}`;
      console.log(
        "[Data Request API Proxy] Added https:// to backend URL:",
        backendUrl
      );
    }

    // Build the API URL
    const apiUrl = `${backendUrl}/api/data-request`;

    // Debug logging
    console.log("[Data Request API Proxy] Proxying request:", {
      originalPath: request.nextUrl.pathname,
      backendUrl,
      apiUrl,
      bodyKeys: Object.keys(body),
    });

    // Ensure we're not using localhost
    if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
      console.error(
        "[Data Request API Proxy] ERROR: API URL contains localhost! This should not happen."
      );
      console.error("[Data Request API Proxy] API URL:", apiUrl);
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
        cache: "no-store",
      });
      console.log(
        "[Data Request API Proxy] Response status:",
        response.status,
        response.statusText
      );
    } catch (fetchError) {
      console.error("[Data Request API Proxy] Fetch error:", {
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

      console.error("[Data Request API Proxy] Error:", {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        error: errorText.substring(0, 500),
      });

      return NextResponse.json(
        {
          error: "API request failed",
          status: response.status,
          message: errorText.substring(0, 200),
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
      console.error("[Data Request API Proxy] JSON Parse Error:", {
        error:
          parseError instanceof Error
            ? parseError.message
            : "Unknown parse error",
        url: apiUrl,
      });
      return NextResponse.json(
        {
          error: "Invalid response from server",
          message: "Server returned invalid JSON",
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

    console.log("[Data Request API Proxy] Success:", {
      status: response.status,
      hasData: !!data,
    });

    // Return the response
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("[Data Request API Proxy] Unexpected error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "An unexpected error occurred",
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

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

