import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../SharedModule/Components/Header/Header";
import NoDataFound from "../../SharedModule/Components/NoDataFound/NoDataFound";
import noData from "../../assets/images/no-data.png";

export default function Categories() {
  const token = localStorage.getItem("adminToken");
  const [categoriesList, setCategoriesList] = useState([]);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    setSelectedCategoryId(selectedCategory?.id || "");
    setSelectedCategoryName(selectedCategory?.name || "");
  }, [selectedCategory]);

  console.log(selectedCategory?.id);
  const handleShow = (category = null) => {
    setShow(true);
    setSelectedCategory(category);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addCategoryHandler = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Category/",
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Category has been added successfully!");
      getCategoriesList();
    } catch (error) {
      toast.error(err.response.data.message);
    }
  };

  const updateCategoryHandler = async (cat) => {
    const { id } = cat;
    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:443/api/v1/Category/${id}`,
        {
          name: selectedCategoryName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Category has been updated successfully!");
      handleClose();
      getCategoriesList();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteCategoryHandler = async (cat) => {
    try {
      const response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Category/${selectedCategoryId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Category has been deleted successfully!");
      handleClose();
      getCategoriesList();
    } catch (error) {
      toast.error(error.response.data.message);
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
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  const addModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(addCategoryHandler)}>
          <div className="input-group my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              {...register("name", {
                required: "Category name is required",
                pattern: {
                  message: "Category name not valid",
                },
              })}
            />
          </div>
          {errors.name && (
            <div className="alert alert-danger">{errors.name.message}</div>
          )}
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="btn btn-success"
              onClick={handleClose}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );

  const updateModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update This Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(() => updateCategoryHandler(selectedCategory))}
        >
          <div className="input-group my-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSelectedCategoryName(e.target.value)}
              placeholder="Category Name"
              value={selectedCategoryName}
            />
          </div>
          {errors.name && (
            <div className="alert alert-danger">{errors.name.message}</div>
          )}
          <div className="d-flex justify-content-end">
            <Button variant="primary" className="btn btn-success" type="submit">
              Update
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );

  const deleteModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="flex-column-reverse">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={noData} />
          <Modal.Title>Delete This Category?</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted text-center">
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </p>
        <div className="d-flex justify-content-end">
          <Button
            className="btn btn-outline-danger"
            onClick={() => deleteCategoryHandler(selectedCategoryId)}
            type="submit"
          >
            Delete this item
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      <Header
        title={"Categories"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      {add && !update && addModal}
      {!add && update && updateModal}
      {!add && !update && deleteModal}

      <div className="categories-container">
        <div className="title-info d-flex justify-content-between align-items-center p-4">
          <div className="title">
            <h5>Categories Table Details</h5>
            <h6>You can check all details</h6>
          </div>
          <div className="btn-container">
            <Button
              onClick={() => {
                handleShow();
                setAdd(true);
                setUpdate(false);
              }}
              className="btn btn-success"
            >
              Add new Category
            </Button>
          </div>
        </div>
      </div>
      {categoriesList?.length > 0 ? (
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList?.map((cat) => (
              <tr key={cat.id}>
                <th scope="row">{cat.id}</th>
                <td>{cat.name}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleShow(cat);
                      setUpdate(true);
                      setAdd(false);
                    }}
                    className="btn btn-warning me-2"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      handleShow(cat);
                      setAdd(false);
                      setUpdate(false);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoDataFound />
      )}
    </>
  );
}
