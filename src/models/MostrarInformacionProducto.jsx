import "../styles/styleModelMostrarInformacionProducto.css"

export const MostrarInformacionProducto = (producto) => {
    console.log(producto)
  return (
    <div className="contendor-informacio-producto">
    <img className="informacion-producto-img" src={`http://localhost:3000/uploads/${producto.img}`} alt="" />
    <div className="informacion-producto-texto">
      <h5 className="informacion-producto-categoria">Mesas </h5>
      <span className="informacion-producto-descripcion">Echo con madera  y semen de caballo </span>
      <span>si te interesa este producto  me podes hablar al instragrm o al whatsapp</span>
    </div>
  </div>
  )
}
