import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function MostrarTarea({ tareas, eliminarTarea }) {
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
            <th>Acción</th>
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
                <td>{tarea.fecha}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    Borrar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
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
