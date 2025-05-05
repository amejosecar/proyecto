import { useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  return (
    <>
      <div className="container">
        <h1>Gestor de tareas</h1>
        {/* Aquí iría el formulario para añadir tareas */}
        <h2>Tareas pendientes</h2>
        <ul>
          {tareas.map((tarea, index) => (
            <li key={index}>{tarea}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
