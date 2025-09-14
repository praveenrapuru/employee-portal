import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="mb-4 text-gray-700">The page you requested does not exist.</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;

