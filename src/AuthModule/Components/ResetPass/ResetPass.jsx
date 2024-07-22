import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userURLs } from "../../../lib/APIs";
import {
  OTPValidation,
  emailValidation,
  passwordValidation,
} from "../../../lib/InputsValidator";

export default function ResetPass() {
  const { resetPassAPI } = userURLs;

  const [showPass, setShowPass] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const showPasswordHandler = () => {
    setShowPass(!showPass);
  };

  const onSubmitHandler = async (data) => {
    await axios
      .post(resetPassAPI, data)
      .then((res) => {
        setTimeout(() => {
          toast.success("Try your new password!");
        }, 1000);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="Auth-container vh-100">
      <div className="overlay vh-100 container-fluid">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5">
            <div className="login bg-white rounded-3 px-5 py-4">
              <div className="logo-container text-center">
                <img src={logo} alt="food-logo" className="w-75 mb-3" />
              </div>
              <h5>Reset Password</h5>
              <p className="text-muted">
                Please Enter Your Otp or Check Your Inbox
              </p>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    {...register("email", emailValidation)}
                  />
                </div>
                {errors.email && (
                  <div className="alert alert-danger py-1">
                    {errors.email.message}
                  </div>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    {...register("seed", OTPValidation)}
                  />
                </div>
                {errors.seed && (
                  <div className="alert alert-danger py-1">
                    {errors.seed.message}
                  </div>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type={showPass["password"] ? "text" : "password"}
                    className="form-control"
                    placeholder="New Password"
                    {...register("password", passwordValidation)}
                  />
                  <span className="input-group-text">
                    <i
                      className={`fa-regular fa-eye${showPass ? "-slash" : ""}`}
                      role="button"
                      onClick={showPasswordHandler}
                    ></i>
                  </span>
                </div>
                {errors.password && (
                  <div className="alert alert-danger py-1">
                    {errors.password.message}
                  </div>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type={showPass["confirmPassword"] ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm New Password"
                    {...register("confirmPassword", {
                      ...passwordValidation,
                      validate: (value) =>
                        value === password ||
                        "New password does not match confirm password",
                    })}
                  />
                  <span className="input-group-text">
                    <i
                      className={`fa-regular fa-eye${showPass ? "-slash" : ""}`}
                      role="button"
                      onClick={showPasswordHandler}
                    ></i>
                  </span>
                </div>
                {errors.confirmPassword && (
                  <div className="alert alert-danger py-1">
                    {errors.confirmPassword.message}
                  </div>
                )}
                <button className="btn btn-success w-100">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
