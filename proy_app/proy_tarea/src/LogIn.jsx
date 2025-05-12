import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const contexto = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Aquí implementas la lógica de autenticación.
    // Si es exitosa, redirige a la aplicación principal:
    navigate("/app");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 border rounded shadow-sm">
            <Card.Header className="text-center">
              <Card.Title>Bienvenido al Gestor de Tareas - login</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    required
                    placeholder="Introduce tu email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    minLength="6"
                    required
                    placeholder="Introduce tu contraseña"
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="success"
                    className="w-auto text-white font-weight-bold"
                    onClick={handleSignIn}
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
                    ¿Necesitas verificar tu correo electrónico?
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
