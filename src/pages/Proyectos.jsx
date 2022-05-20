import useProyectos from "../hooks/useProyectos";
import ListaProyectos from "../components/ListaProyectos";

const Proyectos = () => {

  const { proyectos } = useProyectos();
  console.log('proyectos:', proyectos)

  return (
    <>
      <h1 className="text-4xl font-black">Mis Proyectos</h1>

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