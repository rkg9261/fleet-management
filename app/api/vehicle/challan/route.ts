import { NextRequest, NextResponse } from "next/server";

const CHALLAN_API_URL =
  "https://api.lorryinfo.com/api/v1/echallanByVehicle";

export async function POST(request: NextRequest) {
  try {
    // ===== NEW CHANGE: Read request body =====
    const body = await request.json();

    const vehicleNumber = body?.vehicleNumber
      ?.trim()
      ?.toUpperCase();

    // ===== NEW CHANGE: Validate vehicle number =====
    if (!vehicleNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle registration number is required.",
        },
        { status: 400 }
      );
    }

    // ===== NEW CHANGE: Read API key from server environment =====
    const apiKey = process.env.LORRYINFO_API_KEY;

    if (!apiKey) {
      console.error("LORRYINFO_API_KEY is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Vehicle API configuration is missing.",
        },
        { status: 500 }
      );
    }

    // ===== NEW CHANGE: Call LorryInfo Challan API =====
    const response = await fetch(CHALLAN_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },

      body: JSON.stringify({
        vehicleNumber: vehicleNumber,
      }),

      cache: "no-store",
    });

    // ===== NEW CHANGE: Read response as text first =====
    const responseText = await response.text();

    console.log("LorryInfo Challan Status:", response.status);
    console.log("LorryInfo Challan Response:", responseText);

    let result;

    // ===== NEW CHANGE: Safely parse JSON =====
    try {
      result = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from LorryInfo Challan API.",
          rawResponse: responseText,
        },
        { status: 502 }
      );
    }

    // ===== NEW CHANGE: Handle API error =====
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            result?.message ||
            result?.error ||
            "LorryInfo Challan API request failed.",

          data: result?.data || null,
        },
        { status: response.status }
      );
    }

    // ===== NEW CHANGE: Return complete response =====
    return NextResponse.json(result);
  } catch (error) {
    console.error("Challan API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve challan information.",
      },
      { status: 500 }
    );
  }
}