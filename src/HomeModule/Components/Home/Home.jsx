import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import { ToastContainer } from "react-toastify";

export default function Home({ adminData }) {
  return (
    <div>
      <ToastContainer />
      <Header
        title={`welcome ${adminData?.userName} `}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <h1>Home</h1>
    </div>
  );
}
