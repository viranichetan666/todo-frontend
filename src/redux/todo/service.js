import { setHeadersWithAccessToken } from "../axios";
import axios from "axios";

const api_url = process.env.REACT_APP_APIBASE;

export const fetchTodos = (auth) => {
  setHeadersWithAccessToken(auth);
  return axios.get(`${api_url}/tasks`);
};

export const fetchUsers = (auth) => {
  setHeadersWithAccessToken(auth);
  return axios.get(`${api_url}/users`);
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
  return axios.put(`${api_url}/tasks/${data._id}`, data);
};

export const deleteTodo = (auth, id) => {
  setHeadersWithAccessToken(auth);
  return axios.delete(`${api_url}/tasks/${id}`);
};

export const uploadTodo = (auth, data) => {
  setHeadersWithAccessToken(auth);
  return axios.post(`${api_url}/tasks/bulk-upload`, data);
};

export const assignTodo = (auth, data) => {
  setHeadersWithAccessToken(auth);
  return axios.put(`${api_url}/tasks/assign-task/${data.todoId}`, data);
};
