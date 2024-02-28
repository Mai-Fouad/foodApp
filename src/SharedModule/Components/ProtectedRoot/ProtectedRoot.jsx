import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoot({ adminData, children }) {
  if (!adminData && !localStorage.getItem("adminToken")) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
