// src/contexts/AuthProvider.jsx
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Recupera el usuario activo (si existe) desde localStorage
  const storedAuth = localStorage.getItem("authState");
  const initialAuthState = storedAuth
    ? JSON.parse(storedAuth)
    : { nombre: null, email: null, edad: null, tipoUsuario: null };

  const [authState, setAuthState] = useState(initialAuthState);
  // Estado para manejar errores globales de autenticación
  const [authError, setAuthError] = useState("");

  const login = (userData) => {
    setAuthState(userData);
    localStorage.setItem("authState", JSON.stringify(userData));
    setAuthError(""); // Limpia cualquier error previo al iniciar sesión
  };

  const logout = () => {
    const newState = {
      nombre: null,
      email: null,
      edad: null,
      tipoUsuario: null,
    };
    setAuthState(newState);
    localStorage.removeItem("authState");
    setAuthError(""); // Limpia los errores al cerrar sesión
  };

  // Función para actualizar la información del usuario
  const updateUser = (updatedData) => {
    const updatedUser = { ...authState, ...updatedData };
    setAuthState(updatedUser);
    localStorage.setItem("authState", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser, // Se expone la función para actualizar el usuario
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
