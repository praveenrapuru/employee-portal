import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

function ProtectedRoute() {
  const ok = isAuthenticated();
  return ok ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;

