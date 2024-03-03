import React from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { ToastContainer } from "react-toastify";

export default function MasterLayout({ loginData }) {
  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <div className="d-flex">
        <div>
          <SideBar loginData={loginData} />
        </div>
        <div className="w-100">
          <NavBar loginData={loginData} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
