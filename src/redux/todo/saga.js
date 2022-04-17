import {
  all,
  fork,
  put,
  select,
  takeEvery,
  call,
  delay,
} from "redux-saga/effects";
import todoAction from "./actions";
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodos,
  fetchUsers,
  assignTodo,
  uploadTodo,
} from "./service";

function* watchFetchTodos() {
  yield takeEvery("FETCH_TODOS_REQUEST", function* () {
    try {
      const token = yield select((state) => state.auth.token);
      let response = yield call(fetchTodos, token);

      if (response.status === 200) {
        yield put({
          type: todoAction.FETCH_TODOS_SUCCESS,
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

function* watchAddTodo() {
  yield takeEvery("ADD_TODO_REQUEST", function* (data) {
    try {
      const token = yield select((state) => state.auth.token);
      let response = yield call(addTodo, token, data);

      if (response.status === 200) {
        yield put({
          type: todoAction.ADD_TODO_SUCCESS,
        });
      } else {
        throw response;
      }
    } catch (err) {
      console.log("erorr", err);
    }
  });
}

function* watchEditTodo() {
  yield takeEvery("EDIT_TODO_REQUEST", function* ({ data }) {
    try {
      const token = yield select((state) => state.auth.token);

      let response = yield call(editTodo, token, data);

      if (response.status === 200) {
        yield put({
          type: todoAction.EDIT_TODO_SUCCESS,
        });
        yield put({ type: todoAction.FETCH_TODOS_REQUEST });
      } else {
        throw response;
      }
    } catch (err) {
      console.log("erorr", err);
    }
  });
}

function* watchDeleteTodo() {
  yield takeEvery("DELETE_TODO_REQUEST", function* ({ data }) {
    try {
      const token = yield select((state) => state.auth.token);

      let response = yield call(deleteTodo, token, data);

      if (response.status === 200) {
        yield put({
          type: todoAction.DELETE_TODO_SUCCESS,
        });
        yield put({
          type: todoAction.FETCH_TODOS_REQUEST,
        });
      } else {
        throw response;
      }
    } catch (err) {
      console.log("erorr", err);
    }
  });
}

function* watchUploadTodo() {
  yield takeEvery("UPLOAD_TODO_REQUEST", function* ({ data }) {
    try {
      const token = yield select((state) => state.auth.token);
      let response = yield call(uploadTodo, token, data);

      if (response.status === 201) {
        yield put({ type: todoAction.UPLOAD_TODO_SUCCESS });
        yield put({ type: todoAction.FETCH_TODOS_REQUEST });
      } else {
        throw response;
      }
    } catch (err) {
      console.log("erorr", err);
    }
  });
}

function* watchAssignTodo() {
  yield takeEvery("ASSIGN_TODO_REQUEST", function* ({ data }) {
    try {
      const token = yield select((state) => state.auth.token);
      let response = yield call(assignTodo, token, data);

      if (response.status === 200) {
        yield put({ type: todoAction.ASSIGN_TODO_SUCCESS });
        yield put({ type: todoAction.FETCH_TODOS_REQUEST });
      } else {
        throw response;
      }
    } catch (err) {
      console.log("erorr", err);
    }
  });
}

export default function* authsaga() {
  yield all([
    fork(watchFetchTodos),
    fork(watchDeleteTodo),
    fork(watchAddTodo),
    fork(watchEditTodo),
    fork(watchUploadTodo),
    fork(watchAssignTodo),
  ]);
}
