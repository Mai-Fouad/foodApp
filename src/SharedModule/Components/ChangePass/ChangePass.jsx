import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/images/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { userURLs } from "../../../lib/APIs";
import { passwordValidation } from "../../../lib/InputsValidator";

export default function ChangePass() {
  const { changePassAPI } = userURLs;

  // const [showPass, setShowPass] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleShowOldPassword = () => setShowOldPassword((prev) => !prev);

  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);

  const toggleShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((prev) => !prev);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("newPassword");

  const showPasswordHandler = () => {
    setShowPass(!showPass);
  };

  const onSubmitHandler = async (data) => {
    const token = localStorage.getItem("loginToken");

    try {
      const response = await axios.put(changePassAPI, data, {
        headers: {
          Authorization: token,
        },
      });
      localStorage.removeItem("loginToken");
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
                <span className="input-group-text">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  id="odPassword"
                  type={showOldPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Old Password"
                  {...register("oldPassword", passwordValidation)}
                />
                <span className="input-group-text">
                  <i
                    className={`fa-regular fa-eye${
                      !showOldPassword ? "-slash" : ""
                    }`}
                    role="button"
                    onClick={toggleShowOldPassword}
                  ></i>
                </span>
              </div>
              {errors.oldPassword && (
                <div className="alert alert-danger">
                  {errors.oldPassword.message}
                </div>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="New Password"
                  {...register("newPassword", passwordValidation)}
                />
                <span className="input-group-text">
                  <i
                    className={`fa-regular fa-eye${
                      !showNewPassword ? "-slash" : ""
                    }`}
                    role="button"
                    onClick={toggleShowNewPassword}
                  ></i>
                </span>
              </div>
              {errors.newPassword && (
                <div className="alert alert-danger">
                  {errors.newPassword.message}
                </div>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  id="confirmNewPassword"
                  type={showConfirmNewPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", {
                    required: "Confirm new password is required",
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                />
                <span className="input-group-text">
                  <i
                    className={`fa-regular fa-eye${
                      !showConfirmNewPassword ? "-slash" : ""
                    }`}
                    role="button"
                    onClick={toggleShowConfirmNewPassword}
                  ></i>
                </span>
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
