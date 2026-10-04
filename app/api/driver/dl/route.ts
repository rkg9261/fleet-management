import { NextRequest, NextResponse } from "next/server";

const DL_API_URL =
  "https://api.lorryinfo.com/api/v1/dlLookup_1";

export async function POST(request: NextRequest) {
  try {
    // ===== NEW CHANGE: Read request body =====
    const body = await request.json();
    console.log("Received request body:", body);
    
    const dlNumber = body?.dlnumber
      ?.trim()
      ?.toUpperCase();

    const dob = body?.dob?.trim();
    console.log("Parsed DL number:", dlNumber);
    console.log("Parsed DOB:", dob);
    // ===== NEW CHANGE: Validate DL number =====
    if (!dlNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Driving License number is required.",
        },
        { status: 400 }
      );
    }

    // ===== NEW CHANGE: Validate DOB =====
    if (!dob) {
      return NextResponse.json(
        {
          success: false,
          message: "Date of birth is required.",
        },
        { status: 400 }
      );
    }

    // ===== NEW CHANGE: Read API key from server environment =====
    const apiKey = process.env.NEXT_PUBLIC_LORRYINFO_API_KEY;
    console.log("Url:", DL_API_URL);
    console.log("Using LORRYINFO_API_KEY from server environment:", apiKey);
    console.log("Calling LorryInfo DL API with DL number:", dlNumber, "and DOB:", dob);

    if (!apiKey) {
      console.error("LORRYINFO_API_KEY is missing");

      return NextResponse.json(
        {
          success: false,
          message: "DL API configuration is missing."+apiKey,
        },
        { status: 500 }
      );
    }

    // ===== NEW CHANGE: Call LorryInfo DL API =====
    const response = await fetch(DL_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },

      body: JSON.stringify({
        dlnumber: dlNumber,
        dob: dob,
      }),

      cache: "no-store",
    });

    // ===== NEW CHANGE: Read response as text =====
    const responseText = await response.text();

    console.log("LorryInfo DL Status:", response.status);
    console.log("LorryInfo DL Response:", responseText);

    let result;

    // ===== NEW CHANGE: Safely parse JSON =====
    try {
      result = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid response received from LorryInfo DL API.",
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
            "LorryInfo DL API request failed.",

          data: result?.data || null,
        },
        { status: response.status }
      );
    }

    // ===== NEW CHANGE: Return complete API response =====
    return NextResponse.json(result);

  } catch (error) {
    console.error("DL API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve driving license information.",
      },
      { status: 500 }
    );
  }
}