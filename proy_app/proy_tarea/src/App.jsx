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
import EditarPerfil from "./access/editarPerfil.jsx";
import RoleProtectedRoute from "./access/RoleProtectedRoute.jsx"; // Componente de ruta protegida

function App() {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Modal global para editar perfil */}
        {showEditModal && (
          <EditarPerfil
            showModal={showEditModal}
            handleClose={() => setShowEditModal(false)}
          />
        )}

        <Routes>
          {/* Rutas públicas (Autenticación) */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/olvidaste-contrasena"
            element={<OlvidasteContrasena />}
          />
          <Route path="/verificar-email" element={<VerificarEmail />} />

          {/* Rutas protegidas por roles */}
          <Route
            path="/App"
            element={
              <RoleProtectedRoute
                allowedRoles={["Alumno", "Profesor", "AdminApp"]}
              >
                <>
                  <BarraNavegacion setShowEditModal={setShowEditModal} />
                  <h2 className="text-center mt-4">Estoy en App</h2>
                </>
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/anadirTareas"
            element={
              <RoleProtectedRoute allowedRoles={["Profesor", "AdminApp"]}>
                <>
                  <BarraNavegacion setShowEditModal={setShowEditModal} />
                  <AnadirTareas />
                </>
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/consultarTareas"
            element={
              <RoleProtectedRoute
                allowedRoles={["Alumno", "Profesor", "AdminApp"]}
              >
                <>
                  <BarraNavegacion setShowEditModal={setShowEditModal} />
                  <ConsultarTareas />
                </>
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/mensajero"
            element={
              <RoleProtectedRoute
                allowedRoles={["Alumno", "Profesor", "AdminApp"]}
              >
                <>
                  <BarraNavegacion setShowEditModal={setShowEditModal} />
                  <Mensajero />
                </>
              </RoleProtectedRoute>
            }
          />

          {/* Otras rutas públicas o de error */}
          <Route path="/cerrado" element={<Cerrado />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
