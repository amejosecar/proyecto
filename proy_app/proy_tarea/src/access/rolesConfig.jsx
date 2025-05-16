// ./access/rolesConfig.jsx
export const NAV_ITEMS = [
  {
    name: "Añadir Tareas",
    path: "/anadirTareas",
    roles: ["Profesor", "AdminApp"], // Solo estos roles pueden acceder
  },
  {
    name: "Consultar Tareas",
    path: "/consultarTareas",
    roles: ["Alumno", "Profesor", "AdminApp"], // Solo estos roles pueden acceder
  },
  {
    name: "Mensajero",
    path: "/mensajero",
    roles: ["Alumno", "Profesor", "AdminApp"], // Solo estos roles pueden acceder
  },
  {
    name: "Usuarios",
    path: "/mensajero",
    roles: ["AdminApp"], // Solo estos roles pueden acceder
  },
];
