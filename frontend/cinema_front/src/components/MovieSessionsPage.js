import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Row, Col, Button } from 'react-bootstrap';

const MovieSessionsPage = () => {
    const [movieSessions, setMovieSessions] = useState([]);
    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({
        movie: '',
        date: '',
        time: '',
    });

    useEffect(() => {
        fetchSessions();
        fetchMovies();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await api.get('/api/sessions');
            setMovieSessions(response.data);
        } catch (error) {
            console.error('Error fetching movie sessions:', error);
        }
    };

    const fetchMovies = async () => {
        try {
            const response = await api.get('/api/movies');
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

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
        <Container>
            <h2 className="my-4">Available Movie Sessions</h2>
            <Row>
                {movieSessions.map((session) => (
                    <Col key={session.id} md={6} className="mb-4">
                        <div className="border p-3 h-100 d-flex flex-column justify-content-between">
                            {movies.find((movie) => movie.id === session.movie) ? (
                                <React.Fragment>
                                    <h4>{movies.find((movie) => movie.id === session.movie).title}</h4>
                                    <p>Date: {session.date}</p>
                                    <p>Time: {session.time}</p>
                                </React.Fragment>
                            ) : (
                                <p>Movie details not available</p>
                            )}
                            <Button variant="primary" className="mt-3" onClick={() => alert('Seat reservation functionality coming soon!')}>
                                Reserve Seats
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>
            <hr />
            <h2 className="my-4">Add a New Session</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Movie:</label>
                    <select
                        name="movie"
                        value={formData.movie}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a movie</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Add Session
                </button>
            </form>
        </Container>
    );
};

export default MovieSessionsPage;
