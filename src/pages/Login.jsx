import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ alerta, setAlerta] = useState({});

  const { setAuth }= useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([ email, password ].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios ⛔",
        error: true
      });
      return;
    }

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, { email, password });
      setAlerta({});
      localStorage.setItem("token", data.token);
      
      setAuth(data);

      navigate("/proyectos");

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true 
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia Sesión & Administra tus {' '}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta} /> }

      <form className="my-10 bg-white shadow-xl rounded-lg p-10"
            onSubmit={handleSubmit}
      >
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

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full bg-sky-700 mb-5 py-3 text-white uppercase font-bold rounded-xl
          hover:cursor-pointer hover:bg-sky-800 transiton-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="uppercase block text-center my-5 text-slate-500 text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
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

export default Login;
