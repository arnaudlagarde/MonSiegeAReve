import React, { useEffect, useState } from 'react';
import api from '../api'; // Import api.js

const MovieSessionsPage = () => {
    const [movieSessions, setMovieSessions] = useState([]);
    const [movies, setMovies] = useState([]); // State for storing the list of movies
    const [formData, setFormData] = useState({
        movie: '',
        date: '',
        time: '',
    });

    useEffect(() => {
        // Fetch the list of available movie sessions from the backend
        const fetchSessions = async () => {
            try {
                const response = await api.get('/api/sessions'); // Use the correct endpoint
                setMovieSessions(response.data);
            } catch (error) {
                console.error('Error fetching movie sessions:', error);
            }
        };

        // Fetch the list of available movies from the backend
        const fetchMovies = async () => {
            try {
                const response = await api.get('/api/movies'); // Use the correct endpoint
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchSessions();
        fetchMovies();
    }, []);

    // Create an object to store movie details indexed by movie ID
    const movieDetails = {};
    movies.forEach((movie) => {
        movieDetails[movie.id] = movie;
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Additional validation for date and time
        const selectedDateTime = new Date(`${formData.date} ${formData.time}`);
        const currentDateTime = new Date();
        if (selectedDateTime <= currentDateTime) {
          console.error('Date and time must be in the future.');
          return;
        }
    
        try {
          const response = await api.post('/api/sessions/', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response.data);
          // Clear the form fields after successful submission
          setFormData({
            movie: '',
            date: '',
            time: '',
          });
          // Refresh the movie sessions list after adding a new session
          const updatedSessions = await api.get('/api/sessions');
          setMovieSessions(updatedSessions.data);
        } catch (error) {
          console.error(error);
        }
      };
    

      return (
        <div>
            <h2>Available Movie Sessions</h2>
            {movieSessions.map((session) => (
                <div key={session.id}>
                    {/* Check if the movie exists in movieDetails before accessing its properties */}
                {movieDetails[session.movie] ? (
                    <React.Fragment>
                        <p>Movie: {movieDetails[session.movie].title}</p>
                        <p>Date: {session.date}</p>
                        <p>Time: {session.time}</p>
                        {/* Add other session details you want to display */}
                    </React.Fragment>
                ) : (
                    <p>Movie details not available</p>
                )}
                </div>
            ))}
            <hr />
            <h2>Add a New Session</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Movie:
                    <select
                        name="movie"
                        value={formData.movie}
                        onChange={handleChange}
                        required
                    >   
                        <option value="">Select a movie</option>
                        {/* Populate the dropdown with the list of movies */}
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Time:
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Session</button>
            </form>
        </div>
    );
};

export default MovieSessionsPage;
