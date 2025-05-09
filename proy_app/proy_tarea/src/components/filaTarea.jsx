import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Mensajes from "./mensajes";
import {
  formatearFechaMostrar,
  getTiempoQueda,
  eliminarTareaConConfirmacion,
  guardarTareaConValidacion,
} from "./validaciones";

function FilaTarea({ tarea, indice, eliminarTarea, guardarTarea, setTareas }) {
  // Campos inmutables (presentados como texto)
  const [nombre] = useState(tarea.nombre);
  const [descripcion] = useState(tarea.descripcion);
  const [importancia] = useState(tarea.importancia);

  // Campos editables: status, fechaCulminacion y observaciones
  // Se inicializan según la tarea y se actualizarán mediante efectos en caso de cambios externos.
  const [status, setStatus] = useState(tarea.status || "Desarrollo");
  const [fechaCulminacion, setFechaCulminacion] = useState(
    tarea.fechaCulminacion || ""
  );
  const [observaciones, setObservaciones] = useState(tarea.observaciones || "");

  // Usamos un efecto para actualizar el estado local 'fechaCulminacion' si la propiedad cambia en la tarea
  useEffect(() => {
    setFechaCulminacion(tarea.fechaCulminacion || "");
  }, [tarea.fechaCulminacion]);

  // Se usan para determinar si cada objeto editable debe estar habilitado o no.
  const initialDisabled = status === "Cancelado" || status === "Culminado";
  const [disabledFields, setDisabledFields] = useState({
    fechaCulminacion: initialDisabled,
    status: initialDisabled,
    observaciones: initialDisabled,
  });

  // Clase de la fila
  const initialRowClass =
    status === "Cancelado"
      ? "table-warning"
      : status === "Culminado"
      ? "table-primary"
      : importancia === "alta"
      ? "table-danger text-white"
      : "";
  const [rowClass, setRowClass] = useState(initialRowClass);

  const [mostrarToast, setMostrarToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");
  const [tipoToast, setTipoToast] = useState("danger");

  // Referencia para el campo observaciones
  const observacionesRef = useRef(null);

  const mostrarMensaje = (mensaje, tipo) => {
    setMensajeToast(mensaje);
    setTipoToast(tipo);
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 3000);
  };

  const updateDisabledFields = (disabledObj) => {
    setDisabledFields(disabledObj);
  };

  const updateRowClass = (cls) => {
    setRowClass(cls);
  };

  return (
    <tr className={rowClass}>
      <Mensajes
        show={mostrarToast}
        mensaje={mensajeToast}
        tipo={tipoToast}
        onClose={() => setMostrarToast(false)}
      />
      <td>{indice + 1}</td>
      <td>{nombre}</td>
      <td>{descripcion}</td>
      <td>{importancia}</td>
      <td>{formatearFechaMostrar(tarea.fecha)}</td>
      <td>
        <Form.Control
          type="datetime-local"
          value={fechaCulminacion}
          onChange={(e) => setFechaCulminacion(e.target.value)}
          disabled={disabledFields.fechaCulminacion}
        />
      </td>
      <td>
        <Form.Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={disabledFields.status}
        >
          <option>Desarrollo</option>
          <option>Culminado</option>
          <option>Cancelado</option>
        </Form.Select>
      </td>
      <td>
        <Form.Control
          type="text"
          required
          ref={observacionesRef}
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          disabled={disabledFields.observaciones}
        />
      </td>
      <td>{getTiempoQueda(tarea)}</td>
      <td>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() =>
            guardarTareaConValidacion(
              { ...tarea, status, fechaCulminacion, observaciones },
              status,
              guardarTarea,
              mostrarMensaje,
              observacionesRef,
              updateDisabledFields,
              updateRowClass,
              setTareas
            )
          }
        >
          Guardar
        </Button>
      </td>
      <td>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() =>
            eliminarTareaConConfirmacion(tarea, eliminarTarea, mostrarMensaje)
          }
        >
          Borrar
        </Button>
      </td>
    </tr>
  );
}

export default FilaTarea;
