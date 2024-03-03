import React, { useState } from "react";
import RecipesHeader from "../../../SharedModule/Components/RecipesHeader/RecipesHeader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function RecipeEditItem() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRecipe, setSelectedRecipe] = useState(
    location.state.selectedRecipe
  );
  const { tagsList, categoriesList } = location.state;
  const [isImageChanged, setIsImageChanged] = useState(false);
  const token = localStorage.getItem("loginToken");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsImageChanged(true);
      setSelectedRecipe({ ...selectedRecipe, imagePath: null });
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setValue("imagePreview", imageUrl);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const convertToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("price", data?.price);
    formData.append("description", data?.description);
    formData.append("tagId", data?.tagId);
    formData.append("categoriesIds", data?.categoriesIds);
    if (isImageChanged) {
      formData.append("recipeImage", data?.recipeImage[0]);
    }
    return formData;
  };

  const onSubmitHandler = async (data) => {
    const convertedData = convertToFormData(data);
    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${selectedRecipe?.id}`,
        convertedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate("/dashboard/recipes");
      toast.success("Recipe has been updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <RecipesHeader edit />
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto mt-5 mb-3">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control bg-light border-0 rounded-4"
                  placeholder="Recipe Name"
                  {...register("name", {
                    required: "Recipe name is required",
                  })}
                  defaultValue={selectedRecipe?.name}
                  onChange={(e) => setValue("name", e.target.value)}
                />
              </div>
              {errors.name && (
                <div className="alert alert-danger py-1">
                  {errors.name.message}
                </div>
              )}
              <div className="input-group mb-3">
                <select
                  className="form-control w-100 border-0 bg-light rounded-4"
                  {...register("tagId", {
                    required: "Tag is required",
                  })}
                  defaultValue={selectedRecipe?.tag?.id}
                  onChange={(e) => setValue("tagId", parseInt(e.target.value))}
                >
                  <option disabled>{selectedRecipe?.tag?.name}</option>
                  {tagsList?.map((tag) => (
                    <option key={tag?.id} value={tag?.id}>
                      {tag?.name}
                    </option>
                  ))}
                </select>
              </div>

              {errors.tagId && (
                <div className="alert alert-danger py-1">
                  {errors.tagId.message}
                </div>
              )}
              <div className="input-group rounded-3 mb-3">
                <input
                  type="number"
                  className="form-control bg-light border-0 rounded-4"
                  placeholder="Price"
                  {...register("price", {
                    required: "Price is required",
                  })}
                  defaultValue={selectedRecipe?.price}
                  onChange={(e) => setValue("price", e.target.value)}
                />
              </div>
              {errors.price && (
                <div className="alert alert-danger py-1">
                  {errors.price.message}
                </div>
              )}
              <div className="input-group mb-3">
                <select
                  className="w-100 border-0 bg-light rounded-4 form-control"
                  {...register("categoriesIds", {
                    required: "Category is required",
                  })}
                  defaultValue={selectedRecipe?.category[0]?.id}
                  onChange={(e) => setValue("categoriesIds", e.target.value)}
                >
                  <option disabled>{selectedRecipe?.category[0]?.name}</option>
                  {categoriesList?.map((cat) => (
                    <option
                      key={cat?.id}
                      value={cat?.id}
                      placeholder="Category"
                    >
                      {cat?.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.categoriesIds && (
                <div className="alert alert-danger py-1">
                  {errors.categoriesIds.message}
                </div>
              )}
              <textarea
                rows={4}
                placeholder="Description"
                className="w-100 bg-light border-0 rounded-4 form-control"
                {...register("description", {
                  required: "Description is required",
                })}
                defaultValue={selectedRecipe?.description}
                onChange={(e) => setValue("description", e.target.value)}
              />
              {errors.description && (
                <div className="alert alert-danger py-1">
                  {errors.description.message}
                </div>
              )}
              <div className="uploadImg border-success lightGreenContainer mt-2 p-3 d-flex align-items-center">
                {selectedRecipe?.imagePath && (
                  <div className="selectedImg">
                    <img
                      src={`https://upskilling-egypt.com:443/${selectedRecipe?.imagePath}`}
                      alt="selected image"
                      className="w-100"
                    />
                  </div>
                )}
                {watch("imagePreview") && (
                  <div className="selectedImg">
                    <img
                      src={watch("imagePreview")}
                      alt="selected image"
                      className="w-100"
                    />
                  </div>
                )}
                <input
                  type="file"
                  role="button"
                  {...register("recipeImage")}
                  className="ms-5"
                  onChange={handleFileChange}
                />
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn btn-outline-success me-4 px-5"
                  onClick={() => {
                    navigate("/dashboard/recipes");
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-success px-4">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
