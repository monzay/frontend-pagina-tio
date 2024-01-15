import { SeccionMostrarTrabajo } from "./secionesWeb/SeccionMostrarTrabajo";
import { SeccionPortada } from "./secionesWeb/SeccionPortada";
import { Link } from "react-router-dom";
import { SeccionRelleno } from "./secionesWeb/SeccionRelleno";
import "animate.css";

export const App = () => {
  return (
    <div className="contenedorApp ">
      <header>
        <div className="header-logo">
          <span>Cody</span>
        </div>
        <Link className="link" to="/administracion">
          administracion
        </Link>
      </header>
      <main>
        <SeccionPortada />
        <SeccionRelleno />
        <SeccionMostrarTrabajo />
      </main>
    </div>
  );
};
