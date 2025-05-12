import React from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function OlvidasteContrasena() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 border rounded shadow-sm">
            <Card.Header className="text-center">
              <Card.Title>Recuperar Contraseña</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Ingresa tu email para recuperar tu contraseña"
                  />
                </Form.Group>
                <Button variant="warning" type="submit" className="w-100">
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
