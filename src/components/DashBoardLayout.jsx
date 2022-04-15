import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRouteHOC from "../routes/ProtectedRouteHOC";
import DashBoard from "./DashBoard";

const DashBoardLayout = () => {
  return (
    <>
      <ProtectedRouteHOC>
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ProtectedRouteHOC>
    </>
  );
};

export default DashBoardLayout;
