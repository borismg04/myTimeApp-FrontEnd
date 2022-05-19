import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      
      <h1 className="text-sky-600 font-black text-6xl capitalize">Iniciar Sesión & Administra tus 
      <span className="text-slate-700"> Proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow-xl rounded-lg p-10">
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="email"
          >Email</label>
          <input
            id="email"          
            type="email"
            placeholder="Ingresa tu Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="password"
          >Password</label>
          <input
            id="password"          
            type="password"
            placeholder="Ingresa tu Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full bg-sky-700 mb-5 py-3 text-white uppercase font-bold rounded-xl
          hover:cursor-pointer hover:bg-sky-800 transiton-colors"
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'        
          to="/registrar"
        >¿ No tienes una cuenta ? REGISTRATE </Link>
      </nav>
    </>
  )
}

export default Login