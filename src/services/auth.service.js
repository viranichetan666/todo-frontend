import HttpClient from "./index";

class AuthApi extends HttpClient {
  constructor(token = null) {
    super(process.env.REACT_APP_APIBASE, token);
  }
  
  async userLogin(data) {
    console.log("this", this)
    return await this.instance.post("/users/login", data);
  };

}

export default AuthApi;
