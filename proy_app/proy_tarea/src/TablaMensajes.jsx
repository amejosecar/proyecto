const TablaMensajes = ({ mensajes, onBorrarMensaje }) => {
  return (
    <table className="table table-striped table-bordered table-hover table-responsive">
      <thead className="table-dark">
        <tr>
          <th className="text-nowrap">ID</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Contenido</th>
          <th className="text-nowrap">Fecha de creación</th>
          <th className="text-nowrap">Fecha de publicación</th>
        </tr>
      </thead>
      <tbody>
        {mensajes.map((mensaje) => (
          <tr key={mensaje.id}>
            <td className="font-monospace">
              <button onClick={() => onBorrarMensaje(mensaje.id)}>
                Borrar
              </button>
            </td>
            <td className="fw-semibold">{mensaje.titulo}</td>
            <td>{mensaje.autor}</td>
            <td className="text-truncate" style={{ maxWidth: "200px" }}>
              {mensaje.contenido}
            </td>
            <td className="text-nowrap">
              {new Date(mensaje.fecha_creacion).toLocaleString()}
            </td>
            <td className="text-nowrap">
              {mensaje.fecha_publicacion ? (
                new Date(mensaje.fecha_publicacion).toLocaleString()
              ) : (
                <span className="text-muted">No modificada</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaMensajes;
