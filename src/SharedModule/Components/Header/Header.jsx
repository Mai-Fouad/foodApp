import React from "react";
import headerImg from "../../../assets/images/headerImg.png";

export default function Header({ title, description }) {
  return (
    <div className="container-fluid header-container p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="ps-5">
          <div className="header-content">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="w-75 d-flex justify-content-evenly">
          <div className="header-img w-50">
            <img src={headerImg} className="w-100"/>
          </div>
        </div>
      </div>
    </div>
  );
}
