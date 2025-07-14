import { createContext, useContext, useState } from 'react';

let authToken = null; // 전역 토큰 변수

export const setAuthToken = (token) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [username, setUsername] = useState('');

  const setToken = (token) => {
    setTokenState(token);
    setAuthToken(token); // 전역 변수에도 저장
  };

  return (
    <AuthContext.Provider value={{ token, setToken, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);