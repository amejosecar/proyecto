// bloqueante.js
const fs = require("fs"); // Importamos el módulo File System
console.log("Inicio del programa");
// fs.readFileSync es la versión SÍNCRONA (bloqueante) de leer un archivo.
// La 'Sync' al final del nombre es la clave.
// El programa se DETENDRÁ aquí hasta que el archivo 'archivo.txt' se lea completamente.
const data = fs.readFileSync("archivo.txt", "utf8");
// Esta línea SOLO se ejecuta DESPUÉS de que readFileSync haya terminado.
console.log(data);
// Esta línea también espera a que readFileSync
