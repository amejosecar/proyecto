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
  ...restProps
}) {
  /* // Console.log para ver los parámetros recibidos
  console.log("Mensajes props:", {
    show,
    mensaje,
    tipo,
    onClose,
    modo,
    ...restProps,
  }); */

  if (!show) return null;

  if (modo === "toast") {
    return ReactDOM.createPortal(
      <Toast
        show={show}
        onClose={onClose}
        bg={tipo}
        style={{ position: "absolute", top: "10px", zIndex: 1000 }}
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
        style={{ maxWidth: "50%", margin: "20px auto", textAlign: "center" }}
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
