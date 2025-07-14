import axios from 'axios';
import { getAuthToken } from './AuthContext';

const axiosInstance = axios.create({
  baseURL: 'https://hanacoin.hasclassmatching.com',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;