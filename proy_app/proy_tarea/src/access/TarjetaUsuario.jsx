// src/components/TarjetaUsuario.jsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TarjetaUsuario = ({
  show,
  handleSaveEdit,
  handleCancelEdit,
  editFormData,
  setEditFormData,
  errors,
}) => {
  return (
    <Modal show={show} onHide={handleCancelEdit} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSaveEdit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce el nombre"
              value={editFormData.nombre}
              onChange={(e) =>
                setEditFormData({ ...editFormData, nombre: e.target.value })
              }
              isInvalid={!!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduce el email"
              value={editFormData.email}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEdad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa la edad"
              min="1"
              value={editFormData.edad}
              onChange={(e) =>
                setEditFormData({ ...editFormData, edad: e.target.value })
              }
              isInvalid={!!errors.edad}
            />
            <Form.Control.Feedback type="invalid">
              {errors.edad}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa la contraseña"
              value={editFormData.password}
              onChange={(e) =>
                setEditFormData({ ...editFormData, password: e.target.value })
              }
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTipoUsuario">
            <Form.Label>Tipo de Usuario</Form.Label>
            <Form.Select
              value={editFormData.tipoUsuario}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  tipoUsuario: e.target.value,
                })
              }
              isInvalid={!!errors.tipoUsuario}
            >
              <option value="">Selecciona una opción</option>
              <option value="Alumno">Alumno</option>
              <option value="Profesor">Profesor</option>
              <option value="AdminApp">Administrador</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tipoUsuario}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TarjetaUsuario;
