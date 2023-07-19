import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Replace with your Django backend URL
    withCredentials: true, // Include CSRF token in requests
});

export default instance;
