const authAction = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",

  login: (data) => ({
    type: authAction.LOGIN_REQUEST,
    data,
  }),
  logout: () => ({
    type: authAction.LOGOUT_REQUEST,
  }),
};

export default authAction;
