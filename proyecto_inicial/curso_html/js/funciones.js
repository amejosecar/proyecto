function sacarAlerta(mensaje) {
  console.warn(mensaje);
  alert(mensaje);
}
// aqui se crea el objeto de la calculadora que esta en el archivo calculadora.js
import { calculadora } from "./calculadora.js";

const enviar_resultado = function (mensaje) {
  let div_resultados = document.getElementById("Resultado");
  let nuevo_div = document.createElement("div");
  nuevo_div.textContent = mensaje;
  console.log(nuevo_div);
  div_resultados.appendChild(nuevo_div);
};

// validar si la funcion funciona
// si usas el boton con onclick en el html
// es necesario que usaes el metodo winwos windows.boton_calc = function () {
// no es necesario si usas el addEventListener en el html y aqui
// tampoco es necesraio usar import { calculadora } from "./calculadora.js";
// ya que el objeto calculadora es global y no es necesario volver a importarlo
// ni es necesario colocar el calculadora.js la linea export { calculadora };

const boton_calc = function () {
  // console.log(document.getElementById("tipo_caclculo").value);
  //tomo el valor cel campo valor1
  let valor1 = parseFloat(document.getElementById("valor1").value);
  //tomo el valor cel campo valor2
  let valor2 = parseFloat(document.getElementById("valor2").value);

  // Llama a la función comprobar si los valores son nulos
  // la coloco dentro del objeto
  // calculadora.comprobar(valor1);
  // calculadora.comprobar(valor2);

  //tomo el valor cel campo tipo de calculo
  let opcion = document.getElementById("tipo_caclculo").value;

  // con una sola linea envio el resultado y hago le llamado a la funcion dentro del objeto calculadora
  // document.getElementById("Resultado").innerHTML =
  //   "El resultado de la " +
  //   opcion +
  //   " es: " +
  //   calculadora[opcion](valor1, valor2);
  // console.log(calculadora[opcion](valor1, valor2));

  let solucion = calculadora[opcion](valor1, valor2);

  if (solucion !== false) {
    enviar_resultado(
      `Resultado de ${opcion} ${valor1} y ${valor2} es ${solucion}`
    );
  }
};

function limpiarInput() {
  document.getElementById("valor1").value = ""; // Limpia el valor1
  document.getElementById("valor2").value = ""; // Limpia el valor2
  document.getElementById("Resultado").innerText = ""; // Limpia el resultado
}

// Aquí se añaden los listeners modernos
document.getElementById("boton_calcular").addEventListener("click", boton_calc);

document
  .getElementById("boton_limpiar")
  .addEventListener("click", limpiarInput);
