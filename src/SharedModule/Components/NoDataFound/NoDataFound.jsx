import React from "react";
import noData from "../../../assets/images/no-data.png";

export default function NoDataFound() {
  return (
    <div className="text-center my-3">
      <div className="w-25 mx-auto">
        <img src={noData} className="w-75" />
      </div>
      <h5 className="mt-2">No Data !</h5>
      <p className="text-muted">there is no data available now!</p>
    </div>
  );
}
