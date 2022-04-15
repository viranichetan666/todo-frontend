import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteHOC = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRouteHOC;
