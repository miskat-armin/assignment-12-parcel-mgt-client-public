import React from "react";
import { DefaultSidebar } from "../components/Sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <DefaultSidebar />
      <div className="flex-1 p-8">
        <Outlet></Outlet>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Dashboard;
