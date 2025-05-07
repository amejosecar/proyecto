import Toast from "react-bootstrap/Toast";

function Mensajes({ show, mensaje, tipo, onClose }) {
  return (
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
    </Toast>
  );
}

export default Mensajes;
