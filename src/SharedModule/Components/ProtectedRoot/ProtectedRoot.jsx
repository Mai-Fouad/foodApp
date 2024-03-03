import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoot({ loginData, children }) {
  if (!loginData && !localStorage.getItem("loginToken")) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
