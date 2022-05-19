import { Link } from "react-router-dom";

const Registrar = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta & Administra tus
        <span className="text-slate-700"> Proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow-xl rounded-lg p-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Ingresa tu Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
            Confirmar Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="w-full bg-sky-700 mb-5 py-3 text-white uppercase font-bold rounded-xl
            hover:cursor-pointer hover:bg-sky-800 transiton-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="uppercase block text-center my-5 text-slate-500 text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>

        <Link
          className="uppercase block text-center my-5 text-slate-500 text-sm"
          to="/olvide-password"
        >
          ¿Olvidaste tu Contraseña?
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
