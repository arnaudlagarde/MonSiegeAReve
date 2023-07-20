import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';

const Reservation = () => {
  const [movies, setMovies] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [specialSessions, setSpecialSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [message, setMessage] = useState('');
  const [moviesData, setMoviesData] = useState([]);

  const fetchMoviesData = useCallback(async () => {
    try {
      const moviesData = await Promise.all(
        sessions.map(async (session) => {
          const movie = movies.find((movie) => movie.id === session.movie);
          return movie ? movie.title : '';
        })
      );
      setMoviesData(moviesData);
    } catch (error) {
      console.error('Error fetching movies data:', error);
    }
  }, [sessions, movies]);

  useEffect(() => {
    fetchMovies();
    fetchSessions();
    fetchSpecialSessions();
  }, []);

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/api/movies/');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await api.get('/api/sessions/');
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching regular sessions:', error);
    }
  };

  const fetchSpecialSessions = async () => {
    try {
      const response = await api.get('/api/special_sessions/');
      setSpecialSessions(response.data);
    } catch (error) {
      console.error('Error fetching special sessions:', error);
    }
  };

  const handleReservation = async () => {
    if (!selectedSession) {
      setMessage('Veuillez sélectionner une séance');
      return;
    }

    try {
      const response = await api.post('/api/reserve/', {
        session_id: selectedSession,
        seats: seatsRequested,
      });

      setMessage(response.data.message);
      fetchSessions();
      fetchSpecialSessions();
    } catch (error) {
      setMessage('Impossible de réserver des places. Vérifiez les places disponibles.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Réserver des places</h2>
      <Row>
        <Col sm={6}>
          <Form.Group>
            <Form.Label>Sélectionnez une séance :</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedSession(e.target.value)}>
              <option value="">Choisir une séance</option>
              {sessions.map((session, index) => (
                <option key={session.id} value={session.id}>
                  {moviesData[index]} - {session.date} {session.time}
                </option>
              ))}
              {specialSessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.movie} - {session.date} {session.time}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre de places :</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={seatsRequested}
              onChange={(e) => setSeatsRequested(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleReservation}>
            Réserver
          </Button>
          {message && <Alert variant="info" className="mt-3">{message}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default Reservation;
