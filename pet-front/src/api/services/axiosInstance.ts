import axios from 'axios';
import { AUTH_API_URL } from './constants';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: AUTH_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default axiosInstance;
