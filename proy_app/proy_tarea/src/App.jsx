import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import AnadirTarea from "./components/anadirTarea";
import MostrarTarea from "./components/mostrarTarea";

function App() {
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
  const [tareas, setTareas] = useState(() => {
    const storedTareas = localStorage.getItem("tareas");
    return storedTareas ? JSON.parse(storedTareas) : [];
  });

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    setMostrarAdvertencia(
      tareas.filter((tarea) => tarea.importancia === "alta").length >= 3
    );
  }, [tareas]);

  const agregarTarea = (nuevaTarea) => setTareas([...tareas, nuevaTarea]);
  const eliminarTarea = (id) =>
    setTareas(tareas.filter((tarea) => tarea.id !== id));

  const guardarTarea = (tareaEditada) => {
    setTareas(tareas.map((t) => (t.id === tareaEditada.id ? tareaEditada : t)));
  };

  return (
    <>
      <h1 className="text-center mb-4">Listado de Tareas - Americo - React</h1>
      <AnadirTarea agregarTarea={agregarTarea} />
      <h2 className="text-center mb-4">Tareas pendientes</h2>
      <MostrarTarea tareas={tareas} eliminarTarea={eliminarTarea} />
      {mostrarAdvertencia && (
        <Container>
          <div id="advertencia" className="alert alert-danger" role="alert">
            <strong>¡Atención! </strong> Tienes demasiadas tareas importantes
          </div>
        </Container>
      )}
    </>
  );
}

export default App;

/* import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import AnadirTarea from "./components/anadirTarea";
import MostrarTarea from "./components/mostrarTarea";

function App() {
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
  const [tareas, setTareas] = useState(() => {
    // Cargar tareas desde localStorage si existen
    const storedTareas = localStorage.getItem("tareas");
    console.log("Tareas cargadas desde localStorage:", storedTareas);
    return storedTareas ? JSON.parse(storedTareas) : [];
  });

  // Guardar tareas en localStorage cada vez que se actualicen
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    if (tareas.filter((tarea) => tarea.prioridad === "alta").length > 3) {
      setMostrarAdvertencia(true);
    } else {
      setMostrarAdvertencia(false);
    }
  }, [tareas]);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    if (tareas.filter((tarea) => tarea.importancia === "alta").length >= 3) {
      setMostrarAdvertencia(true);
    } else {
      setMostrarAdvertencia(false);
    }
  }, [tareas]);

  const agregarTarea = (nuevaTarea) => setTareas([...tareas, nuevaTarea]);
  const eliminarTarea = (id) =>
    setTareas(tareas.filter((tarea) => tarea.id !== id));

  return (
    <>
      <h1 className="text-center mb-4">Listado de Tareas - Americo - React</h1>
      <AnadirTarea agregarTarea={agregarTarea} />
      <h2 className="text-center mb-4">Tareas pendientes</h2>
      <MostrarTarea tareas={tareas} eliminarTarea={eliminarTarea} />
      {mostrarAdvertencia && (
        <Container >
          <div id="advertencia" className="alert alert-danger" role="alert">
            <strong>¡Atención! </strong> Tienes demasiadas tareas importantes
          </div>
        </Container>
      )}
    </>
  );
}

export default App;

 */
