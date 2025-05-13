// src/context/cerrado.jsx
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Cerrado() {
  const navigate = useNavigate();

  const handleSalir = () => {
    navigate("/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "30rem" }} className="text-center">
        <Card.Body>
          <Card.Title>Sesión Cerrada</Card.Title>
          <Card.Text style={{ fontSize: "18px" }}>
            Su sesión ha sido cerrada exito
          </Card.Text>
          <Button variant="primary" onClick={handleSalir}>
            Salir
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Cerrado;
