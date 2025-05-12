import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const LogInOut = () => {
  const { nombre, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return nombre ? (
    <button onClick={logout} className="btn btn-outline-danger">
      Cerrar sesión
    </button>
  ) : (
    <button onClick={() => navigate("/login")} className="btn btn-primary">
      Iniciar sesión
    </button>
  );
};

export default LogInOut;
