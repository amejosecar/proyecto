// src/components/BarraNavegacion.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
// Si tienes LogOut u otro componente, inclúyelo según corresponda.

const BarraNavegacion = ({ setShowEditModal }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
            <Nav.Link
              as={Link}
              to="/anadirTareas"
              className="nav-link active"
              aria-current="page"
            >
              Añadir Tareas
            </Nav.Link>
            <Nav.Link as={Link} to="/consultarTareas" className="nav-link">
              Consultar Tareas
            </Nav.Link>
            <Nav.Link as={Link} to="/mensajero" className="nav-link">
              Mensajero
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown title="Mi perfil" id="perfil-dropdown" align="end">
              <NavDropdown.Item onClick={() => setShowEditModal(true)}>
                Editar mi perfil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/cerrado">
                Salida
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* Aquí podrías seguir mostrando otros elementos si es necesario */}
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;
