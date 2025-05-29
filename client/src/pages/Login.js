
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("user", "sampleUser");
    navigate("/home");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Click to Login</button>
    </div>
  );
};

export default Login;
