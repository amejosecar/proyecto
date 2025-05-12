import React, { useState } from "react";

function MensajeForm({ handleNewMessage }) {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construcción exacta de la URL como especificas
    const url = new URL("https://aitor.alwaysdata.net/publicacion");
    url.searchParams.append("titulo", titulo);
    url.searchParams.append("contenido", contenido);
    if (autor) url.searchParams.append("autor", autor);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Mantenemos JSON como en tu versión funcional
      },
      body: JSON.stringify({}), // Cuerpo vacío ya que todo va en la URL
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Mensaje enviado:", data);
        // Limpiar formulario
        setTitulo("");
        setContenido("");
        setAutor("");
        // Notificar al padre
        if (handleNewMessage) handleNewMessage();
      })
      .catch((error) => {
        console.error("Error al enviar:", error);
        alert("Error al enviar el mensaje. Por favor, inténtalo de nuevo.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">
          Título*
        </label>
        <input
          type="text"
          className="form-control"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contenido" className="form-label">
          Contenido*
        </label>
        <textarea
          className="form-control"
          id="contenido"
          rows="3"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="autor" className="form-label">
          Autor
        </label>
        <input
          type="text"
          className="form-control"
          id="autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Enviar Mensaje
      </button>
    </form>
  );
}

export default MensajeForm;
