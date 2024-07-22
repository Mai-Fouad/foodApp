import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { ToastContainer } from "react-toastify";

export default function MasterLayout({ loginData }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <div className="d-flex">
        <div style={{ width: collapsed ? "20%" : "10%", transition: '0.5s width' }}>
          <SideBar loginData={loginData} setCollapsed={setCollapsed} />
        </div>
        <div className="contentContainer">
          <NavBar loginData={loginData} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
