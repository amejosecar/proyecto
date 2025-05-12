import { useEffect, useState } from "react";
import TablaMensajes from "./TablaMensajes";
import MensajeForm from "./components/MensajeForm";
function Mensajero() {
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleNewMessage = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Forzar refresco de TablaMensajes
  };
  // Borrar un mensaje con un fetch delete
  const borrarMensaje = (id) => {
    fetch(`https://aitor.alwaysdata.net/listado/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMensajes(mensajes.filter((mensaje) => mensaje.id !== id));
        //setCargando(true);
      })
      .catch((error) => {
        console.error("Error al borrar el mensaje:", error);
      });
  };

  // Obtener los mensajes con un fetch
  useEffect(() => {
    fetch("https://aitor.alwaysdata.net/listado")
      .then((response) => response.json())
      .then((data) => {
        setMensajes(data.listado);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener los mensajes:", error);
        setCargando(true);
      });
  }, []);

  return (
    <div className="container">
      <h2>Mensajero</h2>
      <MensajeForm onSubmitSuccess={handleNewMessage} />
      {!cargando && (
        <TablaMensajes
          mensajes={mensajes}
          onBorrarMensaje={borrarMensaje}
          key={refreshKey} // Esto fuerza el remontaje del componente
        />
      )}
    </div>
  );
}
export default Mensajero;
