import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';

const ProyectoUnico = () => {

  const params = useParams();

  const { obtenerProyectoUnico , proyecto , cargando } = useProyectos();

  useEffect(() => {
    obtenerProyectoUnico(params.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  const {nombre }= proyecto;

  return (

    cargando ? '...' : (
    <div>
      <h1 className='font-black text-4xl'>{nombre}</h1>
    </div>)
  )
}

export default ProyectoUnico