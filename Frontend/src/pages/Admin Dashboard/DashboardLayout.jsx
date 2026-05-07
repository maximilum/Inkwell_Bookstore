import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      layout
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
