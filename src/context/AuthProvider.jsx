import { useState, useEffect , createContext } from 'react';
// import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  return (
    <AuthContext.Provider 
    value={{

    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

