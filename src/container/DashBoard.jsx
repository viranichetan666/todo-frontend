import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/auth/actions";
import todoAction from "../redux/todo/actions";
import moment from "moment";

const { getAllTodos, requestEditTodo, requestDeleteTodo, requestUploadTodo } =
  todoAction;

const { getAllUsers } = authAction;

const DashBoard = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editTodo, setEditTodo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user: { isAdmin },
  } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todo);
  const { allUsers } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllTodos());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(authAction.logout());
    navigate("/login");
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("tasks", uploadedFile);
    dispatch(requestUploadTodo(formData));
    setUploadedFile(null);
  };

  const editHandler = () => {
    dispatch(requestEditTodo(editTodo));
    setEditTodo(null);
  };

  const deleteHandler = (id) => dispatch(requestDeleteTodo(id));

  const handleOnChange = (e) => {
    setEditTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAssign = (e, todoId) => {
    dispatch(todoAction.assignTodo({ todoId, user: e.target.value || null }));
  };

  return (
    <div className="dashboard_main__container">
      <div className="login__header">
        {isAdmin ? "WTD Admin" : "What TODO?"}?
      </div>
      <div className="dashboard__header">
        <p>Welcome, {isAdmin ? "Admin" : "User"} !</p>
        <button className="dashboard__btn_link" onClick={handleLogout}>
          Signout
        </button>
      </div>
      {isAdmin && (
        <div className="dashboard__container">
          <label htmlFor="uploadbox" className="dashboard__uploadBox">
            {uploadedFile ? uploadedFile.name : "Upload Todos"}
            <input
              type="file"
              name="upload"
              id="uploadbox"
              onChange={(e) => {
                console.log("e",e)
                setUploadedFile(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </label>
          <button onClick={handleUpload} disabled={!uploadedFile}>
            Upload
          </button>
        </div>
      )}
      <div className="todo__container">
        <div className="todo__wrapper todo__table_header">
          <p>Title</p>
          <p>Due Date</p>
          <p>Status</p>
          <p>User</p>
          <p></p>
        </div>
        {todos.map((todo) => (
          <form key={todo._id}>
            <div className="todo__wrapper" key={todo.id}>
              {editTodo && editTodo._id === todo._id ? (
                <input
                  className="todo__form_input"
                  type="text"
                  id="title"
                  name="title"
                  value={editTodo.title}
                  onChange={handleOnChange}
                ></input>
              ) : (
                <p>{todo.title}</p>
              )}
              <p>
                {editTodo && editTodo._id === todo._id ? (
                  <input
                    className="todo__form_input"
                    type="date"
                    value={moment(editTodo.dueDate).format("YYYY-MM-DD")}
                    name="dueDate"
                    onChange={handleOnChange}
                  />
                ) : (
                  moment(todo.dueDate).format("L")
                )}
              </p>
              {editTodo && editTodo._id === todo._id ? (
                <div>
                  completed
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={editTodo.status === "completed"}
                    onChange={(e) =>
                      setEditTodo((prev) => ({
                        ...prev,
                        status: e.target.checked ? "completed" : "pending",
                      }))
                    }
                  ></input>
                </div>
              ) : (
                <p>{todo.status}</p>
              )}
              <select
                name="assignee"
                onChange={(e) => handleAssign(e, todo._id)}
                value={allUsers.find((u) => u._id === todo.user)?._id || ""}
              >
                <option value="">Not Assigned</option>
                {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.email}
                  </option>
                ))}
              </select>

              {editTodo && editTodo._id === todo._id ? (
                <div>
                  <button type="button" onClick={editHandler} style={{marginRight: 10}}>
                    Update
                  </button>
                  <button type="button" onClick={() => setEditTodo(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <button type="button" onClick={() => setEditTodo(todo)} style={{marginRight: 10}}>Edit</button>
                  <button type="button" onClick={() => deleteHandler(todo._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
