// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import BarraNavegacion from "./components/BarraNavegacion";
import LogIn from "./LogIn";
import AnadirTareas from "./AnadirTareas";
import ConsultarTareas from "./ConsultarTareas";
import Mensajero from "./Mensajero";
import Registro from "./access/Registro.jsx";
import OlvidasteContrasena from "./access/OlvidasteContrasena.jsx";
import VerificarEmail from "./access/VerificarEmail.jsx";
import Cerrado from "./access/cerrado.jsx";
import EditarPerfil from "./access/editarPerfil.jsx"; // Ajusta la ruta según corresponda

function App() {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Renderizamos el modal globalmente si está activo */}
        {showEditModal && (
          <EditarPerfil
            showModal={showEditModal}
            handleClose={() => setShowEditModal(false)}
          />
        )}
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
                <BarraNavegacion setShowEditModal={setShowEditModal} />
                <h2 className="text-center mt-4">Estoy en App</h2>
              </>
            }
          />
          <Route
            path="/anadirTareas"
            element={
              <>
                <BarraNavegacion setShowEditModal={setShowEditModal} />
                <AnadirTareas />
              </>
            }
          />
          <Route
            path="/consultarTareas"
            element={
              <>
                <BarraNavegacion setShowEditModal={setShowEditModal} />
                <ConsultarTareas />
              </>
            }
          />
          <Route
            path="/mensajero"
            element={
              <>
                <BarraNavegacion setShowEditModal={setShowEditModal} />
                <Mensajero />
              </>
            }
          />

          {/* Redirección a login si se accede a la raíz */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/cerrado" element={<Cerrado />} />
          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
