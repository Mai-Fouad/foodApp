import React from "react";
import noData from "../../../assets/images/no-data.png";

export default function NoDataFound() {
  return (
    <div className="text-center my-2">
      <img src={noData} />
      <h5 className="mt-2">No Data !</h5>
      <p className="text-muted">
        are you sure you want to delete this item? if you are sure just click
        on delete it
      </p>
    </div>
  );
}
