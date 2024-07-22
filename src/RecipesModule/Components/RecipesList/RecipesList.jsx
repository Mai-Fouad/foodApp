import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import NoDataFound from "../../../SharedModule/Components/NoDataFound/NoDataFound";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import DeleteModal from "../../../SharedModule/Components/DeleteModal/DeleteModal";
import img from "../../../assets/images/headerImg.png";

export default function RecipesList({ loginData }) {
  const [recipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [pagesArray, setPagesArray] = useState([]);

  const handleClose = () => {
    setShow(false);
    setSelectedRecipe(null);
  };

  const handleShow = (recipe) => {
    setShow(true);
    setSelectedRecipe(recipe);
  };

  const handleFavClose = (recipe) => {
    setShow(false);
    setShowFav(false);
    setSelectedRecipe(null);
  };

  const handleFavShow = (recipe) => {
    setShow(true);
    setShowFav(true);
    setSelectedRecipe(recipe);
  };

  const token = localStorage.getItem("loginToken");
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

  const getRecipesList = async (pageNo, pageSize, name, tagId, catId) => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/",
        {
          params: {
            pageNumber: pageNo,
            pageSize: pageSize,
            name: name,
            tagId: tagId,
            categoryId: catId,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setPagesArray(
        Array(response?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setRecipesList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getTagsList = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/",
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
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
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

  const addToFavorite = async (recipeId) => {
    console.log(recipeId, "id");
    try {
      const response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,
        { recipeId: recipeId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      handleFavClose();
      toast.success("Recipe has been added to favorites!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const addToFavoriteModal = (
    <Modal show={show} onHide={handleFavClose}>
      <Modal.Header closeButton className="flex-column-reverse">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={img} className="w-50" />
          <Modal.Title>Add To Favorite</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted text-center">
          are you sure you want to add this item to favorites? if you are sure
          just click on add.
        </p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-success"
            onClick={() => addToFavorite(selectedRecipeId)}
            type="submit"
          >
            Add
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );

  const getNameValue = (e) => {
    setSearchName(e.target.value);
    getRecipesList(1, 5, e.target.value, selectedTagId, selectedCatId);
  };

  const getTagIdValue = (e) => {
    setSelectedTagId(e.target.value);
    getRecipesList(1, 5, searchName, e.target.value, selectedCatId);
  };
  const getCatIdValue = (e) => {
    setSelectedCatId(e.target.value);
    getRecipesList(1, 10, searchName, selectedTagId, e.target.value);
  };

  useEffect(() => {
    setSelectedRecipeId(selectedRecipe?.id || "");
  }, [selectedRecipe]);

  useEffect(() => {
    getRecipesList(1, 5);
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

      {loginData?.userGroup == "SuperAdmin" && (
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
      )}

      <div className="row my-3">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text border-end-0 bg-transparent">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
              onChange={getNameValue}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group mb-3">
            <select className="form-select" onChange={getTagIdValue}>
              <option selected>Search by Tag</option>
              {tagsList?.length > 0 &&
                tagsList?.map((tag) => (
                  <option key={tag?.id} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group mb-3">
            <select className="form-select" onChange={getCatIdValue}>
              <option selected>Search by Category</option>
              {categoriesList?.length > 0 &&
                categoriesList?.map((cat) => (
                  <option key={cat?.id} value={cat?.id}>
                    {cat?.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {show && !showFav && (
        <DeleteModal
          url={`https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedRecipeId}`}
          title={"Recipe"}
          getList={getRecipesList}
          show={show}
          handleClose={handleClose}
        />
      )}

      {show && showFav && addToFavoriteModal}

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
                          ? `https://upskilling-egypt.com:3006/${recipe.imagePath}`
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
                        {loginData?.userGroup == "SuperAdmin" && (
                          <>
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
                          </>
                        )}
                        {loginData?.userGroup == "SystemUser" && (
                          <li
                            onClick={() => {
                              handleFavShow(recipe);
                            }}
                            className="dropdown-item"
                            role="button"
                          >
                            <i className="fa-regular fa-heart text-danger"></i>{" "}
                            Favorite
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                {pagesArray?.map((pageNo) => (
                  <li
                    className="page-item"
                    role="button"
                    key={pageNo}
                    onClick={() => getRecipesList(pageNo, 5)}
                  >
                    <a className="page-link">{pageNo}</a>
                  </li>
                ))}
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}
