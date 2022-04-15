import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/auth/actions";
import todoAction from "../redux/todo/actions";

const { getAllTodos, requestEditTodo, requestAddTodo, requestDeleteTodo } =
  todoAction;

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user: { isAdmin },
  } = useSelector((state) => state.auth);

  const { todos } = useSelector((state) => state.todo);

  const handleLogout = () => {
    dispatch(authAction.logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  const handleUpload = (e) => {
    console.log(e);
  };

  const editHandler = (data) => dispatch(requestEditTodo(data));
  const deleteHandler = (id) => dispatch(requestDeleteTodo(id));

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
          <label className="Dashboard__uploadBox">Upload Todos</label>
          <label htmlFor="uploadbox">icon</label>
          <input
            type="file"
            name="upload"
            id="uploadbox"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
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
          <div className="Todo__wrapper" key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.dueDate}</p>
            <p>{todo.status ? "done" : "not done"}</p>
            <p>{todo.user}</p>
            <button onClick={editHandler.bind(todo)}>Edit</button>
            <button onClick={deleteHandler.bind(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
