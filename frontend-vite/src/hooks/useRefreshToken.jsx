import useAuth from "./useAuth";
import refreshToken from "../Services/refresh";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await refreshToken();
    setAuth(prev => {
      return {
        ...prev,
        accessToken: response.accessToken,
        userInfo: response.userInfo
      };
    });
    
    return response;
  };
  
  return refresh;
};

export default useRefreshToken;