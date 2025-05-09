import Table from "react-bootstrap/Table";
import Mensajes from "./mensajes";
import FilaTarea from "./filaTarea";

function MostrarTarea({ tareas, eliminarTarea, guardarTarea }) {
  return (
    <div className="d-flex justify-content-center w-100">
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
              <FilaTarea
                key={tarea.id}
                tarea={tarea}
                indice={indice}
                eliminarTarea={eliminarTarea}
                guardarTarea={guardarTarea}
              />
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
