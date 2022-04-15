import { setHeadersWithAccessToken } from "../index";

const API_BASE = process.env.REACT_APP_APIBASE;

export const fetchTodos = (auth) => {
  setHeadersWithAccessToken(auth);
  return {
    status: 200,
    data: {
      todos: [
        {
          id: 1,
          title: "Value 1",
          dueDate: "value 2",
          status: true,
          user: "john doe",
        },
        {
          id: 2,
          title: "Value 1",
          dueDate: "value 2",
          status: true,
          user: "john doe",
        },
        {
          id: 3,
          title: "Value 1",
          dueDate: "value 2",
          status: false,
          user: "King doe",
        },
      ],
    },
  };
};

export const addTodo = (auth, data) => {
  setHeadersWithAccessToken(auth);
  return {
    status: 200,
    data: {
      message: "todo added",
    },
  };
};

export const editTodo = (auth, data) => {
  setHeadersWithAccessToken(auth);
  return {
    status: 200,
    data: {
      message: "todo edited",
    },
  };
};

export const deleteTodo = (auth, id) => {
  setHeadersWithAccessToken(auth);
  return {
    status: 200,
    data: {
      message: "todo deleted",
    },
  };
};

export const uploadTodo = (auth, id) => {
  setHeadersWithAccessToken(auth);
  return {
    status: 200,
    data: {
      message: "todo uploaded",
    },
  };
};
