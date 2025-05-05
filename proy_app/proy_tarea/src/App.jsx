import { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tareas, setTareas] = useState([]); // Estado para almacenar tareas
  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [importancia, setImportancia] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");

  // Función para añadir tareas con validación
  const aniadirTarea = () => {
    if (!nombreTarea || !descripcionTarea || !importancia || !fechaInicio) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const nuevaTarea = {
      id: tareas.length + 1,
      nombre: nombreTarea,
      descripcion: descripcionTarea,
      importancia: importancia,
      fecha: new Date(fechaInicio).toLocaleString(),
    };

    setTareas([...tareas, nuevaTarea]);

    // Limpiar los campos después de añadir la tarea
    setNombreTarea("");
    setDescripcionTarea("");
    setImportancia("");
    setFechaInicio("");
  };

  // Función para eliminar tarea y re-renderizar la tabla
  const borrarTarea = (indice) => {
    if (confirm(`¿Quieres eliminar la tarea "${tareas[indice].nombre}"?`)) {
      const nuevasTareas = tareas.filter((_, i) => i !== indice);
      setTareas(nuevasTareas);
    }
  };

  return (
    <Container className="mt-4 d-flex flex-column align-items-center">
      <h1 className="text-center mb-4">
        Listado de Tareas - Americo - react-bootstrap
      </h1>

      {/* Tabla de entrada de datos */}
      <Table bordered className="text-center">
        <thead className="bg-light">
          <tr>
            <th>Nombre de la tarea</th>
            <th>Descripción de la tarea</th>
            <th>Importancia</th>
            <th>Fecha de inicio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                value={nombreTarea}
                onChange={(e) => setNombreTarea(e.target.value)}
                placeholder="Nombre de la tarea"
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={descripcionTarea}
                onChange={(e) => setDescripcionTarea(e.target.value)}
                placeholder="Descripción de la tarea"
              />
            </td>
            <td>
              <select
                className="form-select"
                value={importancia}
                onChange={(e) => setImportancia(e.target.value)}
              >
                <option value="">Selecciona la importancia</option>
                <option value="Muy importante">Muy importante</option>
                <option value="Importante">Importante</option>
                <option value="Normal">Normal</option>
              </select>
            </td>
            <td>
              <input
                type="datetime-local"
                className="form-control"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Botón debajo de la tabla */}
      <Button variant="success" className="mt-3" onClick={aniadirTarea}>
        Añadir Tarea
      </Button>

      {/* Tabla de tareas añadidas */}
      <Table bordered striped className="text-center mt-4">
        <thead className="bg-light">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Importancia</th>
            <th>Fecha de Inicio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {tareas.length > 0 ? (
            tareas.map((tarea, indice) => (
              <tr
                key={indice}
                className={indice % 2 === 0 ? "bg-light" : "bg-info"}
              >
                <td>{indice + 1}</td>
                <td>{tarea.nombre}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.importancia}</td>
                <td>{tarea.fecha}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => borrarTarea(indice)}
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
    </Container>
  );
}

export default App;
