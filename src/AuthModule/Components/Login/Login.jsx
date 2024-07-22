import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userURLs } from "../../../lib/APIs";
import {
  emailValidation,
  passwordValidation,
} from "../../../lib/InputsValidator";

export default function Login({ saveLoginData }) {
  const { loginAPI } = userURLs;

  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showPasswordHandler = () => {
    setShowPass(!showPass);
  };

  const onSubmitHandler = async (data) => {
    console.log(data, "loin");
    await axios
      .post("https://upskilling-egypt.com:3006/api/v1/Users/Login", data)
      .then((res) => {
        localStorage.setItem("loginToken", res.data.token);
        setTimeout(() => {
          toast.success("login successfully!");
        }, 1000);
        saveLoginData();
        navigate("/dashboard");
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
              <h5>Login</h5>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your E-mail"
                    {...register("email", emailValidation)}
                  />
                </div>
                {errors.email && (
                  <div className="alert alert-danger">
                    {errors.email.message}
                  </div>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your Password"
                    {...register("password", passwordValidation)}
                  />
                  <span className="input-group-text">
                    <i
                      className={`fa-regular fa-eye${
                        showPass ? "-slash" : ""
                      }`}
                      role="button"
                      onClick={showPasswordHandler}
                    ></i>
                  </span>
                </div>
                {errors.password && (
                  <div className="alert alert-danger">
                    {errors.password.message}
                  </div>
                )}
                <div className="d-flex justify-content-between mb-3">
                  <Link
                    to="/register"
                    className="text-success text-decoration-none"
                  >
                    Register Now?
                  </Link>
                  <Link
                    to="/forget-pass"
                    className="text-success text-decoration-none"
                  >
                    Forget Password?
                  </Link>
                </div>
                <button className="btn btn-success w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
