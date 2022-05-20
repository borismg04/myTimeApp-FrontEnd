import { useEffect , useState } from "react"
import { useParams , Link } from "react-router-dom"
import axios from "axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

  const [ alerta , setAlerta ] = useState({})
  const [ cuentaConfirmada , setCuentaConfirmada ] = useState(false)

  const params = useParams();

  const { id } = params;

  useEffect(() => {

    const ConfirmarCuenta = async () => {
      try {
        //TODO: Mover hacia un cliente Axios
        const url = `${process.env.REACT_APP_API_URL}/api/users/confirmar/${id}`;
        const { data } = await axios(url);

        setAlerta({
          msg: data.msg,
          error: false
        });

        setCuentaConfirmada(true);

      } catch (error) {
        setAlerta ({
          msg: error.response.data.msg,
          error: true
        });
      }
        
    }
      ConfirmarCuenta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { msg } = alerta;
    


  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu Cuenta y Empieza a Crear tus
        <span className="text-slate-700"> Proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        { msg && <Alerta alerta={alerta} /> }

        { cuentaConfirmada && (
          <Link
          className="uppercase block text-center my-5 text-slate-500 text-sm"
          to="/"
        >
          Inicia Sesión
        </Link>)}
      </div>
    </>
  )
}

export default ConfirmarCuenta