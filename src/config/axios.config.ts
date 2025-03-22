import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true, //? it will allow send cookies by request
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosInstance;
