import React from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

export default function MasterLayout({adminData}) {
  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        <div>
          <SideBar />
        </div>
        <div className="w-100">
          <NavBar adminData={adminData}/>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
