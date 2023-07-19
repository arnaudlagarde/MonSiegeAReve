import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Update this with your Django backend URL

// Function to set the authentication token and CSRF token for Axios requests
export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const setCSRFToken = (csrfToken) => {
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
};

// Function to retrieve the authentication token from localStorage (or cookies)
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Initialize the authentication token and CSRF token for Axios on app startup
setAuthToken(getAuthToken());

// Fetch the CSRF token and set it in Axios headers
axios.get(BASE_URL + '/api/csrf/')
    .then((response) => {
        const csrfToken = response.data.csrfToken;
        setCSRFToken(csrfToken);
    })
    .catch((error) => {
        console.error('Error fetching CSRF token:', error);
    });

export const fetchMovieSessions = async () => {
    try {
        const response = await axios.get(BASE_URL + '/api/sessions/'); // Use the correct URL here
        return response.data;
    } catch (error) {
        console.error('Error fetching movie sessions:', error);
        throw error;
    }
};

// Export Axios instance to be used throughout the app
export default axios.create({
    baseURL: BASE_URL,
});
