
const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu Contraseña y no pierdas tus
        <span className="text-slate-700"> Proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow-xl rounded-lg p-10">
        
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Nueva Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu Nueva Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>

        <input
          type="submit"
          value="Guardar Nueva Contraseña"
          className="w-full bg-sky-700 mb-5 py-3 text-white uppercase font-bold rounded-xl
            hover:cursor-pointer hover:bg-sky-800 transiton-colors"
        />
      </form>

      
    </>
  )
}

export default NuevoPassword