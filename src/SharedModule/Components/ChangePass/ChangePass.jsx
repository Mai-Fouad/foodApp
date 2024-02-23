import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/images/logo.png";
import axios from "axios";
import { toast } from "react-toastify";

export default function ChangePass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      localStorage.removeItem("adminToken");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12">
          <div className="bg-white rounded-3 p-2">
            <div className="logo-container text-center">
              <img src={logo} alt="food-logo" className="w-75 mb-3" />
            </div>
            <h5>Change Your assword</h5>
            <p className="text-muted">Enter your details below</p>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Old Password"
                  {...register("oldPassword", {
                    required: "oldPassword is required",
                  })}
                />
              </div>
              {errors.oldPassword && (
                <div className="alert alert-danger">
                  {errors.oldPassword.message}
                </div>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  {...register("newPassword", {
                    required: "newPassword is required",
                  })}
                />
              </div>
              {errors.newPassword && (
                <div className="alert alert-danger">
                  {errors.newPassword.message}
                </div>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", {
                    required: "confirmNewPassword is required",
                  })}
                />
              </div>
              {errors.confirmNewPassword && (
                <div className="alert alert-danger">
                  {errors.confirmNewPassword.message}
                </div>
              )}
              <button className="btn btn-success w-100">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
