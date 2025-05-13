// src/context/LogOut.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function LogOut() {
  const { nombre, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/cerrado"); // Redirige a la ruta del componente Cerrado
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline-danger">
      Cerrar sesión ({nombre})
    </button>
  );
}

export default LogOut;
