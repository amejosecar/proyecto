// noBloqueante.js
const fs = require("fs"); // Importamos el módulo File System
console.log("Inicio del programa");

// fs.readFile es la versión ASÍNCRONA (no bloqueante) por defecto.
// No devuelve el contenido directamente, sino que acepta una función de 'callback'.
// Node.js inicia la operación de lectura y sigue ejecutando el código siguiente inmediatamente.
fs.readFile("archivo.txt", "utf8", (err, data) => {
  // Esta función de callback se ejecutará más tarde, cuando la lectura del archivo termine.
  if (err) {
    // Es crucial manejar posibles errores en operaciones asíncronas.
    console.error("Error al leer el archivo:", err);
    return; // O manejar el error de otra forma
  }
  // Si no hubo error, 'data' contiene el contenido del archivo.
  console.log(data);
});

// Esta línea se ejecuta inmediatamente después de iniciar readFile,
// sin esperar a que la lectura del archivo termine.
console.log("Fin del programa");
