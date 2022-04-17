import axios from "axios";

const api_url = process.env.REACT_APP_APIBASE;

export const userLogin = (data) => {
  return axios.post(`${api_url}/users/login`, data)
};
