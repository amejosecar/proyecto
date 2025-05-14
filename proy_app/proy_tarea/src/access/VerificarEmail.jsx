import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function VerificarEmail() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 border rounded shadow-sm">
            <Card.Header className="text-center">
              <Card.Title>Verificar Email</Card.Title>
            </Card.Header>
            <Card.Body className="text-center">
              <p>
                Hemos enviado un correo de verificación a tu dirección. Revisa
                tu bandeja de entrada y sigue las instrucciones.
              </p>
              <Link to="/login">
                <Button variant="primary">Volver al inicio</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default VerificarEmail;
