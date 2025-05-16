// src/context/LogOut.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import Cerrado from "./cerrado.jsx"; // Asegúrate de que la ruta sea correcta

function LogOut() {
  const { nombre, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("Nombre:", nombre);

  const handleLogout = () => {
    logout();
    navigate("./LogIn"); // Redirige a la ruta del componente Cerrado
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline-danger">
      Cerrar sesión
    </button>
  );
}

export default LogOut;
