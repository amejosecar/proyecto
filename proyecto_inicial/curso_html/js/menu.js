// Array de objetos con los enlaces y textos del menú
/* const links = [
  { href: "contador.html", text: "Contador" },
  { href: "contador_listener.html", text: "contador_listener" },
  { href: "Conversor_Temperatura.html", text: "Conversor de Temperatura" },
  { href: "Conversor_Temp_switch.html", text: "Conversor_Temp_switch" },
  { href: "calculadora.html", text: "Calculadora" },
  { href: "lista.html", text: "Lista de Tareas" },
  { href: "Tabla_de_Multiplicar.html", text: "Tabla deMultiplicar" },
  { href: "adivinanza_numeros.html", text: "Adivinanza de números" },
  { href: "ejercicio_clases.html", text: "Ejercicio de clases" },
];

// Seleccionar el contenedor donde se insertará el menú
const menuContainer = document.getElementById("menu");

// Generar el menú dinámicamente
links.forEach((link) => {
  const anchor = document.createElement("a"); // Crear un elemento <a>
  anchor.href = link.href; // Asignar la URL
  anchor.textContent = link.text; // Asignar el texto del enlace
  menuContainer.appendChild(anchor); // Agregar el <a> al contenedor

  // Crear un salto de línea después de cada enlace
  const lineBreak = document.createElement("br");
  menuContainer.appendChild(lineBreak);
});
 */
// Array de objetos con los enlaces y textos del menú
const links = [
  { href: "contador.html", text: "Contador" },
  { href: "contador_listener.html", text: "contador_listener" },
  { href: "Conversor_Temperatura.html", text: "Conversor de Temperatura" },
  { href: "Conversor_Temp_switch.html", text: "Conversor_Temp_switch" },
  { href: "calculadora.html", text: "Calculadora" },
  { href: "lista.html", text: "Lista de Tareas" },
  { href: "Tabla_de_Multiplicar.html", text: "Tabla deMultiplicar" },
  { href: "adivinanza_numeros.html", text: "Adivinanza de números" },
  { href: "ejercicio_clases.html", text: "Ejercicio de clases" },
];

// Seleccionar el contenedor donde se insertará el menú
const menuContainer = document.getElementById("menu");

// Generar el menú dinámicamente con guiones
const menuText = links
  .map((link) => `<a href="${link.href}">${link.text}</a>`) // Crear los enlaces
  .join(" - "); // Unir los enlaces con guiones

menuContainer.innerHTML = menuText; // Insertar el HTML generado en el contenedor
