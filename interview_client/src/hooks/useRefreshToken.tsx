import axios from '../api/axios';
import { IResponseType } from '../types';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth }: any = useAuth();

  const refresh = async () => {
    const response: IResponseType = await axios.get('/getToken', {
      withCredentials: true,
    });

    setAuth((prev: any) => {
      return { ...prev, accessToken: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
