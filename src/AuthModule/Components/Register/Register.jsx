import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const convertToFormData = (data) => {
    console.log(data, "testData");
    const formData = new FormData();
    formData.append("userName", data?.userName);
    formData.append("email", data?.email);
    formData.append("country", data?.country);
    formData.append("phoneNumber", data?.phoneNumber);
    formData.append("password", data?.password);
    formData.append("confirmPassword", data?.confirmPassword);
    formData.append("profileImage", data?.profileImage[0]);
    return formData;
  };

  const onSubmitHandler = async (data) => {
    const convertedData = convertToFormData(data);
    console.log(convertedData, "converted");
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Register",
        convertedData
      );
      navigate("/verify-user");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="Auth-container vh-100">
      <div className="overlay vh-100 container-fluid">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="login bg-white rounded-3 px-5 py-4">
              <div className="logo-container text-center">
                <img src={logo} alt="food-logo" className="w-50 mb-3" />
              </div>
              <h4>Register</h4>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-regular fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UserName"
                        {...register("userName", {
                          required: "UserName is required",
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <div className="alert alert-danger py-1">
                        {errors.userName.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your E-mail"
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-regular fa-flag"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <div className="alert alert-danger py-1">
                        {errors.country.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-mobile"></i>
                      </span>
                      <input
                        type="tel"
                        maxLength={11}
                        className="form-control"
                        placeholder="phoneNumber"
                        {...register("phoneNumber", {
                          required: "phoneNumber is required",
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <div className="alert alert-danger py-1">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
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
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="confirmPassword"
                        {...register("confirmPassword", {
                          required: "confirmPassword is required",
                        })}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <div className="alert alert-danger py-1">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="file"
                      placeholder="Upload image"
                      className="form-control"
                      {...register("profileImage")}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-end my-3">
                    <Link
                      to="/login"
                      className="text-success  text-decoration-none"
                    >
                      Already user? let's Login Now
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <button className="btn btn-success w-75 mx-auto">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
