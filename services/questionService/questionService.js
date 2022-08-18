import axiosService from "../axiosService";
import axios from "axios";
import {
  GET_ALL_QUESTION_URL,
  DELETE_QUESTION_URL,
  DELETE_MANY_QUESTION_URL,
  CREATE_QUESTION_URL,
  FIND_QUESTION_BY_ID_URL,
  FIND_QUESTION_BY_ID_AND_UPDATE_URL,
} from "../url";

const questionService = {
  createQuestion: async (params) => {
    return axios.request({
      url: CREATE_QUESTION_URL,
      method: "POST",
      data: params,
    });
  },

  getAll: async (params) => {
    return axios({
      url: GET_ALL_QUESTION_URL,
      method: "GET",
      params,
    });
  },

  findQuestionById: async (params) => {
    return axios({
      url: `${FIND_QUESTION_BY_ID_URL}${params.id}`,
      method: "GET",
    });
  },

  findQuestionByIdAndUpdate: async (params) => {
    return axiosService()({
      url: `${FIND_QUESTION_BY_ID_AND_UPDATE_URL}${params.id}`,
      method: "PUT",
      data: params.dataUpdate,
    });
  },

  deleteQuestion: async (params) => {
    return axiosService()({
      method: "DELETE",
      url: `${DELETE_QUESTION_URL}${params.id}`,
    });
  },

  deleteManyQuestion: async (params) => {
    return axiosService()({
      method: "DELETE",
      url: DELETE_MANY_QUESTION_URL,
      data: params,
    });
  },
};

export default questionService;
