import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Mensajes from "./mensajes";

function MostrarTarea({ tareas, eliminarTarea, guardarTarea }) {
  const [mostrarToast, setMostrarToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");
  const [tipoToast, setTipoToast] = useState("success");

  const mostrarMensaje = (mensaje, tipo) => {
    setMensajeToast(mensaje);
    setTipoToast(tipo);
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 3000);
  };

  const validarFechaCulminacion = (fechaEntrega, fechaCulminacion) => {
    const hoy = new Date().toISOString().split("T")[0];
    return fechaCulminacion >= hoy && fechaCulminacion <= fechaEntrega;
  };

  const formatearFechaMostrar = (fecha) => {
    if (!fecha) return "Fecha no disponible";

    const fechaOriginal = new Date(fecha);
    if (isNaN(fechaOriginal.getTime())) return "Fecha inválida";

    const dia = fechaOriginal.getDate().toString().padStart(2, "0");
    const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, "0");
    const anio = fechaOriginal.getFullYear();

    return `${dia}-${mes}-${anio}`;
  };

  return (
    <div className="d-flex justify-content-center w-100">
      <Mensajes
        show={mostrarToast}
        mensaje={mensajeToast}
        tipo={tipoToast}
        onClose={() => setMostrarToast(false)}
      />
      <Table bordered striped className="text-center w-75">
        <thead className="bg-light">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Importancia</th>
            <th>Fecha de entrega</th>
            <th>Fecha de culminación</th>
            <th>Status</th>
            <th>Observaciones</th>
            <th>Tiempo faltante</th>
            <th colSpan="2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {tareas.length > 0 ? (
            tareas.map((tarea, indice) => (
              <tr
                key={tarea.id}
                className={
                  tarea.importancia === "alta" ? "table-danger text-white" : ""
                }
              >
                <td>{indice + 1}</td>
                <td>{tarea.nombre}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.importancia}</td>
                <td>{formatearFechaMostrar(tarea.fecha)}</td>
                <td>
                  <Form.Control
                    type="date"
                    value={tarea.fechaCulminacion || ""}
                    onChange={(e) => {
                      if (
                        validarFechaCulminacion(tarea.fecha, e.target.value)
                      ) {
                        tarea.fechaCulminacion = e.target.value;
                      } else {
                        mostrarMensaje(
                          "La fecha de culminación debe ser igual o mayor a hoy y menor o igual a la fecha de entrega.",
                          "warning"
                        );
                      }
                    }}
                  />
                </td>
                <td>
                  <Form.Select
                    value={tarea.status || "Desarrollo"}
                    onChange={(e) => (tarea.status = e.target.value)}
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
                    value={tarea.observaciones || ""}
                    onChange={(e) => (tarea.observaciones = e.target.value)}
                  />
                </td>
                <td>{getTiempoQueda(tarea)}</td>
                <td>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        if (
                          window.confirm(
                            "¿Estás seguro de que quieres borrar esta tarea?"
                          )
                        ) {
                          eliminarTarea(tarea.id);
                          mostrarMensaje(
                            "✅ Tarea eliminada correctamente.",
                            "success"
                          );
                        }
                      }}
                    >
                      Borrar
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => {
                        if (tarea.status === "Cancelado") {
                          if (!tarea.observaciones) {
                            mostrarMensaje(
                              "Para cancelar una tarea debe informar la razón en el campo observaciones.",
                              "danger"
                            );
                            return;
                          }
                          tarea.fechaCulminacion = new Date()
                            .toISOString()
                            .split("T")[0];
                        }

                        if (tarea.status === "Culminado") {
                          if (!tarea.fecha || !tarea.observaciones) {
                            mostrarMensaje(
                              "Antes de culminar deben estar los campos completados.",
                              "danger"
                            );
                            return;
                          }
                        }

                        guardarTarea(tarea);
                        mostrarMensaje(
                          "✅ Tarea guardada correctamente.",
                          "success"
                        );
                      }}
                    >
                      Guardar
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No hay tareas añadidas.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default MostrarTarea;

const getTiempoQueda = (tarea) => {
  if (!tarea.fecha) return "Fecha de entrega no disponible";

  const momento = new Date(tarea.fecha);
  if (isNaN(momento.getTime())) return "Fecha de entrega inválida";

  const ahora = new Date();
  const tiempoQueda = momento - ahora;

  if (tiempoQueda <= 0) return "La tarea está vencida";

  const dias = Math.floor(tiempoQueda / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (tiempoQueda % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((tiempoQueda % (1000 * 60 * 60)) / (1000 * 60));

  return dias > 0
    ? `${dias} días`
    : horas > 0
    ? `${horas} horas`
    : `${minutos} minutos`;
};
