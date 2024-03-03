import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import noData from "../../../assets/images/no-data.png";

export default function DeleteModal({
  title,
  url,
  selectedId,
  getList,
  show,
  handleClose,
}) {
  const token = localStorage.getItem("loginToken");

  const deleteHandler = async (item) => {
    try {
      const response = await axios.delete(`${url}`, {
        headers: {
          Authorization: token,
        },
      });
      toast.success(`${title} has been deleted successfully!`);
      handleClose();
      getList();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="flex-column-reverse">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={noData} />
            <Modal.Title>Delete This {title}?</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted text-center">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteHandler(selectedId)}
              type="submit"
            >
              Delete this item
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
