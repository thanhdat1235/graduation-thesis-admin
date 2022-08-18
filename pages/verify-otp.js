import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { PATTERN } from "../contents/regular";
import userService from "../services/userService/userService";
import Router, { useRouter } from "next/router";

const verifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState({
    message: "",
  });
  const { query } = useRouter();
  const otpJoin = otp.join("");

  useEffect(() => {
    if (otpJoin.length == 6) {
      setErrors("");
    }
  }, [otpJoin]);

  const handleChange = (ele, index) => {
    if (isNaN(ele.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? ele.value : d))]);

    if (ele.value !== "") {
      if (ele.nextSibling) {
        ele.nextSibling.focus();
      }
    } else {
      if (index !== 0) {
        ele.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (otpJoin.length < 6) {
        setErrors({ message: "Vui lòng nhập đủ mã xác thực !" });
      } else {
        await userService.verifyOTP({
          email: query.email,
          otp_code: otpJoin,
        });
        Router.push("/reset-password?email=" + query.email);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>SB Admin 2 - Verify</title>
      </Head>
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-4 text-center">
              <div className="row">
                <div className="col-sm-12 mt-5 bgWhite">
                  <div className="title">Verify OTP</div>

                  <form action="" className="mt-5">
                    {otp.map((data, index) => {
                      return (
                        <input
                          key={index}
                          className="otp"
                          type="text"
                          name="otp"
                          value={data}
                          maxLength="1"
                          onChange={(e) => handleChange(e.target, index)}
                        />
                      );
                    })}
                    <hr className="mt-4" />
                    <span className="text-danger">{errors.message}</span>
                    <button
                      className="btn btn-primary btn-block mt-4 mb-4 customBtn"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Xác thực
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default verifyOtp;
