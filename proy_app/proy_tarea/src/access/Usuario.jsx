// src/components/Usuario.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Alert } from "react-bootstrap";
import TarjetaUsuario from "./TarjetaUsuario";

const Usuario = () => {
  // Estado inicial para el formulario de edición
  const initialFormData = {
    nombre: "",
    email: "",
    edad: "",
    password: "",
    tipoUsuario: "",
    active: true,
  };

  // Estados para el listado y gestión de usuarios
  const [users, setUsers] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [errors, setErrors] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [editFormData, setEditFormData] = useState(initialFormData);

  // Cargar usuarios desde localStorage al montar el componente
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const fetchedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    const updatedUsers = fetchedUsers.map((user) => {
      if (typeof user.active === "undefined") {
        user.active = true;
      }
      return user;
    });
    setUsers(updatedUsers);
  }, []);

  // Función para sincronizar cambios en localStorage
  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Abre el modal llenándolo con la información del usuario seleccionado
  const handleEditClick = (index) => {
    setSelectedUserIndex(index);
    setEditFormData({ ...users[index] });
    setShowEditModal(true);
    setErrors({});
    setMensaje(null);
  };

  // Maneja el submit del formulario de edición
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!editFormData.nombre.trim()) {
      newErrors.nombre = "Campo no debe estar vacío";
    }
    if (!editFormData.email.trim()) {
      newErrors.email = "Campo no debe estar vacío";
    }
    if (!editFormData.edad.toString().trim()) {
      newErrors.edad = "Campo no debe estar vacío";
    }
    if (!editFormData.password.trim()) {
      newErrors.password = "Campo no debe estar vacío";
    }
    if (!editFormData.tipoUsuario.trim()) {
      newErrors.tipoUsuario = "Campo no debe estar vacío";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Verificar si el email se modificó para evitar duplicados
    const emailChanged = editFormData.email !== users[selectedUserIndex].email;
    if (emailChanged) {
      const duplicate = users.some(
        (user, i) =>
          user.email === editFormData.email && i !== selectedUserIndex
      );
      if (duplicate) {
        setErrors({ email: "El usuario con ese email ya existe." });
        return;
      }
    }

    const updatedUsers = [...users];
    const parsedEdad = parseInt(editFormData.edad, 10);
    updatedUsers[selectedUserIndex] = { ...editFormData, edad: parsedEdad };

    setUsers(updatedUsers);
    updateLocalStorage(updatedUsers);
    setMensaje({ texto: "Usuario modificado correctamente", tipo: "success" });

    setTimeout(() => {
      setShowEditModal(false);
      setMensaje(null);
      setErrors({});
    }, 1500);
  };

  // Cierra el modal sin guardar cambios
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setErrors({});
    setMensaje(null);
  };

  // Alterna el estado activo/inactivo del usuario
  const handleToggleActive = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].active = !updatedUsers[index].active;
    setUsers(updatedUsers);
    updateLocalStorage(updatedUsers);
  };

  // Elimina al usuario
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    updateLocalStorage(updatedUsers);
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-center mb-4">Gestión de Usuarios</h2>
          {mensaje && (
            <Alert variant={mensaje.tipo === "success" ? "success" : "danger"}>
              {mensaje.texto}
            </Alert>
          )}
          <Table bordered style={{ borderColor: "#000" }}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Tipo de Usuario</th>
                <th>Estado</th>
                <th className="text-center">Editar</th>
                <th className="text-center">Activar/Desactivar</th>
                <th className="text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const rowStyle = {
                  backgroundColor: index % 2 === 0 ? "white" : "#add8e6",
                };
                return (
                  <tr key={index} style={rowStyle}>
                    <td>{user.nombre}</td>
                    <td>{user.email}</td>
                    <td>{user.edad}</td>
                    <td>{user.tipoUsuario}</td>
                    <td>{user.active ? "Activo" : "Inactivo"}</td>
                    <td className="text-center">
                      <Button
                        style={{
                          backgroundColor: "#177245",
                          borderColor: "#177245",
                        }}
                        size="sm"
                        onClick={() => handleEditClick(index)}
                      >
                        Editar
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        style={{
                          backgroundColor: "#6c757d",
                          borderColor: "#6c757d",
                        }}
                        size="sm"
                        onClick={() => handleToggleActive(index)}
                      >
                        {user.active ? "Desactivar" : "Activar"}
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        style={{
                          backgroundColor: "red",
                          borderColor: "red",
                        }}
                        size="sm"
                        onClick={() => handleDelete(index)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal de edición extraído a TarjetaUsuario */}
      <TarjetaUsuario
        show={showEditModal}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        errors={errors}
      />
    </Container>
  );
};

export default Usuario;
