// src/components/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get credentials from environment variables
    const storedEmail = process.env.REACT_APP_USERNAME;
    const storedPassword = process.env.REACT_APP_PASSWORD;

    if (
      email.trim() === storedEmail.trim() &&
      password.trim() === storedPassword.trim()
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin/workflow");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin-login">
      <div className="login-box">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
