// src/Mensajes.jsx
import React from "react";
import ReactDOM from "react-dom";
import Toast from "react-bootstrap/Toast";
import Alert from "react-bootstrap/Alert";

function Mensajes({
  show,
  mensaje,
  tipo,
  onClose,
  modo = "toast",
  // Actualizamos el valor por defecto para centrar el Toast: top: "10px", left: "50%" y centramos con transform
  position = { top: "10px", left: "50%", transform: "translateX(-50%)" },
  delay = 3000, // Tiempo en milisegundos antes de ocultarse
  ...restProps
}) {
  // Si no se debe mostrar, retorna null
  if (!show) return null;

  if (modo === "toast") {
    return ReactDOM.createPortal(
      <Toast
        show={show}
        onClose={onClose}
        bg={tipo}
        autohide
        delay={delay}
        animation
        style={{ position: "fixed", ...position, zIndex: 1040 }}
      >
        <Toast.Header>
          <strong className="me-auto">Notificación</strong>
        </Toast.Header>
        <Toast.Body>{mensaje}</Toast.Body>
      </Toast>,
      document.body
    );
  } else if (modo === "alert") {
    return ReactDOM.createPortal(
      <Alert
        variant={tipo}
        onClose={onClose}
        dismissible
        style={{
          maxWidth: "50%",
          margin: "20px auto",
          textAlign: "center",
        }}
        {...restProps}
      >
        <Alert.Heading>Notificación</Alert.Heading>
        <p>{mensaje}</p>
      </Alert>,
      document.body
    );
  } else {
    return null;
  }
}

export default Mensajes;
