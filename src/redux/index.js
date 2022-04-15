import axios from "axios";

export const setHeadersWithAccessToken = (token) => {
  axios.defaults.headers.common["x-auth-token"] = token;
};
