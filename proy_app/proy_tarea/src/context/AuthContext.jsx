// src/context/AuthContext.jsx
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    nombre: null,
    edad: null,
    email: null,
  });

  const login = (userData) => {
    setAuthState(userData);
  };

  const logout = () => {
    setAuthState({ nombre: null, edad: null, email: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // Añade esto
