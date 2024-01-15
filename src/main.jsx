import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FormularioAdministracion } from './FormularioAdmistracion';
import { TokenAdministracionProvider } from './contextos/tokenAdministracionProvider';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TokenAdministracionProvider>
         <App/>
      </TokenAdministracionProvider>
    ),
  },
  {
    path: "/administracion",
    element:(
      <TokenAdministracionProvider>
          <FormularioAdministracion />
      </TokenAdministracionProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <  RouterProvider router={router}/>
  </React.StrictMode>,
)
