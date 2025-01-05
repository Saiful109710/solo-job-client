import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

 const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});



const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  
  
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log(
          "error is come from very own axios interceptors",
          error.response
        );
        if (error.response.status === 401 || error.response.status === 403) {
          // logout
          logOut()
          // navigate
          navigate('/login')
        }
      }
    );
  }, [logOut,navigate]);
  return axiosSecure
};

export default useAxiosSecure
