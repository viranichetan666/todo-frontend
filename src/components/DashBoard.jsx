import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import authAction from "../redux/auth/actions";

const { logout } = authAction;

const DashBoard = () => {
  const dispatch = useDispatch();

  return (
    <div>
      Hello from Dashboard
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
};

export default DashBoard;
