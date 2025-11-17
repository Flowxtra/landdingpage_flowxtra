import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Get all query parameters from the request
  const id = searchParams.get("id");
  const site = searchParams.get("site") || "flowxtra.com";
  const type = searchParams.get("type");
  const language = searchParams.get("language") || "en";
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");

  // Build the API URL - different endpoint for single policy by ID
  let apiUrl: URL;
  if (id) {
    // Single policy by ID
    apiUrl = new URL(
      `https://api.flowxtra.com/api/privacy/policies/public/${id}`
    );
  } else {
    // List of policies
    apiUrl = new URL("https://api.flowxtra.com/api/privacy/policies/public");
    if (site) apiUrl.searchParams.append("site", site);
    if (type) apiUrl.searchParams.append("type", type);
    if (language) apiUrl.searchParams.append("language", language);
    if (limit) apiUrl.searchParams.append("limit", limit);
    if (page) apiUrl.searchParams.append("page", page);
  }

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      return NextResponse.json(
        { success: false, error: errorData.error || response.statusText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error fetching policies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch policies" },
      { status: 500 }
    );
  }
}
