import {
  all,
  fork,
  put,
  select,
  takeEvery,
  call,
  delay,
} from "redux-saga/effects";
import authActions from "./actions";
import { push } from "react-router-redux";
import { userLogin } from "./service";
import { fetchUsers } from "../todo/service";

function* watchLoginRequest() {
  yield takeEvery("LOGIN_REQUEST", function* (data) {
    try {
      const response = yield call(userLogin, data.data);

      if (response.status === 201) {
        yield put({
          type: authActions.LOGIN_SUCCESS,
          token: response.data.token,
          user: {
            id: response.data.user._id,
            email: response.data.user.email,
            name: response.data.user.email,
            isAdmin: response.data.user.role === "admin",
          },
        });
        yield put(push("/"));
      } else {
        throw response;
      }
    } catch (err) {
      console.log("erorr", err);
      yield put({ type: authActions.LOGIN_ERROR });
    }
  });
}

function* watchGetUsers() {
  yield takeEvery("GET_USERS_REQUEST", function* () {
    try {
      const token = yield select((state) => state.auth.token);
      let response = yield call(fetchUsers, token);

      if (response.status === 200) {
        yield put({
          type: authActions.GET_USERS_SUCCESS,
          payload: response.data,
        });
      } else {
        throw response;
      }
    } catch (err) {
      console.log("erorr", err);
    }
  });
}

export default function* authsaga() {
  yield all([fork(watchLoginRequest), fork(watchGetUsers)]);
}
