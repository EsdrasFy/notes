import React, { useState } from "react";
import "./index.css";
import { BiEnvelope, BiLockAlt, BiUser } from "react-icons/bi";
import axios from "axios";

function Register({ ShowRegisterOrLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // Estado para lidar com erros

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://back-notes-fen6.onrender.com/register", {
        username: username,
        email: email,
        password: password,
      });
      // Lidar com o registro bem-sucedido, por exemplo, redirecionar para a página de login
      ShowRegisterOrLogin(); // Função para alternar entre registro e login
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setError("Erro ao registrar usuário."); // Defina a mensagem de erro
    }
  };

  return (
    <>
      <div className="form-box register">
        <h2>Sign Up</h2>
        <form action="#" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
            <BiUser className="iconLogin" />
          </div>
          <div className="input-box">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
            <BiEnvelope className="iconLogin" />
          </div>
          <div className="input-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <BiLockAlt className="iconLogin" />
          </div>
          <button type="submit" className="submitLogin">
            Sign Up
          </button>
          {error && <p className="error-message">{error}</p>}{" "}
          <div className="logreg-link">
            <p>
              Already have an account?{" "}
              <a href="#a" className="loginlink" onClick={ShowRegisterOrLogin}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="info-text register">
        <h2>Welcome!</h2>
        <p>Ready to tackle your tasks and achieve more? Let's dive in!</p>
      </div>
    </>
  );
}

export default Register;
