// src/LogIn.jsx
import React, { useContext, useState } from "react";
import AuthContext from "./context/AuthContext";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Mensajes from "./components/mensajes"; // Ajusta la ruta si es necesario
import { useForm } from "./hooks/useForm"; // Asegúrate de que la ruta sea correcta

function LogIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Utiliza el hook useForm para gestionar los inputs
  const [formValues, handleInputChange, resetForm] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formValues;

  // Estado para manejar mensajes de error
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    // Validación simple
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    console.log("Intento de login con:", email, password);

    // Recupera la lista de usuarios desde localStorage
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    console.log("Usuarios en localStorage:", users);

    // Primero, busca si existe algún usuario con el email ingresado.
    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      console.log("Email no registrado.");
      setError("El email no está registrado.");
      resetForm(); // Limpia email y password
      return;
    }

    // Si el email existe, comprueba si la contraseña coincide.
    if (foundUser.password !== password) {
      console.log("Contraseña incorrecta para el email proporcionado.");
      setError("La clave no es correcta.");
      // Limpia solo el campo 'password'
      handleInputChange({ target: { name: "password", value: "" } });
      return;
    }

    // Si pasa ambas validaciones, se inicia sesión.
    setError("");
    const { nombre, email: userEmail, edad, tipoUsuario } = foundUser;
    login({ nombre, email: userEmail, edad, tipoUsuario });
    navigate("/app");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      {/* Muestra un mensaje de error usando el componente Mensajes */}
      {error && (
        <Mensajes
          show={true}
          mensaje={error}
          tipo="danger"
          onClose={() => setError("")}
          modo="toast" // Puedes probar "alert" o "toast"
        />
      )}
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 border rounded shadow-sm">
            <Card.Header className="text-center">
              <Card.Title>Bienvenido al Gestor de Tareas - login</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSignIn}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email" // Importante para el hook useForm
                    placeholder="Introduce tu email"
                    required
                    value={email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password" // Importante para el hook useForm
                    placeholder="Introduce tu contraseña"
                    required
                    minLength="6"
                    value={password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="success"
                    type="submit"
                    aria-label="Iniciar sesión"
                  >
                    Iniciar sesión
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-muted">¿Eres nuevo? </span>
                  <Link
                    to="/registro"
                    className="text-success text-decoration-none"
                  >
                    Regístrate
                  </Link>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Link
                    to="/olvidaste-contrasena"
                    className="text-muted text-decoration-none"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Col>
                <Col xs="auto">
                  <Link
                    to="/verificar-email"
                    className="text-muted text-decoration-none"
                  >
                    ¿Necesitas verificar tu usuario?
                  </Link>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LogIn;
