import { useState,useEffect } from "react"
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";


const NuevoPassword = () => {

  const [ tokenValido , setTokenValido ] = useState(false);
  const [ password, setPassword ] = useState("");
  const [ contraseñaModificada , setContraseñaModificada ] = useState(false);
  const [ alerta, setAlerta] = useState({});


  const params = useParams();
  console.log(params); 
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {

      try {
        //TODO: Mover hacia un cliente Axios
        await axios(`${process.env.REACT_APP_API_URL}/api/users/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
    }
    comprobarToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6) {
      setAlerta({
        msg: "La contraseña es muy corta, debe tener al menos 6 caracteres ⚠️",
        error: true
      });
      return;
    }

    try {
      const url = `${process.env.REACT_APP_API_URL}/api/users/olvide-password/${token}`;
      const { data } = await axios.post(url, {
        password
        });
      
      setAlerta({
        msg: data.msg,
        error: false
      });

      setContraseñaModificada(true);
      
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
        Reestablece tu Contraseña y no pierdas tus
        <span className="text-slate-700"> Proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta} /> }
      
      { tokenValido && (
        <form className="my-10 bg-white shadow-xl rounded-lg p-10"
              onSubmit={handleSubmit}>
        
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
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Guardar Nueva Contraseña"
          className="w-full bg-sky-700 mb-5 py-3 text-white uppercase font-bold rounded-xl
            hover:cursor-pointer hover:bg-sky-800 transiton-colors"
        />
      </form>
      )}

      { contraseñaModificada && (
          <Link
          className="uppercase block text-center my-5 text-slate-500 text-sm"
          to="/"
        >
          Inicia Sesión
        </Link>)}

      
    </>
  )
}

export default NuevoPassword