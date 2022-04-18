import HttpClient from "./index";

class TaskApi extends HttpClient {
  constructor(token = null) {
    super(process.env.REACT_APP_APIBASE, token);
  }

  async fetchTodos() {
    return await this.instance.get(`/tasks`);
  }
  async fetchUsers() {
    return await this.instance.get(`/users`);
  }
  async editTodo(data) {
    return await this.instance.put(`/tasks/${data._id}`, data);
  }
  async deleteTodo(id) {
    return await this.instance.delete(`/tasks/${id}`);
  }
  async uploadTodo(data) {
    return await this.instance.post(`/tasks/bulk-upload`, data);
  }
  async assignTodo(data) {
    return await this.instance.put(`/tasks/assign-task/${data.todoId}`, data);
  }
}

export default TaskApi;
