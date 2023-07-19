import React, { useState, useEffect } from 'react';
import api from '../api'; // Import your custom api.js file
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';

const Reservation = () => {
  const [movies, setMovies] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [specialSessions, setSpecialSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMovies();
    fetchSessions();
    fetchSpecialSessions();
  }, []);

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
      setMessage('Please select a session');
      return;
    }

    try {
      const response = await api.post('/api/reserve/', {
        session_id: selectedSession,
        seats: seatsRequested,
      });

      setMessage(response.data.message);
      // Refresh sessions after a successful reservation
      fetchSessions();
      fetchSpecialSessions();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Not enough available seats. Please try again.');
      } else {
        setMessage('Unable to reserve seats. An error occurred.');
      }
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
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.movie.title} - {session.date} {session.time}
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
            <Form.Control type="number" min="1" value={seatsRequested} onChange={(e) => setSeatsRequested(e.target.value)} />
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
