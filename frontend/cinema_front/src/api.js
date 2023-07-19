import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Update this with your Django backend URL

// Function to set the authentication token for Axios requests
export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Function to retrieve the authentication token from localStorage (or cookies)
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Initialize the authentication token for Axios on app startup
setAuthToken(getAuthToken());

// Export Axios instance to be used throughout the app
export default axios.create({
    baseURL: BASE_URL,
});
