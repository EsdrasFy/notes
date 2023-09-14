import React, { useState } from "react";
import "./index.css";
import { BiLockAlt, BiUser } from "react-icons/bi";
import axios from "axios";
function FormLogin({ ShowRegisterOrLogin }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://back-notes-fen6.onrender.com/req/login",
        {
          username: username,
          password: password,
        }
      );

      const data = response.data;
      const token = data.token;

      localStorage.setItem("tokenLogin", token);
      localStorage.setItem("username", username);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };
  return (
    <>
      <div className="form-box login">
        <h2 className="animation">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box animation">
            <input
              type="text"
              required
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
            <BiUser className="iconLogin" />
          </div>
          <div className="input-box animation">
            <input
              type="password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <BiLockAlt className="iconLogin" />
          </div>
          <button type="submit" className="submitLogin animation">
            Sign Up
          </button>
          <div className="logreg-link animation">
            <p>
              Don't you have an account? {""}
              <a href="#a" className="loginlink" onClick={ShowRegisterOrLogin}>
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="info-text login">
        <h2>Welcome Back!</h2>
        <p>Join us in simplifying your life, one task at a time.</p>
      </div>
    </>
  );
}

export default FormLogin;
