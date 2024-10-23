import axios from 'axios';

// Create an axios instance
const instance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'http://127.0.0.1:8000/api',
});

// Add a request interceptor to include the Bearer token
instance.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        const token = '1|EfZpRI6hOGHXiw5NjuFLLuAFGZxfu4jPj5Bks1120c1651ce';
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;