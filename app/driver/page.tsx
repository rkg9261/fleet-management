"use client";

import { useState } from "react";
import AdminLayout from "../components/AdminLayout";

// ===== NEW CHANGE: API response interfaces =====

interface PersonalInfo {
  name?: string | null;
  fatherName?: string | null;
  dob?: string | null;
  aadhaar?: string | null;
  address?: string | null;
  blood?: string | null;
  mobile?: string | null;
  gender?: string | null;
  qualification?: string | null;
}

interface LicenseValidity {
  nonTransport?: string | null;
  transport?: string | null;
}

interface LicenseInfo {
  number?: string | null;
  issuedBy?: string | null;
  issuedOn?: string | null;
  status?: string | null;
  validity?: LicenseValidity;
}

interface LicenseClass {
  class?: string | null;
  issued?: string | null;
  status?: string | null;
}

interface DriverData {
  personal?: PersonalInfo;
  license?: LicenseInfo;
  classes?: LicenseClass[];
}

interface DriverApiResponse {
  success?: boolean;
  message?: string;
  data?: DriverData;
}

export default function DriverPage() {
  // ===== NEW CHANGE: Form state =====
  const [dlNumber, setDlNumber] = useState("UP112160024911");
  const [dob, setDob] = useState("1988-09-12");

  // ===== NEW CHANGE: API state =====
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===== NEW CHANGE: Driver data =====
  const [driverData, setDriverData] = useState<DriverData | null>(null);

  // ===== NEW CHANGE: Raw API response =====
  // ===== NEW CHANGE: Raw API response state =====
  const [rawApiResponse, setRawApiResponse] = useState<{
    rc: any;
    challan: any;
  }>({
    rc: null,
    challan: null,
  });

  const [showRawResponse, setShowRawResponse] = useState(false);

  // ===== NEW CHANGE: Search driver =====
  const handleSearch = async () => {
    setError("");
    setDriverData(null);
    setRawApiResponse(null);

    // ===== NEW CHANGE: Ensure values are always strings =====
    const number = String(dlNumber ?? "")
      .trim()
      .toUpperCase();

    const dateOfBirth = String(dob ?? "").trim();

    // ===== Validate DL number =====
    if (number.length === 0) {
      setError("Please enter driving license number.");
      return;
    }

    // ===== Validate DOB =====
    if (dateOfBirth.length === 0) {
      setError("Please select date of birth.");
      return;
    }


    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_DL_API_URL;
      console.log("DL API URL from .env:", apiUrl);
      console.log("LORRYINFO API KEY from .env:", process.env.NEXT_PUBLIC_LORRYINFO_API_KEY);
      console.log("Searching for DL number:", number, "DOB:", dob);
      // ===== NEW CHANGE: Call Next.js server API =====
      const response: Response = await fetch('/api/driver/dl', {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_LORRYINFO_API_KEY || "",
        },

        body: JSON.stringify({
          dlnumber: number,
          dob: dateOfBirth,
        }),

        cache: "no-store",
      });

      console.log("DL API Status:", response.status);

      // ===== NEW CHANGE: Parse response only once =====
      const result: DriverApiResponse = await response.json();

      console.log("DL API Result:", result);

      // ===== Store raw API response =====
      setRawApiResponse(result);

      // ===== Handle API error =====
      if (!response.ok || result.success !== true) {
        setError(
          result.message ||
          "Unable to retrieve driving license information."
        );

        return;
      }

      // ===== Store driver data =====
      setDriverData(result.data ?? null);

    } catch (err) {
      console.error("Driver Search Error:", err);

      setError(
        "Unable to connect to the driving license service."
      );
    } finally {
      setLoading(false);
    }
  };

  const personal = driverData?.personal;
  const license = driverData?.license;
  const classes = driverData?.classes || [];

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* ========================================= */}
        {/* PAGE HEADER */}
        {/* ========================================= */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Driver License Information
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Search driver's license information
          </p>
        </div>

        {/* ========================================= */}
        {/* SEARCH FORM */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl border border-slate-200 p-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* DL NUMBER */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Driving License Number
              </label>

              <input
                type="text"
                value={dlNumber}
                onChange={(e) =>
                  setDlNumber(e.target.value.toUpperCase())
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="DL0420190012345"
                className="
                  w-full
                  bg-white
                  text-slate-900
                  placeholder:text-slate-400
                  uppercase
                  border border-slate-300
                  rounded-lg
                  px-4 py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />
            </div>

            {/* DOB */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date of Birth
              </label>

              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="
                  w-full
                  bg-white
                  text-slate-900
                  border border-slate-300
                  rounded-lg
                  px-4 py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />
            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="
              mt-4
              rounded-lg
              border border-red-200
              bg-red-50
              px-4 py-3
              text-sm
              text-red-700
            ">
              {error}
            </div>
          )}

          {/* SEARCH BUTTON */}

          <div className="mt-5">

            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                disabled:cursor-not-allowed
                text-white
                px-6 py-3
                rounded-lg
                font-medium
                transition
              "
            >
              {loading ? "Searching..." : "Search License"}
            </button>

          </div>

        </div>

        {/* ========================================= */}
        {/* DRIVER INFORMATION */}
        {/* ========================================= */}

        {driverData && (
          <div className="space-y-6">

            {/* ========================================= */}
            {/* PERSONAL INFORMATION */}
            {/* ========================================= */}

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

              <div className="px-5 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800">
                  Personal Information
                </h2>
              </div>

              <div className="
                p-5
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-5
              ">

                <InfoItem
                  label="Name"
                  value={personal?.name}
                />

                <InfoItem
                  label="Father Name"
                  value={personal?.fatherName}
                />

                <InfoItem
                  label="Date of Birth"
                  value={personal?.dob}
                />

                <InfoItem
                  label="Gender"
                  value={personal?.gender}
                />

                <InfoItem
                  label="Blood Group"
                  value={personal?.blood}
                />

                <InfoItem
                  label="Mobile"
                  value={personal?.mobile}
                />

                <InfoItem
                  label="Aadhaar"
                  value={personal?.aadhaar}
                />

                <InfoItem
                  label="Qualification"
                  value={personal?.qualification}
                />

                <div className="sm:col-span-2 lg:col-span-3">
                  <InfoItem
                    label="Address"
                    value={personal?.address}
                  />
                </div>

              </div>

            </div>

            {/* ========================================= */}
            {/* LICENSE INFORMATION */}
            {/* ========================================= */}

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

              <div className="px-5 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800">
                  License Information
                </h2>
              </div>

              <div className="
                p-5
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-5
              ">

                <InfoItem
                  label="License Number"
                  value={license?.number}
                />

                <InfoItem
                  label="Issued By"
                  value={license?.issuedBy}
                />

                <InfoItem
                  label="Issued On"
                  value={license?.issuedOn}
                />

                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">
                    Status
                  </p>

                  <span
                    className={`
                      inline-flex
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${license?.status?.toLowerCase() === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {license?.status || "Unknown"}
                  </span>
                </div>

                <InfoItem
                  label="Non-Transport Validity"
                  value={license?.validity?.nonTransport}
                />

                <InfoItem
                  label="Transport Validity"
                  value={license?.validity?.transport}
                />

              </div>

            </div>

            {/* ========================================= */}
            {/* LICENSE CLASSES */}
            {/* ========================================= */}

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

              <div className="px-5 py-4 border-b border-slate-200">

                <h2 className="text-lg font-semibold text-slate-800">
                  License Classes
                </h2>

              </div>

              {classes.length > 0 ? (

                <div className="overflow-x-auto">

                  <table className="w-full text-sm">

                    <thead className="bg-slate-50">

                      <tr>
                        <th className="
                          text-left
                          px-5 py-3
                          font-semibold
                          text-slate-600
                        ">
                          Class
                        </th>

                        <th className="
                          text-left
                          px-5 py-3
                          font-semibold
                          text-slate-600
                        ">
                          Issued
                        </th>

                        <th className="
                          text-left
                          px-5 py-3
                          font-semibold
                          text-slate-600
                        ">
                          Status
                        </th>
                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {classes.map((item, index) => (

                        <tr
                          key={index}
                          className="hover:bg-slate-50"
                        >

                          <td className="px-5 py-4 text-slate-800">
                            {item.class || "-"}
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {item.issued || "-"}
                          </td>

                          <td className="px-5 py-4">

                            <span
                              className={`
                                inline-flex
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                ${item.status
                                  ?.toLowerCase() === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                                }
                              `}
                            >
                              {item.status || "Unknown"}
                            </span>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              ) : (

                <div className="
                  p-5
                  text-sm
                  text-slate-500
                ">
                  No license classes found.
                </div>

              )}

            </div>

            {/* ========================================= */}
            {/* RAW API RESPONSE */}
            {/* ========================================= */}

            {rawApiResponse && (

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

                <div className="
                  px-5 py-4
                  border-b border-slate-200
                  flex
                  items-center
                  justify-between
                  gap-4
                ">

                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      Raw API Response
                    </h2>

                    <p className="text-xs text-slate-500 mt-1">
                      Complete response received from LorryInfo
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowRawResponse((value) => !value)
                    }
                    className="
                      text-sm
                      font-medium
                      text-blue-600
                      hover:text-blue-700
                    "
                  >
                    {showRawResponse ? "Hide" : "Show"}
                  </button>

                </div>

                {showRawResponse && (

                  <div className="p-5">

                    <textarea
                      readOnly
                      value={JSON.stringify(
                        rawApiResponse,
                        null,
                        2
                      )}
                      className="
                        w-full
                        min-h-[400px]
                        bg-slate-900
                        text-green-400
                        rounded-lg
                        p-4
                        font-mono
                        text-xs
                        outline-none
                        resize-y
                      "
                    />

                  </div>

                )}

              </div>

            )}

          </div>
        )}

      </div>

    </AdminLayout>
  );
}

// =============================================
// INFO ITEM COMPONENT
// =============================================

function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500 mb-1">
        {label}
      </p>

      <p className="text-sm font-medium text-slate-800 break-words">
        {value || "-"}
      </p>
    </div>
  );
}