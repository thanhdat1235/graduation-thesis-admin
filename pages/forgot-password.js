import React from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { PATTERN } from "../contents/regular";
import userService from "../services/userService/userService";
import Router from "next/router";

const forgotPassword = () => {
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
      await userService.forgotpassword({ email: data.email });
      Router.push("/verify-otp?email=" + data.email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>SB Admin 2 - ForgotPassword</title>
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
                            Forgot Your Password?
                          </h1>
                          <p className="mb-4">
                            We get it, stuff happens. Just enter your email
                            address below and we'll send you a link to reset
                            your password!
                          </p>
                        </div>
                        <form
                          className="user"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
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
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                            // onClick={handleResetPassword}
                          >
                            Đặt lại mật khẩu
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

export default forgotPassword;
