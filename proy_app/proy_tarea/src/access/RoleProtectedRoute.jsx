// ./access/RoleProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function RoleProtectedRoute({ allowedRoles, children }) {
  const { tipoUsuario } = useContext(AuthContext);

  // Si no hay un usuario autenticado o el rol no está permitido, redirige a /login
  if (!tipoUsuario || !allowedRoles.includes(tipoUsuario)) {
    return <Navigate to="/LogIn" replace />;
  }

  return children;
}

export default RoleProtectedRoute;
