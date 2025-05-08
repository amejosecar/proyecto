import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Mensajes from "./mensajes";
import {
  manejarCambioFechaCulminacion,
  formatearFechaMostrar,
  getTiempoQueda,
  eliminarTareaConConfirmacion,
  guardarTareaConValidacion,
} from "./validaciones";

function FilaTarea({ tarea, indice, eliminarTarea, guardarTarea }) {
  // Campos inmutables (presentados como texto)
  const [nombre] = useState(tarea.nombre);
  const [descripcion] = useState(tarea.descripcion);
  const [importancia] = useState(tarea.importancia);

  // Campos editables: status, fechaCulminacion y observaciones
  const [status, setStatus] = useState(tarea.status || "Desarrollo");
  const [fechaCulminacion, setFechaCulminacion] = useState(
    tarea.fechaCulminacion || ""
  );
  const [observaciones, setObservaciones] = useState(tarea.observaciones || "");

  // Se usan para determinar si cada objeto editable debe estar habilitado o no.
  const [disabledFields, setDisabledFields] = useState({
    fechaCulminacion: false,
    status: false,
    observaciones: false,
  });

  // Clase de la fila. Si la tarea es de alta importancia se inicia con "table-danger text-white".
  const [rowClass, setRowClass] = useState(
    tarea.importancia === "alta" ? "table-danger text-white" : ""
  );

  const [mostrarToast, setMostrarToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");
  const [tipoToast, setTipoToast] = useState("danger");

  // Referencia para el campo observaciones (para enfocarlo en casos de error)
  const observacionesRef = useRef(null);

  const mostrarMensaje = (mensaje, tipo) => {
    setMensajeToast(mensaje);
    setTipoToast(tipo);
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 3000);
  };

  // Callbacks para actualizar el estado disabled y la clase de la fila.
  const updateDisabledFields = (disabledObj) => {
    setDisabledFields(disabledObj);
  };

  const updateRowClass = (cls) => {
    setRowClass(cls);
  };

  // Condición para deshabilitar ambos botones "Guardar" y "Borrar" cuando los tres campos editables estén bloqueados.
  const botonesDisabled =
    disabledFields.fechaCulminacion &&
    disabledFields.status &&
    disabledFields.observaciones;

  return (
    <tr
      className={
        rowClass ||
        (tarea.importancia === "alta" ? "table-danger text-white" : "")
      }
    >
      <Mensajes
        show={mostrarToast}
        mensaje={mensajeToast}
        tipo={tipoToast}
        onClose={() => setMostrarToast(false)}
      />
      <td>{indice + 1}</td>
      <td>
        <span>{nombre}</span>
      </td>
      <td>
        <span>{descripcion}</span>
      </td>
      <td>
        <span>{importancia}</span>
      </td>
      <td>{formatearFechaMostrar(tarea.fecha)}</td>
      <td>
        <Form.Control
          type="datetime-local"
          value={fechaCulminacion}
          onChange={(e) => {
            const resultado = manejarCambioFechaCulminacion(
              tarea.fecha,
              e.target.value
            );
            if (resultado.ok) {
              setFechaCulminacion(resultado.fecha);
              tarea.fechaCulminacion = resultado.fecha;
            } else {
              mostrarMensaje(resultado.mensaje, "warning");
            }
          }}
          disabled={disabledFields.fechaCulminacion}
        />
      </td>
      <td>
        <Form.Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            tarea.status = e.target.value;
          }}
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
          onChange={(e) => {
            setObservaciones(e.target.value);
            tarea.observaciones = e.target.value;
          }}
          disabled={disabledFields.observaciones}
        />
      </td>
      <td>{getTiempoQueda(tarea)}</td>
      {/* Columna para el botón Guardar */}
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
              updateRowClass
            )
          }
          disabled={botonesDisabled}
        >
          Guardar
        </Button>
      </td>
      {/* Columna para el botón Borrar */}
      <td>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() =>
            eliminarTareaConConfirmacion(tarea, eliminarTarea, mostrarMensaje)
          }
          disabled={botonesDisabled}
        >
          Borrar
        </Button>
      </td>
    </tr>
  );
}

export default FilaTarea;
