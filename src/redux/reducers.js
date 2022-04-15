import auth from "./auth/reducer";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const createRootReducer = (history) =>
  combineReducers({
    router: routerReducer,
    auth,
  });
export default createRootReducer;
