import React from "react";
import Head from "next/head";
import { PATTERN } from "../contents/regular";
import { useForm } from "react-hook-form";
import userService from "../services/userService/userService";
import Router from "next/router";

const register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const setStyleValidate = (name) =>
    errors[name] ? { border: "1px solid red" } : null;

  const onSubmit = (data) => {
    try {
      userService.createUser({
        first_name: data.FirstName,
        last_name: data.LastName,
        email: data.email,
        password: data.password,
      });
      Router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>SB Admin 2 - Register</title>
      </Head>
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Create an Account!
                      </h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="FirstName"
                            className="form-control form-control-user"
                            id="exampleFirstName"
                            placeholder="First Name"
                            style={setStyleValidate("FirstName")}
                            {...register("FirstName", {
                              required: true,
                            })}
                          />
                          {errors.FirstName?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập họ và tên đệm
                            </span>
                          )}
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="text"
                            name="LastName"
                            className="form-control form-control-user"
                            id="exampleLastName"
                            placeholder="Last Name"
                            style={setStyleValidate("LastName")}
                            {...register("LastName", {
                              required: true,
                            })}
                          />
                          {errors.LastName?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập tên
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="Email Address"
                          {...register("email", {
                            required: true,
                            pattern: PATTERN.EMAIL,
                          })}
                        />
                        {errors.email?.type === "required" && (
                          <span className="text-danger">
                            Vui lòng nhập email
                          </span>
                        )}
                        {errors.email?.type === "pattern" && (
                          <span className="text-danger">
                            Email không hợp lệ
                          </span>
                        )}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            name="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            style={setStyleValidate("password")}
                            {...register("password", {
                              required: true,
                              minLength: 6,
                            })}
                          />
                          {errors.password?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập mật khẩu
                            </span>
                          )}
                          {errors.password?.type === "minLength" && (
                            <span className="text-danger">
                              Mật khẩu phải tối thiểu 6 ký tự
                            </span>
                          )}
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control form-control-user"
                            id="exampleRepeatPassword"
                            placeholder="Repeat Password"
                            style={setStyleValidate("confirmPassword")}
                            {...register("confirmPassword", {
                              required: true,
                              validate: (value) => {
                                return (
                                  value === watch("password") ||
                                  "Mật khẩu không khớp"
                                );
                              },
                            })}
                          />
                          {errors.confirmPassword?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập lại mật khẩu
                            </span>
                          )}
                          {errors.confirmPassword && (
                            <span className="text-danger">
                              {errors.confirmPassword.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Register Account
                      </button>
                      <hr />
                      <a href="/" className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw"></i> Register with
                        Google
                      </a>
                      <a
                        href="/"
                        className="btn btn-facebook btn-user btn-block"
                      >
                        <i className="fab fa-facebook-f fa-fw"></i> Register
                        with Facebook
                      </a>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="login">
                        Already have an account? Login!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default register;
