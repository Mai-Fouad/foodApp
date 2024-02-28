import React from "react";
import { useNavigate } from "react-router-dom";

export default function RecipesHeader({ home, edit }) {
  const navigate = useNavigate();

  const navigateToRecipes = () => {
    navigate("/dashboard/recipes");
  };

  return (
    <div className="container lightGreenContainer px-4 py-3 border rounded-5 mt-4">
      <div className="row justify-content-between align-items-center ps-4">
        <div className="col-md-6">
          <h5>
            {edit ? "Edit" : "Fill"} the{" "}
            <span className="text-success">Recipes</span> !
          </h5>
          <p className="text-muted lh-sm">
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <div className="col-md-3 d-flex justify-content-end">
          <button className="btn btn-success px-5" onClick={navigateToRecipes}>
            {home ? "Fill" : "All"} Recipes{" "}
            <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
