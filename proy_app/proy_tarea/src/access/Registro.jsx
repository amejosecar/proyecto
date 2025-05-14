// src/context/Registro.jsx
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import Mensajes from "../components/mensajes"; // Ajusta la ruta según tu estructura

function Registro() {
  const contexto = useContext(AuthContext);
  const navigate = useNavigate();

  // Estado para los datos del formulario
  const initialFormData = {
    nombre: "",
    email: "",
    edad: "",
    password: "",
    tipoUsuario: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  // Estado para manejar mensajes de error/validación o éxito
  const [mensaje, setMensaje] = useState(null);
  // Estado para la validación del formulario con React Bootstrap
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    console.log("Registro component loaded");
  }, []);

  const annadeUsuario = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Valida los campos usando las validaciones nativas
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    const { nombre, email, edad, password, tipoUsuario } = formData;
    const parsedEdad = parseInt(edad, 10);

    // Recupera la lista de usuarios desde localStorage
    const storedUsers = localStorage.getItem("users");
    let users = storedUsers ? JSON.parse(storedUsers) : [];

    // Verifica si el email ya está registrado
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      setMensaje({
        texto: "El usuario con ese email ya existe. Intenta iniciar sesión.",
        tipo: "danger",
      });
      return;
    }

    // Agrega el nuevo usuario (nota: en un entorno real, la password debe manejarse con mayor seguridad)
    const newUser = { nombre, email, edad: parsedEdad, password, tipoUsuario };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Usuarios registrados:", users);

    // Muestra el mensaje de éxito y limpia el formulario
    setMensaje({
      texto: "Usuario registrado correctamente",
      tipo: "success",
    });
    setFormData(initialFormData);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData(initialFormData);
    setMensaje(null);
    navigate("/login");
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      {/* Mensaje tipo Toast si hay algún alerta */}
      {mensaje && (
        <Mensajes
          show={true}
          mensaje={mensaje.texto}
          tipo={mensaje.tipo}
          onClose={() => setMensaje(null)}
          modo="toast"
        />
      )}
      <Card
        className="p-4 card-custom-hover"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <Card.Header className="text-center">
          <Card.Title>Formulario de Registro</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-center mb-2 fs-6">
            Por favor, ingrese sus datos.
          </Card.Title>

          <Form noValidate validated={validated} onSubmit={annadeUsuario}>
            {/* Primera fila: Nombre y Email */}
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduce tu nombre completo"
                  required
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingresa tu nombre.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="email">
                <Form.Label>@ Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Introduce tu email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, introduce un email válido.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Segunda fila: Edad, Password y Tipo de Usuario */}
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="edad">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresa tu edad"
                  min="1"
                  required
                  value={formData.edad}
                  onChange={(e) =>
                    setFormData({ ...formData, edad: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa una edad válida.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  minLength="6"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  La contraseña debe tener al menos 6 caracteres.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="tipoUsuario">
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Select
                  required
                  value={formData.tipoUsuario}
                  onChange={(e) =>
                    setFormData({ ...formData, tipoUsuario: e.target.value })
                  }
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Alumno">Alumno</option>
                  <option value="Profesor">Profesor</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Selecciona un tipo de usuario.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Botones de Cancelar y Guardar */}
            <Row className="mb-3">
              <Col className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Registro;
