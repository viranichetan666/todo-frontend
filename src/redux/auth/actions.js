const authAction = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  GET_USERS_REQUEST: "GET_USERS_REQUEST",
  GET_USERS_SUCCESS: "GET_USERS_SUCCESS",

  login: (data) => ({
    type: authAction.LOGIN_REQUEST,
    data,
  }),
  logout: () => ({
    type: authAction.LOGOUT_REQUEST,
  }),
  getAllUsers: () => ({
    type: authAction.GET_USERS_REQUEST,
  }),
};

export default authAction;
