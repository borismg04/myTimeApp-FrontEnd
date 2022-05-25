import { useState ,useEffect , createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {

  const [proyectos, setProyectos] = useState([]);
  const [alerta , setAlerta] = useState({});
  const [proyecto , setProyecto] = useState({});
  const [cargando , setCargando] = useState(false);
  const [ModalFormularioTarea , setModalFormularioTarea] = useState(false);
  const [tarea , setTarea] = useState({});
  const [ModalEliminarTarea , setModalEliminarTarea] = useState(false);
  const [colaborador , setColaborador] = useState({});
  const [ModalEliminarColaborador , setModalEliminarColaborador] = useState(false);

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
  } , [navigate]);

  const mostrarAlerta = alerta => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 2000);
  }

  const submitProyecto = async proyecto => {

    if(proyecto.id){
      await editarProyecto(proyecto);
    }else{
      await nuevoProyecto(proyecto);
    }  
  }

  const editarProyecto = async proyecto => {
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

    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/proyectos/${proyecto.id}`, 
    proyecto, config);
    console.log(data);

    // Sincronizar el state
    const proyectosActualizados = proyectos.map(proyectoState => (
      proyectoState._id === data._id ? data : proyectoState));

    setProyectos(proyectosActualizados);
    // Mostrar alerta
    setAlerta({
      msg: 'Proyecto Actualizado Correctamente ✅',
      error: false
    });

    setTimeout(() => {
      setAlerta({});
      navigate("/proyectos");
    }, 2500);

    // Redireccionar
    } catch (error) {
      console.log(error);
    }
  }

  const nuevoProyecto = async proyecto => {
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
      setAlerta({
        msg: 'Error al obtener el proyecto',
        error: true
      });
    }

    setCargando(false);
  } 

  const eliminarProyecto = async id => {
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

    const { data }= await axios.delete(`${process.env.REACT_APP_API_URL}/api/proyectos/${id}`,config);
    
    // Sincronizar el state
    const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id);
    setProyectos(proyectosActualizados);
    // Mostrar alerta
    setAlerta({
      msg: data.msg,
      error: false
    });
    // Redireccionar
    setTimeout(() => {
      setAlerta({});
      navigate("/proyectos");
    }, 2500);

    } catch (error) {
      console.log(error);
    }
  }

  const handlerModalTarea = () => {
    setModalFormularioTarea(!ModalFormularioTarea);
    setTarea({});
  }

  const submitTarea = async tarea => {
    
    if(tarea.id){
      await editarTarea(tarea)
    }else{
      await crearTarea(tarea);
    }
  }

  const crearTarea = async tarea => {

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

    const { data }= await axios.post(`${process.env.REACT_APP_API_URL}/api/tareas`, tarea, config);
    // Sincronizar el state
    const proyectosActualizado = { ...proyecto };
    proyectosActualizado.tareas = [...proyecto.tareas , data];
    setProyecto(proyectosActualizado);
    // Mostrar alerta
    setAlerta({});
    setModalFormularioTarea(false);
    // Redireccionar

    } catch (error) {
    console.log('error:', error)
    }
  }

  const editarTarea = async tarea => {

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

    const { data }= await axios.put(`${process.env.REACT_APP_API_URL}/api/tareas/${tarea.id}`, tarea, config);

    // Sincronizar el state
    const proyectosActualizado = { ...proyecto };
    proyectosActualizado.tareas = proyecto.tareas.map(tareaState => (
      tareaState._id === data._id ? data : tareaState));
    setProyecto(proyectosActualizado);
    // Mostrar alerta
    setAlerta({});
    setModalFormularioTarea(false);

    } catch (error) {
      console.log('error:', error)
    }
  }

  const handleModalEditarTarea = tarea => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  }

  const handleEliminarTarea = async tarea => {
    setTarea(tarea);
    setModalEliminarTarea(!ModalEliminarTarea);
  }

  const eliminarTarea = async ()=> {
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

    const { data }= await axios.delete(`${process.env.REACT_APP_API_URL}/api/tareas/${tarea._id}`,config);
    setAlerta({
      msg: data.msg,
      error: false
    });
    setTimeout(() => {
      setAlerta({});
    } , 2500);
      

    // Sincronizar el state
    const proyectosActualizado = { ...proyecto };
    proyectosActualizado.tareas = proyectosActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id);
    
    setProyecto(proyectosActualizado);
    setModalEliminarTarea(false);
    setTarea({});
    } catch (error) {
      console.log('error:', error)
    }
  }

  const submitColaborador = async email => {
    
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

    const { data }= await axios.post(`${process.env.REACT_APP_API_URL}/api/proyectos/colaboradores`, {email}, config);
    
    setColaborador(data);
    setAlerta({});

    }catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
      });
        setTimeout(() => {
          setAlerta({});
        } , 2500);
    } finally {
      setCargando(false);
    }
  }

  const agregarColaborador = async email => {
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

    const { data }= await axios.post(
      `${process.env.REACT_APP_API_URL}/api/proyectos/colaboradores/${proyecto._id}`,email,config);
      
      setAlerta({
        msg: data.msg,
        error: false
      });
      setTimeout(() => {
        setAlerta({});
      } , 3000);

      setColaborador({});

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
      setTimeout(() => {
        setAlerta({});
      } , 2500);
    }
  }

  const handleModalEliminarColaborador = async (colaborador) => {
    setModalEliminarColaborador(!ModalEliminarColaborador);
    setColaborador(colaborador);
  }

  const eliminarColaborador = async () => {
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

    const { data }= await axios.post(
      `${process.env.REACT_APP_API_URL}/api/proyectos/eliminar-colaborador/${proyecto._id}`,
      {id:colaborador._id},config);

      const proyectosActualizado = { ...proyecto };

      proyectosActualizado.colaboradores = proyectosActualizado.colaboradores.filter(
        colaboradorState => colaboradorState._id !== colaborador._id);

      setProyecto(proyectosActualizado);
      
      setAlerta({
        msg: data.msg,
        error: false
      });
      setTimeout(() => {
        setAlerta({});
      } , 3000);

      setColaborador({});
      setModalEliminarColaborador(false);

    } catch (error) {
      console.log('error:', error)
    }
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
        cargando,
        eliminarProyecto,
        ModalFormularioTarea,
        handlerModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        handleEliminarTarea,
        ModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        ModalEliminarColaborador,
        handleModalEliminarColaborador,
        eliminarColaborador
      }}
      >{children}
      </ProyectosContext.Provider>
  );
}

export { 
  ProyectosProvider 
};

export default ProyectosContext;

