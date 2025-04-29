// Clase Pelicula
export class Pelicula {
  // Constructor para inicializar los atributos
  constructor(
    id,
    titulo,
    director,
    anioEstreno,
    paisOrigen,
    genero,
    calificacion
  ) {
    if (!Pelicula.validarIMDB(id))
      throw new Error("El ID de IMDB debe tener 2 letras y 7 números.");
    if (!Pelicula.validarLongitud(titulo, 100))
      throw new Error("El título no debe superar los 100 caracteres.");
    if (!Pelicula.validarLongitud(director, 50))
      throw new Error("El director no debe superar los 50 caracteres.");
    try {
      Pelicula.validarAnio(anioEstreno); // Validar año con mensajes específicos
    } catch (error) {
      throw new Error(error.message); // Pasar el mensaje de error
    }
    if (
      !Array.isArray(paisOrigen) ||
      !Pelicula.validarValores(paisOrigen, Pelicula.paisesAceptables())
    ) {
      throw new Error(
        "País de origen debe ser un array y contener valores aceptables."
      );
    }
    if (
      !Array.isArray(genero) ||
      !Pelicula.validarValores(genero, Pelicula.generosAceptables())
    ) {
      throw new Error(
        "El género debe ser un array y contener valores aceptables."
      );
    }
    if (!Pelicula.validarCalificacion(calificacion))
      throw new Error(
        "La calificación debe ser un número entero entre 0 y 10."
      );

    // Inicializar los atributos
    this.id = id;
    this.titulo = titulo;
    this.director = director;
    this.anioEstreno = anioEstreno;
    this.paisOrigen = paisOrigen;
    this.genero = genero;
    this.calificacion = calificacion;
  }

  // Métodos estáticos para obtener valores aceptables
  static paisesAceptables() {
    return [
      "EEUU",
      "México",
      "España",
      "Francia",
      "Alemania",
      "Japón",
      "Corea del Sur",
    ];
  }

  static generosAceptables() {
    return [
      "Acción",
      "Animación",
      "Arte y ensayo",
      "Aventura",
      "Biográficas",
      "Biopic",
      "Ciencia ficción",
      "Cine negro",
      "Comedia romántica",
      "Comedia",
      "Documental",
      "Drama",
      "Experimental",
      "Fantasía",
      "Guerra",
      "Históricas",
      "Horror",
      "Intriga",
      "Misterio",
      "Musical",
      "Romance",
      "Suspense",
      "Terror",
      "Thriller",
      "Vaquero",
      "Western",
    ];
  }

  // Métodos para validaciones
  static validarIMDB(id) {
    // Verifica que el ID tenga exactamente 9 caracteres
    if (!/^[a-zA-Z\d]{9}$/.test(id)) return false;

    // Cuenta las letras y los números en el ID
    const letras = id.match(/[a-zA-Z]/g) || [];
    const numeros = id.match(/\d/g) || [];

    // Verifica que haya al menos 2 letras y 7 números
    return letras.length >= 2 && numeros.length >= 7;
  }

  static validarLongitud(texto, max) {
    return typeof texto === "string" && texto.length <= max;
  }

  static validarAnio(anio) {
    const anioActual = new Date().getFullYear(); // Obtener el año actual

    // Validar que sea un número de 4 dígitos
    if (!/^\d{4}$/.test(anio)) {
      throw new Error("El año de estreno debe ser un número de 4 dígitos.");
    }

    // Validar que no sea mayor al año actual
    if (anio > anioActual) {
      throw new Error("El año ingresado no puede ser mayor al año actual.");
    }

    // Validar que no sea menor a 1800
    if (anio < 1800) {
      throw new Error("El año ingresado no puede ser menor al año 1800.");
    }

    return true; // Si todo está correcto, retorna verdadero
  }

  static validarValores(array, valoresAceptables) {
    return array.every((valor) => valoresAceptables.includes(valor));
  }

  static validarCalificacion(calificacion) {
    return (
      Number.isInteger(calificacion) && calificacion >= 0 && calificacion <= 10
    );
  }

  // Método para generar la ficha técnica
  fichaTecnica() {
    return `
      ID: ${this.id} <br>
      Título: ${this.titulo} <br>
      Director: ${this.director} <br>
      Año de Estreno: ${this.anioEstreno} <br>
      País de Origen: ${this.paisOrigen.join(", ")} <br>
      Género: ${this.genero.join(", ")} <br>
      Calificación: ${this.calificacion}/10 <br>
      `;
  }
}
