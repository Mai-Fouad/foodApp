import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import NoDataFound from "../../../SharedModule/Components/NoDataFound/NoDataFound";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../SharedModule/Components/DeleteModal/DeleteModal";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const handleClose = () => {
    setShow(false);
    setSelectedRecipe(null);
  };

  const handleShow = (recipe) => {
    setShow(true);
    setSelectedRecipe(recipe);
  };

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const navigateToAddForm = () => {
    navigate("/dashboard/recipe-add-item");
  };

  const navigateToEditRecipe = (recipe) => {
    navigate("/dashboard/recipe-edit-form", {
      state: {
        selectedRecipe: recipe,
        tagsList: tagsList,
        categoriesList: categoriesList,
      },
    });
  };

  const getRecipesList = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setRecipesList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getTagsList = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/tag/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTagsList(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCategoriesList = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setSelectedRecipeId(selectedRecipe?.id || "");
  }, [selectedRecipe]);

  useEffect(() => {
    getRecipesList();
    getTagsList();
    getCategoriesList();
  }, []);

  return (
    <div className="container">
      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      {show && (
        <DeleteModal
          url={`https://upskilling-egypt.com:443/api/v1/Recipe/${selectedRecipeId}`}
          title={"Recipe"}
          getList={getRecipesList}
          show={show}
          handleClose={handleClose}
        />
      )}

      <div className="categories-container">
        <div className="title-info d-flex justify-content-between align-items-center p-4">
          <div className="title">
            <h5 className="lh-1">Recipes Table Details</h5>
            <h6 className="lh-1 text-muted">You can check all details</h6>
          </div>
          <div className="btn-container">
            <Button
              className="btn btn-success px-5 text-capitalize"
              onClick={navigateToAddForm}
            >
              Add new Item
            </Button>
          </div>
        </div>
      </div>

      {recipesList?.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {recipesList?.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe?.name}</td>
                  <td className="w-25">
                    <img
                      src={
                        recipe.imagePath
                          ? `https://upskilling-egypt.com:443/${recipe.imagePath}`
                          : ""
                      }
                      className="w-25"
                    />
                  </td>
                  <td>{recipe?.price}</td>
                  <td>{recipe?.description}</td>
                  <td>{recipe?.tag?.name}</td>
                  <td>{recipe?.category[0]?.name}</td>
                  <td className="text-end pe-4">
                    <div className="dropdown">
                      <i
                        className="fa-solid fa-ellipsis"
                        role="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li className="dropdown-item" role="button">
                          <i className="fa-solid fa-eye text-success"></i> View
                        </li>
                        <li
                          className="dropdown-item"
                          role="button"
                          onClick={() => navigateToEditRecipe(recipe)}
                        >
                          <i className="fa-solid fa-pen-to-square text-warning"></i>{" "}
                          Edit
                        </li>
                        <li
                          onClick={() => {
                            handleShow(recipe);
                          }}
                          className="dropdown-item"
                          role="button"
                        >
                          <i className="fa-solid fa-trash text-danger"></i>{" "}
                          Delete
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}
