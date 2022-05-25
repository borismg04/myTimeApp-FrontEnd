import { useEffect} from 'react';
import { useParams ,Link } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useProyectos from '../hooks/useProyectos';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import Tarea from '../components/Tarea';
import Colaborador from '../components/Colaborador';
import io from 'socket.io-client';

let socket;

const ProyectoUnico = () => {

  const params = useParams();

  const { obtenerProyectoUnico , proyecto , cargando , handlerModalTarea ,submitTareasProyecto } = useProyectos();

  const admin  = useAdmin();
  
  useEffect(() => {
    obtenerProyectoUnico(params.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  useEffect(() => {
    socket = io(process.env.REACT_APP_API_URL);
    socket.emit('abrir proyecto', params.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socket.on("tarea agregada", tareaNueva => {
      if(tareaNueva.proyecto === proyecto._id) {
          submitTareasProyecto(tareaNueva)
      }
    })
  })

  const {nombre }= proyecto;
  console.log('proyecto:', proyecto)

  

  if(cargando){
    return 'Cargando ...';
  }

  console.log("Proyecto:",proyecto);

  return (
    <>
    <div className='flex justify-between'>
      <h1 className='font-black text-4xl'>{nombre}</h1>

    {admin && (
      <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>

        <Link
          to={`/proyectos/editar/${params.id}`}
          className= 'uppercase font-bold'
        >Editar</Link>
      </div>
    )}
    </div>

    {admin && (
      <button
        onClick={handlerModalTarea}    
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold
        bg-sky-400 text-white text-center mt-5 flex gap-2 items-center shadow-md justify-center"
      >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" 
        clipRule="evenodd" />
      </svg>
      Nueva Tarea
      </button>
    )}

      <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyecto.tareas?.length ? 
          proyecto.tareas?.map(tarea => (
            <Tarea
              key={tarea._id}
              tarea={tarea}
            />
        )) :
        <p className='text-center my-5 p-10'>No hay Tareas en este Proyecto 😔</p>}
      </div>
    
    {admin && (

      <>
        <div className='flex items-center justify-between mt-10'>
        <p className='font-bold text-xl '>Colaboradores & Participantes</p>
        
          <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
          <Link
            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            className= 'uppercase text-gray-400 hover:text-black font-bold'
          >Agregar</Link>
          </div>
        </div>
        
        <div className='bg-white shadow mt-10 rounded-lg'>
          {proyecto.colaboradores?.length ? 
            proyecto.colaboradores?.map(colaborador => (
              <Colaborador
                key={colaborador._id}
                colaborador={colaborador}
              />
          )) :
          <p className='text-center my-5 p-10'>No hay Colaboradores en este Proyecto 🤨</p>}
        </div>
      </>
    )}
      
      <ModalFormularioTarea/>
      <ModalEliminarTarea/>
      <ModalEliminarColaborador/>
    </>
  )

}

export default ProyectoUnico