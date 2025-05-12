import LogIn from "./components/LogIn"; // Importamos LogIn
import useTareas from "./hooks/useTareas";

function Home() {
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
      <h1 className="text-center mb-4">ESTOY EN HOME</h1>
      <LogIn /> {/* Renderizamos el componente LogIn aquí */}
    </>
  );
}

export default Home;
