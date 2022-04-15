import axios from "axios";
import { setHeadersWithAccessToken } from "../index";

const api_url = 'http://localhost:3000'

export const userLogin = (data) => {
  return axios.post(`${api_url}/users/login`, data)
};
