const consulta = function (entrada, callback) {
  let listado = [];
  if (entrada == "pares") {
    listado = Array.from({ length: 10 }, (_, i) => i * 2).filter(
      // Corregí '⇒' por '=>'
      (i) => i % 2 === 0 // Corregí '⇒' por '=>'
    );
  } else {
    listado = Array.from({ length: 10 }, (_, i) => i + 1).filter(
      // Corregí '⇒' por '=>'
      (i) => i % 2 === 1 // Corregí '⇒' por '=>'
    );
  }
  callback(listado); // Ejecutamos el callback con los resultados
};

export const baseDatos = function (peticion, callback) {
  console.log("Petición recibida " + peticion);
  setTimeout(() => {
    // Corregí '⇒' por '=>'
    consulta(peticion, (listado) => {
      // Corregí '⇒' por '=>'
      console.log("Consulta completada:", listado);
      callback(listado); // Pasamos los resultados al callback
    });
  }, 6000);
};
