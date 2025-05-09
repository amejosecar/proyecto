import { useEffect, useState } from "react";

function useTareas() {
  // Inicialización: se lee localStorage asegurando un array válido
  const [tareas, setTareas] = useState(() => {
    const storedTareas = localStorage.getItem("tareas");
    try {
      const parsedTareas = storedTareas ? JSON.parse(storedTareas) : [];
      return Array.isArray(parsedTareas) ? parsedTareas : [];
    } catch (error) {
      console.error("Error al parsear tareas desde localStorage:", error);
      return [];
    }
  });

  // Advertencia: solo se consideran las tareas con importancia "alta" y status "Desarrollo"
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    const tareasAltasDesarrollo = tareas.filter(
      (t) =>
        t.importancia === "alta" && (t.status || "Desarrollo") === "Desarrollo"
    );
    setMostrarAdvertencia(tareasAltasDesarrollo.length >= 3);
  }, [tareas]);

  // Funciones para agregar, eliminar y actualizar tareas
  const agregarTarea = (nuevaTarea) =>
    setTareas((prev) => [...prev, nuevaTarea]);

  const eliminarTarea = (id) =>
    setTareas((prev) => prev.filter((t) => t.id !== id));

  const guardarTarea = (tareaEditada) =>
    setTareas((prev) =>
      prev.map((t) => (t.id === tareaEditada.id ? tareaEditada : t))
    );

  return {
    tareas,
    agregarTarea,
    eliminarTarea,
    guardarTarea,
    mostrarAdvertencia,
    setTareas, // Se incluye para pasarlo a componentes que lo necesiten
  };
}

export default useTareas;
