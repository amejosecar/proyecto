import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importa el JS de Bootstrap

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
