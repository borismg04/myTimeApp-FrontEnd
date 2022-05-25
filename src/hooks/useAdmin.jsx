import useProyectos from "./useProyectos";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { proyecto } = useProyectos();
  const { auth } = useAuth();
  console.log("proyecto:", proyecto);
  console.log("auth:", auth);

  return proyecto.creador === auth._id; 
}

export default useAdmin;