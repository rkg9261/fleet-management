import AdminLayout from "../components/AdminLayout";

export default function DashboardPage() {
  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Vehicle and driver verification overview
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Vehicle Searches */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">

            <p className="text-sm text-slate-500">
              Vehicle Searches
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              125
            </h2>

          </div>

          {/* Driver Searches */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">

            <p className="text-sm text-slate-500">
              Driver Searches
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              84
            </h2>

          </div>

          {/* Pending Challans */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">

            <p className="text-sm text-slate-500">
              Pending Challans
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
              18
            </h2>

          </div>

          {/* Expiring */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">

            <p className="text-sm text-slate-500">
              Expiring Soon
            </p>

            <h2 className="text-3xl font-bold text-orange-500 mt-2">
              12
            </h2>

          </div>

        </div>

        {/* Recent Searches */}
        <div className="bg-white rounded-xl border border-slate-200">

          <div className="p-5 border-b border-slate-200">

            <h2 className="font-semibold text-slate-800">
              Recent Searches
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b bg-slate-50">

                  <th className="text-left px-5 py-3 font-medium text-slate-600">
                    Number
                  </th>

                  <th className="text-left px-5 py-3 font-medium text-slate-600">
                    Type
                  </th>

                  <th className="text-left px-5 py-3 font-medium text-slate-600">
                    Date
                  </th>

                  <th className="text-left px-5 py-3 font-medium text-slate-600">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>

                <tr className="border-b">

                  <td className="px-5 py-4 font-medium">
                    DL01AB1234
                  </td>

                  <td className="px-5 py-4">
                    Vehicle
                  </td>

                  <td className="px-5 py-4">
                    03-Oct-2026
                  </td>

                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                      Success
                    </span>
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="px-5 py-4 font-medium">
                    DL0420190012345
                  </td>

                  <td className="px-5 py-4">
                    Driver
                  </td>

                  <td className="px-5 py-4">
                    03-Oct-2026
                  </td>

                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                      Success
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}