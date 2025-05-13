import React from "react";
import { Link } from "react-router-dom";
import LogInOut from "../context/LogInOut"; // Asegúrate de que la ruta sea correcta

const BarraNavegacion = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/anadirTareas"
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
