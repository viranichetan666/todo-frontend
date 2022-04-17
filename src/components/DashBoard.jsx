import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/auth/actions";
import todoAction from "../redux/todo/actions";
import moment from "moment";

const {
  getAllTodos,
  requestEditTodo,
  requestAddTodo,
  requestDeleteTodo,
  requestUploadTodo,
} = todoAction;

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

  const handleLogout = () => {
    dispatch(authAction.logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getAllTodos());
    dispatch(getAllUsers());
  }, []);

  const handleUpload = (e) => {
    dispatch(requestUploadTodo());
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

  return (
    <div className="Dashboard__Container">
      <div className="Login__header">
        {isAdmin ? "WTD Admin" : "What TODO?"}?
      </div>
      <div className="Dashboard__header">
        <p>Welcome, {isAdmin ? "Admin" : "User"} !</p>
        <button className="Dashboard__btnLink" onClick={handleLogout}>
          Signout
        </button>
      </div>
      {isAdmin && (
        <div className="Dashboard__container">
          <label htmlFor="uploadbox" className="Dashboard__uploadBox">
            {uploadedFile ? uploadedFile.name : "Upload Todos"}
            <input
              type="file"
              name="upload"
              id="uploadbox"
              onChange={(e) => {
                console.log("e.target.files[0]", e.target.files[0]);
                setUploadedFile(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </label>
          <button
            onClick={() => {
              console.log("dsds", uploadedFile);
              const formData = new FormData();
              formData.append("tasks", uploadedFile);

              dispatch(todoAction.requestUploadTodo(formData));
              setUploadedFile(null);
            }}
            disabled={!uploadedFile}
          >
            Upload
          </button>
        </div>
      )}
      <div className="Todo__container">
        <div className="Todo__wrapper">
          <p>Title</p>
          <p>Due Date</p>
          <p>Status</p>
          <p>User</p>
          <p></p>
          <p></p>
        </div>
        {todos.map((todo) => (
          <form key={todo.id}>
            <div className="Todo__wrapper" key={todo.id}>
              {editTodo && editTodo._id === todo._id ? (
                <input
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
                    // value={editTodo.status}
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
              {editTodo && editTodo._id === todo._id ? (
                <>
                  <select name="assignee">
                    {allUsers.map((user) => (
                      <option value={user.id}>{user.email}</option>
                    ))}
                  </select>
                </>
              ) : (
                <p>static@dummy.com</p>
              )}

              {editTodo && editTodo._id === todo._id ? (
                <div>
                  <button type="submit" onClick={editHandler}>
                    Update
                  </button>
                  <button type="button" onClick={() => setEditTodo(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditTodo(todo)}>Edit</button>
              )}
              <button type="button" onClick={() => deleteHandler(todo._id)}>
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
