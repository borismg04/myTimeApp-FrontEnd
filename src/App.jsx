import { BrowserRouter , Routes ,Route  } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import { AuthProvider } from './context/AuthProvider';
import Proyectos from './pages/Proyectos';
import RutaProtegida from './layouts/RutaProtegida';
import NuevoProyecto from './pages/NuevoProyecto';
import ProyectoUnico from './pages/ProyectoUnico';
import { ProyectosProvider } from './context/ProyectosProvider';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />}/>
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route path=":id" element={<ProyectoUnico />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
