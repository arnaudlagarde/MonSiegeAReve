import React, { useEffect, useState } from 'react';
import api from '../api'; // Import api.js

const MovieSessionsPage = () => {
    const [movieSessions, setMovieSessions] = useState([]);

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

        fetchSessions();
    }, []);

    return (
        <div>
            <h2>Available Movie Sessions</h2>
            {movieSessions.map((session) => (
                <div key={session.id}>
                    <p>Movie: {session.movieTitle}</p>
                    <p>Date: {session.date}</p>
                    <p>Time: {session.time}</p>
                    {/* Add other session details you want to display */}
                </div>
            ))}
        </div>
    );
};

export default MovieSessionsPage;
