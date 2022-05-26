import { useState, useEffect , createContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth , setAuth] = useState({});
  const [cargando , setCargando] = useState(true);

  // const navigate  = useNavigate();



  useEffect(() => {
    const autenticarUsusario = async () => {
      const token = localStorage.getItem('token');

      if(!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/perfil`, config);
        setAuth(data);
        // navigate('/proyectos');
      } catch (error) {
        setAuth({});
      }
      setCargando(false);
    }
    autenticarUsusario();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
, []);

  const cerrarSesionAuth = () => {
    setAuth({});
  }

  return (
    <AuthContext.Provider 
    value={{
      auth,
      setAuth,
      cargando,
      cerrarSesionAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider};

export default AuthContext;

