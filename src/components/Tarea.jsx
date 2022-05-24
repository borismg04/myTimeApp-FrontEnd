import { formatearFecha } from "../helpers/FormatearFecha";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({tarea}) => {

  const { handleModalEditarTarea, handleEliminarTarea } = useProyectos();

  const { nombre, descripcion, fechaEntrega, prioridad , estado , _id } = tarea;

  return (
    <div className="border-b p-5 flex justify-between items-center">

      <div>
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-500">{prioridad}</p>

      </div>

      <div className="flex gap-2">
        <button
          className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEditarTarea(tarea)}
        >Editar
        </button>
          {estado ?(
            <button
              className="bg-green-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Completa
            </button>
          ) : (
            <button
              className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Incompleta
            </button>
          )}

        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={handleEliminarTarea}
        >Eliminar
        </button>

      </div>

    </div>
  )
}

export default Tarea