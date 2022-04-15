import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteHOC = ({ children }) => {
  const isLogin = true;
  return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRouteHOC;
