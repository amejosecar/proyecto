import { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

function AnadirTarea({ agregarTarea }) {
  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [importancia, setImportancia] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [showToast, setShowToast] = useState(false);

  // Creamos una referencia para el input del nombre de la tarea
  const nombreInputRef = useRef(null);

  // Al montar el componente, establecemos el foco en el input "nombreTarea"
  useEffect(() => {
    if (nombreInputRef.current) {
      nombreInputRef.current.focus();
    }
  }, []);

  // Función para mostrar mensajes con Toast
  const mostrarToast = (mensaje, tipo) => {
    setToastMessage(mensaje);
    setToastVariant(tipo);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Función para manejar la sumisión del formulario
  const handleSubmit = () => {
    if (!nombreTarea || !descripcionTarea || !importancia || !fechaEntrega) {
      mostrarToast("⚠️ Todos los campos son obligatorios.", "danger");
      if (nombreInputRef.current) {
        nombreInputRef.current.focus();
      }
      return;
    }

    const fechaHoy = new Date();
    const fechaSeleccionada = new Date(fechaEntrega);
    if (fechaSeleccionada <= fechaHoy) {
      mostrarToast(
        "🚨 La fecha de entrega debe ser superior a hoy.",
        "warning"
      );
      if (nombreInputRef.current) {
        nombreInputRef.current.focus();
      }
      return;
    }

    agregarTarea({
      id: Date.now(),
      nombre: nombreTarea,
      descripcion: descripcionTarea,
      importancia: importancia,
      fecha: fechaSeleccionada.toISOString(), // Aquí está la corrección
    });

    mostrarToast("✅ Tarea añadida correctamente.", "success");

    // Limpiar los campos del formulario
    setNombreTarea("");
    setDescripcionTarea("");
    setImportancia("");
    setFechaEntrega("");

    // Restablecemos el foco en el input "Nombre de la tarea"
    if (nombreInputRef.current) {
      nombreInputRef.current.focus();
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100 mb-4">
      {/* Toast posicionado encima de otros elementos */}
      <div style={{ position: "absolute", top: "10px", zIndex: 1000 }}>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">Notificación</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>

      <Table bordered striped className="text-top w-75">
        <thead className="bg-light">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Importancia</th>
            <th>Fecha de Entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                ref={nombreInputRef}
                value={nombreTarea}
                onChange={(e) => setNombreTarea(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={descripcionTarea}
                onChange={(e) => setDescripcionTarea(e.target.value)}
              />
            </td>
            <td>
              <select
                className="form-select"
                value={importancia}
                onChange={(e) => setImportancia(e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="alta">Muy importante</option>
                <option value="media">Importante</option>
                <option value="baja">Normal</option>
              </select>
            </td>
            <td>
              <input
                type="datetime-local"
                className="form-control"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <Button variant="outline-success" onClick={handleSubmit} className="mt-3">
        Añadir Tarea
      </Button>
    </div>
  );
}

export default AnadirTarea;
