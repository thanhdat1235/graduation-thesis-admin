import axiosService from "../axiosService";
import axios from "axios";
import {
  REGISTER_URL,
  LOGIN_URL,
  GET_ALL_URL,
  LOGOUT_URL,
  GET_ONE_URL,
  UPDATE_URL,
  DELETE_ONE,
  DELETE_MANY_URL,
  FORGOTPASSWORD_URL,
  VERIFY_OTP_URL,
  RESET_PASSWORD_URL,
} from "../url";

const userService = {
  createUser: async (params) => {
    return axios({
      url: REGISTER_URL,
      method: "POST",
      data: params,
    });
  },

  signIn: async (params) => {
    return axios({
      url: LOGIN_URL,
      method: "POST",
      data: params,
    });
  },

  signOut: async (params) => {
    return axiosService()({
      method: "POST",
      url: LOGOUT_URL,
      data: params,
    });
  },

  findAll: async (params) => {
    return axiosService()({
      method: "GET",
      url: GET_ALL_URL,
      params: {
        pageSize: params.pageSize,
        page: params.page,
      },
    });
  },

  findOne: async (params) => {
    return axiosService()({
      url: `${GET_ONE_URL}${params.id}`,
      method: "GET",
    });
  },

  updateUser: async (params) => {
    return axiosService()({
      url: `${UPDATE_URL}${params.id}`,
      method: "PUT",
      data: params.data,
    });
  },

  deleteById: async (params) => {
    return axiosService()({
      url: `${DELETE_ONE}${params.id}`,
      method: "DELETE",
      data: params,
    });
  },

  deleteMany: async (params) => {
    return axiosService()({
      url: DELETE_MANY_URL,
      method: "DELETE",
      data: params,
    });
  },

  forgotpassword: async (params) => {
    return axios({
      url: FORGOTPASSWORD_URL,
      method: "PUT",
      data: params,
    });
  },

  verifyOTP: async (params) => {
    return axios({
      url: `${VERIFY_OTP_URL}${params.email}`,
      method: "POST",
      data: { otp_code: params.otp_code.trim() },
    });
  },

  resetpassword: async (params) => {
    return axios({
      url: `${RESET_PASSWORD_URL}${params.email}`,
      method: "POST",
      data: { password: params.password.trim() },
    });
  },
};

export default userService;
