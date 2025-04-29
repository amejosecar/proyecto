// aqui se crea el objeto de la calculadora
export { calculadora };
let calculadora = {
  suma: function (a, b) {
    if (this.comprobar(a) && this.comprobar(b)) {
      return a + b;
    } else {
      return false; // o cualquier otro valor que desees retornar en caso de error
    }
  },
  resta: function (a, b) {
    if (this.comprobar(a) && this.comprobar(b)) {
      return a - b;
    } else {
      return false; // o cualquier otro valor que desees retornar en caso de error
    }
  },
  Multi: function (a, b) {
    if (this.comprobar(a) && this.comprobar(b)) {
      return a * b;
    } else {
      return false; // o cualquier otro valor que desees retornar en caso de error
    }
  },

  divide: function (a, b) {
    if (b === 0) {
      return "Error: El dominador no puede ser 0"; // Manejo de error para división por cero
    } else {
      if (this.comprobar(a) && this.comprobar(b)) {
        return a / b;
      } else {
        return false; // o cualquier otro valor que desees retornar en caso de error
      }
    }
  },

  comprobar: function (valor) {
    if (isNaN(valor) || valor === Infinity || valor === -Infinity) {
      alert("Infinity Por favor, ingrese un número válido.");
      limpiarInput(); // Limpia el input si no es un número válido
      return false;
    } else {
      return true; // Si es un número válido, retorna true
    }
  },
};
