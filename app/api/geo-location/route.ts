import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side IP geolocation endpoint
 *
 * This avoids CORS issues and provides more reliable detection.
 * Uses ipapi.co from server-side (no CORS restrictions).
 *
 * Fallback services can be added if primary service fails.
 */
export async function GET(request: NextRequest) {
  try {
    // Get client IP from request headers (handles proxies/load balancers)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

    // Primary service: ipapi.co (no API key needed for basic usage)
    // Note: For "unknown" IP (development), ipapi.co will use request IP automatically
    const ipToCheck = clientIp === "unknown" ? "" : `${clientIp}/`;

    try {
      const response = await fetch(`https://ipapi.co/${ipToCheck}json/`, {
        headers: {
          "User-Agent": request.headers.get("user-agent") || "Flowxtra",
        },
        // Timeout after 3 seconds
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const data = await response.json();

        // Check if we got valid data (not error response)
        if (data.error) {
          throw new Error(`ipapi.co error: ${data.reason || "Unknown"}`);
        }

        return NextResponse.json({
          country_code: data.country_code,
          region_code: data.region_code,
          in_eu: data.in_eu || false,
        });
      }
    } catch (primaryError) {
      // If primary service fails, try fallback
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Primary geo-location service failed, trying fallback:",
          primaryError
        );
      }
    }

    // Fallback service: ip-api.com (free tier, no API key, no CORS restrictions)
    // Note: Empty IP uses request IP automatically
    const fallbackIp = clientIp === "unknown" ? "" : clientIp;

    try {
      const fallbackResponse = await fetch(
        `http://ip-api.com/json/${fallbackIp}?fields=status,countryCode,region,country`,
        {
          headers: {
            "User-Agent": request.headers.get("user-agent") || "Flowxtra",
          },
          signal: AbortSignal.timeout(3000),
        }
      );

      if (fallbackResponse.ok) {
        const data = await fallbackResponse.json();

        if (data.status === "success") {
          return NextResponse.json({
            country_code: data.countryCode,
            region_code: data.region,
            in_eu: false, // ip-api.com doesn't provide EU flag, we'll check country code
          });
        }
      }
    } catch (fallbackError) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Fallback geo-location service also failed:",
          fallbackError
        );
      }
    }

    // If both services fail, return error
    return NextResponse.json(
      { error: "Unable to detect location" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Geo-location API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
