import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/images/logo.png";

export default function VerifyUser() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:443/api/v1/Users/verify",
        data
      );
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
              <h4>Verify User</h4>
              <p className="text-muted">
                Enter your verification code and enjoy using our food management
                dashboard.
              </p>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                  <div className="alert alert-danger">
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
                    placeholder="Enter your verification code"
                    {...register("code", {
                      required: "Code is required",
                    })}
                  />
                </div>
                {errors.code && (
                  <div className="alert alert-danger">
                    {errors.code.message}
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
