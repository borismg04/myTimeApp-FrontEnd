import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import FormularioProyecto from "../components/FormularioProyecto"

const EditarProyectos = () => {

  const params = useParams();

  const { obtenerProyectoUnico , proyecto , cargando } = useProyectos();

  useEffect(() => {
    obtenerProyectoUnico(params.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  const {nombre }= proyecto;

  if(cargando){
    return 'Cargando ...';
  }

  return (
    <>
      <h1 className='font-black text-4xl'>Editar Proyectos : {nombre}</h1>  

      <div className="mt-10 flex justify-center">  
        <FormularioProyecto/>
      </div>

    </>
  )
}

export default EditarProyectos