import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {
    await axios
      .post("https://upskilling-egypt.com:443/api/v1/Users/Login", data)
      .then((res) => {
        localStorage.setItem("adminToken", res.data.token);
        setTimeout(() => {
          toast.success("login successfully!");
        }, 1000);
        saveAdminData();
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
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
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
                  <div className="alert alert-danger">
                    {errors.email.message}
                  </div>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                {errors.password && (
                  <div className="alert alert-danger">
                    {errors.password.message}
                  </div>
                )}
                <div className="d-flex justify-content-end mb-3">
                  <Link to='/forget-pass'>Forget Password?</Link>
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
