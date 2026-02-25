import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

import React from "react";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser) return children;
  if (!currentUser) return <Navigate to="/login" replace></Navigate>;
};

export default PrivateRoute;
