import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { PATTERN } from "../contents/regular";
import userService from "../services/userService/userService";
import Router, { useRouter } from "next/router";

const resetPassword = () => {
  const { query } = useRouter();

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
      await userService.resetpassword({
        email: query.email,
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
        <title>SB Admin 2 - Reset Password</title>
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
                    <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-2">
                            Hãy nhập khẩu mới của bạn
                          </h1>
                        </div>
                        <form
                          className="user"
                          onSubmit={handleSubmit(onSubmit)}
                        >
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
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                          >
                            Reset Password
                          </button>
                        </form>
                        <hr />
                        <div className="text-center">
                          <a className="small" href="register">
                            Create an Account!
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
        </div>
      </div>
    </>
  );
};

export default resetPassword;
