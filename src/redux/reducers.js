import auth from "./auth/reducer";
import todo from "./todo/reducer";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const createRootReducer = (history) =>
  combineReducers({
    router: routerReducer,
    auth,
    todo,
  });
export default createRootReducer;
