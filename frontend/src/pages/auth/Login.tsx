import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logIn } from "../../redux/slices/authSlice";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logIn(formData));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Logging in..." : "Log In"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
