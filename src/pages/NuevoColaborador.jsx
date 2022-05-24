import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"

const NuevoColaborador = () => {

  const {obtenerProyectoUnico , proyecto }= useProyectos();
  const params = useParams();

  useEffect(() => {
    obtenerProyectoUnico(params.id);
  } , [])


  return (
    <>
      <h1 className="text-4xl font-black">Añadir Colaborador(a) o Participante al Proyecto:{proyecto.nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

    </>
  )
}

export default NuevoColaborador