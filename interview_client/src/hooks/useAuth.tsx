import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
  const { auth }: any = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.accessToken ? 'Logged In' : 'Logged Out'
  );
  return useContext(AuthContext);
};

export default useAuth;
