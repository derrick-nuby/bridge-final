import axios from 'axios';

const baseURL = process.env.API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

