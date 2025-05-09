export const formatearFechaMostrar = (fecha) => {
  if (!fecha) return "Fecha no disponible";
  const fechaOriginal = new Date(fecha);
  if (isNaN(fechaOriginal.getTime())) return "Fecha inválida";

  const dia = fechaOriginal.getDate().toString().padStart(2, "0");
  const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, "0");
  const anio = fechaOriginal.getFullYear();

  return `${dia}-${mes}-${anio}`;
};

export const getTiempoQueda = (tarea) => {
  if (!tarea.fecha) return "Fecha de entrega no disponible";

  const momento = new Date(tarea.fecha);
  if (isNaN(momento.getTime())) return "Fecha de entrega inválida";

  const ahora = new Date();
  const tiempoQueda = momento - ahora;

  if (tiempoQueda <= 0) return "La tarea está vencida";

  const dias = Math.floor(tiempoQueda / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (tiempoQueda % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((tiempoQueda % (1000 * 60 * 60)) / (1000 * 60));

  return dias > 0
    ? `${dias} días`
    : horas > 0
    ? `${horas} horas`
    : `${minutos} minutos`;
};

// Se valida que la fecha de culminación no sea mayor que la fecha de entrega.
export const manejarCambioFechaCulminacion = (fechaEntrega, fechaNueva) => {
  if (new Date(fechaNueva) > new Date(fechaEntrega)) {
    return {
      ok: false,
      mensaje:
        "La fecha de culminación no puede ser mayor que la fecha de entrega.",
    };
  }

  return { ok: true, fecha: fechaNueva };
};

export const eliminarTareaConConfirmacion = (
  tarea,
  eliminarTarea,
  mostrarMensaje
) => {
  if (window.confirm("¿Estás seguro de que quieres borrar esta tarea?")) {
    eliminarTarea(tarea.id);
    mostrarMensaje("✅ Tarea eliminada correctamente.", "success");
  }
};

export const guardarTareaConValidacion = (
  tarea,
  status,
  guardarTarea,
  mostrarMensaje,
  observacionesRef,
  updateDisabledFields, // Callback para actualizar los estados disabled de los campos editables
  updateRowClass // Callback para actualizar la clase (fondo) de la fila
) => {
  if (status === "Cancelado") {
    if (!tarea.observaciones || tarea.observaciones.trim() === "") {
      mostrarMensaje(
        "🔴 El campo observación debe contener una razón para cancelar.",
        "danger"
      );
      observacionesRef.current && observacionesRef.current.focus();
      return;
    }

    const now = new Date();
    // Forzamos la fecha de culminación a la fecha actual en formato "YYYY-MM-DDTHH:MM"
    tarea.fechaCulminacion = now.toISOString().slice(0, 16);

    guardarTarea(tarea);
    mostrarMensaje("✅ Tarea guardada correctamente.", "success");

    updateDisabledFields({
      fechaCulminacion: true,
      status: true,
      observaciones: true,
    });

    updateRowClass("table-warning");
  } else if (status === "Culminado") {
    if (
      !tarea.fechaCulminacion ||
      tarea.fechaCulminacion.trim() === "" ||
      !tarea.observaciones ||
      tarea.observaciones.trim() === ""
    ) {
      mostrarMensaje(
        "🔴 Los campos Fecha de culminación y Observaciones deben estar llenos.",
        "danger"
      );
      observacionesRef.current && observacionesRef.current.focus();
      return;
    }

    guardarTarea(tarea);
    mostrarMensaje("✅ Tarea guardada correctamente.", "success");

    updateDisabledFields({
      fechaCulminacion: true,
      status: true,
      observaciones: true,
    });

    updateRowClass("table-primary");
  } else {
    // Para Desarrollo
    guardarTarea(tarea);
    mostrarMensaje("✅ Tarea guardada correctamente.", "success");
  }
};
