import React from "react";
import headerImg from "../../../assets/images/headerImg.png";
import headerImg2 from "../../../assets/images/headerImg2.png";

export default function Header({ title, description, home }) {
  return (
    <div className="header-container row justify-content-between align-items-center px-5">
      <div className="col-md-7">
        <div className="header-content">
          <h2 className="text-light fs-1">{title}</h2>
          <p className="text-light lh-sm">{description}</p>
        </div>
      </div>
      <div className="col-md-3 me-2">
        <img src={home ? headerImg : headerImg2} className={home && "w-100"} />
      </div>
    </div>
  );
}
