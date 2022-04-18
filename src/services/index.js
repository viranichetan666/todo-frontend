import axios from "axios";

class HttpClient {
  constructor(baseURL, token) {
    console.log("baseURL++++++++", baseURL)
    this.instance = axios.create({
      baseURL,
    });
    this.token = token;
    this._initializeResponseInterceptor();
  }

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  _handleRequest = (config) => {
    if (this.token) config.headers["Authorization"] = `Bearer ${this.token}`;
    config.headers["Content-Type"] = "application/json";
    config.headers["accept"] = "application/json";
    return config;
  };

  _handleResponse = (data) => data;

  _handleError = (error) => {
    if (error.response.status === 401) {
      window.location = "/login";
    }
    return Promise.reject(error);
  };
}

export default HttpClient;
