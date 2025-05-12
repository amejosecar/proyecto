import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Asegúrate de importar el contexto correctamente

function LogOut() {
  const { logout, nombre } = useContext(AuthContext); // Desestructura las funciones del contexto

  return (
    <button
      onClick={logout} // Usa directamente la función logout del contexto
      className="btn btn-outline-danger" // Cambié a color rojo (danger) para logout
      type="button"
    >
      Cerrar sesión ({nombre}) {/* Muestra el nombre del usuario */}
    </button>
  );
}

export default LogOut;
