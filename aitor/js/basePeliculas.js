const consulta = function (callback) {
  let listado = JSON.parse(localStorage.getItem("peliculas")) || [];
  callback(listado);
};

export const baseDatos = function (renderizarHTML) {
  console.log("Petición recibida");

  setTimeout(() => {
    consulta((listado) => {
      console.log("Consulta completada:", listado);
      renderizarHTML(listado);
    });
  }, 8000);
};
