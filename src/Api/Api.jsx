import axios from 'axios';

const API = axios.create({
  baseURL:"https://bluegen-backend.vercel.app" ,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
