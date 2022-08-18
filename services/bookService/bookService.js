import axiosService from "../axiosService";
import axios from "axios";
import {
  GET_ALL_BOOK_URL,
  CREATE_TAG_URL,
  CREATE_CATEGORY_URL,
  FIND_ALL_CATEGORY_URL,
  GET_ALL_TAGS_URL,
  CREATE_PUBLISHER_URL,
  CREATE_SUPPLIER_URL,
  GET_ALL_PUBLISHER_URL,
  GET_ALL_SUPPLIER_URL,
  CREATE_AUTHOR_URL,
  GET_ALL_AUTHOR_URL,
  CREATE_BOOK_URL,
  DELETE_BOOK_URL,
  FIND_ONE_BOOK_URL,
  UPDATE_BOOK_URL,
} from "../url";

const bookService = {
  createPublisher: async (params) => {
    return axios({
      method: "POST",
      url: CREATE_PUBLISHER_URL,
      data: params,
    });
  },

  createSupplier: async (params) => {
    return axios({
      method: "POST",
      url: CREATE_SUPPLIER_URL,
      data: params,
    });
  },

  createCategory: async (params) => {
    return axios({
      method: "POST",
      url: CREATE_CATEGORY_URL,
      data: params,
    });
  },

  createTags: async (params) => {
    return axios({
      method: "POST",
      url: CREATE_TAG_URL,
      data: params,
    });
  },

  createAuthor: async (params) => {
    return axios({
      method: "POST",
      url: CREATE_AUTHOR_URL,
      data: params,
    });
  },

  getAllAuthor: async (params) => {
    return axios({
      method: "GET",
      url: GET_ALL_AUTHOR_URL,
    });
  },

  getAllBook: async (params) => {
    return axios({
      url: GET_ALL_BOOK_URL,
      method: "GET",
      data: params,
    });
  },

  getAllPublisher: async (params) => {
    return axios({
      url: GET_ALL_PUBLISHER_URL,
      method: "GET",
    });
  },

  getAllSupplier: async (params) => {
    return axios({
      url: GET_ALL_SUPPLIER_URL,
      method: "GET",
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

  findOneBook: async (params) => {
    return axios({
      url: `${FIND_ONE_BOOK_URL}${params.id}`,
      method: "GET",
      data: params,
    });
  },

  createBook: async (params) => {
    return axios({
      url: CREATE_BOOK_URL,
      method: "POST",
      data: params,
    });
  },

  deleteById: async (params) => {
    return axios({
      url: `${DELETE_BOOK_URL}${params.id}`,
      method: "DELETE",
    });
  },

  updateBook: async (params) => {
    axios({
      url: `${UPDATE_BOOK_URL}${params.id}`,
      method: "PUT",
      data: params.data,
    });
  },
};

export default bookService;
