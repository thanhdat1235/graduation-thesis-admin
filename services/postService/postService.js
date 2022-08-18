import axiosService from "../axiosService";
import axios from "axios";
import {
  FIND_ALL_CATEGORY_URL,
  GET_ALL_POST_URL,
  GET_ALL_TAGS_URL,
  CREATE_POST_URL,
  CREATE_CATEGORY_URL,
  CREATE_TAG_URL,
  FIND_ONE_POST_URL,
  UPDATE_POST_URL,
  DELETE_POST_URL,
  DELETE_MANY_POST_URL,
} from "../url";

const postService = {
  createTags: async (params) => {
    return axiosService()({
      method: "POST",
      url: CREATE_TAG_URL,
      data: params,
    });
  },

  createCategory: async (params) => {
    return axiosService()({
      method: "POST",
      url: CREATE_CATEGORY_URL,
      data: params,
    });
  },

  createPost: async (params) => {
    return axiosService()({
      method: "POST",
      url: CREATE_POST_URL,
      data: params,
    });
  },

  getAll: async (params) => {
    return axios({
      url: FIND_ALL_CATEGORY_URL,
      method: "GET",
      data: params,
    });
  },

  getAllTags: async (params) => {
    return axios({
      url: GET_ALL_TAGS_URL,
      method: "GET",
      data: params,
    });
  },

  getAllPost: async (params) => {
    return axios({
      url: `${GET_ALL_POST_URL}?page=${params.page}&pageSize=${params.pageSize}`,
      method: "GET",
      data: params,
    });
  },

  findOnePost: async (params) => {
    return axios({
      url: `${FIND_ONE_POST_URL}${params.id}`,
      method: "GET",
      data: params,
    });
  },

  updatePost: async (params) => {
    return axiosService()({
      method: "PUT",
      url: `${UPDATE_POST_URL}${params.id}`,
      data: params,
    });
  },

  deleteOnePost: async (params) => {
    return axiosService()({
      method: "DELETE",
      url: `${DELETE_POST_URL}${params.id}`,
    });
  },

  deleteManyPost: async (params) => {
    return axiosService()({
      method: "DELETE",
      url: DELETE_MANY_POST_URL,
      data: params,
    });
  },
};

export default postService;
