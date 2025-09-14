import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toNumber } from "../utils/format";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function SalaryChart() {
  const location = useLocation();
  const navigate = useNavigate();
  const employees = location.state || [];

  const chartData = (Array.isArray(employees) ? employees : [])
    .slice(0, 10)
    .map((emp) => ({
      name: emp?.name ?? "",
      salary: toNumber(emp?.salary),
    }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Salary Chart (Top 10 Employees)</h2>

      {chartData.length > 0 ? (
        <div className="w-full h-[400px]">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" fill="#4F46E5" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="p-4 border rounded bg-gray-50">
          <p className="mb-3">No data available for the chart.</p>
          <button
            className="bg-blue-600 text-white px-3 py-2 rounded"
            onClick={() => navigate("/list")}
          >
            Go to Employee List
          </button>
        </div>
      )}
    </div>
  );
}

export default SalaryChart;
