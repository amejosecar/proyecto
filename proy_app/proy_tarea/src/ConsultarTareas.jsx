import AnadirTarea from "./components/anadirTarea";
import MostrarTarea from "./components/mostrarTarea";
import Mensajes from "./components/mensajes"; // Componente centralizado de mensajes
import useTareas from "./hooks/useTareas";

function consultarTareas() {
  const {
    tareas,
    agregarTarea,
    eliminarTarea,
    guardarTarea,
    mostrarAdvertencia,
    setTareas,
  } = useTareas();

  return (
    <>
      <h1 className="text-center mb-4">Listado de Tareas - Americo - React</h1>
      <AnadirTarea agregarTarea={agregarTarea} />
      <h2 className="text-center mb-4">Tareas pendientes</h2>
      <MostrarTarea
        tareas={tareas}
        eliminarTarea={eliminarTarea}
        guardarTarea={guardarTarea}
        setTareas={setTareas}
      />
      {mostrarAdvertencia && (
        <Mensajes
          show={true}
          mensaje="⚠️ Advertencia ¡Atención! Tienes demasiadas tareas importantes. Por favor, prioriza tus tareas."
          tipo="danger"
          onClose={() => {}}
          modo="alert" // Indica que se use el estilo 'alert'
        />
      )}
    </>
  );
}

export default consultarTareas;
