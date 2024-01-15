import React, { useState } from "react";
import "../styles/styleFromAñadirImg.css";

export const MostrarPanelSubirProducto = ({
  setSeAgregoUnaImg,
  seAgregoUnaImg,
  setMostrarPanelAddImg,
}) => {
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [file, setFile] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [precio, setPrecio] = useState(0);
  

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    setFile(archivo);
  };
  const submit = async (e) => {
    e.preventDefault();

    if (file && categoria && precio) {
      try {
        const formData = new FormData();
          formData.append("img", file);
          formData.append("categoria", categoria);
         formData.append("descripcion", descripcion);
         formData.append("precio", precio);
        
        const response = await fetch(`https://backendtiomanualidades.onrender.com/addImg`, {
          method: "POST",
          body: formData,
        });
        const res = await response.json();
        setSeAgregoUnaImg(!seAgregoUnaImg);
        setMensajeError(res.message);
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else {
      setMensajeError("tefalta la img o la categoria");
    }
  };

  return (
    <div className="contenedor-form">
      <div onClick={() => setMostrarPanelAddImg(false)} className="logo-salir">
        <span>X</span>
      </div>
      <div className="form-container">
        <form className="form" action="" onSubmit={submit}>
          <label htmlFor="file" className="custum-file-upload">
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    fill=""
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="text">
              <span className="span-file">Click to upload image</span>
            </div>
            <input
              className="input-file"
              onChange={handleFileChange}
              id="file"
              type="file"
            />
          </label>

        <div style={{display:"flex"}}>
        <div className="form-group">
            <label htmlFor="categoria">categoria</label>
            <input
              className="input-categoria"
              type="text"
              id="categoria"
              name="categoria"
              required=""
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="precio">precio</label>
            <input
              className="input-categoria"
              type="number"
              id="precio"
              name="precio"
              required=""
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
        </div>
          <div className="form-group">
            <label htmlFor="textarea">How Can We Help You?</label>
            <textarea
              onChange={(e) => setDescripcion(e.target.value)}
              id="textarea"
              rows="10"
              cols="50"
              required=""
            >
            </textarea>
          </div>
          <button className="form-submit-btn">Enviar</button>
        </form>
        <span>{mensajeError} </span>
      </div>
    </div>
  );
};
