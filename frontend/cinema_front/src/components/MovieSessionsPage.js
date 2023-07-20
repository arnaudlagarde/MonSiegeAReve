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
            console.error('Erreur lors de la récupération des séances de films:', error);
        }
    };

    const fetchMovies = async () => {
        try {
            const response = await api.get('/api/movies');
            setMovies(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des films:', error);
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

        // Validation supplémentaire pour la date et l'heure
        const selectedDateTime = new Date(`${formData.date} ${formData.time}`);
        const currentDateTime = new Date();
        if (selectedDateTime <= currentDateTime) {
            console.error('La date et l\'heure doivent être futures.');
            return;
        }

        try {
            const response = await api.post('/api/sessions/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            // Efface les champs du formulaire après la soumission réussie
            setFormData({
                movie: '',
                date: '',
                time: '',
            });
            // Rafraîchit la liste des séances de films après l'ajout d'une nouvelle séance
            const updatedSessions = await api.get('/api/sessions');
            setMovieSessions(updatedSessions.data);
        } catch (error) {
            console.error(error);
        }
    };

    const isAdmin = localStorage.getItem('is_staff'); // Récupère le statut administrateur depuis localStorage

    return (
        <Container>
            {isAdmin === 'true' && (
                <>
                    <hr />
                    <h2 className="my-4">Ajouter une nouvelle séance</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Film :</label>
                            <select name="movie" value={formData.movie} onChange={handleChange} className="form-control" required>
                                <option value="">Sélectionner un film</option>
                                {movies.map((movie) => (
                                    <option key={movie.id} value={movie.id}>
                                        {movie.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date :</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Heure :</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} className="form-control" required />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            Ajouter la séance
                        </button>
                    </form>
                </>
            )}
            <h2 className="my-4">Séances de films disponibles</h2>
            <Row>
                {movieSessions.map((session) => (
                    <Col key={session.id} md={6} className="mb-4">
                        <div className="border p-3 h-100 d-flex flex-column justify-content-between">
                            {movies.find((movie) => movie.id === session.movie) ? (
                                <React.Fragment>
                                    <h4>{movies.find((movie) => movie.id === session.movie).title}</h4>
                                    <p>Date : {session.date}</p>
                                    <p>Heure : {session.time}</p>
                                </React.Fragment>
                            ) : (
                                <p>Détails du film non disponibles</p>
                            )}
                            <Button variant="primary" className="mt-3" onClick={() => alert('La fonctionnalité de réservation de places arrive bientôt !')}>
                                Réserver des places
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MovieSessionsPage;
