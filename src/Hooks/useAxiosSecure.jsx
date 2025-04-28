/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;
