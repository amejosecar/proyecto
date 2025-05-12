import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const contexto = useContext(AuthContext);
  const navigate = useNavigate();
  const annadeUsuario = (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const email = e.target.email.value;
    const edad = e.target.edad.value;
    const password = e.target.password.value;

    console.log(nombre, email, parseInt(edad), password);

    contexto.nombre = nombre;
    contexto.email = email;
    contexto.edad = parseInt(edad);
    // Nota: En una aplicación real, nunca deberías almacenar la contraseña así
    console.log("Esto es lo que hay en el AuthContext", contexto);
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Log In</h1>
      <form onSubmit={annadeUsuario}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            aria-describedby="nombreHelp"
            required
          />
          <div id="nombreHelp" className="form-text">
            Introduce tu nombre completo
          </div>

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>

          <label htmlFor="edad" className="form-label">
            Edad
          </label>
          <input
            type="number"
            className="form-control"
            id="edad"
            aria-describedby="edadHelp"
            min="1"
            required
          />
          <div id="edadHelp" className="form-text">
            Necesitamos saber si eres mayor de edad
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            minLength="6"
            required
          />
          <div id="passwordHelp" className="form-text">
            La contraseña debe tener al menos 6 caracteres
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LogIn;
