import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL || "http://localhost:3000/api/";

const customGet = async (url: String, params: Object) => {
  return axios.get(`${API_URL}${url}`, { params });
};

const customPost = async (url: String, params: Object) => {
  return axios.post(`${API_URL}${url}`, params );
};

const customPut = async (url: String, params: Object) => {
  return axios.put(`${API_URL}${url}`, { params });
};

const customDelete = async (url: String, params: Object) => {
  return axios.delete(`${API_URL}${url}`, { params });
};

export { customGet, customPost, customPut, customDelete };
