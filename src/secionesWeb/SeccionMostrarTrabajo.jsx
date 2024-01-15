import "swiper/css";
import "../styles/stylesApp.css";
import "../styles/styleMode.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/virtual";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";

import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useContext } from "react";
import { MostrarPanelEditar } from "../models/MostrarPanelEditar";
import { TokenAdministracionContexto } from "../contextos/tokenAdministracionProvider";
import { useRef } from "react";
import { MostrarPanelSubirProducto } from "../models/MostrarPanelSubirProducto";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import "../styles/styleModelMostrarInformacionProducto.css"





export const SeccionMostrarTrabajo = () => {
  const { tokenAdministracion } = useContext(TokenAdministracionContexto);

  const [mostrarInformacion, setMostrarInformacion] = useState(false);
  const [imgServer, setImgsServer] = useState([]);
  const [nombresCategoria, setNombresCategoria] = useState([]);
  const [idProducto, setIdProducto] = useState(0);
  const [mostrarPanelEditarProducto, setMostraPanelEditarProducto] =
    useState(false);
  const [clickCategoria, setClickCategoria] = useState("");
  const [distanciaScroll, setDistanciaScroll] = useState(0);
  const [distanciaSMT, setDistanciaSMT] = useState(0);
  const [mostrar, setMostrar] = useState(false);
  const seccionMostrarTrabajos = useRef(null);
  const [idProductoMostrar, setIdProductoMostrar] = useState(0);
  const [mostrarPanelAddImg,setMostrarPanelAddImg] = useState(false)


  /*estados para que actualizen las img  */
  const [seAgregoUnaImg,setSeAgregoUnaImg] = useState(false)
  const [seActualizoElProducto,setSeActualizoElProducto] = useState(false)
  const [seEliminoUnProducto,setSeEliminoUnProducto] = useState(false)

  useEffect(() => {
    const scroll = () => {
      const distancia = window.scrollY;
      setDistanciaScroll(distancia);
      if (distancia > 450) {
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
    const SMT = seccionMostrarTrabajos.current;
    const SMT2 = SMT.getBoundingClientRect();
    const distancia = SMT2.top;
    setDistanciaSMT(distancia);
  }, []);

  const arrayConLosNombresDeLaCategoriaNoRepetido = (data) => {
    const nombresCategoriasLimpiado = [];
    for (let i = 0; i < data.length; i++) {
      const categoria = data[i].categoria;
      if (
        categoria !== null &&
        !nombresCategoriasLimpiado.includes(categoria)
      ) {
        nombresCategoriasLimpiado.push(categoria);
      }
    }
    return nombresCategoriasLimpiado;
  };
  const mostrarCategoriaQueElUsuarioQuiera = (data) => {
  if(clickCategoria === ""){
    const categoria = data.filter((categoria) =>
    categoria.categoria === data[0].categoria ? categoria
      : null
  );
  return categoria
  }else{
    const categoria = data.filter((categoria) =>
    categoria.categoria === clickCategoria ? categoria
      : null
  );
  return categoria 
  }
  };

  useEffect(() => {
    const llamarImg = async () => {
      try {
        const response = await fetch("http://localhost:3000/imgs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setNombresCategoria(
          arrayConLosNombresDeLaCategoriaNoRepetido(data.data)
        );
        setImgsServer(mostrarCategoriaQueElUsuarioQuiera(data.data));
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    llamarImg();
  }, [idProducto,clickCategoria,seAgregoUnaImg,seActualizoElProducto,seEliminoUnProducto]);

  const eliminarProducto = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteImg/${id}`, {
        method: "DELETE",
      });
      const res = await response.json();
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section ref={seccionMostrarTrabajos} className="seccion-mostrar-productos">
      <div  className="contenedor-categorias">
        <h2 className={`container-title ${mostrar ? "mostrar-title" : ""}`}>
          Categorias
        </h2>
        {
              <div className="contendor-categoria-slider">
                <GoChevronRight className="swiper-btn-prev"/>
              <Swiper
              className="swiper-padre"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={1}
                slidesPerView={4}
                navigation={{
                  prevEl: ".swiper-btn-prev",
                  nextEl: ".swiper-btn-next",
                }}
                loop={true}
              >
                {nombresCategoria.map((categoria,i) => (
                  <SwiperSlide   onClick={() => {
                    setClickCategoria(categoria);
                  }} className="swiper-slide-categoria">
                    <span   
                  key={i} className="btns-categorias">{categoria} </span>
                  </SwiperSlide>
                ))}
              </Swiper>
              <GoChevronLeft className="swiper-btn-next" />
            </div>
        }
      </div>
      <div className="container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow]}
          loop={true}
          className="swiper_container"
        >
          {imgServer &&
            imgServer.map((img, index) => (
              <SwiperSlide className="swiper-slider" key={index}>
                <img
                key={index}
                 className="swiper-img-productos"
                  onClick={() => {
                    setIdProductoMostrar(img.id);
                    setMostrarInformacion(true);
                  }}
                  src={`http://localhost:3000/uploads/${img.img}`}
                  alt="slide_image"
                />
                <div className="contenedor-btns">
                  {tokenAdministracion && (
                    <>
                      <button
                        className="btn-editar"
                        onClick={() => {
                          setMostraPanelEditarProducto(true);
                          setIdProducto(img.id);
                        }}
                      >
                        editar
                      </button>
                      <button
                        className="btn-editar"
                        onClick={() => {
                          setSeEliminoUnProducto(!seEliminoUnProducto)
                          setIdProducto(img.id);
                          eliminarProducto(img.id);
                        }}
                      >
                        eliminar
                      </button>
                    </>
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
        <span></span>
      {mostrarPanelEditarProducto && <MostrarPanelEditar  setSeActualizoElProducto={setSeActualizoElProducto} seActualizoElProducto={seActualizoElProducto} id={idProducto} setMostraPanelEditarProducto={setMostraPanelEditarProducto} />}
      {mostrarInformacion &&
        imgServer.map((producto) =>
          producto.id == idProductoMostrar ? (
            <div className="contendor-informacio-producto">
              <img  className="informacion-producto-img" src={`http://localhost:3000/uploads/${producto.img}`}  alt="" />
              <div className="informacion-producto-texto">
                <h5 className="informacion-producto-categoria">categoria:{producto.categoria}</h5>
                <span className="informacion-producto-precio">precio: {producto.precio}</span>
                <span className="informacion-producto-identificador">id : {producto.idProducto} </span>
                <span className="informacion-producto-descripcion">
                  {producto.descripcion}
                </span>
                <span>
                  el numero del producto me lo podes mandar al privado para yo saber que producto queres cualquier duda me lo comentas  y que res algo personalizado tambien me lo comaentas 
                </span>
              </div>
              <div onClick={() => setMostrarInformacion(false)} className="informacion-producto-conteneder-logo">
                <span>X</span>
              </div>
            </div>
          ) : null
        )}
        {
          tokenAdministracion && <div onClick={() => setMostrarPanelAddImg(true)} className="contenedor-logo">
            <span className="logo"> + </span>
          </div>
        }
      {mostrarPanelAddImg && <MostrarPanelSubirProducto setMostrarPanelAddImg={setMostrarPanelAddImg} setSeAgregoUnaImg={setSeAgregoUnaImg} seAgregoUnaImg={seAgregoUnaImg} />}
    </section>
  );
};
