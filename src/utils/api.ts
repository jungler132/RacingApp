import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ergast.com/api/f1',
});

export default api;
