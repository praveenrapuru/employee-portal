import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { fetchEmployees } from "../services/api";

function ListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetchEmployees({ signal: controller.signal })
      .then((list) => setEmployees(list))
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error("API Error:", err);
        setEmployees([]);
        setError("Failed to load employees. Please try again.");
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Employee List</h2>
        <button
          onClick={() => {
            logout();
            navigate("/", { replace: true });
          }}
          className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {loading && <p className="mb-3">Loading employees…</p>}
      {error && <p className="mb-3 text-red-600">{error}</p>}

      <table className="w-full border-collapse border border-gray-400 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-12 text-center">
              ID
            </th>
            <th className="border border-gray-300 px-4 py-2 w-40 text-left">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2 w-48 text-left">
              Position
            </th>
            <th className="border border-gray-300 px-4 py-2 w-32 text-left">
              City
            </th>
            <th className="border border-gray-300 px-4 py-2 w-28 text-right">
              Salary
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/details/${emp.id}`, { state: emp })}
            >
              <td className="border border-gray-300 px-4 py-2 text-center">
                {emp.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">{emp.name}</td>
              <td className="border border-gray-300 px-4 py-2">{emp.position}</td>
              <td className="border border-gray-300 px-4 py-2">{emp.city}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {emp.salary}
              </td>
            </tr>
          ))}
          {!loading && employees.length === 0 && (
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center" colSpan={5}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate("/chart", { state: employees })}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          View Salary Chart
        </button>
        <button
          onClick={() => navigate("/map", { state: employees })}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          View City Map
        </button>
      </div>
    </div>
  );
}

export default ListPage;
