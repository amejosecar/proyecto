// src/context/Registro.jsx
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
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

  // Log cuando se carga el componente
  useEffect(() => {
    console.log("Registro component loaded");
  }, []);

  const annadeUsuario = (e) => {
    e.preventDefault();

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

    // Agrega el nuevo usuario al listado (en una app real, no almacenes la password sin seguridad)
    const newUser = { nombre, email, edad: parsedEdad, password, tipoUsuario };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Usuarios registrados:", users);

    // Muestra el mensaje Toast de éxito en verde y limpia el formulario
    setMensaje({
      texto: "Usuario registrado correctamente",
      tipo: "success",
    });
    setFormData(initialFormData);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // Resetea el formulario y limpia cualquier mensaje,
    // luego navega a la página de login.
    setFormData(initialFormData);
    setMensaje(null);
    navigate("/login");
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      {/* Muestra el Toast si hay un mensaje */}
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
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <Card.Header className="text-center">
          <Card.Title>Formulario de Registro</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Por favor, ingrese sus datos.
          </Card.Title>
          <Form id="registroForm" onSubmit={annadeUsuario}>
            <Form.Group className="mb-3" controlId="nombre">
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
              <Form.Text className="text-muted">
                Introduce tu nombre completo.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Introduce tu email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Form.Text className="text-muted">
                No compartiremos tu email con nadie.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="edad">
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
              <Form.Text className="text-muted">
                Necesitamos saber si eres mayor de edad.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
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
              <Form.Text className="text-muted">
                La contraseña debe tener al menos 6 caracteres.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="tipoUsuario">
              <Form.Label>Tipo de Usuario</Form.Label>
              <Form.Select
                required
                value={formData.tipoUsuario}
                onChange={(e) =>
                  setFormData({ ...formData, tipoUsuario: e.target.value })
                }
              >
                <option value="">Selecciona una opción</option>
                <option value="alumno">Alumno</option>
                <option value="profesor">Profesor</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Registro;
