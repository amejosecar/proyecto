import { useEffect, useState } from "react";
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
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-center mb-4">Listado de Tareas - Americo - React</h1>
      <AnadirTarea agregarTarea={agregarTarea} />
      <h2>Tareas pendientes</h2>
      <MostrarTarea tareas={tareas} eliminarTarea={eliminarTarea} />
      {mostrarAdvertencia && (
        <div id="advertencia" className="alert alert-danger">
          Tienes demasiadas tareas importantes
        </div>
      )}
    </Container>
  );
}

export default App;

// import { useState } from "react";
// import Container from "react-bootstrap/Container";
// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import Toast from "react-bootstrap/Toast";
// //import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const [tareas, setTareas] = useState([]);
//   const [nombreTarea, setNombreTarea] = useState("");
//   const [descripcionTarea, setDescripcionTarea] = useState("");
//   const [importancia, setImportancia] = useState("");
//   const [fechaEntrega, setFechaEntrega] = useState("");
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastVariant, setToastVariant] = useState("success");
//   const [showToast, setShowToast] = useState(false);

//   // Función genérica para mostrar un Toast
//   const mostrarToast = (mensaje, tipo) => {
//     setToastMessage(mensaje);
//     setToastVariant(tipo);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000); // Ocultar después de 3 segundos
//   };

//   // Función para añadir tareas con validación
//   const aniadirTarea = () => {
//     if (!nombreTarea || !descripcionTarea || !importancia || !fechaEntrega) {
//       mostrarToast("⚠️ Todos los campos son obligatorios.", "danger");
//       return;
//     }

//     const nuevaTarea = {
//       id: tareas.length + 1,
//       nombre: nombreTarea,
//       descripcion: descripcionTarea,
//       importancia: importancia,
//       fecha: new Date(fechaEntrega).toLocaleString(),
//     };

//     console.log(nuevaTarea); // 👀 Verifica en la consola el valor de "importancia"

//     setTareas([...tareas, nuevaTarea]);
//     mostrarToast("✅ Tarea añadida correctamente.", "success");

//     // Limpiar los campos después de añadir la tarea
//     setNombreTarea("");
//     setDescripcionTarea("");
//     setImportancia("");
//     setFechaEntrega("");
//   };

//   // Función para eliminar tarea
//   const borrarTarea = (indice) => {
//     mostrarToast(`🗑️ Tarea "${tareas[indice].nombre}" eliminada.`, "warning");
//     setTareas(tareas.filter((_, i) => i !== indice));
//   };

//   return (
//     //<Container className="mt-4 d-flex flex-column align-items-center">
//     <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
//       <h1 className="text-center mb-4">
//         Listado de Tareas - Americo - react-bootstrap
//       </h1>

//       {/* Tabla Campos de entrada */}
//       <div className="d-flex justify-content-center w-100">
//         <Table bordered striped className="text-center w-75 mx-auto">
//           <thead className="bg-light">
//             <tr>
//               <th>Nombre de la tarea</th>
//               <th>Descripción de la tarea</th>
//               <th>Importancia</th>
//               <th>Fecha de Entrega</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={nombreTarea}
//                   onChange={(e) => setNombreTarea(e.target.value)}
//                   placeholder="Nombre de la tarea"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={descripcionTarea}
//                   onChange={(e) => setDescripcionTarea(e.target.value)}
//                   placeholder="Descripción de la tarea"
//                 />
//               </td>
//               <td>
//                 <select
//                   className="form-select"
//                   value={importancia}
//                   onChange={(e) => setImportancia(e.target.value)}
//                 >
//                   <option value="">Selecciona la importancia</option>
//                   <option value="Muy importante">Muy importante</option>
//                   <option value="Importante">Importante</option>
//                   <option value="Normal">Normal</option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   value={fechaEntrega}
//                   onChange={(e) => setFechaEntrega(e.target.value)}
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//       </div>

//       {/* Botón Añadir Tarea */}
//       <div className="d-flex justify-content-center mt-3 mb-4">
//         <Button variant="success" onClick={aniadirTarea}>
//           Añadir Tarea
//         </Button>
//       </div>

//       {/* Tabla centrada con botón de borrar */}
//       <div className="d-flex justify-content-center w-100">
//         <Table bordered striped className="text-center w-75">
//           <thead className="bg-light">
//             <tr>
//               <th>#</th>
//               <th>Nombre</th>
//               <th>Descripción</th>
//               <th>Importancia</th>
//               <th>Fecha de entrega</th>
//               <th>Acción</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tareas.length > 0 ? (
//               tareas.map((tarea, indice) => (
//                 <tr
//                   key={indice}
//                   className={
//                     tarea.importancia.trim().toLowerCase() === "muy importante"
//                       ? "table-danger text-white"
//                       : ""
//                   }
//                 >
//                   <td>{indice + 1}</td>
//                   <td>{tarea.nombre}</td>
//                   <td>{tarea.descripcion}</td>
//                   <td>{tarea.importancia}</td>
//                   <td>{tarea.fecha}</td>
//                   <td>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => borrarTarea(indice)}
//                     >
//                       Borrar
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   No hay tareas añadidas.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>
//       <div>
//         {/* Toast de alerta */}
//         <Toast
//           show={showToast}
//           onClose={() => setShowToast(false)}
//           bg={toastVariant}
//         >
//           <Toast.Header>
//             <strong className="me-auto">Notificación</strong>
//           </Toast.Header>
//           <Toast.Body>{toastMessage}</Toast.Body>
//         </Toast>
//       </div>
//     </Container>
//   );
// }

// export default App;
