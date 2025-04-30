// single-thread.js
console.log("Inicio"); // 1. Síncrono
setTimeout(() => {
  // 2. Asíncrono (Timer 1)
  console.log("Uno");
}, 3000); // Se ejecutará después de ~3000ms
setTimeout(() => {
  // 3. Asíncrono (Timer 2)
  console.log("Dos");
}, 5000); // Se ejecutará "lo antes posible", pero después del script actual
setTimeout(() => {
  // 4. Asíncrono (Timer 3)
  console.log("Tres");
}, 8000); // Igual que el anterior, se encola después del Timer 2
console.log("Fin"); // 5. Síncrono
