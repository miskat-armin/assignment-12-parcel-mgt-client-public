import React from "react";
import { DefaultSidebar } from "../components/Sidebar/sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <DefaultSidebar />
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
