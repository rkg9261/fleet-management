"use client";

import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { headers } from "next/dist/server/request/headers";
import { NextResponse } from "next/dist/server/web/exports";

interface VehicleData {
    rc_regn_no?: string;
    rc_regn_dt?: string;
    rc_regn_upto?: string;
    rc_purchase_dt?: string;

    rc_owner_name?: string;

    rc_present_address?: string;
    rc_permanent_address?: string;

    rc_vch_catg?: string;
    rc_vh_class_desc?: string;
    rc_vhclass_desc?: string;

    rc_chasi_no?: string;
    rc_eng_no?: string;

    rc_maker_desc?: string;
    rc_maker_model?: string;

    rc_body_type_desc?: string;
    rc_fuel_desc?: string;
    rc_color?: string;

    rc_norms_desc?: string;

    rc_fit_upto?: string;

    rc_np_from?: string;
    rc_np_upto?: string;
    rc_np_issued_by?: string;

    rc_tax_upto?: string;

    rc_financer?: string;

    rc_insurance_comp?: string;
    rc_insurance_policy_no?: string;
    rc_insurance_upto?: string;

    rc_manu_month_yr?: string;

    rc_unld_wt?: string;
    rc_gvw?: string;

    rc_no_cyl?: string;
    rc_cubic_cap?: string;
    rc_seat_cap?: string;

    rc_registered_at?: string;

    rc_status_as_on?: string;

    rc_pucc_upto?: string;
    rc_pucc_no?: string;

    rc_status?: string;
    rc_blacklist_status?: string;

    rc_permit_no?: string;
    rc_permit_issue_dt?: string;
    rc_permit_valid_from?: string;
    rc_permit_valid_upto?: string;

    rc_permit_code?: string;
    rc_permit_type?: string;
    rc_permit_catg?: string;

    rc_permit_issuing_authority?: string;

    rc_permit_service_type?: string;
    rc_permit_route_region?: string;

    rc_noc_details?: string;

    rc_vh_type?: string;
    rc_vh_class?: string;

    rc_fuel_cd?: string;
    rc_maker_cd?: string;
    rc_model_cd?: string;

    rc_sale_amt?: string;

    rc_own_catg_desc?: string;
    rc_vch_catg_desc?: string;

    rc_owner_cd_desc?: string;

    rc_vehicle_surrendered_to_dealer?: string;

    rc_non_use?: string;

    rc_passenger_tax?: string;
    rc_goods_tax?: string;

    rc_no_of_axle?: string;
    rc_tax_mode?: string;

    loadingCapacity?: number;

    vehicleAge?: string;
    vehicleAgeFraction?: string;
}

interface Offence {
    act: string;
    name: string;
}

interface Challan {
    challanNo: string;
    challanDateTime: string;
    challanPlace: string;
    challanStatus: string;

    department: string;
    stateCode: string;

    ownerName: string;
    driverName: string;
    violatorName: string;

    dlNo: string;

    fineImposed: number;
    receivedAmount: number | null;

    sentToRegularCourt: string;
    sentToVirtualCourt: string;

    courtName: string | null;
    courtAddress: string | null;

    dateOfProceeding: string | null;

    remark: string;

    documentImpounded: string | null;

    offences: Offence[];
}

interface ChallanSummary {
    totalChallans: number;
    pendingCount: number;
    disposedCount: number;
    totalFine: number;
    totalReceived: number;
    message: string;
}

interface ChallanData {
    pending: Challan[];
    disposed: Challan[];
    summary: ChallanSummary;
}

export default function VehiclePage() {
    const [showRawResponse, setShowRawResponse] = useState(false);
    // const [rawApiResponse, setRawApiResponse] = useState<{ rc: JSON; challan: JSON }>({
    //     rc: {} as JSON,
    //     challan: {} as JSON,
    // });
    // ===== NEW CHANGE: Raw API response state =====
    const [rawApiResponse, setRawApiResponse] = useState<{
        rc: unknown;
        challan: unknown;
    }>({
        rc: null,
        challan: null,
    });
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
    const [challanData, setChallanData] = useState<ChallanData | null>(null);

    const handleSearch = async () => {
        // ===== NEW CHANGE: Call Next.js server APIs =====
        // API key is NOT exposed to the browser.

        //static data pass for testing
        // ===== NEW CHANGE: Static RC API response for testing =====
        // ===== NEW CHANGE: Static RC response =====
        // ===== NEW CHANGE: Static RC response for testing =====
        const rcResult = {
            success: true,
            data: {
                stautsMessage: "OK",
                rc_regn_no: "DL01AB1234",
                rc_regn_dt: "05-Jun-2020",
                rc_regn_upto: "04-Jun-2035",
                rc_purchase_dt: "01-Jun-2020",
                rc_owner_sr: "1",
                rc_owner_name: "J*** D**",
                state_cd: "DL",
                rto_cd: "01",
                api_response_message: "No response received from AITP API.",
                rc_present_address: "Delhi, 110001",
                rc_permanent_address: "Delhi, 110001",
                rc_vch_catg: "LMV",
                rc_vh_class_desc: "Motor Car(LMV)",
                rc_vhclass_desc: "Motor Car",
                rc_chasi_no: "MA3ERLF1S001*****",
                rc_eng_no: "K12M*****",
                rc_maker_desc: "MARUTI SUZUKI INDIA LTD",
                rc_maker_model: "SWIFT VXI",
                rc_body_type_desc: "SALOON",
                rc_fuel_desc: "PETROL",
                rc_color: "WHITE",
                rc_norms_desc: "BHARAT STAGE IV",
                rc_fit_upto: "04-Jun-2025",
                rc_np_from: "05-Jun-2024",
                rc_np_upto: "04-Jun-2025",
                rc_np_issued_by: "Secretary RTA, Delhi",
                rc_tax_upto: "31-03-2025",
                rc_financer: "HDFC Bank",
                rc_insurance_comp:
                    "ICICI Lombard General Insurance Co. Ltd.",
                rc_insurance_policy_no: "3003/123456789/00/000",
                rc_insurance_upto: "04-Jun-2025",
                rc_manu_month_yr: "5/2020",
                rc_unld_wt: "1050",
                rc_gvw: "1450",
                rc_no_cyl: "4",
                rc_cubic_cap: "1197.00",
                rc_seat_cap: "5",
                rc_sleeper_cap: "0",
                rc_stand_cap: "0",
                rc_wheelbase: "2450",
                rc_registered_at: "RTA, Delhi",
                rc_status_as_on: "16-Feb-2026",
                rc_pucc_upto: "04-Jun-2025",
                rc_pucc_no: "DL0100123456789",
                rc_status: "ACTIVE",
                rc_blacklist_status: "",
                rc_permit_no: "DL2020-NP-12345",
                rc_permit_issue_dt: "05-Jun-2020",
                rc_permit_valid_from: "05-Jun-2020",
                rc_permit_valid_upto: "04-Jun-2025",
                rc_permit_code: "101",
                rc_permit_type:
                    "National Permit [LIGHT MOTOR VEHICLE]",
                rc_permit_catg: "102",
                rc_permit_issuing_authority: "RTA, Delhi",
                rc_permit_service_type: "",
                rc_permit_route_region: "",
                rc_noc_details: "",
                rc_vh_type: "N",
                rc_vh_class: "10",
                rc_noc_dt: "",
                rc_fuel_cd: "1",
                rc_maker_cd: "21",
                rc_model_cd: "SWIFT001",
                rc_norms_cd: "4",
                rc_sale_amt: "550000.0",
                rc_own_catg_desc: "INDIVIDUAL",
                rc_vch_catg_desc: "LIGHT MOTOR VEHICLE",
                rc_owner_cd_desc: "INDIVIDUAL",
                rc_vehicle_surrendered_to_dealer: "0",
                rc_currentadd_districtcode: "0",
                rc_non_use: "false",
                rc_passenger_tax: "",
                rc_goods_tax: "",
                rc_no_of_axle: "2",
                rc_tax_mode: "Y",
                loadingCapacity: 400,
                vehicleAge: "5 Years - 8 Months - 11 Days",
                vehicleAgeFraction: "5.73 Years",
            },
        };


        //         const challanResponse = `{
        //   "success": true,
        //   "data": {
        //     "pending": [
        //       {
        //         "challanNo": "RJ317113251112041311",
        //         "challanDateTime": "12-11-2025 04:10:24",
        //         "challanPlace": "Sample Location, Rajasthan",
        //         "challanStatus": "Pending",
        //         "department": "Transport",
        //         "stateCode": "RJ",
        //         "ownerName": "J*** D**",
        //         "driverName": "R*** S***",
        //         "violatorName": "R*** S***",
        //         "dlNo": "RJ****2019000001",
        //         "fineImposed": 5000,
        //         "receivedAmount": null,
        //         "sentToRegularCourt": "No",
        //         "sentToVirtualCourt": "No",
        //         "courtName": null,
        //         "courtAddress": null,
        //         "dateOfProceeding": null,
        //         "remark": "Sample remark",
        //         "documentImpounded": null,
        //         "offences": [
        //           {
        //             "act": "179(1)",
        //             "name": "Disobedience of direction by driver"
        //           },
        //           {
        //             "act": "181",
        //             "name": "Driving without valid license"
        //           }
        //         ]
        //       }
        //     ],
        //     "disposed": [
        //       {
        //         "challanNo": "DL2044562509021234",
        //         "challanDateTime": "02-09-2025 09:20:46",
        //         "challanPlace": "Delhi Traffic Circle",
        //         "challanStatus": "Disposed",
        //         "department": "Traffic",
        //         "stateCode": "DL",
        //         "ownerName": "J*** D**",
        //         "driverName": "R*** S***",
        //         "violatorName": "R*** S***",
        //         "dlNo": "DL****2019000001",
        //         "fineImposed": 1500,
        //         "receivedAmount": 1500,
        //         "sentToRegularCourt": "No",
        //         "sentToVirtualCourt": "No",
        //         "courtName": null,
        //         "courtAddress": null,
        //         "dateOfProceeding": null,
        //         "remark": "Paid successfully",
        //         "documentImpounded": null,
        //         "offences": [
        //           {
        //             "act": "NA",
        //             "name": "Lane change violation"
        //           }
        //         ]
        //       }
        //     ],
        //     "summary": {
        //       "totalChallans": 2,
        //       "pendingCount": 1,
        //       "disposedCount": 1,
        //       "totalFine": 6500,
        //       "totalReceived": 1500,
        //       "message": "Record finds successfully"
        //     }
        //   }
        // }`;
        //live api call

        if (!vehicleNumber) {
            setError("Please enter a vehicle registration number.");
            return;
        }
        console.log("Searching for vehicle number:", vehicleNumber);
        console.log("RC API URL from .env:", process.env.NEXT_PUBLIC_RC_API_URL);
        console.log("CHALLAN API URL from .env:", process.env.NEXT_PUBLIC_CHALLAN_API_URL);
        console.log("LORRYINFO API KEY from .env:", process.env.NEXT_PUBLIC_LORRYINFO_API_KEY);

        const challanResponse: Response = await fetch(`https://api.lorryinfo.com/api/v1/echallanByVehicle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "0f4df7bf-0479-4ac8-b978-473a3368bed4"
            },
            body: JSON.stringify({ vehicleNumber }),
        });


        // ===== NEW CHANGE: Read JSON responses =====
        //const rcResult = await rcResponse.json();
        const challanResult = await challanResponse.json();

        // ===== NEW CHANGE: Log API result =====
        console.log("RC Result:", rcResult);
        if (!rcResult.success) {
            setError("Unable to retrieve vehicle information.");
            return;
        }
        console.log("Challan Result:", challanResult);
        console.log("RC Result.data:", rcResult.data);
        console.log("Challan Result.data:", challanResult.data);

        setVehicleData(rcResult.data);
        setChallanData(challanResult.data);
        // ===== NEW CHANGE: Save complete raw responses =====
        setRawApiResponse({
            rc: rcResult,
            challan: challanResult,
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Vehicle Information
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Search registration, permit and challan information
                    </p>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            placeholder="Enter vehicle registration number"
                            className="
                                flex-1
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
                            "
                        >
                            {loading ? "Searching..." : "Search Vehicle"}
                        </button>
                    </div>

                    {/* Error */}
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
                </div>

                {vehicleData && (
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <h2 className="text-lg font-semibold text-slate-800 mb-5">
                            Vehicle Information
                        </h2>

                        {/* Summary */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <div className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                md:justify-between
                                gap-4
                            ">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {vehicleData.rc_regn_no}
                                    </h2>
                                    <p className="text-slate-500 mt-1">
                                        {vehicleData.rc_maker_desc}{" "}
                                        {vehicleData.rc_maker_model}
                                    </p>
                                </div>
                                <span className="
                                    inline-flex
                                    w-fit
                                    px-3 py-1
                                    rounded-full
                                    bg-green-100
                                    text-green-700
                                    text-sm
                                    font-medium
                                ">
                                    {vehicleData.rc_status || "ACTIVE"}
                                </span>
                            </div>
                        </div>

                        {/* Important Dates */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <h2 className="text-lg font-semibold text-slate-800 mb-5">
                                Important Dates
                            </h2>
                            <div className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-5
                                gap-4
                            ">
                                <DateCard title="Fitness" date={vehicleData.rc_fit_upto} />
                                <DateCard title="Insurance" date={vehicleData.rc_insurance_upto} />
                                <DateCard title="PUCC" date={vehicleData.rc_pucc_upto} />
                                <DateCard title="Tax" date={vehicleData.rc_tax_upto} />
                                <DateCard title="Permit" date={vehicleData.rc_permit_valid_upto} />
                            </div>
                        </div>

                        {/* Vehicle Details */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <h2 className="text-lg font-semibold text-slate-800 mb-5">
                                Vehicle Details
                            </h2>
                            <div className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                gap-5
                            ">
                                <InfoItem label="Registration Date" value={vehicleData.rc_regn_dt} />
                                <InfoItem label="Registration Upto" value={vehicleData.rc_regn_upto} />
                                <InfoItem label="Owner" value={vehicleData.rc_owner_name} />
                                <InfoItem label="Vehicle Class" value={vehicleData.rc_vh_class_desc} />
                                <InfoItem label="Manufacturer" value={vehicleData.rc_maker_desc} />
                                <InfoItem label="Model" value={vehicleData.rc_maker_model} />
                                <InfoItem label="Fuel" value={vehicleData.rc_fuel_desc} />
                                <InfoItem label="Color" value={vehicleData.rc_color} />
                                <InfoItem label="Body Type" value={vehicleData.rc_body_type_desc} />
                                <InfoItem label="RTO" value={vehicleData.rc_registered_at} />
                                <InfoItem label="Vehicle Age" value={vehicleData.vehicleAge} />
                                <InfoItem
                                    label="Loading Capacity"
                                    value={
                                        vehicleData.loadingCapacity
                                            ? `${vehicleData.loadingCapacity} KG`
                                            : "-"
                                    }
                                />
                            </div>
                        </div>

                        {/* Permit */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <h2 className="text-lg font-semibold text-slate-800 mb-5">
                                Permit Information
                            </h2>
                            <div className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-4
                                gap-5
                            ">
                                <InfoItem label="Permit Number" value={vehicleData.rc_permit_no} />
                                <InfoItem label="Permit Type" value={vehicleData.rc_permit_type} />
                                <InfoItem label="Valid From" value={vehicleData.rc_permit_valid_from} />
                                <InfoItem label="Valid Upto" value={vehicleData.rc_permit_valid_upto} />
                                <InfoItem
                                    label="Issuing Authority"
                                    value={vehicleData.rc_permit_issuing_authority}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Challan Information */}
                {challanData && (
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <h2 className="text-lg font-semibold text-slate-800 mb-5">
                            Challan Information
                        </h2>

                        {/* Summary */}
                        <div className="
                            grid
                            grid-cols-2
                            md:grid-cols-5
                            gap-4
                            mb-6
                        ">
                            <SummaryCard label="Total" value={challanData.summary?.totalChallans} />
                            <SummaryCard label="Pending" value={challanData.summary?.pendingCount} />
                            <SummaryCard label="Disposed" value={challanData.summary?.disposedCount} />
                            <SummaryCard label="Total Fine" value={`₹${challanData.summary?.totalFine ?? 0}`} />
                            <SummaryCard label="Received" value={`₹${challanData.summary?.totalReceived ?? 0}`} />
                        </div>

                        {/* Pending Challans */}
                        {challanData.pending?.length > 0 && (
                            <ChallanTable title="Pending Challans" challans={challanData.pending} />
                        )}

                        {/* Disposed Challans */}
                        {challanData.disposed?.length > 0 && (
                            <div className="mt-8">
                                <ChallanTable title="Disposed Challans" challans={challanData.disposed} />
                            </div>
                        )}
                    </div>
                )}

                {/* ===== NEW CHANGE: Raw API Response moved into VehiclePage ===== */}
                {/* Raw API Response */}
                {(rawApiResponse.rc || rawApiResponse.challan) && (
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        {/* Header */}
                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            gap-3
                        ">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Raw API Response
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Complete response received from vehicle and challan APIs
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowRawResponse(!showRawResponse)}
                                className="
                                    w-full
                                    sm:w-auto
                                    bg-slate-800
                                    hover:bg-slate-900
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    text-sm
                                    font-medium
                                "
                            >
                                {showRawResponse ? "Show Less" : "Show More"}
                            </button>
                        </div>

                        {/* JSON */}
                        {showRawResponse && (
                            <div className="mt-5 space-y-5">
                                {/* RC Response */}
                                {rawApiResponse.rc && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-700 mb-2">
                                            RC API Response
                                        </h3>
                                        <textarea
                                            readOnly
                                            value={JSON.stringify(rawApiResponse.rc, null, 2)}
                                            className="
                                                w-full
                                                h-[400px]
                                                resize-y
                                                rounded-lg
                                                border
                                                border-slate-300
                                                bg-slate-950
                                                text-green-400
                                                p-4
                                                font-mono
                                                text-xs
                                                leading-5
                                                outline-none
                                            "
                                        />
                                    </div>
                                )}

                                {/* Challan Response */}
                                {rawApiResponse.challan && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-700 mb-2">
                                            Challan API Response
                                        </h3>
                                        <textarea
                                            readOnly
                                            value={JSON.stringify(rawApiResponse.challan, null, 2)}
                                            className="
                                                w-full
                                                h-[400px]
                                                resize-y
                                                rounded-lg
                                                border
                                                border-slate-300
                                                bg-slate-950
                                                text-green-400
                                                p-4
                                                font-mono
                                                text-xs
                                                leading-5
                                                outline-none
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

/* Information Item */
function InfoItem({
    label,
    value,
}: {
    label: string;
    value?: string | number;
}) {
    return (
        <div>
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="text-sm font-medium text-slate-900">{value || "-"}</p>
        </div>
    );
}

/* Date Card */
function DateCard({
    title,
    date,
}: {
    title: string;
    date?: string;
}) {
    return (
        <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-base font-semibold text-slate-900 mt-1">
                {date || "-"}
            </p>
        </div>
    );
}

/* Summary Card */
function SummaryCard({
    label,
    value,
}: {
    label: string;
    value?: string | number;
}) {
    return (
        <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
                {value ?? 0}
            </p>
        </div>
    );
}

/* Challan Table */
function ChallanTable({
    title,
    challans,
}: {
    title: string;
    challans: Challan[];
}) {
    return (
        <div>
            <h3 className="text-base font-semibold text-slate-800 mb-3">
                {title}
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full min-w-[1000px] text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-3" text-slate-600>Challan No.</th>
                            <th className="text-left px-4 py-3" text-slate-600>Date</th>
                            <th className="text-left px-4 py-3" text-slate-600>Place</th>
                            <th className="text-left px-4 py-3" text-slate-600>Driver</th>
                            <th className="text-left px-4 py-3" text-slate-600>DL No.</th>
                            <th className="text-left px-4 py-3" text-slate-600>Fine</th>
                            <th className="text-left px-4 py-3" text-slate-600>Received</th>
                            <th className="text-left px-4 py-3" text-slate-600>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {challans.map((challan, index) => (
                            <tr
                                key={`${challan.challanNo}-${index}`}
                                className="border-b last:border-b-0"
                            >
                                <td className="px-4 py-3 font-medium text-slate-900">
                                    {challan.challanNo}
                                </td>
                                <td className="px-4 py-3 text-slate-900">{challan.challanDateTime}</td>
                                <td className="px-4 py-3 text-slate-900">{challan.challanPlace}</td>
                                <td className="px-4 py-3 text-slate-900">{challan.driverName || "-"}</td>
                                <td className="px-4 py-3 text-slate-900">{challan.dlNo || "-"}</td>
                                <td className="px-4 py-3 font-medium text-slate-900">
                                    ₹{challan.fineImposed ?? 0}
                                </td>
                                <td className="px-4 py-3 text-slate-900">
                                    ₹{challan.receivedAmount ?? 0}
                                </td>
                                <td className="px-4 py-3 text-slate-900">
                                    <span
                                        className={`
                                            inline-flex
                                            px-2 py-1
                                            rounded-full
                                            text-xs
                                            font-medium
                                            ${challan.challanStatus?.toLowerCase() === "pending"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                            }
                                        `}
                                    >
                                        {challan.challanStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}