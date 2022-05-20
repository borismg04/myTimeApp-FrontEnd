import { useState ,useEffect , createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {

  const [proyectos, setProyectos] = useState([]);
  const [alerta , setAlerta] = useState({});
  const [proyecto , setProyecto] = useState({});
  const [cargando , setCargando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem("token");

        if(!token) {
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };

        const { data }= await axios.get(`${process.env.REACT_APP_API_URL}/api/proyectos`, config);
        setProyectos(data);

      } catch (error) {
        console.log(error);
      }
    }
    obtenerProyectos();
  } , []);

  const mostrarAlerta = alerta => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 2000);
  }

  const submitProyecto = async proyecto => {
    try {
      const token = localStorage.getItem("token");

      if(!token){
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
    };

    const { data }= await axios.post(`${process.env.REACT_APP_API_URL}/api/proyectos`, proyecto, config);
    
    setProyectos([...proyectos, data]);

    setAlerta({
      msg: 'Proyecto Creado Correctamente ✅',
      error: false
    });

    setTimeout(() => {
      setAlerta({});
      navigate("/proyectos");
    }, 3000);

    } catch (error) {
      console.log('error:',error);
    }
  }

  const obtenerProyectoUnico = async id => {
    
    setCargando(true);

    try {
      const token = localStorage.getItem("token");

      if(!token){
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/proyectos/${id}`, config);
      setProyecto(data);

    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  } 

  return (
    <ProyectosContext.Provider 
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyectoUnico,
        proyecto,
        cargando
      }}
      >{children}
      </ProyectosContext.Provider>
  );
}

export { 
  ProyectosProvider 
};

export default ProyectosContext;
