// src/access/editarPerfil.jsx
import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Mensajes from "../components/mensajes"; // Ajusta la ruta según tu estructura
import AuthContext from "../context/AuthContext";

function EditarPerfil({ showModal, handleClose }) {
  const { nombre, email, edad, password, tipoUsuario, updateUser } =
    useContext(AuthContext);

  // Estado inicial del formulario
  const initialFormData = {
    nombre: nombre || "",
    email: email || "",
    edad: edad || "",
    password: password || "",
    tipoUsuario: tipoUsuario || "",
  };
  const originalEmail = initialFormData.email;

  // Recupera el password original desde localStorage (si existe)
  // Esto es para evitar el problema en el que el password viene vacío en el contexto
  let initialOriginalPassword = password; // valor por defecto si no se encuentra en storage
  const storedUsersRaw = localStorage.getItem("users");
  if (storedUsersRaw) {
    const users = JSON.parse(storedUsersRaw);
    const foundUser = users.find((u) => u.email === originalEmail);
    if (foundUser && foundUser.password !== undefined) {
      initialOriginalPassword = foundUser.password;
    }
  }

  // Guarda el password original para usarlo en caso de desactivar la edición.
  const [originalPassword, setOriginalPassword] = useState(
    initialOriginalPassword
  );
  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState(null);
  const [validated, setValidated] = useState(false);
  const [allowPasswordEdit, setAllowPasswordEdit] = useState(false); // Estado para activar edición

  useEffect(() => {
    console.log("EditarPerfil modal loaded");
    console.log("Información recuperada para el formulario:", initialFormData);
  }, [initialFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    const { nombre, email, edad, password, tipoUsuario } = formData;
    const parsedEdad = parseInt(edad, 10);

    // Si el usuario no desea editar la contraseña, se conserva el original.
    const finalPassword = allowPasswordEdit ? password : originalPassword;

    // Recupera la lista de usuarios desde localStorage
    const storedUsers = localStorage.getItem("users");
    let users = storedUsers ? JSON.parse(storedUsers) : [];

    if (email !== originalEmail) {
      const emailExists = users.some((user) => user.email === email);
      if (emailExists) {
        setMensaje({
          texto: "El email ingresado ya está en uso por otro usuario.",
          tipo: "danger",
        });
        console.log("El email ya está en uso");
        return;
      }
    }

    const updatedUsers = users.map((user) =>
      user.email === originalEmail
        ? {
            nombre,
            email,
            edad: parsedEdad,
            password: finalPassword,
            tipoUsuario,
          }
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log("Perfil actualizado:", updatedUsers);

    setMensaje({
      texto: "Perfil actualizado correctamente.",
      tipo: "success",
    });

    if (typeof updateUser === "function") {
      updateUser({
        nombre,
        email,
        edad: parsedEdad,
        password: finalPassword,
        tipoUsuario,
      });
    }

    handleClose(); // Cierra el modal sin navegar
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#D9E4DD", color: "#6D6875" }} // Color pastel
      >
        <Modal.Title>Editar Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#FFFAF0" }}>
        {mensaje && (
          <Mensajes
            show={true}
            mensaje={mensaje.texto}
            tipo={mensaje.tipo}
            onClose={() => setMensaje(null)}
            modo="toast"
          />
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* Primera fila: Nombre y Email */}
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="nombre">
              <Form.Label style={{ color: "#6D6875" }}>
                Nombre completo
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu nombre completo"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                style={{ borderColor: "#FFCDB2", backgroundColor: "#FFFAF0" }}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="email">
              <Form.Label style={{ color: "#6D6875" }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Introduce tu email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={{ borderColor: "#FFCDB2", backgroundColor: "#FFFAF0" }}
              />
            </Form.Group>
          </Row>

          {/* Segunda fila: Edad, Password y Tipo de Usuario */}
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="edad">
              <Form.Label style={{ color: "#6D6875" }}>Edad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa tu edad"
                min="1"
                required
                value={formData.edad}
                onChange={(e) =>
                  setFormData({ ...formData, edad: e.target.value })
                }
                style={{ borderColor: "#FFCDB2", backgroundColor: "#FFFAF0" }}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="password">
              <Form.Label style={{ color: "#6D6875" }}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                minLength="6"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={!allowPasswordEdit}
                style={{
                  borderColor: "#FFCDB2",
                  backgroundColor: allowPasswordEdit ? "#FFFAF0" : "#e8f5ff",
                }}
              />
              {/* La casilla se deja debajo del input, tal como en tu código original */}
              <Form.Check
                type="checkbox"
                label="Modificar contraseña"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setAllowPasswordEdit(isChecked);
                  if (!isChecked) {
                    // Si se desmarca, se restaura el valor original (ya obtenido de storage)
                    setFormData((prev) => ({
                      ...prev,
                      password: originalPassword,
                    }));
                  }
                }}
                style={{ marginBottom: "10px", color: "#6D6875" }}
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener al menos 6 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="tipoUsuario">
              <Form.Label style={{ color: "#6D6875" }}>
                Tipo de Usuario
              </Form.Label>
              <Form.Select
                required
                value={formData.tipoUsuario}
                disabled
                onChange={(e) =>
                  setFormData({ ...formData, tipoUsuario: e.target.value })
                }
                style={{ borderColor: "#FFCDB2", backgroundColor: "#e8f5ff" }}
              >
                <option value="">Selecciona una opción</option>
                <option value="Alumno">Alumno</option>
                <option value="Profesor">Profesor</option>
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Botones */}
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              className="me-2"
            >
              Cancelar
            </Button>
            <Button variant="outline-primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditarPerfil;

/* 
Explicación:
Recuperación del Password Original: Se intenta obtener el password del usuario desde localStorage. Si existe un usuario que coincide con originalEmail y tiene un password definido, se usa ese valor como initialOriginalPassword. Esto se asigna a originalPassword al inicializar el estado, de modo que si el usuario no modifica la contraseña, se utilizará ese valor (en lugar de undefined).

Lógica en el Checkbox "Modificar contraseña": Cuando se desmarca la opción, se fuerza que el formData.password se restablezca al valor de originalPassword. Así, en el handleSubmit, se usará finalPassword como:

js
const finalPassword = allowPasswordEdit ? password : originalPassword;
garantizando que si no se modifica, se conserva el password recuperado.

Envió del Formulario: El usuario se actualiza con el finalPassword correspondiente, evitando que se guarde undefined.

Prueba esta versión y revisa en localStorage que el primer elemento conserva el password correcto. ¿Te ayuda esta solución? */
