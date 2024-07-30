import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectPath", location.pathname);
    }
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;