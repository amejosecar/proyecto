import React, { useEffect, useState } from "react";
import Mensajes from "../components/mensajes"; // Opcional, para mostrar alertas globales
import "./modal.css";

function Registro({ showModal, handleClose }) {
  const initialFormData = {
    nombre: "",
    email: "",
    edad: "",
    password: "",
    tipoUsuario: "",
  };

  // Estado para el formulario, mensajes globales y errores de cada campo
  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Registro modal loaded");
  }, []);

  // Si el modal no debe mostrarse, retorna null
  if (!showModal) return null;

  const annadeUsuario = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validación de cada campo
    if (!formData.nombre.trim()) {
      newErrors.nombre = "Campo no debe estar vacio";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Campo no debe estar vacio";
    }
    if (!formData.edad.trim()) {
      newErrors.edad = "Campo no debe estar vacio";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Campo no debe estar vacio";
    }
    if (!formData.tipoUsuario.trim()) {
      newErrors.tipoUsuario = "Campo no debe estar vacio";
    }

    // Si hay errores, actualizamos el estado y detenemos el envío
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Verifica si el email ya existe
    const storedUsers = localStorage.getItem("users");
    let users = storedUsers ? JSON.parse(storedUsers) : [];
    const userExists = users.some((user) => user.email === formData.email);
    if (userExists) {
      setErrors({
        ...newErrors,
        email: "El usuario con ese email ya existe. Intenta iniciar sesión.",
      });
      return;
    }

    // Si todo está correcto, se agrega el usuario
    const parsedEdad = parseInt(formData.edad, 10);
    const newUser = {
      nombre: formData.nombre,
      email: formData.email,
      edad: parsedEdad,
      password: formData.password,
      tipoUsuario: formData.tipoUsuario,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Usuarios registrados:", users);

    setMensaje({
      texto: "Usuario registrado correctamente",
      tipo: "success",
    });
    // Limpiamos errores y formulario
    setErrors({});
    setFormData(initialFormData);

    // Después de 1.5 segundos se cierra el modal
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData(initialFormData);
    setMensaje(null);
    setErrors({});
    handleClose();
  };

  return (
    <div className="modal" style={{ display: "flex" }}>
      {/* Fondo semitransparente: al hacer clic, cierra el modal */}
      <div className="modal-fondo" onClick={handleCancel}></div>
      <div className="modal-contenido">
        {/* Botón de cierre */}
        <a href="#!" className="cerrar-modal" onClick={handleCancel}>
          &times;
        </a>
        <h2>Formulario de Registro</h2>
        <p>Por favor, ingresa tus datos.</p>
        {/* Mensaje global (éxito o error) */}
        {mensaje && (
          <div className={`mensaje ${mensaje.tipo}`}>{mensaje.texto}</div>
        )}
        <form onSubmit={annadeUsuario} noValidate>
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Introduce tu nombre completo"
              required
              className="form-control"
              value={formData.nombre}
              onChange={(e) => {
                setFormData({ ...formData, nombre: e.target.value });
                if (errors.nombre) {
                  setErrors({ ...errors, nombre: "" });
                }
              }}
            />
            {errors.nombre && (
              <div className="form-control-feedback">{errors.nombre}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              @ Username
            </label>
            <input
              type="email"
              id="email"
              placeholder="Introduce tu email"
              required
              className="form-control"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
            />
            {errors.email && (
              <div className="form-control-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="edad" className="form-label">
              Edad
            </label>
            <input
              type="number"
              id="edad"
              placeholder="Ingresa tu edad"
              min="1"
              required
              className="form-control"
              value={formData.edad}
              onChange={(e) => {
                setFormData({ ...formData, edad: e.target.value });
                if (errors.edad) {
                  setErrors({ ...errors, edad: "" });
                }
              }}
            />
            {errors.edad && (
              <div className="form-control-feedback">{errors.edad}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              minLength="6"
              required
              className="form-control"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
              }}
            />
            {errors.password && (
              <div className="form-control-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="tipoUsuario" className="form-label">
              Tipo de Usuario
            </label>
            <select
              id="tipoUsuario"
              required
              className="form-control"
              value={formData.tipoUsuario}
              onChange={(e) => {
                setFormData({ ...formData, tipoUsuario: e.target.value });
                if (errors.tipoUsuario) {
                  setErrors({ ...errors, tipoUsuario: "" });
                }
              }}
            >
              <option value="">Selecciona una opción</option>
              <option value="Alumno">Alumno</option>
              <option value="Profesor">Profesor</option>
              <option value="AdminApp">Administrador</option>
            </select>
            {errors.tipoUsuario && (
              <div className="form-control-feedback">{errors.tipoUsuario}</div>
            )}
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="boton-modal cancel-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button type="submit" className="boton-modal save-button">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
