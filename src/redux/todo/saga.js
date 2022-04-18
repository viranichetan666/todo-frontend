import {
  all,
  fork,
  put,
  select,
  takeEvery,
} from "redux-saga/effects";
import todoAction from "./actions";

import TaskApi from "./../../services/task.service";

function* watchFetchTodos() {
  yield takeEvery(todoAction.FETCH_TODOS_REQUEST, function* () {
    try {
      const token = yield select((state) => state.auth.token);
      const taskApi = new TaskApi(token);
      const response = yield taskApi.fetchTodos();

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

// function* watchAddTodo() {
//   yield takeEvery("ADD_TODO_REQUEST", function* (data) {
//     try {
//       const token = yield select((state) => state.auth.token);
//       const taskApi = new TaskApi(token);
//       const response = yield taskApi.addTodo(data);
//       if (response.status === 200) {
//         yield put({
//           type: todoAction.ADD_TODO_SUCCESS,
//         });
//       } else {
//         throw response;
//       }
//     } catch (err) {
//       console.log("erorr", err);
//     }
//   });
// }

function* watchEditTodo() {
  yield takeEvery(todoAction.EDIT_TODO_REQUEST, function* ({ data }) {
    try {
      const token = yield select((state) => state.auth.token);

      const taskApi = new TaskApi(token);
      const response = yield taskApi.editTodo(data);
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
  yield takeEvery(todoAction.DELETE_TODO_REQUEST, function* ({ data }) {
    try {
      const token = yield select((state) => state.auth.token);

      const taskApi = new TaskApi(token);
      const response = yield taskApi.deleteTodo(data);
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
  yield takeEvery(todoAction.UPLOAD_TODO_REQUEST, function* ({ data }) {
    try {
      const token = yield select((state) => state.auth.token);
      const taskApi = new TaskApi(token);
      const response = yield taskApi.uploadTodo(data);
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
  yield takeEvery(todoAction.ASSIGN_TODO_REQUEST, function* ({ data }) {
    try {
      const token = yield select((state) => state.auth.token);
      const taskApi = new TaskApi(token);
      const response = yield taskApi.assignTodo(data);
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
    // fork(watchAddTodo),
    fork(watchEditTodo),
    fork(watchUploadTodo),
    fork(watchAssignTodo),
  ]);
}
