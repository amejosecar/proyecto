import React from "react";
import { Link } from "react-router-dom";
import LogInOut from "../context/LogInOut"; // Asegúrate de que la ruta sea correcta

const BarraNavegacion = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/app" className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/AnadirTareas"
                className="nav-link active"
                aria-current="page"
              >
                Añadir Tareas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/consultarTareas" className="nav-link">
                Consultar Tareas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mensajero" className="nav-link">
                Mensajero
              </Link>
            </li>
            {/* ... otros elementos del menú ... */}
          </ul>

          <div className="d-flex align-items-center">
            <LogInOut />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;
