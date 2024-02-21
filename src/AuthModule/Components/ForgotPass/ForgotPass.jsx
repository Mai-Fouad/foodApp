import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/images/logo.png";

export default function ForgetPass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    axios
      .post("https://upskilling-egypt.com:443/api/v1/Users/Reset/Request", data)
      .then((res) => {
        navigate("/reset-pass");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
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
              <h5>Forgot Your Password?</h5>
              <p className="text-muted">
                No worries! Please enter your email and we will send a password
                reset link
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
                <button className="btn btn-success w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
