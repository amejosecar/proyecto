import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import BarraNavegacion from "./components/BarraNavegacion";
import LogIn from "./LogIn";
import AnadirTareas from "./AnadirTareas";
import ConsultarTareas from "./ConsultarTareas";
import Mensajero from "./Mensajero";
import Registro from "./context/Registro";
import OlvidasteContrasena from "./context/OlvidasteContrasena";
import VerificarEmail from "./context/VerificarEmail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas de autenticación */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/olvidaste-contrasena"
            element={<OlvidasteContrasena />}
          />
          <Route path="/verificar-email" element={<VerificarEmail />} />

          {/* Rutas de la aplicación principal */}
          <Route
            path="/app"
            element={
              <>
                <BarraNavegacion />
                <h2 className="text-center mt-4">Estoy en home</h2>
                {/* Aquí podrías agregar otros componentes de tu Dashboard o contenido principal */}
              </>
            }
          />
          <Route
            path="/anadirTareas"
            element={
              <>
                <BarraNavegacion />
                <AnadirTareas />
              </>
            }
          />
          <Route
            path="/consultarTareas"
            element={
              <>
                <BarraNavegacion />
                <ConsultarTareas />
              </>
            }
          />
          <Route
            path="/mensajero"
            element={
              <>
                <BarraNavegacion />
                <Mensajero />
              </>
            }
          />

          {/* Redirección a login si se accede a la raíz */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
