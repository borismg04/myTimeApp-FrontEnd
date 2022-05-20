import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';

const ProyectoUnico = () => {

  const params = useParams();

  const { obtenerProyectoUnico , proyecto} = useProyectos();

  useEffect(() => {
    obtenerProyectoUnico(params.id);
  } , []);

  const {nombre}= proyecto;

  return (
    <div>
      <h1 className='font-black text-4xl'>{nombre}</h1>
    </div>
  )
}

export default ProyectoUnico