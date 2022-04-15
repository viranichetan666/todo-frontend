import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import todoSagas from "./todo/saga";

export default function* rootSaga() {
  yield all([authSagas(), todoSagas()]);
}
