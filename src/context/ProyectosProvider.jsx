import { useState ,useEffect , createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {

  const [proyectos, setProyectos] = useState([]);
  const [alerta , setAlerta] = useState([]);

  const navigate = useNavigate();

  const mostrarAlerta = alerta => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
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
    console.log(data);

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

  return (
    <ProyectosContext.Provider 
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto
      }}
      >{children}
      </ProyectosContext.Provider>
  );
}

export { 
  ProyectosProvider 
};

export default ProyectosContext;

