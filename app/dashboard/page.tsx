// app/dashboard/page.tsx
import clientPromise from "@/src/lib/mongodb";

export default async function DashboardPage() {
  const client = await clientPromise;
  const db = client.db();

  const records = await db
    .collection("dashboard_records")
    .find({})
    .limit(50)
    .toArray();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Dashboard
      </h1>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No data found in database
                </td>
              </tr>
            ) : (
              records.map((item) => (
                <tr key={item._id.toString()} className="border-t">
                  <td className="px-4 py-3">
                    {item._id.toString()}
                  </td>
                  <td className="px-4 py-3">
                    {item.name ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
