import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AllProvider } from "./contexts/AllContexts/AllContexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AllProvider>
    <App />
  </AllProvider>
);
