import React, { useState } from "react";
import "./index.css";
import Register from "../Register";
import FormLogin from "../FormLogin";

function Login() {
  const [showRegister, setShowState] = useState(false);
  const ShowRegisterOrLogin = () => {
    setShowState(!showRegister);
  };

  return (
    <section className="sectionLogin">
      <div class="wrapperLogin">
        <span
          className={`${showRegister ? "bg-animate2" : "bg-animate"}`}
        ></span>
        {showRegister ? (
          <Register
            showRegister={showRegister}
            ShowRegisterOrLogin={ShowRegisterOrLogin}
          />
        ) : (
          <FormLogin
            showRegister={showRegister}
            ShowRegisterOrLogin={ShowRegisterOrLogin}
          />
        )}
      </div>
    </section>
  );
}

export default Login;

//
