import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import RecipesHeader from "../../../SharedModule/Components/RecipesHeader/RecipesHeader";

export default function Home({ loginData }) {
  return (
    <div className="container">
      <Header
        title={`Welcome ${loginData?.userName} !`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        home
      />
      <RecipesHeader home />
    </div>
  );
}
