import authAction from "./actions";

const initState = {
  isLogin: false,
  loading: false,
  token: null,
  user: null,
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case authAction.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authAction.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogin: true,
        token: action.token,
        user: action.user,
      };
    case authAction.LOGIN_ERROR:
    case authAction.LOGOUT_REQUEST:
      return {
        ...initState,
      };
    default:
      return state;
  }
}
