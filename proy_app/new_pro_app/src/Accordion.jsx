import React from "react";

const AcordeonItem = ({ encabezado, texto, identificador }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${identificador}`}
          aria-expanded="true"
          aria-controls={`collapse-${identificador}`}
        >
          {encabezado}
        </button>
      </h2>
      <div
        id={`collapse-${identificador}`}
        className="accordion-collapse collapse show"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">{texto}</div>
      </div>
    </div>
  );
};

const Acordeon = () => {
  return (
    <div className="accordion" id="accordionExample">
      <AcordeonItem key="1" encabezado="123" texto="abc" identificador="1" />
      <AcordeonItem
        key="2"
        encabezado="Segundo desplegable"
        texto="este es el texto del segundo desplegable"
        identificador="2"
      />
      <AcordeonItem
        key="3"
        encabezado="Tercer desplegable"
        texto="este es el texto del tercer desplegable"
        identificador="3"
      />
    </div>
  );
};

export default Acordeon;
