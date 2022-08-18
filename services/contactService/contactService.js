import axiosService from "../axiosService";
import axios from "axios";
import {
  GET_ALL_CONTACT_URL,
  DELETE_CONTACT_URL,
  DELETE_MANY_CONTACT_URL,
} from "../url";

const contactService = {
  getAll: async (params) => {
    return axiosService()({
      url: GET_ALL_CONTACT_URL,
      method: "GET",
      params,
    });
  },

  deleteContact: async (params) => {
    return axiosService()({
      method: "DELETE",
      url: `${DELETE_CONTACT_URL}${params.id}`,
    });
  },

  deleteManyContact: async (params) => {
    return axiosService()({
      method: "DELETE",
      url: DELETE_MANY_CONTACT_URL,
      data: params,
    });
  },
};

export default contactService;
