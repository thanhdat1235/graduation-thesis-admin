import axios from "axios";
import axiosService from "../axiosService";
import { SEARCH_URL } from "../url";

const searchService = {
  search: async (payload) => {
    return axiosService()({
      method: "POST",
      url: SEARCH_URL,
      data: payload,
    });
  },
};

export default searchService;
