import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {
    await axios
      .post("https://upskilling-egypt.com:443/api/v1/Users/Reset", data)
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
              <h5> Reset Password</h5>
              <p className="text-muted">
                Please Enter Your Otp or Check Your Inbox
              </p>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: "^[^@]+@[^@]+.[^@]+$",
                        message: "Email not valid",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <div className="alert alert-danger py-1">
                    {errors.email.message}
                  </div>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    {...register("seed", {
                      required: "OTP is required",
                    })}
                  />
                </div>
                {errors.seed && (
                  <div className="alert alert-danger py-1">
                    {errors.seed.message}
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
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                {errors.password && (
                  <div className="alert alert-danger py-1">
                    {errors.password.message}
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
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                    })}
                  />
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
