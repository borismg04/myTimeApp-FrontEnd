import { Outlet,Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {

  const { auth, cargando } = useAuth();
  
  if(cargando){
    return <h1>Cargando...</h1>
  }

  return (
    <>
      { auth._id ? <Outlet /> : <Navigate to="/" /> }
    </>
  )
}

export default RutaProtegida