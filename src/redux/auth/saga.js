import {
  all,
  fork,
  put,
  select,
  takeEvery,
} from "redux-saga/effects";
import authActions from "./actions";
import { push } from "react-router-redux";
import AuthApi from "./../../services/auth.service";
import TaskApi from "./../../services/task.service";

function* watchLoginRequest() {
  yield takeEvery(authActions.LOGIN_REQUEST, function* (data) {
    try {
      const authApi = new AuthApi(null);
      const response = yield authApi.userLogin(data.data);
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
        yield put(push("/dashboard"));
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
  yield takeEvery(authActions.GET_USERS_REQUEST, function* () {
    try {
      const token = yield select((state) => state.auth.token);
      const taskApi = new TaskApi(token);
      const response = yield taskApi.fetchUsers();

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
