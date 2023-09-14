import React, { useState, useEffect } from "react";
import "./index.css";
import { BiEnvelope, BiLockAlt, BiUser } from "react-icons/bi";
import axios from "axios";

function Register({ ShowRegisterOrLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Adicione uma variável para controlar o envio

  useEffect(() => {
    // Quando isSubmitting for definido como false, reative o botão de registro
    if (!isSubmitting) {
      setLoading(false);
    }
  }, [isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSubmitting) {
        // Se já estiver enviando, não faça nada
        return;
      }

      setIsSubmitting(true); // Defina isSubmitting como true para bloquear envios adicionais
      setLoading(true);

      await axios.post("https://back-notes-fen6.onrender.com/register", {
        username: username,
        email: email,
        password: password,
      });
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
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);

      ShowRegisterOrLogin();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setError("Erro ao registrar usuário.");
    } finally {
      setLoading(false);
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
          <button
            type="submit"
            className="nada2"
            style={{ color: "#fff" }}
            disabled={isSubmitting}
          >
            {loading ? (
              <span className="loading"></span>
            ) : (
              <>
                {" "}
                <span>Sign Up</span>
                <i></i>
              </>
            )}
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
