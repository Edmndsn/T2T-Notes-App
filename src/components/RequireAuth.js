import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export default function RequireAuth(props) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return props.children;
}
