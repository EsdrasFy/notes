import React, { useState } from "react";
import "./index.css";
import { BiLockAlt, BiUser } from "react-icons/bi";
import axios from "axios";

function FormLogin({ ShowRegisterOrLogin }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMsg(error.response.data.msg);
      } else {
        console.log("Erro desconhecido:", error.message);
      }
    } finally {
      setLoading(false);
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
          {errorMsg && <p className="error-message">{errorMsg}</p>}
          <button className="nada animation" type="submit" disabled={loading}>
            {loading ? <span className="loading"></span> : <span>Enter</span>}
            <i></i>
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
