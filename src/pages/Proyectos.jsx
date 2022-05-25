import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import ListaProyectos from "../components/ListaProyectos";
import Alerta from "../components/Alerta";
import io from "socket.io-client";

let socket;

const Proyectos = () => {

  const { proyectos,alerta } = useProyectos();

  const { msg } = alerta;

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_API_URL}`);

  } , []);

  return (
    <>
      <h1 className="text-4xl font-black">Mis Proyectos</h1>

      {msg && <Alerta msg={msg} />}

      <div className="bg-white shadow mt-10 rounded-lg p-8">
        {proyectos.length ?  
          proyectos.map(proyecto => (
            <ListaProyectos 
              key={proyecto._id}
              proyecto={proyecto}
              />
          ))

        : <p className="text-center 
        text-gray-600 uppercase p-8">
        No hay Proyectos aún 😔</p>}
      </div>
    </>
  )
}

export default Proyectos