// src/components/BarraNavegacion.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import { NAV_ITEMS } from "../access/rolesConfig";

const BarraNavegacion = ({ setShowEditModal }) => {
  // Obtenemos el tipo de usuario del contexto
  const { tipoUsuario } = useContext(AuthContext);

  // Filtramos los elementos permitidos para el rol actual
  const filteredNavItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(tipoUsuario)
  );

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
            {filteredNavItems.map((item) => (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.path}
                className="nav-link"
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown title="Mi perfil" id="perfil-dropdown" align="end">
              <NavDropdown.Item onClick={() => setShowEditModal(true)}>
                Editar mi perfil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/LogIn">
                Salida
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;
