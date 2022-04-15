import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authAction from "../redux/auth/actions";

const { login } = authAction;

const Login = () => {
  const dispatch = useDispatch();

  return (
    <div>
      Login Page
      <button onClick={() => dispatch(login("something"))}>login</button>
    </div>
  );
};

export default Login;
