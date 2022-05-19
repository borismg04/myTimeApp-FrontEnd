import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";

const Registrar = () => {
  const [ nombre, setNombre ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ repetirPassword, setRepetirPassword ] = useState("");
  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if([ nombre, email, password, repetirPassword ].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });
      return;
    }
  }
  
  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta & Administra tus
        <span className="text-slate-700"> Proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta} /> }

      <form className="my-10 bg-white shadow-xl rounded-lg p-10"
            onSubmit={handleSubmit}>
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu Contraseña de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
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
