import axios from "axios";
import axiosService from "../axiosService";
import { UPLOAD_IMAGE_URL } from "../url";

const uploadService = {
  uploadImage: async (payload) => {
    return axios({
      url: UPLOAD_IMAGE_URL,
      method: "POST",
      data: payload.data,
    });
  },
};

export default uploadService;
