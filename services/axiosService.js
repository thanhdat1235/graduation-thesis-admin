import axios from "axios";
import { API_URL } from "./url";
import { checkExpToken } from "../utils/checkToken";
import refreshToken from "../utils/refreshToken";

const axiosService = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.replace("/login");
  }

  const axiosOptions = axios.create({
    baseURL: API_URL,
    timeout: 3 * 1000,
    headers: {
      authorization: token,
    },
  });
  // Truoc khi gui server
  axiosOptions.interceptors.request.use(
    async (config) => {
      if (!checkExpToken(token)) {
        // refresh token
        const refresh_token = localStorage.getItem("refresh_token");
        const res = await refreshToken(refresh_token);
        if (res) {
          config.headers = {
            "content-type": "application/json",
            authorization: res.data,
          };
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  // Sau khi gui server
  axiosOptions.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return axiosOptions;
};

export default axiosService;
