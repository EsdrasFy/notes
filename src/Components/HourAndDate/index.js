import React, { useState, useEffect } from "react";
import "./index.css";

function HourAndDate() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Atualiza a hora e a data a cada segundo
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Exibe em formato 24 horas
  };

  const dayOfWeek = currentDateTime.toLocaleDateString("pt-BR", {
    weekday: "long",
  });
  const month = currentDateTime.toLocaleDateString("pt-BR", { month: "short" });
  const day = currentDateTime.getDate();

  const formattedDate = `${dayOfWeek}, ${month} ${day}`;

  const formattedTime = currentDateTime.toLocaleTimeString(
    "pt-BR",
    optionsTime
  );

  return (
    <div className="hourAndDate">
      <h1>{formattedTime}</h1>
      <p>{formattedDate.toUpperCase()}</p>
    </div>
  );
}

export default HourAndDate;
