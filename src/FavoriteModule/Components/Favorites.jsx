import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoDataFound from "../../SharedModule/Components/NoDataFound/NoDataFound";
import Header from "../../SharedModule/Components/Header/Header";
import noImg from "../../assets/images/headerImg.png";
import img from "../../assets/images/no-data.png";
import { Modal } from "react-bootstrap";

export default function Favorites() {
  const [favList, setFavList] = useState([]);
  const [show, setShow] = useState(false);
  const [fav, setFav]= useState(0);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (e) => {
    setShow(true);
    setFav(e);
  };

  const token = localStorage.getItem("loginToken");

  const getFavList = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/userRecipe/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setFavList(response?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const removeFromFav = async (favId) => {
    try {
      const response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/${favId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      handleClose();
      getFavList();
      toast.success("Recipe has been removed from favorites successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const removeFromFavoriteModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="flex-column-reverse">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={img} className="w-50" />
          <Modal.Title>Remove From Favorite</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted text-center">
          are you sure you want to remove this item from favorites? if you are
          sure just click on Delete.
        </p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-success"
            onClick={() => removeFromFav(fav?.id)}
            type="submit"
          >
            Delete
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );

  useEffect(() => {
    getFavList();
  }, []);

  return (
    <div className="container">
      <Header
        title="Favorite items!"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      {show && removeFromFavoriteModal}

      <div className="row justify-content-center mt-5">
        {favList?.length > 0 ? (
          favList?.map((fav) => (
            <div className="col-md-3 position-relative">
              <div className="card" key={fav?.id}>
                <div>
                  <i
                    className="fa-solid fa-heart text-danger position-absolute end-0 top-0 p-3 fa-2x"
                    role="button"
                    onClick={() => handleShow(fav)}
                  ></i>
                </div>
                <img
                  className="card-img-top"
                  src={
                    fav?.recipe?.imagePath
                      ? `https://upskilling-egypt.com:3006/${fav?.recipe?.imagePath}`
                      : noImg
                  }
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{fav?.recipe?.name}</h5>
                  <p className="card-text">{fav?.recipe?.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}
