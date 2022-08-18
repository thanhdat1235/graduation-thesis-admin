import React from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { PATTERN } from "../contents/regular";
import { useState, useEffect } from "react";
import userService from "../services/userService/userService";
import Router from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const setStyleValidate = (name) =>
    errors[name] ? { border: "1px solid red" } : null;

  const onSubmit = async (data) => {
    try {
      const response = await userService.signIn({
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", response.headers.authorization);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("refresh_token", response.data.refresh_token);
      Router.push("/user-manager");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>SB Admin 2 - Login</title>
      </Head>
      <div className="bg-gradient-primary">
        <div className="container">
          {/* <!-- Outer Row --> */}
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* <!-- Nested Row within Card Body --> */}
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
                        </div>
                        <form
                          className="user"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="form-group">
                            <input
                              name="email"
                              type="email"
                              className="form-control form-control-user"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              style={setStyleValidate("email")}
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
                          <div className="form-group">
                            <input
                              name="password"
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              style={setStyleValidate("email")}
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
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                          >
                            Login
                          </button>
                          <hr />
                          <button
                            className="btn btn-google btn-user btn-block"
                            onClick={() => signIn()}
                          >
                            <i className="fab fa-google fa-fw"></i> Login with
                            Google
                          </button>
                          <a
                            href="/"
                            className="btn btn-facebook btn-user btn-block"
                          >
                            <i className="fab fa-facebook-f fa-fw"></i> Login
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
                          <a className="small" href="register">
                            Create an Account!
                          </a>
                        </div>
                      </div>
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

export default login;
