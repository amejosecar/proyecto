import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
//import "./App.css";
import BasicAccordion from "./Accordion"; // Importamos el componente desde Accordion.jsx

function App() {
  const [count, setCount] = useState(0);
  const saludar = () => alert(`La cuenta es ${count}`);
  return (
    <>
      <div className="seccion">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="seccion">
        <h1>Vite + React</h1>
      </div>

      <div className="seccion">
        {/* Usamos el componente de Accordion importado */}
        <BasicAccordion />
      </div>

      <div className="seccion">
        <div className="card">
          <button
            className="btn btn-success"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> y guarda para ver HMR
          </p>
        </div>
      </div>

      <div className="seccion">
        {/* Nueva línea agregada */}
        <button className="btn btn-danger" onClick={saludar}>
          Mostrar Alerta
        </button>
      </div>

      <div className="seccion">
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
