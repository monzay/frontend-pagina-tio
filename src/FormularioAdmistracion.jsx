import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenAdministracionContexto } from "./contextos/tokenAdministracionProvider";
import "./styles/styleFromAñadirImg.css"
import "./styles/styleFromAdministrador.css"


const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (!values.password > 8) {
    errors.password = "la contraseña es muy corta";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if(values.name !== ""){
    errors.name = "te falto el nombre gil"
  }else if (values.name.length === 14)                     

  return errors;
};

export const FormularioAdministracion = () => {

  const { setTokenAdministracion} =  useContext(TokenAdministracionContexto)
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      
      const name = values.name.toLowerCase()
      const email = values.email.toLowerCase()
      const password = values.password.toLowerCase()
      

      const credencialesAdministrador = {
        nombre:name,
        email:email,
        password:password 
      }

      try { 
        const response = await fetch(`https://backettiomanualidades.onrender.com/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credencialesAdministrador) ,
        });
        const res = await response.json();
        setTokenAdministracion(res.token)
        console.log(res)
        setMensajeError(res.message)
        if(res.token){
          navigate("/")
        }
       
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="contenedor-form">
          <div class="form-container">
          <form  className="form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
      <label htmlFor="name">name</label>
      <input
        className="input-categoria"
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
      </div>
     
      <div className="form-group">
      <label htmlFor="email">email</label>
      <input  className="input-categoria"
        id="email"
        name="email"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      </div>




      <div className="form-group"> 
      <label htmlFor="password">password</label>
      <input  className="input-categoria"
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      </div>
      <span>{mensajeError} </span>

      <button className="form-submit-btn" type="submit">Enviar</button>
    </form>
    </div>
    </div>
  );
};
