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

export const fetchMovies = async () => {
    try {
        const response = await axios.get(BASE_URL + '/api/movies/');
        const moviesData = response.data;

        // Modify the image URLs to include the full path of your Django backend
        const updatedMoviesData = moviesData.map((movie) => ({
            ...movie,
            image: BASE_URL + movie.image, // Assuming movie.image contains the relative URL, adjust it if needed
        }));

        return updatedMoviesData;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

// Function to post movie data along with an image
export const postMovieWithImage = async (movieData) => {
    try {
        // Create a new FormData object to handle file uploads
        const formDataObject = new FormData();
        formDataObject.append('title', movieData.title);
        formDataObject.append('description', movieData.description);
        formDataObject.append('price', movieData.price);
        formDataObject.append('image', movieData.image); // Append the image file
        formDataObject.append('special', movieData.special);

        const response = await axios.post(BASE_URL + '/api/movies/', formDataObject, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the correct content type for file upload
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error posting movie data:', error);
        throw error;
    }
};

// Fonction pour créer une réservation
export const createReservation = async (session_id, seats) => {
    try {
        const response = await axios.post(BASE_URL + '/api/reserve/', {
            session_id: session_id,
            seats: seats,
        });

        return response.data;
    } catch (error) {
        throw new Error('Impossible de créer la réservation. Vérifiez les places disponibles.');
    }
};

// Function to fetch the purchase history from Django
export const fetchPurchaseHistory = async () => {
    try {
        const response = await axios.get(BASE_URL + '/api/purchase-history/'); // Replace 'purchase-history' with the actual URL for fetching purchase history
        return response.data;
    } catch (error) {
        console.error('Error fetching purchase history:', error);
        throw error;
    }
};



// Export Axios instance to be used throughout the app
export default axios.create({
    baseURL: BASE_URL,
});
