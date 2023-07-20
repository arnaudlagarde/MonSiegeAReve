import React, { useState, useEffect, useCallback } from 'react';
import api from '../api'; // Import api.js
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';

const Reservation = () => {
  const [movies, setMovies] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [specialSessions, setSpecialSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [message, setMessage] = useState('');
  const [moviesData, setMoviesData] = useState([]); // State to store the movie data associated with each session

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
    fetchMoviesData();
  }, [fetchMoviesData]);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/api/movies/'); // Use api.get instead of axios.get
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };


  const fetchSessions = async () => {
    try {
      const response = await api.get('/api/sessions/'); // Use api.get instead of axios.get
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching regular sessions:', error);
    }
  };

  const fetchSpecialSessions = async () => {
    try {
      const response = await api.get('/api/special_sessions/'); // Use api.get instead of axios.get
      setSpecialSessions(response.data);
    } catch (error) {
      console.error('Error fetching special sessions:', error);
    }
  };

  const handleReservation = async () => {
    if (!selectedSession) {
      setMessage('Please select a session');
      return;
    }

    try {
      const response = await api.post('/api/reserve/', { // Use api.post instead of axios.post
        session_id: selectedSession,
        seats: seatsRequested,
      });

      setMessage(response.data.message);
      // Refresh sessions after a successful reservation
      fetchSessions();
      fetchSpecialSessions();
    } catch (error) {
      setMessage('Unable to reserve seats. Check available seats.');
    }
  };

  return (
    <Container>
      <h2>Reserve Seats</h2>
      <Row>
        <Col sm={6}>
          <Form.Group>
            <Form.Label>Select a session:</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedSession(e.target.value)}>
              <option value="">Choose a session</option>
              {sessions.map((session, index) => (
                <option key={session.id} value={session.id}>
                  {/* Use moviesData[index] to access the movie title */}
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
            <Form.Label>Number of seats:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={seatsRequested}
              onChange={(e) => setSeatsRequested(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleReservation}>
            Reserve
          </Button>
          {message && <Alert variant="info">{message}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default Reservation;
