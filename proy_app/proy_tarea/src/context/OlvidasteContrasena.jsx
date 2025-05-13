/* import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Mensajes from "../components/mensajes"; // Ajusta la ruta según tu estructura

function OlvidasteContrasena() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMensaje({
        texto: "Por favor, ingresa un email.",
        tipo: "danger",
        modo: "toast",
      });
      console.log("No se ingresó email.");
      return;
    }

    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    console.log("Usuarios en localStorage:", users);

    const foundUser = users.find((u) => u.email === email);
    console.log("Usuario encontrado:", foundUser);

    if (!foundUser) {
      setMensaje({
        texto: "El email no está registrado.",
        tipo: "danger",
        modo: "toast",
      });
      console.log("Email no registrado.");
      setEmail("");
      return;
    }

    if (foundUser) {
      setMensaje({
        texto: `Su contraseña es: ${foundUser.password}`,
        tipo: "info",
        modo: "toast",
      });
      console.log("Mensaje set:", `Su contraseña es: ${foundUser.password}`);
      setEmail("");
      return;
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      {mensaje && (
        <Mensajes
          show={true}
          mensaje={mensaje.texto}
          tipo={mensaje.tipo}
          modo={mensaje.modo}
          onClose={() => setMensaje(null)}
        />
      )}
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 border rounded shadow-sm">
            <Card.Header className="text-center">
              <Card.Title>Recuperar Contraseña</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Ingresa tu email para recuperar tu contraseña"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Button variant="warning" type="submit" className="w-auto">
                  Enviar Instrucciones
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/login" className="text-decoration-none">
                Volver al inicio
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OlvidasteContrasena;
 */
import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function OlvidasteContrasena() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMensaje("Por favor, ingresa un email.");
      return;
    }

    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      setMensaje("El email no está registrado.");
      setEmail("");
      return;
    }

    // Si se encontró el usuario, se guarda la contraseña y se muestra el modal
    setPassword(foundUser.password);
    setShowModal(true);
    setMensaje(""); // Limpiar mensaje de error (si hubiera)
    setEmail("");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      {mensaje && (
        <div className="alert alert-danger" role="alert">
          {mensaje}
        </div>
      )}
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 border rounded shadow-sm">
            <Card.Header className="text-center">
              <Card.Title>Recuperar Contraseña</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Ingresa tu email para recuperar tu contraseña"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Button variant="warning" type="submit" className="w-auto">
                  Enviar Instrucciones
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/login" className="text-decoration-none">
                Volver al inicio
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Modal para mostrar la contraseña */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contraseña Recuperada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Su contraseña es:</p>
          <h4>{password}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OlvidasteContrasena;
