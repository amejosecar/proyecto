import React, { useContext, useState } from "react";
import AuthContext from "./context/AuthContext";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Mensajes from "./components/mensajes";
import { useForm } from "./hooks/useForm";
import Registro from "./access/Registro"; // Componente de registro (modal personalizado)

function LogIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formValues, handleInputChange, resetForm] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formValues;
  const [error, setError] = useState("");
  const [showRegistroModal, setShowRegistroModal] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    console.log("Intento de login con:", email, password);

    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    console.log("Usuarios en localStorage:", users);

    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      console.log("Email no registrado.");
      setError("El email no está registrado.");
      resetForm();
      return;
    }

    if (foundUser.password !== password) {
      console.log("Contraseña incorrecta para el email proporcionado.");
      setError("La clave no es correcta.");
      handleInputChange({ target: { name: "password", value: "" } });
      return;
    }

    setError("");
    const { nombre, email: userEmail, edad, tipoUsuario } = foundUser;
    login({ nombre, email: userEmail, edad, tipoUsuario });

    // Console log para ver el tipo de usuario y la redirección
    console.log(
      `Login válido. Redirigiendo a "/app" con tipoUsuario: ${tipoUsuario}`
    );

    navigate("/app");
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        {error && (
          <Mensajes
            show={true}
            mensaje={error}
            tipo="danger"
            onClose={() => setError("")}
            modo="toast"
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
                  <FloatingLabel
                    controlId="floatingEmail"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Introduce tu email"
                      required
                      value={email}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Introduce tu contraseña"
                      required
                      minLength="6"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
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
                    <span className="text-muted">¿No tiene una cuenta? </span>
                    <Link
                      to="#"
                      className="text-success text-decoration-none"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowRegistroModal(true);
                      }}
                    >
                      Cree una.
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

      {/* Modal personalizado para registro */}
      {showRegistroModal && (
        <Registro
          showModal={true}
          handleClose={() => setShowRegistroModal(false)}
        />
      )}
    </>
  );
}

export default LogIn;
