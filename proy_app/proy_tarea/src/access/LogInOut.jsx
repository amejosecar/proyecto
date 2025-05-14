// src/context/LogInOut.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LogInOut = () => {
  const { nombre, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return nombre ? (
    <button onClick={handleLogout} className="btn btn-outline-danger">
      Cerrar sesión
    </button>
  ) : (
    <button onClick={() => navigate("/login")} className="btn btn-primary">
      Iniciar sesión
    </button>
  );
};

export default LogInOut;
