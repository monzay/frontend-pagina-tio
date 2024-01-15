import React from "react";
import "../styles/styleFondo.css";

export const SeccionPortada = () => {
  return (
    <section className="seccion-portada">
      <div className="seccion-portada-texto">
        <h1 className="portada-texto-title">Manualidades</h1>
        <span className="portada-texto-descripcion">
          lo pedis lo hago y asi de facil <br /> lo tenes en tu casa
        </span>
      </div>
      <button className="portada-btn">Contactame</button>
      <div className="contendor-fondo">
        <span className="span"></span>
        <span className="span"></span>
        <span className="span"></span>
        <span className="span"></span>
      </div>
    </section>
  );
};
