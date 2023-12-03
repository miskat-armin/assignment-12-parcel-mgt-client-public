import React from "react";
import { DefaultSidebar } from "../components/Sidebar/sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <DefaultSidebar />
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
