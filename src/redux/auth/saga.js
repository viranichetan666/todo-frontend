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

function* watchLoginRequest() {
  yield takeEvery("LOGIN_REQUEST", function* (data) {
    try {
      const response = yield call(userLogin, data.data);

      if (response.status === 201) {
        yield put({
          type: authActions.LOGIN_SUCCESS,
          token: response.data.token,
          user: {
            email: response.data.user.email,
            name: 'John Doe',
            isAdmin: true,
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

export default function* authsaga() {
  yield all([fork(watchLoginRequest)]);
}
