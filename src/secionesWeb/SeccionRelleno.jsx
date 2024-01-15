import React, { useRef, useState, useEffect } from "react";
import { sacarDistanciaElemento } from "../funciones/sacarAlturaElementos";

export const SeccionRelleno = () => {
  const seccionRelleno = useRef(null);
  const [alturaRS, setAlturaSR] = useState(0);
  const [mostrar, setMostrar] = useState(false);
  const [distanciaScroll, setDistanciaScroll] = useState(0);

  useEffect(() => {
    const scroll = () => {
      const distancia = window.scrollY;
      if (distancia > 100) {
        setDistanciaScroll(distancia);
        setMostrar(true);
      } else {
        setMostrar(false);
      }
    };
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [distanciaScroll]);

  useEffect(() => {
    const altura = sacarDistanciaElemento(seccionRelleno);
    setAlturaSR(altura);
  }, []);

  return (
    <section ref={seccionRelleno} className="seccion-relleno">
      <h2
        className={`seccion-relleno-titulo ${
          mostrar ? "animate__animated animate__fadeInDown" : ""
        }`}
      >
        {" "}
        Descubre la Creatividad
      </h2>
      <p
        className={`seccion-relleno-mensaje ${
          mostrar ? "mostrarTextoSeccionRelleno" : ""
        }`}
      >
        En nuestra tienda de manualidades, te ofrecemos una amplia gama de
        productos y materiales para que puedas dar vida a tus ideas. ¡Explora
        nuestras opciones y deja volar tu imaginación!
      </p>
      <p
        className={`seccion-relleno-contacto ${
          mostrar ? "mostrarTextoSeccionRelleno" : ""
        }`}
      >
        ¿Tienes alguna pregunta o buscas algo específico? No dudes en ponerte en
        contacto con nosotros. Estamos aquí para ayudarte a crear proyectos
        únicos y personalizados.
      </p>
    </section>
  );
};
