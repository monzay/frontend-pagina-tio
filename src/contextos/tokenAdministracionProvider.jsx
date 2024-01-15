import { createContext, useState,useEffect } from "react"

export const  TokenAdministracionContexto = createContext()


export const TokenAdministracionProvider = ({children}) => {
  const [tokenAdministracion,setTokenAdministracion] = useState(true)
  
  useEffect(() => {
    console.log(tokenAdministracion)  
  }, [tokenAdministracion])
  
  return (
    <TokenAdministracionContexto.Provider value={{tokenAdministracion,setTokenAdministracion}}>
        {children}
    </TokenAdministracionContexto.Provider>
    
  )
}
