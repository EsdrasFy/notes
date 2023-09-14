import React, { useEffect, useState } from "react";
import "./global.css";
import "./app.css";
import "./main.css";
import Todo from "./Components/Todo";
import Login from "./Components/Login";
import FormTodo from "./Components/FormTodo";
import HourAndDate from "./Components/HourAndDate";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("tokenLogin") || null
  );
  useEffect(() => {
    // Verifique o localStorage continuamente para atualizações a cada 1 segundo (ou o intervalo desejado)
    const checkLocalStorage = setInterval(() => {
      const storedToken = localStorage.getItem("tokenLogin");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    }, 1000); // Verificar a cada 1 segundo (1000 milissegundos)

    // Certifique-se de limpar o intervalo quando o componente for desmontado
    return () => {
      clearInterval(checkLocalStorage);
    };
  }, [token]);
  return <>{token ? <Todo /> : <Login />}</>;
  // return <HourAndDate/>
}

export default App;
