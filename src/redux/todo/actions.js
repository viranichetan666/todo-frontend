const todoAction = {
  FETCH_TODOS_REQUEST: "FETCH_TODOS_REQUEST",
  FETCH_TODOS_SUCCESS: "FETCH_TODOS_SUCCESS",
  ADD_TODO_REQUEST: "ADD_TODO_REQUEST",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  EDIT_TODO_REQUEST: "EDIT_TODO_REQUEST",
  EDIT_TODO_SUCCESS: "EDIT_TODO_SUCCESS",
  DELETE_TODO_REQUEST: "DELETE_TODO_REQUEST",
  DELETE_TODO_SUCCESS: "DELETE_TODO_SUCCESS",
  UPLOAD_TODO_REQUEST: "UPLOAD_TODO_REQUEST",
  UPLOAD_TODO_SUCCESS: "UPLOAD_TODO_SUCCESS",
  ASSIGN_TODO_REQUEST: "ASSIGN_TODO_REQUEST",
  ASSIGN_TODO_SUCCESS: "ASSIGN_TODO_SUCCESS",

  getAllTodos: () => {
    return {
      type: todoAction.FETCH_TODOS_REQUEST,
    };
  },
  requestAddTodo: (data) => ({
    type: todoAction.ADD_TODO_REQUEST,
    data,
  }),
  requestEditTodo: (data) => ({
    type: todoAction.EDIT_TODO_REQUEST,
    data,
  }),
  requestDeleteTodo: (data) => ({
    type: todoAction.DELETE_TODO_REQUEST,
    data,
  }),
  requestUploadTodo: (data) => ({
    type: todoAction.UPLOAD_TODO_REQUEST,
    data,
  }),
  assignTodo: (data) => ({
    type: todoAction.ASSIGN_TODO_REQUEST,
    data,
  }),
};

export default todoAction;
