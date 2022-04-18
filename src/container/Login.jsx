import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authAction from "../redux/auth/actions";

const { login } = authAction;

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("enter valid details");
    }
    dispatch(login({ ...formData }));
  };

  const handleOnChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  return (
    <div className="login__container">
      <div className="login__wrapper">
        <div className="login__header">User Login</div>
        <form className="login__form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleOnChange}
            value={formData.email}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleOnChange}
            value={formData.password}
          />
          <button type="submit">Click to Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
