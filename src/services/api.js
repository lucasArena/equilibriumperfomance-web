import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.response.use((config) => {
  const { data } = config;
  return Promise.resolve(data);
});

export default api;
